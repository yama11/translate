<script>
/**
 * @overview 预览
 */

export default {
  name: 'PreviewList',

  props: {
    previewVisible: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: '',
    },

    previewList: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {

    };
  },

  computed: {

  },

  methods: {

    surePreview() {
      this.cancelPreview();
    },

    cancelPreview() {
      this.$emit('closePreview');
    },
  },

};
</script>

<template>
  <el-dialog
    :visible.sync="previewVisible"
    :before-close="cancelPreview"
    :title="title"
    class="preview-list"
    width="800px">
    <div class="preview-list__size">
      <div
        v-for="(item,index) in previewList"
        :key="index"
        class="preview-list__block">
        <span>{{ index + 1 }}</span>
        <img
          :src="item.url">
        <div
          class="preview-list__content">
          <div
            v-for="(content,conIndex) in item.detail"
            :key="index + '_' + conIndex"
            class="preview-list__detail">
            <span>{{ conIndex + 1 }}.</span>
            <el-input
              v-model="content.words"
              placeholder="请输入内容"/>
          </div>
        </div>
      </div>
    </div>
    <span
      slot="footer"
      class="dialog-footer">
      <!-- <el-button
        @click="cancelPreview">
        取消</el-button> -->

      <el-button
        type="primary"
        @click="surePreview">
        保存
      </el-button>
    </span>
  </el-dialog>

</template>

<style lang="postcss">
.preview-list__size{
    max-height: 500px;
    overflow: auto;
}

.preview-list__block{
    margin-bottom: 5px;
    position: relative;
}

.preview-list__block>span{
    position: absolute;
    display: inline-block;
    width: 30px;
    height: 30px;
    background: #0099ff;
    color: white;
    text-align: center;
    line-height: 30px;
}

.preview-list__block img{
    border: 1px solid gainsboro;
    width: 400px;
}

.preview-list__detail{
  display: inline-block;
}

.preview-list__content{
  position: absolute;
  left: 420px;
  top: 0;
}

.preview-list__detail .el-input{
  margin-bottom: 5px;
  width: 300px;
}

.preview-list__block .el-textarea{
    width: 230px;
    margin-left: 5px;
}

.preview-list__block textarea{
    resize: none;
}

.preview-list .el-dialog__footer{
    text-align: center;
}
</style>
