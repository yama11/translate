<script>
/**
 * @overview 考核设置
 */


export default {
  name: 'AssessList',

  data() {
    return {
      assessData: [
        {
          level: '中级',
          threshold: 50,
        },
      ],

      visible: false,

      levelName: '',

      assessForm: {
        threshold: null,
      },

      assessRules: {
        threshold: [
          this.$rules.required('门槛'),
          { ...this.$rules.numbers },
        ],
      },
    };
  },

  created() {

  },

  methods: {
    update(data) {
      this.visible = true;
      this.levelName = data.level;
      this.assessForm = {
        threshold: String(data.threshold),
      };
    },

    sureSubmit(assessForm) {
      this.$refs[assessForm].validate((valid) => {
        if (!valid) return;

        console.log('提交...');
      });
    },

    cancelSubmit() {
      this.visible = false;
      this.levelName = '';
      this.assessForm = {
        threshold: null,
      };
      this.$refs.assessForm.resetFields();
    },
  },

};
</script>

<template>
  <div class="assess-list">
    <h2>考核设置</h2>

    <el-table
      :data="assessData"
      border
      style="width: 540px">
      <el-table-column
        prop="level"
        label="等级"
        width="180"/>

      <el-table-column
        prop="threshold"
        label="门槛"
        width="180">
        <template slot-scope="scope">
          ≥
          <span style="color:#0099ff">{{ scope.row.threshold }}</span>
          章节
        </template>
      </el-table-column>

      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="update(scope.row)"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="visible"
      :before-close="cancelSubmit"
      title="门槛修改"
      width="600px"
      class="assess-list__dialog">
      <div
        class="assess-list-dialog__content">

        <el-form
          ref="assessForm"
          :model="assessForm"
          :rules="assessRules"
          :hide-required-asterisk="true"
          label-width="5em"
          class="assess-list__form">

          <span style="font-size: 16px">
            {{ levelName }}考核
          </span>

          <el-form-item
            label="门槛：≥"
            prop="threshold"
            class="assess-list-dialog__threshold"
          >
            <el-input
              v-model="assessForm.threshold"
              placeholder=" "
              class="assess-list-dialog__nums"
            />
            <span style="font-size: 16px">章节</span>
          </el-form-item>

        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          @click="cancelSubmit()">
          取消</el-button>

        <el-button
          type="primary"
          @click="sureSubmit('assessForm')">
          确认
        </el-button>
      </span>
    </el-dialog>

  </div>
</template>

<style lang="postcss">
.assess-list > h2{
  font-size: 1rem;
}

.assess-list .el-table th,
.assess-list .el-table td{
    text-align: center;
}

.assess-list-dialog__threshold .el-form-item__label{
  font-size: 16px;
}

.assess-list-dialog__nums{
  width: 150px;
}

.assess-list-dialog__threshold .el-form-item__error{
  margin-left: 0.5rem;
}

.assess-list__dialog .el-dialog__footer{
  text-align: center;
}

.assess-list__dialog .el-dialog__footer .el-button{
  width: 150px;
}
</style>
