<script>
/**
 * @overview canvas 拖拽、拉伸
 *
 * @author suyanping
 */

import Draggable from 'vuedraggable';

export default {
  name: 'AppCanvas',

  components: {
    Draggable,
  },

  props: {
    dataList: {
      type: Object,
      default: () => ({
        url: '',
        content: [],
      }),
    },

    dataIndex: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      newList: [],

      canvas: '',
      context: '',

      imgs: '',

      scaleDot: null,

      SelectedRect: {},
      x1: null,
      y1: null,
      isScale: false,

      isCreate: false,
      initLeft: 0,
      initHeight: 0,
      newReact: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      },

      isDragging: false,
    };
  },

  computed: {
    style() {
      const length = this.newList.length;

      return length > 0 ? { 'border-bottom': '1px solid red' } : '';
    },
  },

  mounted() {
    this.imgs = new Image();
    this.imgs.src = this.dataList.url;

    if (!this.imgs.complete) {
      this.imgs.onload = () => {
        this.initList(this.imgs);
      };

      return;
    }
    this.initList(this.imgs);
  },

  methods: {
    initList() {
      this.canvas = this.$refs.canvas;
      if (!this.canvas) return;

      this.context = this.canvas.getContext('2d');

      this.canvas.width = this.imgs.width;
      this.canvas.height = this.imgs.height;
      // this.canvas.style.background = `url(${this.imgs.src}) no-repeat`;

      // const content = this.$refs.content;
      // content.style.maxHeight = this.imgs.height > 150
      //   ? `${this.imgs.height - 100}px`
      //   : `${this.imgs.height}px`;

      this.getList(this.imgs);

      this.canvas.onmousedown = this.canvasClick;
      this.canvas.onmouseup = this.stopDragging;
      this.canvas.onmouseout = this.stopDragging;
      this.canvas.onmousemove = this.dragRect;
    },

    getList() {
      const lengths = this.dataList.detail.length;

      if (lengths === 0) {
        this.newList = [];

        this.drawRect();

        return;
      }

      this.newList = this.dataList.detail.map((item, index) => ({
        index,
        words: item.words,
        x: item.left,
        y: item.top,
        width: item.width,
        height: item.height,
        related: item.related === 1,
        isColor: item.isColor,
        isSelected: false,
      }));

      this.drawRect();
    },

    del(index) {
      this.$emit('delItem', { dataIndex: this.dataIndex, index });
    },

    drawRect() {
      if (!this.context) return;
      // 清除画布，准备绘制
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.context.drawImage(this.imgs, 0, 0);

      // 遍历所有矩形框
      // eslint-disable-next-line
      for (let i = 0; i < this.newList.length; i++) {
        const rect = this.newList[i];

        // 绘制矩形
        this.context.strokeStyle = rect.isColor ? '#FF00FF' : 'red';
        this.context.lineWidth = 2;
        this.context.strokeRect(
          rect.x, rect.y,
          rect.width, rect.height, rect.color);

        this.context.font = '20px red';
        this.context.textAlign = 'start';
        this.context.textBaseline = 'bottom';
        this.context.fillStyle = rect.isColor ? '#FF00FF' : 'red';
        this.context.fillText(i + 1, rect.x, rect.y);
      }
    },

    canvasClick(e) {
      // 取得画布上被单击的点
      const canvasHeight = this.$refs.canvasDiv.scrollTop;

      const clickX = e.pageX - this.canvas.offsetLeft;
      const clickY = (e.pageY - this.canvas.offsetTop) + canvasHeight;

      let initIndex = 0;

      if (this.newList.length === 0) {
        this.initLeft = clickX;
        this.initHeight = clickY;
        this.isCreate = true;
        this.$emit('changeColor', { dataIndex: this.dataIndex, index: 0, init: true });
      }

      // 查找被单击的矩形框
      // eslint-disable-next-line
      for (let i = this.newList.length - 1; i >= 0; i--) {
        const rect = this.newList[i];

        this.widthstart = Number(rect.x);
        this.widthend = Number(rect.x) + Number(rect.width);

        this.heightstart = Number(rect.y);
        this.heightend = Number(rect.y) + Number(rect.height);

        // 判断这个点是否在矩形框中
        // eslint-disable-next-line
        if ((clickX >= (this.widthstart + 5) && clickX < (this.widthend - 5)) && (clickY >= (this.heightstart + 5) && clickY < (this.heightend - 5))) {
          // 清除之前选择的矩形框
          if (this.SelectedRect != null) this.SelectedRect.isSelected = false;
          this.SelectedRect = rect;
          this.x1 = clickX - this.SelectedRect.x;
          this.y1 = clickY - this.SelectedRect.y;

          // 选择新圆圈
          rect.isSelected = true;

          // 使圆圈允许拖拽
          this.isDragging = true;

          // 鼠标按住选中选择框 键盘的 Delete 快捷删除
          window.onkeydown = (event) => {
            if (event.keyCode === 46 && this.isDragging) {
              this.$emit('delItem', { dataIndex: this.dataIndex, index: rect.index });
              this.isDragging = false;
            }
          };

          this.textScroll(rect.index);
          this.$emit('changeColor', { dataIndex: this.dataIndex, index: rect.index });

          // 更新显示
          this.drawRect();
          // 停止搜索
          return;
        }

        // 设置拉伸的界限

        // 四个角
        // eslint-disable-next-line
        const isLeftTop = ((((this.widthstart - 5) <= clickX) && (clickX <= (this.widthstart + 5))) && (((this.heightstart - 5) <= clickY) && (clickY <= (this.heightstart + 5))));

        // eslint-disable-next-line
        const isRightTop = ((((this.widthend - 5) <= clickX) && (clickX <= (this.widthend + 5))) && (((this.heightstart - 5) <= clickY) && (clickY <= (this.heightstart + 5))));

        // eslint-disable-next-line
        const isLeftBottom = ((((this.widthstart - 5) <= clickX) && (clickX <= (this.widthstart + 5))) && (((this.heightend - 5) <= clickY) && (clickY <= (this.heightend + 5))));

        // eslint-disable-next-line
        const isRightBottom = ((((this.widthend - 5) <= clickX) && (clickX <= (this.widthend + 5))) && (((this.heightend - 5) <= clickY) && (clickY <= (this.heightend + 5))));

        // 四边
        // eslint-disable-next-line
        const isLeft = ((((this.widthstart - 5) <= clickX) && (clickX <= (this.widthstart + 5))) && (((this.heightstart + 5) <= clickY) && (clickY <= (this.heightend - 5))));

        // eslint-disable-next-line
        const isTop = ((((this.widthstart + 5) <= clickX) && (clickX <= (this.widthend - 5))) && (((this.heightstart - 5) <= clickY) && (clickY <= (this.heightstart + 5))));

        // eslint-disable-next-line
        const isRight = ((((this.widthend - 5) <= clickX) && (clickX <= (this.widthend + 5))) && (((this.heightstart + 5) <= clickY) && (clickY <= (this.heightend - 5))));

        // eslint-disable-next-line
        const isBottom = ((((this.widthstart + 5) <= clickX) && (clickX <= (this.widthend - 5))) && (((this.heightend - 5) <= clickY) && (clickY <= (this.heightend + 5))));

        if (isLeftTop) {
          this.scaleDot = 1;
          this.SelectedRect = rect;
          this.isScale = true;
        }

        if (isRightTop) {
          this.scaleDot = 2;
          this.SelectedRect = rect;
          this.isScale = true;
        }

        if (isRightBottom) {
          this.scaleDot = 3;
          this.SelectedRect = rect;
          this.isScale = true;
        }

        if (isLeftBottom) {
          this.scaleDot = 4;
          this.SelectedRect = rect;
          this.isScale = true;
        }
        if (isLeft) {
          this.scaleDot = 5;
          this.SelectedRect = rect;
          this.isScale = true;
        }

        if (isTop) {
          this.scaleDot = 6;
          this.SelectedRect = rect;
          this.isScale = true;
        }

        if (isRight) {
          this.scaleDot = 7;
          this.SelectedRect = rect;
          this.isScale = true;
        }

        if (isBottom) {
          this.scaleDot = 8;
          this.SelectedRect = rect;
          this.isScale = true;
        }

        if (isLeftTop || isRightTop || isRightBottom || isLeftBottom
        || isLeft || isTop || isRight || isBottom) {
          this.textScroll(rect.index);
          this.$emit('changeColor', { dataIndex: this.dataIndex, index: rect.index });
        }

        initIndex += 1;

        if (initIndex === this.newList.length && !this.isScale) {
          this.initLeft = clickX;
          this.initHeight = clickY;
          this.isCreate = true;
          this.$emit('changeColor', { dataIndex: this.dataIndex, index: rect.index, init: true });
        }
      }
    },

    dragRect(e) {
      const canvasHeight = this.$refs.canvasDiv.scrollTop;

      const clickX = e.pageX - this.canvas.offsetLeft;
      const clickY = (e.pageY - this.canvas.offsetTop) + canvasHeight;

      // 设置鼠标的样式
      // eslint-disable-next-line
      for (let i = 0; i <= this.newList.length - 1; i++) {
        const rect = this.newList[i];

        const widthstarts = Number(rect.x);
        const widthends = Number(rect.x) + Number(rect.width);

        const heightstarts = Number(rect.y);
        const heightends = Number(rect.y) + Number(rect.height);

        // eslint-disable-next-line
        if ((clickX >= (widthstarts + 5) && clickX < (widthends - 5)) && (clickY >= (heightstarts + 5) && clickY < (heightends - 5))) {
          this.canvas.style.cursor = 'pointer';

          break;
        }

        // eslint-disable-next-line
        const isLeftTop = ((((widthstarts - 5) <= clickX) && (clickX <= (widthstarts + 5))) && (((heightstarts - 5) <= clickY) && (clickY <= (heightstarts + 5))));

        // eslint-disable-next-line
        const isRightTop = ((((widthends - 5) <= clickX) && (clickX <= (widthends + 5))) && (((heightstarts - 5) <= clickY) && (clickY <= (heightstarts + 5))));

        // eslint-disable-next-line
        const isLeftBottom = ((((widthstarts - 5) <= clickX) && (clickX <= (widthstarts + 5))) && (((heightends - 5) <= clickY) && (clickY <= (heightends + 5))));

        // eslint-disable-next-line
        const isRightBottom = ((((widthends - 5) <= clickX) && (clickX <= (widthends + 5))) && (((heightends - 5) <= clickY) && (clickY <= (heightends + 5))));

        if (isLeftTop || isRightTop || isLeftBottom || isRightBottom) {
          if (isLeftTop) {
            this.canvas.style.cursor = 'nw-resize';
          } else if (isRightTop) {
            this.canvas.style.cursor = 'ne-resize';
          } else if (isLeftBottom) {
            this.canvas.style.cursor = 'sw-resize';
          } else if (isRightBottom) {
            this.canvas.style.cursor = 'se-resize';
          } else {
            this.canvas.style.cursor = 'default';
          }

          break;
        }

        // eslint-disable-next-line
        const isLeft = ((((widthstarts - 5) <= clickX) && (clickX <= (widthstarts + 5))) && (((heightstarts + 5) <= clickY) && (clickY <= (heightends - 5))));
        // eslint-disable-next-line
        const isTop = ((((widthstarts + 5) <= clickX) && (clickX <= (widthends - 5))) && (((heightstarts - 5) <= clickY) && (clickY <= (heightstarts + 5))));
        // eslint-disable-next-line
        const isRight = ((((widthends - 5) <= clickX) && (clickX <= (widthends + 5))) && (((heightstarts + 5) <= clickY) && (clickY <= (heightends - 5))));
        // eslint-disable-next-line
        const isBottom = ((((widthstarts + 5) <= clickX) && (clickX <= (widthends - 5))) && (((heightends - 5) <= clickY) && (clickY <= (heightends + 5))));

        if (isLeft || isTop || isRight || isBottom) {
          if (isLeft) {
            this.canvas.style.cursor = 'w-resize';
          } else if (isTop) {
            this.canvas.style.cursor = 'n-resize';
          } else if (isRight) {
            this.canvas.style.cursor = 'w-resize';
          } else if (isBottom) {
            this.canvas.style.cursor = 'n-resize';
          } else {
            this.canvas.style.cursor = 'default';
          }

          break;
        }

        this.canvas.style.cursor = 'default';
      }

      // 判断矩形是否开始拖拽
      if (this.isDragging) {
        // 判断拖拽对象是否存在
        if (this.SelectedRect != null) {
          // 取得鼠标位置
          const x = e.pageX - this.canvas.offsetLeft;
          const y = (e.pageY - this.canvas.offsetTop) + canvasHeight;

          // eslint-disable-next-line
          const widthCompare = x - this.x1 + this.SelectedRect.width - this.canvas.width;

          // eslint-disable-next-line
          const heightCompare = y - this.y1 + this.SelectedRect.height - this.canvas.height;
          // 设置矩形的偏移位置
          if (x - this.x1 <= 0) {
            this.SelectedRect.x = 0;
          } else if (widthCompare > 0) {
            this.SelectedRect.x = this.canvas.width - this.SelectedRect.width;
          } else {
            this.SelectedRect.x = x - this.x1;
          }

          if (y - this.y1 <= 0) {
            this.SelectedRect.y = 0;
          } else if (heightCompare > 0) {
            this.SelectedRect.y = this.canvas.height - this.SelectedRect.height;
          } else {
            this.SelectedRect.y = y - this.y1;
          }

          this.$emit('update', { dataIndex: this.dataIndex, SelectedRect: this.SelectedRect });
          // 更新画布
          this.drawRect();
        }
      }


      // 判断是否开始拉伸
      if (this.isScale) {
        let scaleX = 0;
        let scaleY = 0;

        const lengthY = (e.pageY - this.canvas.offsetTop) + canvasHeight;

        if (this.scaleDot === 1) {
          // eslint-disable-next-line
          scaleX = Number(this.SelectedRect.x) + this.SelectedRect.width + this.canvas.offsetLeft - e.pageX;

          // eslint-disable-next-line
          scaleY = Number(this.SelectedRect.y) + this.SelectedRect.height + this.canvas.offsetTop - e.pageY - canvasHeight;

          const lengthX = e.pageX - this.canvas.offsetLeft;

          if (scaleX > 30) {
            this.SelectedRect.x = lengthX;
          }

          if (scaleY > 30) {
            this.SelectedRect.y = lengthY;
          }
        }

        if (this.scaleDot === 2) {
          // eslint-disable-next-line
          scaleY = Number(this.SelectedRect.y) + this.SelectedRect.height + this.canvas.offsetTop - e.pageY - canvasHeight;

          if (scaleY > 30) {
            this.SelectedRect.y = lengthY;
          }

          scaleX = e.pageX - this.canvas.offsetLeft - Number(this.SelectedRect.x);
        }

        if (this.scaleDot === 3) {
          scaleX = e.pageX - this.canvas.offsetLeft - Number(this.SelectedRect.x);
          scaleY = lengthY - Number(this.SelectedRect.y);
        }

        if (this.scaleDot === 4) {
          // eslint-disable-next-line
          scaleX = Number(this.SelectedRect.x) + this.SelectedRect.width + this.canvas.offsetLeft - e.pageX;

          const lengthX = e.pageX - this.canvas.offsetLeft;

          if (scaleX > 30) {
            this.SelectedRect.x = lengthX;
          }

          scaleY = lengthY - Number(this.SelectedRect.y);
        }

        if (this.scaleDot === 5) {
          // eslint-disable-next-line
          scaleX = Number(this.SelectedRect.x) + this.SelectedRect.width + this.canvas.offsetLeft - e.pageX;

          if (scaleX < 30) return;

          const lengthX = e.pageX - this.canvas.offsetLeft;

          this.SelectedRect.x = lengthX;

          scaleY = Number(this.SelectedRect.height);
        }

        if (this.scaleDot === 6) {
          // eslint-disable-next-line
          scaleY = Number(this.SelectedRect.y) + this.SelectedRect.height + this.canvas.offsetTop - e.pageY - canvasHeight;

          if (scaleY < 30) return;
          this.SelectedRect.y = lengthY;

          scaleX = Number(this.SelectedRect.width);
        }

        if (this.scaleDot === 7) {
          scaleX = e.pageX - this.canvas.offsetLeft - Number(this.SelectedRect.x);
          scaleY = Number(this.SelectedRect.height);
        }

        if (this.scaleDot === 8) {
          scaleY = lengthY - Number(this.SelectedRect.y);
          scaleX = Number(this.SelectedRect.width);
        }

        // 设置拉伸最小的边界
        if (scaleX > 30) {
          this.SelectedRect.width = scaleX;
        } else {
          this.SelectedRect.width = 30;
        }

        if (scaleY > 30) {
          this.SelectedRect.height = scaleY;
        } else {
          this.SelectedRect.height = 30;
        }

        this.$emit('update', { dataIndex: this.dataIndex, SelectedRect: this.SelectedRect });
        this.drawRect();
      }

      // 鼠标拉伸创建矩形
      if (this.isCreate) {
        const width = clickX - this.initLeft >= 0
          ? clickX - this.initLeft : this.initLeft - clickX;
        const height = clickY - this.initHeight >= 0
          ? clickY - this.initHeight : this.initHeight - clickY;

        const left = clickX < this.initLeft
          ? clickX : this.initLeft;
        const top = clickY < this.initHeight
          ? clickY : this.initHeight;

        this.newReact = {
          left,
          top,
          width,
          height,
        };

        this.context.save();
        this.context.setLineDash([5]);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.restore();

        this.drawRect();

        this.context.strokeStyle = 'red';
        this.context.lineWidth = 2;
        this.context.strokeRect(this.newReact.left, this.newReact.top,
          this.newReact.width, this.newReact.height);
      }
    },

    stopDragging() {
      if (this.isCreate) {
        if (this.newReact.width > 20 && this.newReact.height > 20) {
          this.$emit('addMarks', { dataIndex: this.dataIndex, scrollTop: this.$refs.canvasDiv.scrollTop, newReact: this.newReact });
          this.$emit('changeColor', { dataIndex: this.dataIndex, index: this.newList.length });

          setTimeout(() => {
            this.textScroll(this.newList.length - 1);
          }, 100);
        } else {
          this.drawRect();
        }
      }
      this.isDragging = false;
      this.isScale = false;
      this.isCreate = false;
      this.initLeft = 0;
      this.initHeight = 0;
      this.newReact = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      };
    },

    changeContent(val, index) {
      this.$emit('updateText', { dataIndex: this.dataIndex, index, val });
    },

    dragCourseware({ oldIndex, newIndex }) {
      if (oldIndex === newIndex) return;

      this.$emit('updateList', { dataIndex: this.dataIndex, oldIndex, newIndex });
    },

    addParagraph() {
      this.$emit('changeColor', { dataIndex: this.dataIndex });
      this.$emit('addMarks', { dataIndex: this.dataIndex, scrollTop: this.$refs.canvasDiv.scrollTop });
      this.$emit('changeColor', { dataIndex: this.dataIndex, index: this.newList.length });
      setTimeout(() => {
        this.textScroll(this.newList.length - 1);
      }, 100);
    },

    cahngeRelated(val, index) {
      this.$emit('updateRelated', { dataIndex: this.dataIndex, index, val });
    },

    selectReact(index, item) {
      const short = Number(item.y) - Number(item.height);
      this.$refs.canvasDiv.scrollTop = short < 0 ? 0 : short;
      this.$emit('changeColor', { dataIndex: this.dataIndex, index });
    },

    textClick(index) {
      this.$refs.textareaRef[index].click();
      this.textScroll(index);
    },

    // 右侧文本框滚动的高度
    textScroll(index) {
      const offsetTop = this.$refs.inputSelect[index].$el.offsetTop;
      this.$refs.content.scrollTop = offsetTop - 40;
    },

  },
};
</script>

