<script>
/**
 * @overview 特殊词处理
 */
import list from '@/mixins/list';

export default {
  name: 'WordList',

  mixins: [list],

  data() {
    return {
      list: {
        data: [
          { userName: 'weixiao' },
          { userName: 'jasping' },
        ],
      },

      columns: [
        { prop: 'language', label: '语言' },
        { prop: 'words', label: '涉及词语' },
        { prop: 'commitTime', label: '提交时间' },
      ],
    };
  },

  created() {

  },

  methods: {

  },

};
</script>

<template>
  <AppList
    ref="list"
    :list.sync="list"
    api=""
    title="特殊词处理"
    class="word-list"
  >

    <template
      slot-scope="props"
    >
      <el-table
        :header-cell-style="{background:'#ecf5ff',color:'#606266'}"
        :data="props.listData"
      >

        <el-table-column
          prop="userName"
          label="用户"
        >
          <template slot-scope="scope">
            <span style="color:#0099ff">
              {{ scope.row.userName }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :formatter="column.formatter"
        />

      </el-table>

    </template>

  </AppList>
</template>

<style lang="postcss">

</style>
