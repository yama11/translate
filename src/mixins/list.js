/**
 * 列表页公共逻辑
 *
 * @author  suyanping
 */

export default {
  data: () => ({
    // 页面loading状态
    loading: false,
  }),

  methods: {
    /**
     * 确认删除Table中的某一项
     *
     * @param id          {number}    目标id
     * @param list        {Array}     目标所在数组列表
     * @param appellation {string}    目标称呼
     * @param uri         {string}    删除接口前缀
     * @param tableHref   {object}    数据渲染表格的ref
     */
    $_listMixin_alertDeleteItem(id, list, appellation, uri, tableHref, header, params) {
      this.$confirm(
        `确定删除该${appellation}？`,
        '删除确认',
        {
          showCancelButton: true,
          type: 'warning',
          confirmButtonText: '删除',
          confirmButtonClass: 'el-button--danger',
          // beforeClose,
        })
        .then(() => {
          this.$_listMixin_deleteItem(id, list, uri, tableHref, header, params);
        })
        .catch(() => {});
    },

    $_listMixin_deleteItem(id, list, uri, tableHref, header, params) {
      const paramsObj = params ? { id, ...params.params } : { id };
      return this.$http.post(`${uri}`, paramsObj)
        .then(() => {
          const index = list.findIndex(item => item.id === id);

          if (index === -1) return;

          if (!tableHref) {
            list.splice(index, 1);
          }

          this.$alert(
            '删除成功',
            '删除确认',
            {
              confirmButtonText: '我知道了',
              type: 'success',
              confirmButtonClass: 'success',
              showClose: false,
            })
            .then(() => {
              if (tableHref) {
                this.$_listMixin_getData(header, tableHref, params);
              }
            });
        })
        .catch(({ message }) => {
          this.$alert(
            message,
            '删除确认',
            {
              confirmButtonText: '我知道了',
              type: 'warning',
              confirmButtonClass: 'el-button--danger',
              showClose: false,
            });
        });
    },

    $_listMixin_getData(uri, tableHref, params) {
      this.$_listMixin_getList(uri, params)
        .then((res) => {
          const curPage = res.start - 1;
          const length = res.data.length === 0;

          if (length) {
            this.$_listMixin_changeIndex(curPage);

            return;
          }

          tableHref.getList();
        });
    },

    $_listMixin_getList(uri, params, query = this.$route.query) {
      this.loading = true;

      const searchParams = params ? { ...params.isFixed, ...query } : { ...query };

      return this.$http.post(`${uri}`, searchParams)
        .then((data) => {
          this.loading = false;

          return data;
        })
        .catch((error) => {
          this.loading = false;

          this.$message.error(error.errMsg);

          throw error;
        });
    },

    /**
     * 改变每页条数
     * @param {number} listRow 每页条数
     */
    $_listMixin_changeSize(listRow) {
      this.$router.push({
        query: {
          ...this.$route.query,
          start: 1,
          listRow,
        },
      });
    },

    /**
     * 翻页
     * @param {number} start 当前页数
     */
    $_listMixin_changeIndex(start) {
      this.$router.push({
        query: {
          ...this.$route.query,
          start,
        },
      });
    },
  },
};
