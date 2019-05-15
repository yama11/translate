<script>
/**
 * @overview 试题管理
 */
import list from '@/mixins/list';
import PreviewDialog from '../components/preview';

export default {
  name: 'TestList',

  components: {
    PreviewDialog,
  },

  mixins: [list],

  data() {
    return {
      list: {
        data: [
          { testName: 'test120', status: 0 },
          { testName: 'jasping', status: 1 },
        ],
      },

      columns: [
        { prop: 'testName', label: '考题名' },
        { prop: 'userName', label: '试题语言' },
        { prop: 'language', label: '目标语言' },
      ],

      visible: false,

      formData: {
        testName: '',
        imageFile: '',
        textFile: '',
        picLanguage: null,
        targetLanguage: [],
        level: null,
      },

      formRules: {},

      testId: null,

      imageLanguage: [
        { id: 1, name: '中文' },
        { id: 2, name: '德语' },
      ],

      levelList: [],

      selectLanguage: [],

      previewVisible: false,

      previewList: [],

      title: '',
    };
  },

  created() {

  },

  methods: {
    createTest() {
      this.visible = true;
    },

    uploadImage() {
      this.$refs.imgInput.click();
    },

    changeImg() {

    },

    uploadText() {
      this.$refs.textInput.click();
    },

    changeText() {

    },

    getLanguage(arr) {
      this.selectLanguage = arr.reduce((acc, item) => {
        const isLang = this.imageLanguage
          .find(imgItem => imgItem.id === item);

        if (isLang) {
          acc.push(isLang);
        }

        return acc;
      }, []);
    },

    delLang(id) {
      const target = this.formData.targetLanguage.filter(item => item !== id);
      const selects = this.selectLanguage.filter(item => item.id !== id);

      this.formData.targetLanguage = target;
      this.selectLanguage = selects;
    },

    submitTest() {

    },

    look() {
      this.previewVisible = true;
      this.title = '书籍：小和尚，章节Ch.5';
      this.previewList = [
        {
          detail: [
            { words: 'm 給我来个小和尚', top: '195', left: '149', width: 192, height: 45 },
            { words: '小狐狸..', top: '195', left: '149', width: 192, height: 45 },
          ],
          picName: '02def85ee7d31983402576c4e6548770.jpg',
          url: 'http://t.img.mangaina.com/translation/check_chapter/02def85ee7d31983402576c4e6548770.jpg',
        },
      ];
    },

    cancelPreview() {
      this.previewVisible = false;
      this.title = '';
      this.previewList = [];
    },

    update() {

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
    create-label="新增考题"
    title="试题管理"
    class="test-list"
    @create="createTest"
  >

    <template
      slot-scope="props"
    >
      <el-table
        :header-cell-style="{background:'#ecf5ff',color:'#606266'}"
        :data="props.listData"
      >

        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :formatter="column.formatter"
        />

        <el-table-column
          prop="status"
          label="状态"
        >
          <template slot-scope="scope">
            <span
              v-if="scope.row.status === 1"
              style="color:#00ca71;">
              上架
            </span>
            <span v-else>下架</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="level"
          label="难度"
        >
          <template slot-scope="scope">
            {{ scope.row.level }}
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
              @click="look(scope.row.id)"
            >预览</el-button>

            <el-button
              size="small"
              type="primary"
              @click="update(scope.row.id)"
            >编辑</el-button>

            <el-button
              size="small"
              type="danger"
              @click="del(scope.row.id)"
            >删除</el-button>

          </template>
        </el-table-column>

      </el-table>

      <AppFormDialog
        :visible.sync="visible"
        :rules="formRules"
        :model="formData"
        :id="testId"
        :object="testId ? '编辑考题' : '新增考题'"
        url=""
        width="600px"
        label-width="7em"
        class="test-list__dialog"
        @on-submit="submitTest"
      >

        <el-form-item
          prop="testName"
          label="考题名"
        >
          <el-input
            v-model="formData.testName"
            placeholder=""
            style="width: 350px;"
          />
        </el-form-item>

        <el-form-item
          prop="imageFile"
          label="选择图片文件"
        >
          <el-button
            type="primary"
            size="small"
            @click="uploadImage">
            选择文件
          </el-button>
          <input
            ref="imgInput"
            type="file"
            style="display:none;"
            @change="changeImg">
        </el-form-item>

        <el-form-item
          prop="textFile"
          label="选择文字文件"
        >
          <el-button
            type="primary"
            size="small"
            @click="uploadText">
            选择文件
          </el-button>
          <input
            ref="textInput"
            type="file"
            style="display:none;"
            @change="changeText">
        </el-form-item>

        <el-form-item
          prop="picLanguage"
          label="图源语言"
        >
          <el-select
            v-model="formData.picLanguage"
            placeholder="请选择图源语言"
            style="width: 350px;"
          >
            <el-option
              v-for="level in imageLanguage"
              :key="level.id"
              :label="level.name"
              :value="level.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          prop="targetLanguage"
          label="目标语言"
          style="margin-bottom: 0px;"
        >
          <el-select
            v-model="formData.targetLanguage"
            multiple
            filterable
            placeholder="请选择目标语言"
            style="width: 350px;"
            @change="getLanguage"
          >
            <el-option
              v-for="level in imageLanguage"
              :key="level.id"
              :label="level.name"
              :value="level.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          prop=""
          label=""
          style="margin-top:10px;"
        >
          已选：
          <div class="test-list__select">
            <div
              v-for="(item,index) in selectLanguage"
              :key="index"
              class="test-list__sec">
              {{ item.name }}
              <span @click="delLang(item.id)">X</span>
            </div>
          </div>
        </el-form-item>

        <el-form-item
          prop="level"
          label="选择难度"
        >
          <el-select
            v-model="formData.level"
            placeholder="请选择难度"
            style="width: 350px;"
          >
            <el-option
              v-for="level in levelList"
              :key="level.value"
              :label="level.name"
              :value="level.value"
            />
          </el-select>
        </el-form-item>

      </AppFormDialog>

      <PreviewDialog
        :preview-visible="previewVisible"
        :title="title"
        :preview-list="previewList"
        @closePreview="cancelPreview"/>

    </template>

  </AppList>
</template>

<style lang="postcss">
.test-list__select{
  display: inline-block;
  width: 350px;
  vertical-align: top;
}

.test-list__sec{
  display: inline-block;
  border: 1px solid gainsboro;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-right: 10px;
  padding: 0 5px 0 10px;
}

.test-list__sec > span{
  cursor: pointer;
  color: red;
  display: inline-block;
  margin-left: 5px;
  user-select: none;
}
</style>
