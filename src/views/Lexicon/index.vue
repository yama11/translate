<script>
/**
 * @overview 词库管理
 */
import list from '@/mixins/list';

export default {
  name: 'LexiconList',

  mixins: [list],

  data() {
    return {
      list: {
        data: [
          { words: 'mingan', status: '上架', nums: 20 },
        ],
      },

      visible: false,

      formData: {
        language: null,
        wordList: '',
      },

      formRules: {},

      lexiconId: null,

      languageList: [],
    };
  },

  created() {

  },

  methods: {
    createWords() {
      this.visible = true;
      this.lexiconId = null;
      this.formData = {
        language: null,
        wordList: '',
      };
    },

    update() {
      this.visible = true;
      this.lexiconId = 1;
    },

    sureSubmit() {
      this.cancelSubmit();
    },

    cancelSubmit() {
      this.lexiconId = null;
      this.visible = false;
      this.formData = {
        language: null,
        wordList: '',
      };
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
    title="词库管理"
    create-label="添加"
    class="lexicon-list"
    @create="createWords"
  >
    <template
      slot-scope="props"
    >
      <el-table
        :header-cell-style="{background:'#ecf5ff',color:'#606266'}"
        :data="props.listData"
      >

        <el-table-column
          prop="words"
          label="关键词"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.words }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="language"
          label="语言"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.language }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="nums"
          label="提交次数"
        >
          <template slot-scope="scope">
            <span style="color:#0099ff">
              {{ scope.row.nums }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="status"
          label="状态"
        >
          <template slot-scope="scope">
            <span style="color:#0099ff">
              {{ scope.row.status }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="updateTime"
          label="更新时间"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.updateTime }}
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
              type="danger"
              @click="del(scope.row.id)"
            >删除</el-button>

          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        :visible.sync="visible"
        :title="lexiconId ? '编辑' : '添加'"
        width="600px"
        class="lexicon-list__dialog">
        <div
          class="lexicon-list-dialog__content">

          <el-form
            ref="lexiconForm"
            :model="formData"
            :rules="formRules"
            label-width="6em"
            class="report-list__form">

            <el-form-item
              prop="language"
              label="选择语言"
            >
              <el-select
                v-model="formData.language"
                placeholder="请选择语言"
                style="width: 400px;"
              >
                <el-option
                  v-for="item in languageList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item
              prop="wordList"
              label=" "
              style="margin-left: 1rem"
              class="lexicon-list-dialog__label"
            >
              <el-input
                v-model="formData.wordList"
                autosize
                type="textarea"
                placeholder="请输入内容 用 ; 号分隔"
                class="lexicon-list-dialog__notes"
              />
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
            @click="sureSubmit()">
            确定
          </el-button>
        </span>
      </el-dialog>


    </template>

  </AppList>
</template>

<style lang="postcss">
.lexicon-list-dialog__notes textarea{
  width: 470px;
  min-height: 150px !important;
  resize: none;
}

.lexicon-list__dialog .el-dialog__footer{
  text-align: center;
}

.lexicon-list__dialog .el-dialog__footer .el-button{
  width: 150px;
}

.lexicon-list-dialog__label .el-form-item__content{
  margin-left: 0rem !important;
}
</style>
