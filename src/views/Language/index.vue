<script>
/**
 * @overview 语言管理
 */


export default {
  name: 'LanguageList',

  data() {
    return {
      chinaData: [{ translateName: '斯洛文尼亚语' }],

      englishData: [{ translateName: '斯洛文尼亚语' }, { translateName: '中文(简体)' }],

      visible: false,

      formData: {
        initId: null,
        languageId: null,
      },

      formRules: {
        initId: [
          this.$rules.required('语种', 'number'),
        ],
        languageId: [
          this.$rules.required('语种', 'number'),
        ],
      },

      initList: [
        { id: 1, name: '中文(简体)' },
        { id: 2, name: '英文' },
      ],

      languageList: [],
    };
  },

  created() {

  },

  methods: {
    createLanguage() {
      this.visible = true;
      this.formData = {
        initId: null,
        languageId: null,
      };
    },

    sureSubmit(languageForm) {
      this.$refs[languageForm].validate((valid) => {
        if (!valid) return;

        console.log('提交...');
      });
    },

    cancelSubmit() {
      this.visible = false;
      this.formData = {
        initId: null,
        languageId: null,
      };
      this.$refs.languageForm.resetFields();
    },

    delChina() {

    },

    delEnglish() {

    },
  },

};
</script>

<template>
  <div class="language-list">
    <h2>语言管理</h2>

    <div class="language-list__block">
      <span class="language-list__title">中文-其他语言</span>

      <el-table
        :data="chinaData"
        :header-cell-style="{background:'#ecf5ff',color:'#606266'}"
        border>
        <el-table-column
          prop=""
          label="">
          中文(简体)
        </el-table-column>

        <el-table-column
          prop=""
          label=""
          width="50">
          >>
        </el-table-column>

        <el-table-column
          prop="translateName"
          label=""/>

        <el-table-column
          label=""
          width="80">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="danger"
              @click="delChina(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="language-list__block">
      <span class="language-list__title">英文-其他语言</span>

      <el-table
        :data="englishData"
        :header-cell-style="{background:'#ecf5ff',color:'#606266'}"
        border>
        <el-table-column
          prop=""
          label="">
          英文
        </el-table-column>

        <el-table-column
          prop=""
          label=""
          width="50">
          >>
        </el-table-column>

        <el-table-column
          prop="translateName"
          label=""/>

        <el-table-column
          label=""
          width="80">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="danger"
              @click="delEnglish(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-button
      type="primary"
      size="small"
      @click="createLanguage">
      添加语种
    </el-button>

    <el-dialog
      :visible.sync="visible"
      :before-close="cancelSubmit"
      title="添加语种"
      width="550px"
      class="language-list__dialog">
      <div
        class="language-list-dialog__content">

        <el-form
          ref="languageForm"
          :model="formData"
          :rules="formRules"
          :hide-required-asterisk="true"
          label-width="1em"
          class="report-list__form">

          <el-form-item
            prop="initId"
            label=""
            style="display:inline-block;"
          >
            <el-select
              v-model="formData.initId"
              placeholder="请选择语种"
            >
              <el-option
                v-for="item in initList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <span style="margin-left:15px;">>></span>

          <el-form-item
            prop="languageId"
            label=""
            style="display:inline-block;"
          >
            <el-select
              v-model="formData.languageId"
              placeholder="请选择语种"
            >
              <el-option
                v-for="item in languageList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

        </el-form>

      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          @click="sureSubmit('languageForm')">
          确定
        </el-button>

        <el-button
          @click="cancelSubmit()">
          取消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<style lang="postcss">
.language-list > h2{
  font-size: 1rem;
}

.language-list__block{
  display: inline-block;
  width: 350px;
  vertical-align: text-top;
  margin-right: 30px;
}

.language-list__title{
  display: inline-block;
  font-size: 16px;
  margin: 10px 0 20px 0;
}

.language-list .el-table th,
.language-list .el-table td{
    text-align: center;
}

.language-list__dialog .el-dialog__footer{
  text-align: center;
}

.language-list__dialog .el-dialog__footer .el-button{
  width: 100px;
}

</style>
