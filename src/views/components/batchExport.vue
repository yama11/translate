<script>
/**
 * @overview 批量导出
 */

export default {
  name: 'BatchExport',

  props: {
    batchVisible: {
      type: Boolean,
      default: false,
    },

    batchList: {
      type: Array,
      default: () => [],
    },

    batchIndex: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      batchForm: {
        start: null,
        end: null,
      },

      batchRules: {
        start: [
          this.$rules.required('章节'),
          { ...this.$rules.numbers },
        ],
        end: [
          this.$rules.required('章节'),
          { ...this.$rules.numbers },
          { validator: (rule, value, callback) => {
            const check = /^[1-9]\d*$/;
            const isNum = check.test(value);

            if (!isNum) return;

            if (Number(value) < Number(this.batchForm.start)) {
              callback(new Error('请输入大于或等于开始章节'));
            } else {
              callback();
            }
          } },
        ],
      },

      chapterList: [],

      isExport: false,
    };
  },

  computed: {

  },

  methods: {
    sureExportBatch(batchForm) {
      this.chapterList = [];

      this.$refs[batchForm].validate((valid) => {
        if (!valid) return;

        const start = Number(this.batchForm.start);
        const end = Number(this.batchForm.end);

        const isStart = this.batchIndex.includes(start);
        const isEnd = this.batchIndex.includes(end);

        if (!isStart || !isEnd) {
          this.$message.error('请输入现有的章节');

          return;
        }

        this.checkExport(start, end);

        if (!this.isExport) return;

        this.$emit('exportList', { chapterId: this.chapterList });
      });
    },

    checkExport(start, end) {
      const isExit = this.batchList.find(item => start === item.chapterIndex);
      this.isExport = false;
      if (!isExit) {
        this.$message.error('只能导出连续的章节');

        return;
      }

      const isType = Number(isExit.chapterType) === 7;

      if (!isType) {
        this.$message.error('有章节不可导出，请重新选择章节');

        return;
      }

      this.chapterList.push(isExit.id);

      if (start >= end) {
        this.isExport = true;

        return;
      }

      this.checkExport(start + 1, end);
    },

    cancelExportBatch() {
      this.$emit('cancelExport');
    },

    cancelBatch() {
      this.batchForm = { start: null, end: null };
      this.chapterList = [];
      this.isExport = false;
      this.$refs.batchForm.resetFields();
    },
  },

};
</script>

<template>
  <el-dialog
    :visible.sync="batchVisible"
    :before-close="cancelExportBatch"
    class="batch-export"
    title="批量导出"
    width="700px">
    <div class="batch-export__block">
      <el-form
        ref="batchForm"
        :model="batchForm"
        :rules="batchRules">
        <el-form-item
          label="选择章节"
          prop="start"
          label-width="80px">
          <el-input v-model="batchForm.start"/>
        </el-form-item>
        <el-form-item
          label="至"
          prop="end"
          label-width="40px"
          class="batch-export__input">
          <el-input v-model="batchForm.end"/>
        </el-form-item>
        章
        <div class="batch-export__tip">
          <span>
            *只能导出连续的章节
            <br>
            *灰色为不可导出章节
          </span>
        </div>

        <div class="batch-export__item">
          <div
            v-for="(item,index) in batchList"
            :key="index"
            :class="Number(item.chapterType) === 7 ? 'colorBlue' : 'colorGray'">
            {{ item.chapterIndex }}
          </div>
        </div>
      </el-form>
    </div>
    <span
      slot="footer"
      class="dialog-footer">
      <el-button
        @click="cancelExportBatch('batchForm')">
        取消</el-button>

      <el-button
        type="primary"
        @click="sureExportBatch('batchForm')">
        确定
      </el-button>
    </span>
  </el-dialog>

</template>

<style lang="postcss">
.batch-export__block{
  position: relative;
}

.batch-export__block .el-form-item.is-required .el-form-item__label:before{
  content: '';
}

.batch-export__block .el-form-item{
  display: inline-block;
}

.batch-export__block .el-input{
  width: 100px;
}

.batch-export__input .el-form-item__label{
  width: 35px !important;
}

.batch-export__tip{
  position: absolute;
  top: 5px;
  right: 145px;
  color: red;
}

.batch-export__item{
  margin-top: 10px;
  height: 200px;
  max-height: 500px;
  overflow: auto;
}

.batch-export__item > div{
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  color: white;
  text-align: center;
  line-height: 30px;
  margin: 0 5px 5px 0;
}

.colorBlue{
  background: #169bd5;
}

.colorGray{
  background: #cccccc;
}

.batch-export .el-dialog__footer{
  text-align: center;
}

.batch-export .el-dialog__footer .el-button{
  width: 150px;
}
</style>
