<script>
/**
 * @overview 考核译稿
 */
import list from '@/mixins/list';

export default {
  name: 'ManuscriptList',

  mixins: [list],

  data() {
    return {
      list: {
        data: [
          { testName: 'test120', progress: 0 },
          { testName: 'jasping', progress: 1 },
        ],
      },

      columns: [
        { prop: 'testName', label: '考题名' },
        { prop: 'userName', label: '用户名' },
        { prop: 'language', label: '语言' },
        { prop: 'commitTime', label: '提交时间' },
        { prop: 'settleTime', label: '审核时间' },
      ],
    };
  },

  created() {

  },

  methods: {
    look() {},
  },

};
</script>

<template>
  <AppList
    ref="list"
    :list.sync="list"
    api=""
    title="考核译稿"
    class="manuscript-list"
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
          prop="progress"
          label="当前进度"
        >
          <template slot-scope="scope">
            <span
              :style="scope.row.progress === 0 ? 'background:#00ca71' : ''"
              class="statusCircle"/>
            <span
              v-if="scope.row.progress === 0"
              style="color:#00ca71;">
              待审核
            </span>
            <span v-else>已审核</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="passStatus"
          label="通过情况"
        >
          <template slot-scope="scope">
            {{ scope.row.passStatus }}
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="look(scope.row.id)"
            >查看</el-button>

          </template>
        </el-table-column>

      </el-table>

    </template>

  </AppList>
</template>

<style lang="postcss">

</style>
