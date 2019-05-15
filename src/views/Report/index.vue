<script>
/**
 * @overview 举报信息
 */
import list from '@/mixins/list';

export default {
  name: 'ReportList',

  mixins: [list],

  data() {
    return {
      list: {
        data: [
          { userName: 'weixiao', reportName: '大壮', isDispose: 0 },
          { userName: 'jasping', reportName: 'keygoon', isDispose: 1 },
        ],
      },

      visible: false,

      reportList: [

      ],

      reportForm: {

      },

      reportRules: {

      },

      resultList: [],
    };
  },

  created() {

  },

  methods: {
    look() {
      this.visible = true;
    },

    sureReport() {
      this.cancelReport();
    },

    cancelReport() {
      this.visible = false;
    },
  },

};
</script>

<template>
  <AppList
    ref="list"
    :list.sync="list"
    api=""
    title="举报信息"
    class="report-list"
  >

    <template
      slot-scope="props"
    >
      <el-table
        :header-cell-style="{background:'#ecf5ff',color:'#606266'}"
        :data="props.listData"
      >

        <el-table-column
          prop="userName"
          label="被举报用户"
        >
          <template slot-scope="scope">
            <span style="color:#0099ff">
              {{ scope.row.userName }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="reportName"
          label="举报人"
        >
          <template slot-scope="scope">
            <span style="color:#0099ff">
              {{ scope.row.reportName }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          label="语言"
          prop="language"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.language }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          label="提交时间"
          prop="commitTime"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.commitTime }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          label="是否处理"
          prop="isDispose"
        >
          <template slot-scope="scope">
            <span
              :style="scope.row.isDispose === 0 ? 'background:red' : ''"
              class="statusCircle"/>
            <span
              v-if="scope.row.isDispose === 0"
              style="color:red;">
              未处理
            </span>
            <span v-else>已处理</span>
          </template>
        </el-table-column>

        <el-table-column
          label="处理结果"
          prop="result"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.result }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          label="处理时间"
          prop="settleTime"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.settleTime }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">

            <el-button
              size="small"
              type="primary"
              @click="look(scope.row.id)"
            >查看</el-button>

          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        :visible.sync="visible"
        title="查看举报"
        width="830px"
        class="report-list__dialog">
        <div
          class="report-list-dialog__content">
          <div class="report-list-dialog__title">
            <span>原文</span>
            <span>二毛</span>
            <span>欧乐</span>
            <span>未来</span>
          </div>

          <div class="report-list-dialog__words">
            <div class="report-list-dialog__index">1</div>
            <span>张太太在搞事情</span>
            <span>Mrs. Zhang is engaged in business</span>
            <span>Mrs. Zhang is engaged in business</span>
            <span>Mrs. Zhang is engaged in business</span>
          </div>

          <el-form
            ref="reportForm"
            :model="reportForm"
            :rules="reportRules"
            label-width="6em"
            class="report-list__form">
            <el-form-item
              prop="result"
              label="处理结果"
            >
              <el-select
                v-model="reportForm.result"
                placeholder="请选择处理结果"
                style="width: 400px;"
              >
                <el-option
                  v-for="level in resultList"
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
                v-model="reportForm.notes"
                autosize
                type="textarea"
                placeholder="请填写备注"
                class="report-list-dialog__notes"
              />
            </el-form-item>

          </el-form>
        </div>
        <span
          slot="footer"
          class="dialog-footer">
          <el-button
            @click="cancelReport()">
            取消</el-button>

          <el-button
            type="primary"
            @click="sureReport()">
            确认
          </el-button>
        </span>
      </el-dialog>

    </template>

  </AppList>
</template>

<style lang="postcss">
.statusCircle{
  display: inline-block;
  width: 8px;
  height: 8px;
  background: grey;
  border-radius: 50%;
}

.report-list-dialog__title{
  margin-left: 30px;
}

.report-list-dialog__title > span,
.report-list-dialog__words > span{
  display: inline-block;
  word-break: break-all;
  width: 170px;
  text-align:  center;
  margin-right: 15px;
  font-size: 16px;
  margin-bottom: 10px;
  vertical-align: middle;
}

.report-list-dialog__index{
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 1px solid gainsboro;
  text-align: center;
  line-height: 30px;
}

.report-list__form{
  margin-top: 30px;
}

.report-list-dialog__notes textarea{
  width: 400px;
  min-height: 150px !important;
  resize: none;
}

.report-list__dialog .el-dialog__header,
.report-list__dialog .el-dialog__footer{
  text-align: center;
}

.report-list__dialog .el-dialog__footer .el-button{
  width: 150px;
}
</style>