<template>
  <div class="app-canvas">
    <div
      ref="canvasDiv"
      class="app-canvas__image">
      <canvas
        id="canvas"
        ref="canvas"
        class="canvas"/>
    </div>

    <div
      id="content"
      ref="content"
      :style="style"
      class="app-canvas__content">

      <Draggable
        :value="newList"
        @end.stop="dragCourseware">
        <div
          v-for="(item,index) in newList"
          ref="textareaRef"
          :key="index"
          :style="item.isColor ? 'border:1px solid #FF00FF' : ''"
          class="app-canvas-content__item"
          @click="selectReact(index,item)">
          <span class="app-canvas-content__index">{{ index + 1 }}</span>
          <span
            class="app-canvas-content__del"
            @click.stop="del(index)">删除</span>

          <!-- <div class="app-canvas-content__coord">
            坐标：X<span>{{ item.x }}</span>
            Y<span style="margin-left:7px;">{{ item.y }}</span>
            <br>
            <div style="display:inline;margin-left:42px;"/>
            W<span>{{ item.width }}</span>
            H<span>{{ item.height }}</span>
          </div> -->

          <el-checkbox
            v-if="index === 0"
            v-model="item.related"
            class="app-canvas-content__box"
            @change="cahngeRelated(item.related,index)">
            图片拼接
          </el-checkbox>

          <div style="clear:both;"/>

          <!-- <div class="app-canvas-content__text">
            {{ item.words }}
          </div> -->

          <el-input
            ref="inputSelect"
            v-model="item.words"
            autosize
            type="textarea"
            class="app-canvas-content__textarea"
            placeholder="请输入内容"
            @input="changeContent(item.words,index)"/>
        </div>
      </Draggable>

      <el-button
        size="small"
        type="primary"
        class="app-canvas-content__btn"
        style="margin: 10px 0 10px 110px"
        @click="addParagraph()"
      >新建段落</el-button>
    </div>

    <div style="clear:both"/>
  </div>
