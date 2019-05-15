<script>
/**
 * @overview 中-其他
 */
import list from '@/mixins/list';

export default {
  name: 'ChinaList',

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
        { prop: 'index', label: '序号' },
        { prop: 'bookName', label: '中文书名' },
        { prop: 'mangaName', label: '英文书名' },
        { prop: 'language', label: '语言' },
        { prop: 'translate', label: '翻译中' },
        { prop: 'proofread', label: '校对中' },
        { prop: 'isTranslate', label: '待翻译' },
        { prop: 'complete', label: '已完成' },
        { prop: 'people', label: '人数' },
      ],

      visible: false,

      formData: {
        bookIndex: null,
        book: null,
        targetLanguage: [],
        transPrice: '300',
        proPrice: '10',
        chapterNum: '6',
        level: null,
      },

      formRules: {
        bookIndex: [
          { ...this.$rules.numbers },
        ],
        book: [
          this.$rules.required('书籍', 'number'),
        ],
        targetLanguage: [
          this.$rules.required('语言', 'array'),
        ],
        transPrice: [
          this.$rules.required('翻译价格'),
          { ...this.$rules.numbers },
        ],
        proPrice: [
          this.$rules.required('校对价格'),
          { ...this.$rules.numbers },
        ],
        chapterNum: [
          this.$rules.required('章节数'),
          { ...this.$rules.numbers },
        ],
        level: [
          this.$rules.required('难度', 'number'),
        ],
        imageFile: [
          this.$rules.required('书籍封面图'),
        ],
      },

      bookId: null,

      imageLanguage: [
        { id: 1, name: '中文' },
        { id: 2, name: '德语' },
      ],

      bookList: [],

      selectLanguage: [],

      levelList: [],
    };
  },

  created() {

  },

  methods: {
    createBook() {
      this.visible = true;

      this.formData = {
        bookIndex: null,
        book: null,
        targetLanguage: [],
        transPrice: '300',
        proPrice: '10',
        chapterNum: '6',
        level: null,
      };

      this.selectLanguage = [];
    },

    uploadImage() {
      this.$refs.imgInput.click();
    },

    changeImg() {

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

    submitBook() {

    },

    lookNoun() {
      this.$router.push('/china-noun');
    },

    transGroup() {

    },

    chapter() {
      this.$router.push('/china-chapter');
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
    create-label="新增书籍"
    title="中-其他"
    class="china-list"
    @create="createBook"
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
              @click="lookNoun(scope.row.id)"
            >名词表</el-button>

            <el-button
              size="small"
              type="primary"
              @click="transGroup(scope.row.id)"
            >翻译组</el-button>

            <el-button
              size="small"
              type="primary"
              @click="update(scope.row.id)"
            >编辑</el-button>

            <el-button
              size="small"
              type="primary"
              style="margin-top:5px;"
              @click="chapter(scope.row.id)"
            >章节管理</el-button>

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
        :hide-required-asterisk="true"
        :id="bookId"
        :object="bookId ? '编辑书籍' : '新增书籍'"
        url=""
        width="600px"
        label-width="8em"
        class="china-list__dialog"
        @on-submit="submitBook"
      >

        <el-form-item
          prop="bookIndex"
          label="排序(选填)"
        >
          <el-input
            v-model="formData.bookIndex"
            placeholder="填写优先级，如无可不填，1为优先级最高"
            style="width: 350px;"
          />
        </el-form-item>

        <el-form-item
          prop="book"
          label="关联书籍"
        >
          <el-select
            v-model="formData.book"
            filterable
            placeholder="请选择书籍"
            style="width: 350px;"
          >
            <el-option
              v-for="level in bookList"
              :key="level.id"
              :label="level.name"
              :value="level.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          prop="targetLanguage"
          label="语言"
          style="margin-bottom: 0px;"
        >
          <el-select
            v-model="formData.targetLanguage"
            multiple
            filterable
            placeholder="请选择语言"
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
          <div class="china-list__select">
            <div
              v-for="(item,index) in selectLanguage"
              :key="index"
              class="china-list__sec">
              {{ item.name }}
              <span @click="delLang(item.id)">X</span>
            </div>
          </div>
        </el-form-item>

        <el-form-item
          prop="transPrice"
          label="翻译价格"
        >
          <el-input
            v-model="formData.transPrice"
            placeholder="请输入翻译价格"
            style="width: 350px;"
          />
        </el-form-item>

        <el-form-item
          prop="proPrice"
          label="校对价格"
        >
          <el-input
            v-model="formData.proPrice"
            placeholder="请输入校对价格"
            style="width: 350px;"
          />
        </el-form-item>

        <el-form-item
          prop="chapterNum"
          label="自动开放章节数"
        >
          <el-input
            v-model="formData.chapterNum"
            placeholder="请输入章节数"
            style="width: 350px;"
          />
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

        <el-form-item
          prop="imageFile"
          label="书籍封面图"
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
          prop=""
          label="预览"
        >
          <img
            src=""
            alt="">
        </el-form-item>

      </AppFormDialog>

    </template>

  </AppList>
</template>

<style lang="postcss">
.china-list__select{
  display: inline-block;
  width: 350px;
  vertical-align: top;
}

.china-list__sec{
  display: inline-block;
  border: 1px solid gainsboro;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-right: 10px;
  padding: 0 5px 0 10px;
}

.china-list__sec > span{
  cursor: pointer;
  color: red;
  display: inline-block;
  margin-left: 5px;
  user-select: none;
}
</style>
