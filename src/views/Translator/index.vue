<script>
/**
 * @overview 译者信息
 */
import list from '@/mixins/list';

export default {
  name: 'TranslatorList',

  mixins: [list],

  data() {
    return {
      list: {
        data: [
          { userId: 111 },
        ],
      },

      columns: [
        { prop: 'userId', label: 'userId' },
        { prop: 'nickName', label: '昵称' },
        { prop: 'nationality', label: '国籍' },
        { prop: 'e-mail', label: '常用邮箱' },
        { prop: 'language', label: '语言' },
      ],

      fixedQuery: {
        sort: 'bookIndex',
        sortType: 'asc',
      },

      isFirst: 0,

      translatorId: null,

      visible: false,

      formData: {
        nickName: '',
        transLevel: null,
        notes: '',
      },

      formRules: {

      },

      levelList: [],

      bannedVisible: false,

      sortOrders: ['ascending', 'descending'],
    };
  },

  computed: {
    searchArr() {
      const searchList = [
        // { selectValue: this.bookList, componentType: 'AppSearchStatus', searchType: 'id' },
      ];

      return searchList;
    },
  },

  created() {

  },

  methods: {
    search() {
      this.$refs.list.getList();
    },

    look() {
      this.$router.push('/translator-manuscript/5');
    },

    update() {
      this.visible = true;
    },

    submitTranslator() {
      this.visible = false;
    },

    banned() {
      this.bannedVisible = true;
    },

    sureBanned() {
      this.cancelBanned();
    },

    cancelBanned() {
      this.bannedVisible = false;
    },

    change({ prop, order }) {
      this.isFirst = this.isFirst + 1;

      if (this.isFirst === 1) return;

      this.fixedQuery = {
        sort: prop,
        sortType: order === 'descending' ? 'desc' : 'asc',
      };

      this.$nextTick(() => {
        this.$refs.list.getList();
      });
    },
  },

};
</script>

<template>
  <AppList
    ref="list"
    :list.sync="list"
    :fixed-query="fixedQuery"
    api=""
    title="译者信息"
    class="translator-list"
  >
    <AppSearch
      slot="search"
      :search-arr="searchArr"
      @searchData="search"
    />
    <template
      slot-scope="props"
    >
      <el-table
        :header-cell-style="{background:'#ecf5ff',color:'#606266'}"
        :data="props.listData"
        :default-sort = "{prop: 'passTranslate', order: 'ascending'}"
        @sort-change="change"
      >

        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :formatter="column.formatter"
        />

        <el-table-column
          :sort-orders="sortOrders"
          prop="passTranslate"
          label="通过翻译/总提交翻译"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.bookIndex }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          :sort-orders="sortOrders"
          prop="passProofread"
          label="通过校对/总提交校对"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.bookIndex }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          :sort-orders="sortOrders"
          label="金币"
          prop="gold"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.wait }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          :sort-orders="sortOrders"
          label="用户等级"
          prop="userLevel"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.review }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          :sort-orders="sortOrders"
          label="翻译等级"
          prop="transLevel"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.review }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          :sort-orders="sortOrders"
          label="当前状态"
          prop="status"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.review }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          :sort-orders="sortOrders"
          label="被举报"
          prop="report"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.review }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          :sort-orders="sortOrders"
          label="更新时间"
          prop="updateTime"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.review }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          width="250px"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="update(scope.row)"
            >编辑</el-button>

            <el-button
              size="small"
              type="primary"
              @click="look(scope.row.id)"
            >查看稿件</el-button>

            <el-button
              size="small"
              type="primary"
              @click="banned(scope.row.id)"
            >封禁</el-button>

          </template>
        </el-table-column>
      </el-table>

      <AppFormDialog
        :visible.sync="visible"
        :rules="formRules"
        :model="formData"
        :id="translatorId"
        object="编辑"
        url=""
        width="600px"
        label-width="6em"
        class="translator-list__dialog"
        @on-submit="submitTranslator"
      >

        <el-form-item
          prop="nickName"
          label="昵称"
        >
          <el-input
            :disabled="true"
            v-model="formData.nickName"
            placeholder=""
            style="width: 400px;"
          />
        </el-form-item>

        <el-form-item
          prop="transLevel"
          label="翻译等级"
        >
          <el-select
            v-model="formData.transLevel"
            placeholder="请选择等级"
            style="width: 400px;"
          >
            <el-option
              v-for="level in levelList"
              :key="level.value"
              :label="level.name"
              :value="level.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          prop="notes"
          label="备注"
        >
          <el-input
            v-model="formData.notes"
            autosize
            type="textarea"
            placeholder="请填写备注"
            class="translator-list-dialog__notes"
          />
        </el-form-item>

      </AppFormDialog>


      <el-dialog
        :visible.sync="bannedVisible"
        title="封禁"
        width="500px"
        class="banned-list__dialog">
        <div
          class="banned-list-dialog__content">
          确定封禁吗？
        </div>
        <span
          slot="footer"
          class="dialog-footer">
          <el-button
            @click="cancelBanned()">
            取消</el-button>

          <el-button
            type="primary"
            @click="sureBanned()">
            确定
          </el-button>
        </span>
      </el-dialog>

    </template>

  </AppList>
</template>

<style lang="postcss">
.translator-list-dialog__notes textarea{
  width: 400px;
  min-height: 150px !important;
  resize: none;
}

.banned-list__dialog .el-dialog__footer{
  text-align: center;
}

.banned-list__dialog .el-dialog__footer .el-button{
  width: 150px;
}

.banned-list__dialog .el-dialog__body{
  font-size: 20px;
  text-align: center;
}
</style>
