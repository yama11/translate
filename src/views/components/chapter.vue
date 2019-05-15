<script>
/**
 * @overview 章节管理
 */
import list from '@/mixins/list';
import PreviewDialog from './preview';
import BatchExportDialog from './batchExport';
import DraftDialog from './draft';

export default {
  name: 'NounList',

  components: {
    PreviewDialog,
    BatchExportDialog,
    DraftDialog,
  },

  mixins: [list],

  data() {
    return {
      totalList: [
        {
          translating: 10,
          proofing: 10,
          translate: 20,
          completed: 30,
        },
      ],

      totalCol: [
        { prop: 'translating', label: '翻译中' },
        { prop: 'proofing', label: '校对中' },
        { prop: 'translate', label: '未翻译' },
        { prop: 'completed', label: '已完成' },
      ],

      list: {
        data: [
          { index: '1', status: 1 },
          { index: '2', status: 2 },
          { index: '3', status: '' },
        ],
      },

      columns: [
        { prop: 'index', label: '序号' },
        { prop: 'chapterName', label: '名称' },
        { prop: 'translating', label: '正在翻译' },
        { prop: 'translated', label: '收到翻译' },
        { prop: 'proofing', label: '正在校对' },
        { prop: 'proofed', label: '收到校对' },
      ],

      visible: false,

      formData: {},

      formRules: {},

      batchVisible: false,

      batchList: [],

      batchIndex: [],

      previewVisible: false,

      previewList: [],

      title: '',

      updateVisible: false,

      updateForm: {
        chapterIndex: null,
        chapterName: '',
      },

      updateRules: {
        chapterName: [
          this.$rules.required('章节名'),
        ],
        chapterIndex: [
          { required: true, message: '序号不能为空', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error('序号不能为空'));
            }

            const check = /^[1-9]\d*$/;
            const isNum = check.test(value);

            if (!isNum) {
              callback(new Error('请输入正整数'));

              return;
            }

            callback();
          } },
        ],
      },

      exportVisible: false,

      draftVisible: false,

      draftTitle: '',

      draftList: [],
    };
  },

  created() {

  },

  methods: {
    uploadText() {
      this.visible = true;
    },

    uploadFile() {
      this.$refs.textInput.click();
    },

    changeText() {

    },

    submitText() {

    },

    exportChapter() {
      this.batchVisible = true;
      this.batchList = [
        { id: 1, chapterType: 7, chapterIndex: 1 },
        { id: 2, chapterType: 7, chapterIndex: 2 },
        { id: 3, chapterType: 7, chapterIndex: 3 },
        { id: 4, chapterType: 5, chapterIndex: 4 },
        { id: 5, chapterType: 7, chapterIndex: 5 },
      ];
      this.batchIndex = this.batchList.map(item => item.chapterIndex);
    },

    getChapterList({ chapterId }) {
      console.log(chapterId);
      this.cancelExport();
    },

    cancelExport() {
      this.batchVisible = false;
      this.batchList = [];
      this.batchIndex = [];
      this.$nextTick(() => {
        this.$refs.batchExport.cancelBatch();
      });
    },

    lookDraft() {
      this.draftVisible = true;
      this.draftTitle = '《霸道总裁》 Ch.1 ------ 陈二狗';
      this.draftList = [
        {
          name: '原图',
          isImg: true,
          datalist: [
            'http://t.img.mangaina.com/translation/check_chapter/02def85ee7d31983402576c4e6548770.jpg',
            'http://t.img.mangaina.com/translation/check_chapter/02def85ee7d31983402576c4e6548770.jpg',
          ],
        },
        {
          name: '原文',
          isContent: true,
          datalist: [
            'Mrs. Zhang is engaged in business',
            'Mrs. Zhang is engaged in business',
          ],
        },
        {
          name: '大毛',
          isUser: true,
          datalist: [
            'Mrs. Zhang is engaged in business',
            'Mrs. Zhang is engaged in business',
          ],
        },
        {
          name: '希望',
          isUser: true,
          datalist: [
            'Mrs. Zhang is engaged in business',
            'Mrs. Zhang is engaged in business',
          ],
        },
        {
          name: '校对意见',
          isPro: true,
          datalist: [
            { userName: 'heheh', text: 'Mrs. Zhang is engaged in business' },
            { userName: 'didi', text: '' },
          ],
        },
        {
          name: '编辑意见',
          isOpinion: true,
          datalist: [
            { text: 'Mrs. Zhang is engaged in business' },
            { text: '' },
          ],
        },
      ];
    },

    cancelDraft() {
      this.draftVisible = false;
      this.draftTitle = '';
      this.draftList = [];
    },

    preview() {
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
      this.updateVisible = true;
    },

    submitUpdate() {

    },

    exportItem() {
      this.exportVisible = true;
    },

    sureExportItem() {
      this.cancelExportItem();
    },

    cancelExportItem() {
      this.exportVisible = false;
    },

    del() {

    },
  },

};
</script>

