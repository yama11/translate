<script>
/**
 * @overview 名词表
 */
import list from '@/mixins/list';

export default {
  name: 'NounList',

  mixins: [list],

  data() {
    return {
      list: {
        data: [
          { index: '1', status: 1 },
          { index: '2', status: 2 },
          { index: '3', status: '' },
        ],
      },

      visible: false,

      updateList: [],

      nounId: null,

      title: '',
    };
  },

  created() {

  },

  methods: {
    createNoun() {
      this.visible = true;
      this.updateList = [];
      this.nounId = null;
      this.title = '批量新增';
    },

    sureSubmit() {
      this.cancelSubmit();
    },

    addItem() {
      this.updateList = [
        ...this.updateList,
        { target: '', translate: '' },
      ];
    },

    cancelSubmit() {
      this.visible = false;
      this.updateList = [];
      this.nounId = null;
    },

    update() {
      this.visible = true;
      this.title = '编辑';
      this.nounId = 5;
      this.updateList = [
        ...this.updateList,
        { target: '呵呵', translate: 'hehe' },
      ];
    },

    check() {

    },

    del() {

    },
  },

};
</script>

<template>
  <AppList
    ref="list"
    :list.sync="list"
    api=""
    create-label="批量新增"
    title="名词表"
    class="noun-list"
    @create="createNoun"
  >

    <template
      slot-scope="props"
    >
      <el-table
        :header-cell-style="{background:'#ecf5ff',color:'#606266'}"
        :data="props.listData"
      >

        <!-- <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :formatter="column.formatter"
        /> -->
        <el-table-column
          prop="index"
          label="序号"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.index }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="targetLanguage"
          label="中文"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.targetLanguage }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="transLanguage"
          label="葡萄牙语"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.transLanguage }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="status"
          label="状态"
        >
          <template slot-scope="scope">
            <span
              v-if="scope.row.status === 1"
              style="color:#00a1f9">
              上架
            </span>
            <span
              v-else-if="scope.row.status === 2"
              style="color:#00a1f9">
              下架
            </span>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="submitName"
          label="提交者"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.submitName }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="submitTime"
          label="提交时间"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.submitTime }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="record"
          label="处理记录"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.status">
              已审核
            </span>
            <span
              v-else
              style="color:red;">未审核</span>
          </template>
        </el-table-column>

        <el-table-column
          prop=""
          label="操作"
          width="250px"
        >
          <template slot-scope="scope">
            <el-popover
              v-if="!scope.row.status"
              placement="bottom"
              width="165"
              trigger="click"
              class="noun-list__popover">
              <el-button
                size="small"
                type="primary"
                @click="update(scope.row.id)"
              >通过</el-button>
              <el-button
                size="small"
                @click="update(scope.row.id)"
              >不通过</el-button>
              <el-button slot="reference">审核</el-button>
            </el-popover>

            <el-button
              v-if="scope.row.status"
              size="small"
              type="primary"
              @click="update(scope.row.id)"
            >编辑</el-button>

            <el-button
              v-if="scope.row.status === 1"
              size="small"
              type="primary"
              @click="update(scope.row.id)"
            >下架</el-button>

            <el-button
              v-if="scope.row.status === 2"
              size="small"
              type="primary"
              @click="update(scope.row.id)"
            >上架</el-button>

            <el-button
              size="small"
              type="danger"
              @click="del(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-dialog
        :visible.sync="visible"
        :before-close="cancelSubmit"
        :title="title"
        width="560px"
        class="noun-list__dialog">
        <div
          class="noun-list-dialog__content">

          <el-button
            v-if="!nounId"
            size="small"
            type="primary"
            class="noun-list-dialog__addBtn"
            @click="addItem">
            添加
          </el-button>

          <el-table
            :header-cell-style="{background:'#ecf5ff',color:'#606266'}"
            :data="updateList"
            border
            class="noun-list__table"
          >

            <el-table-column
              prop="target"
              label="中文"
              width="250">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.target"
                  placeholder=" "
                />
              </template>
            </el-table-column>

            <el-table-column
              prop="translate"
              label="葡萄牙语"
              width="250">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.translate"
                  placeholder=" "
                />
              </template>
            </el-table-column>

          </el-table>

        </div>
        <span
          slot="footer"
          class="dialog-footer">
          <el-button
            type="primary"
            @click="sureSubmit()">
            确认
          </el-button>

          <el-button
            @click="cancelSubmit()">
            取消</el-button>
        </span>
      </el-dialog>

    </template>

  </AppList>
</template>

<style lang="postcss">
.noun-list__popover > button{
    padding: 9px 15px;
    background: #409EFF;
    border-color: #409EFF;
    color: white;
    font-size: 12px;
}

.noun-list__popover > button:hover{
    background: #66b1ff;
    border-color: #66b1ff;
    color: #FFF;
}

.noun-list__popover > button:focus{
    background: #66b1ff;
    border-color: #66b1ff;
    color: #FFF;
}

.noun-list__dialog .el-table th,
.noun-list__dialog .el-table td{
    text-align: center;
}

.noun-list__table{
  width: 501px;
}

.noun-list__dialog .el-dialog__body{
  max-height: 500px;
  overflow: auto;
}

.noun-list-dialog__addBtn{
    float: right;
    margin-bottom: 20px;
}

.noun-list__dialog .el-dialog__footer{
  text-align: center;
}

.noun-list__dialog .el-dialog__footer .el-button{
  width: 100px;
}
</style>
