<script>
/**
 * @overview 首页
 */


export default {
  name: 'HomeList',

  data() {
    return {
      activeNames: [],

      nounList: [],
    };
  },

  created() {
    this.getData();
  },

  methods: {
    getData() {

    },

    repoetLook() {

    },

    translateLook() {

    },

    bookLook() {

    },
  },

};
</script>

<template>
  <div class="home-list">
    <h2>首页</h2>

    <div class="home-list__left">
      <el-collapse
        v-model="activeNames">
        <el-collapse-item
          :title="'待办名词表处理（' + nounList.length + '）'"
          name="noun">
          <div>
            中>>法  《霸道总裁》 5条新提交
            <span class="home-list__action">查看</span>
          </div>
          <div>
            中>>法  《酷跑》 10条新提交
            <span class="home-list__action">查看</span>
          </div>
        </el-collapse-item>

        <el-collapse-item
          name="report">
          <template slot="title">
            待办举报信息（{{ nounList.length }}）

            <span
              v-if="activeNames.includes('report')"
              class="home-list__more"
              @click.stop="repoetLook">查看更多</span>
          </template>
          <div>
            译员: 王二狗 &nbsp; 被举报次数：20
            <span class="home-list__action">查看</span>
          </div>
          <div>
            译员: 李大壮 &nbsp; 被举报次数：10
            <span class="home-list__action">查看</span>
          </div>
        </el-collapse-item>

        <el-collapse-item
          name="translate">
          <template slot="title">
            待办试译稿件（{{ nounList.length }}）

            <span
              v-if="activeNames.includes('translate')"
              class="home-list__more"
              @click.stop="translateLook">查看更多</span>
          </template>
          <div>
            12315
            <span class="home-list__time">2019.03.10 12:00</span>
            <span class="home-list__action">查看</span>
          </div>
          <div>
            12316
            <span class="home-list__time">2019.03.20 15:00</span>
            <span class="home-list__action">查看</span>
          </div>
        </el-collapse-item>

        <el-collapse-item
          :title="'待办争议章节（' + nounList.length + '）'"
          name="dispute">
          <div>
            《霸道总裁》CH.15
            <span class="home-list__time">2019.03.10 12:00</span>
            <span
              class="home-list__action"
              style="margin-left: 10px;">忽略</span>
            <span class="home-list__action">查看</span>
          </div>
          <div>
            《酷跑》CH.20
            <span class="home-list__time">2019.03.20 15:00</span>
            <span
              class="home-list__action"
              style="margin-left: 10px;">忽略</span>
            <span class="home-list__action">查看</span>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="home-list__right">
      <el-collapse
        v-model="activeNames">
        <el-collapse-item
          name="book">
          <template slot="title">
            滞后书籍提示（{{ nounList.length }}）

            <span
              v-if="activeNames.includes('book')"
              class="home-list__more"
              @click.stop="bookLook">查看更多</span>
          </template>
          <div>
            中-法  《霸道总裁》 超过5天  仅有1人翻译
          </div>
          <div>
            英-法  《酷跑》 超过3天  无人校对
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<style lang="postcss">
.home-list{
  min-width: 1000px;
  position: relative;
}

.home-list > h2{
  font-size: 1rem;
}

.home-list__left,
.home-list__right{
  display: inline-block;
  width: 450px;
}

.home-list__right{
  position: absolute;
  margin-left: 20px;
}

.home-list .el-collapse{
  border: none;
}

.home-list .el-collapse-item{
  user-select: none;
  border: 1px solid gainsboro;
  margin-bottom: 10px;
}

.home-list .el-collapse .el-collapse-item__header{
  font-weight: bolder;
}

.home-list .el-collapse .el-collapse-item__header,
.home-list .el-collapse .el-collapse-item__wrap{
  background: ghostwhite;
  color: black;
  font-size: 16px;
  padding-left: 10px;
}

.home-list .el-collapse .el-collapse-item__content>div{
  font-size: 14px;
  margin-top: 5px;
  margin-right: 20px;
  user-select: none;
}

.home-list .el-collapse>.is-active .el-collapse-item__header{
  border-bottom: 1px solid gainsboro;
}

.home-list__action{
  float: right;
  color: #00a1f9;
  cursor: pointer;
}

.home-list__more{
  color: #00a1f9;
  cursor: pointer;
  margin-left: 200px;
}

.home-list__time{
  margin-left: 30px;
}
</style>