<template>
  <div class="chapter-list">
    <h2>章节管理</h2>

    <el-table
      :header-cell-style="{background:'#f2f2f2',color:'#606266'}"
      :data="totalList"
      border
      class="chapter-list__header"
    >
      <el-table-column
        v-for="column in totalCol"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :formatter="column.formatter"
      />
    </el-table>

    <AppList
      ref="list"
      :list.sync="list"
      api=""
      create-label="上传文字"
      skip-label="批量导出"
      title=""
      class="chapter-list__table"
      @create="uploadText"
      @skipPage="exportChapter"
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
            label="当前状态"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.status === 1">
                已完成
              </span>
              <span
                v-else-if="scope.row.status === 2">
                翻译中
              </span>
              <span
                v-else-if="scope.row.status === 3">
                校对中
              </span>
              <span
                v-else-if="scope.row.status === 4">
                未开放
              </span>
              <span v-else>
                -
              </span>
            </template>
          </el-table-column>

          <el-table-column
            prop="status"
            label="译制平台"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.status === 1"
                style="color:#00a1f9">
                上架
              </span>
              <span
                v-else-if="scope.row.status === 2">
                下架
              </span>
              <span v-else>
                -
              </span>
            </template>
          </el-table-column>

          <el-table-column
            prop=""
            label="操作"
            width="400px"
          >
            <template slot-scope="scope">

              <el-button
                size="small"
                type="primary"
                @click="lookDraft(scope.row.id)"
              >查看稿件</el-button>

              <el-button
                size="small"
                type="primary"
                @click="preview(scope.row.id)"
              >预览</el-button>

              <el-button
                size="small"
                type="primary"
                @click="update(scope.row.id)"
              >编辑</el-button>

              <el-button
                size="small"
                type="primary"
                @click="exportItem(scope.row.id)"
              >导出</el-button>

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
          object="上传文字"
          url=""
          width="600px"
          label-width="7em"
          @on-submit="submitText"
        >

          <el-form-item
            prop="textFile"
            label="选择文字文件"
          >
            <el-button
              type="primary"
              size="small"
              @click="uploadFile">
              选择文件
            </el-button>
            <input
              ref="textInput"
              type="file"
              style="display:none;"
              @change="changeText">
          </el-form-item>

        </AppFormDialog>

        <BatchExportDialog
          ref="batchExport"
          :batch-visible="batchVisible"
          :batch-list="batchList"
          :batch-index="batchIndex"
          @exportList="getChapterList"
          @cancelExport="cancelExport"
        />

        <PreviewDialog
          :preview-visible="previewVisible"
          :title="title"
          :preview-list="previewList"
          @closePreview="cancelPreview"/>

        <DraftDialog
          :draft-visible="draftVisible"
          :draft-list="draftList"
          :draft-title="draftTitle"
          @initDraft="cancelDraft"/>

        <AppFormDialog
          :visible.sync="updateVisible"
          :rules="updateRules"
          :model="updateForm"
          object="编辑章节"
          url=""
          width="500px"
          label-width="5em"
          class="update-chapters__dialog"
          @on-submit="submitUpdate"
        >

          <el-form-item
            prop="chapterIndex"
            label="序号"
          >
            <el-input
              v-model="updateForm.chapterIndex"
              placeholder="请输入序号"
            />
          </el-form-item>

          <el-form-item
            prop="chapterName"
            label="章节名"
          >
            <el-input
              v-model="updateForm.chapterName"
              placeholder="请输入章节名"
            />
          </el-form-item>

        </AppFormDialog >

        <el-dialog
          :visible.sync="exportVisible"
          class="chapters-export__item"
          title="导出章节"
          width="500px">
          <span>是否导出这个章节</span>
          <span
            slot="footer"
            class="dialog-footer">
            <el-button
              @click="cancelExportItem">
              取消</el-button>

            <el-button
              type="primary"
              @click="sureExportItem">
              确定
            </el-button>
          </span>
        </el-dialog>

      </template>

    </AppList>
  </div>
</template>

<style lang="postcss">
.chapter-list > h2{
    font-size: 1rem;
}

.chapter-list__header{
    width: 400px;
}

.chapter-list__header th,
.chapter-list__header td{
    text-align: center;
}

.chapter-list__table{
    padding: 0 !important;
}

.chapters-export__item .el-dialog__body{
    font-size: 20px;
    text-align: center;
}
</style>
