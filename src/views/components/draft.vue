<script>
/**
 * @overview 查看稿件
 */

export default {
  name: 'DraftList',

  props: {
    draftVisible: {
      type: Boolean,
      default: false,
    },

    draftList: {
      type: Array,
      default: () => [],
    },

    draftTitle: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      statusList: [],
      status: null,
    };
  },

  computed: {
    width() {
      const leng = this.draftList.length;

      return `${(leng * 180) + 20}px`;
    },
  },

  methods: {
    sureDraft() {

    },

    cancelDraf() {
      this.$emit('initDraft');
    },
  },

};
</script>

<template>
  <el-dialog
    :visible.sync="draftVisible"
    :before-close="cancelDraf"
    :title="draftTitle"
    :width="width"
    class="draft-list">
    <div class="draft-list__size">
      <div
        v-for="(item,index) in draftList"
        :key="index"
        class="draft-list__block">
        <span>{{ item.name }}</span>
        <div
          v-for="(content,conIndex) in item.datalist"
          :key="conIndex"
          class="draft-list-block__item">

          <img
            v-if="item.isImg"
            :src="content">

          <span v-if="item.isContent">{{ conIndex + 1 }}.</span>

          <span
            v-if="item.isUser || item.isContent">
            {{ content }}
          </span>

          <div
            v-if="item.isPro"
            style="display:inline-block;width:100%;">
            <span>{{ content.userName }}: </span>
            <span class="draft-list__user">
              <span>采纳</span>
              <span>删除</span>
            </span>
            <br>
            <span
              v-if="content.text"
              class="draft-list__text">
              {{ content.text }}
            </span>
          </div>

          <el-input
            v-if="item.isOpinion"
            v-model="content.text"
            :autosize="{ minRows: 8, maxRows: 8}"
            type="textarea"
            placeholder="请输入内容"/>
        </div>
      </div>
    </div>
    <span
      slot="footer"
      class="dialog-footer">
      <el-select
        v-model="status"
        placeholder="请设置状态"
        style="width: 150px;">
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>

      <el-button
        @click="cancelDraf">
        取消</el-button>

      <el-button
        type="primary"
        @click="sureDraft">
        保存
      </el-button>
    </span>
  </el-dialog>

</template>

<style lang="postcss">
.draft-list .el-dialog__body{
    max-height: 600px;
    overflow: auto;
}

.draft-list__block{
    display: inline-block;
    width: 150px;
    margin-right: 20px;
    vertical-align: top;
}

.draft-list__block > span{
    width: 100%;
    display: inline-block;
    font-size: 18px;
    text-align: center;
    margin-bottom: 10px;
}

.draft-list-block__item{
    width: 100%;
    height: 180px;
    display: inline-block;
    margin-bottom: 30px;
    word-break: break-all;
}

.draft-list-block__item > img{
    width: 150px;
    height: 100%;
}

.draft-list-block__item textarea{
    resize: none;
}

.draft-list__user{
    float: right;
}

.draft-list__user > span{
    display: inline-block;
    cursor: pointer;
    border: 1px solid gainsboro;
    padding: 2px 5px;
}

.draft-list__text{
    display: inline-block;
    margin-top: 5px;
    border: 1px solid gainsboro;
    padding: 2px;
}
</style>
