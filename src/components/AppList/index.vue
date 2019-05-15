<script>
/* eslint-disable camelcase */

export default {
  name: 'AppList',

  props: {
    // 后端返回的列表数据
    list: {
      type: Object,
      default: () => ({}),
    },

    // 请求的接口
    api: {
      type: String,
      default: '',
    },

    // 是否将请求条件放在url上
    exitUrl: {
      type: Boolean,
      default: true,
    },

    // 固定的请求条件
    fixedQuery: {
      type: Object,
      default: () => {},
    },

    // 该列表页title
    title: {
      type: String,
      required: true,
    },

    // 添加按钮的文案
    createLabel: {
      type: [String, Boolean],
      default: false,
    },

    // 跳转页面按钮的文案
    skipLabel: {
      type: [String, Boolean],
      default: false,
    },

    // excel按钮的文案
    excelLabel: {
      type: [String, Boolean],
      default: false,
    },
  },

  data() {
    return {
      // 控制页面加载状态
      loading: false,

      searchObj: {
        start: 1,
        listRow: 10,
      },
    };
  },

  created() {
    if (!this.api) return;

    if (!this.exitUrl) {
      this.getData();

      return;
    }

    this.getList();

    this.$watch('$route.query', () => {
      this.getList();
    });
  },

  methods: {
    /**
     * 从url中获取参数，并依据参数获取列表数据
     */
    getList() {
      this.loading = true;

      let query = this.$route.query;

      if (this.fixedQuery) {
        query = { ...query, ...this.fixedQuery };
      }

      return this.$http.post(`${this.api}`, query)
        .then((data) => {
          this.$emit('update:list', data);
        })
        .catch((error) => {
          this.$message.error(error.errMsg);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getData() {
      this.loading = true;

      let query = this.searchObj;

      if (this.fixedQuery) {
        query = { ...query, ...this.fixedQuery };
      }

      this.$http.post(`${this.api}`, query)
        .then((data) => {
          this.$emit('update:list', data);
        })
        .catch((error) => {
          this.$message.error(error.errMsg);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    /**
     * 改变每页条数
     * @param {number} listRow 每页条数
     */
    onSizeChange(listRow) {
      if (!this.exitUrl) {
        this.searchObj = {
          start: 1,
          listRow,
        };

        this.getData();

        return;
      }

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
    onCurrentChange(start) {
      if (!this.exitUrl) {
        this.searchObj = {
          ...this.searchObj,
          start,
        };

        this.getData();

        return;
      }

      this.$router.push({
        query: {
          ...this.$route.query,
          start,
        },
      });
    },
  },
};
</script>

<template>
  <div
    v-loading="loading"
    class="list"
  >
    <header class="list-header">
      <h2 class="list-header__title">{{ title }}</h2>
      <div class="list-header__filter">

        <!-- 自定义搜索 -->
        <slot
          name="search"/>
      </div>

      <div style="margin-left:auto">
        <el-button
          v-if="createLabel"
          size="small"
          type="primary"
          @click="$emit('create')"
        >
          {{ createLabel }}
        </el-button>

        <el-button
          v-if="skipLabel"
          size="small"
          type="primary"
          @click="$emit('skipPage')"
        >
          {{ skipLabel }}
        </el-button>

        <el-button
          v-if="excelLabel"
          size="small"
          type="primary"
          @click="$emit('excelPage')"
        >
          {{ excelLabel }}
        </el-button>
      </div>
    </header>

    <div class="list-body">
      <slot :list-data="list.data"/>
    </div>

    <footer
      class="list-footer"
    >
      <el-pagination
        :current-page="Number(list.start)"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        :total="list.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
    </footer>
  </div>
</template>

<style>
.list {
  display: flex;
  flex-direction: column;
  padding: 0 2em;
}

.list-header {
  display: flex;
  align-items: center;
  padding: 1em 0;
}

.list-header__title {
  font-size: 1rem;
}
.list-header__filter {
  /* margin-left: auto; */
}

.list-header__input {
  width: 200px;
  margin-left: 1em;
}

.list-header__button {
  margin-left: 1em;
  margin-right: 2em;
}

.list-footer {
  padding: 2em 0 1em;
  margin-top: auto;
}
</style>
