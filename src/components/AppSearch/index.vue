<template>
  <div
    class="app-search-index">

    <component
      v-for="(item,index) in searchArr"
      :key="index"
      :is="item.componentType"
      v-model="initArrData[index]"
      :search-list="item.selectValue"
      :type="item.searchType"
      :placeholder="item.placeholder"
      @searchColumn="search"/>


    <el-button
      v-if="searchArr.length > 0"
      size="small"
      class="list-header__button"
      type="primary"
      @click="search"
    >搜索</el-button>

  </div>
</template>

<script>
/**
 * 全局搜索
 *
 * @author  suyanping
 */
import AppSearchAddress from './AppSearchAddress';
import AppSearchColumn from './AppSearchColumn';
import AppSearchDate from './AppSearchDate';
import AppSearchStatus from './AppSearchStatus';
import AppSearchCascader from './AppSearchCascader';

export default {
  name: 'AppSearch',

  components: {
    AppSearchAddress,
    AppSearchColumn,
    AppSearchDate,
    AppSearchStatus,
    AppSearchCascader,
  },

  props: {
    searchArr: {
      type: Array,
      default: () => [],
    },

  },

  data() {
    return {
      initObj: {
        AppSearchAddress: '',
        AppSearchColumn: '',
        AppSearchDate: '',
        AppSearchStatus: '',
        AppSearchCascader: {},
      },

      initArrData: [],
    };
  },

  created() {
    this.getInitData();

    this.firstTimeRedirect();
  },

  methods: {
    getInitData() {
      this.initArrData = this.searchArr
        .map(item => this.initObj[item.componentType]);
    },

    /**
     * 第一次进入页面时
     * 若url中无指定start或listRow参数，重定向至默认的start和listRow参数
     */
    firstTimeRedirect() {
      const { start = 1, listRow = 10 } = this.$route.query;

      this.$router.replace({
        query: {
          ...this.$route.query,
          start,
          listRow,
        },
      });
    },

    search() {
      const { listRow } = this.$route.query;

      const searchArr = this.initArrData.filter(item => item);

      const query = {
        start: 1,
        listRow,
      };

      const data = searchArr.reduce(((acc, item) => {
        const isObj = item instanceof Object;

        if (isObj) {
          // eslint-disable-next-line
          acc = {
            ...acc,
            ...item,
          };
        }

        if (!isObj) {
          const urlData = item.split(':');

          const value = this.getValue(urlData);

          acc[urlData[0]] = value;
        }

        return acc;
      }), { ...query });

      this.$router.push({ query: data });
    },

    getValue(data) {
      return data.reduce(((acc, item, index) => {
        if (index > 1) {
          // eslint-disable-next-line
          acc = `${acc}:${item}`;
        }

        return acc;
      }), data[1]);
    },
  },
};
</script>

<style lang="postcss">
.app-search-index{
  display: inline-block;
}
</style>