</template>

<style lang="postcss">
.app-canvas{
  min-width: 1200px;
}

.app-canvas__image,
.app-canvas__content{
  display: inline-block;
  user-select:none;
}

.app-canvas__image{
  font-size: 0;
  border-bottom: 2px solid #f31bf3;
  max-height: 700px;
  overflow: auto;
}

.app-canvas__content{
  position: absolute;
  min-width: 320px;
  margin-left: 30px;
  max-height: 680px;
  overflow: auto;
  padding-left: 3px;
}

.app-canvas-content__item{
  width: 300px;
  min-height: 120px;
  padding: 10px 3px;
  border-bottom: 1px solid gainsboro;
  cursor: pointer;
  box-sizing: border-box;
}

.app-canvas-content__index{
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #63c1ff;
  color: #63c1ff;
  border-radius: 50%;
  text-align: center;
  margin-right: 15px;
}

.app-canvas-content__del{
  cursor: pointer;
}

.app-canvas-content__box{
  float: right;
  margin-top: 5px;
}

.app-canvas-content__coord{
  float: right;
}

.app-canvas-content__coord span{
  display: inline-block;
  border: 1px solid gainsboro;
  text-align: center;
  width: 40px;
  height: 20px;
  margin-left: 5px;
  margin-top: 5px;
}

.app-canvas-content__text{
  /* height: 75px; */
  border: 1px solid gainsboro;
  margin-top: 5px;
  padding: 5px;
  border-radius: 5px;
}

.app-canvas-content__textarea textarea{
  min-height: 60px !important;
  margin-top: 5px;
  resize: none;
}
</style>
