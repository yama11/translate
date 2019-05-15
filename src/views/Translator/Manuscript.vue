<script>
/**
 * @overview 查看稿件
 */
import list from '@/mixins/list';

export default {
  name: 'TranslatorManuscript',

  mixins: [list],

  data() {
    return {
      list: {
        data: [
          { bookName: '霸道总裁' },
        ],
      },

      columns: [
        { prop: 'bookName', label: '中文书名' },
        { prop: 'mangaName', label: '英文书名' },
        { prop: 'language', label: '语言' },
        { prop: 'chapter', label: '章节号' },
        { prop: 'translate', label: '翻译/校对' },
        { prop: 'commitTime', label: '提交时间' },
        { prop: 'settleTime', label: '结算时间' },
        { prop: 'schedule', label: '当前进度' },
        { prop: 'employ', label: '录用情况' },
        { prop: 'quality', label: '翻译质量' },
        { prop: 'award', label: '获得奖励' },
      ],

      infoList: [{
        nickName: 'xiaoxiao',
      }],

      infoColumns: [
        { prop: 'nickName', label: '昵称' },
        { prop: 'language', label: '认证语言' },
        { prop: 'passTranslate', label: '通过翻译/总提交翻译' },
        { prop: 'passProofread', label: '通过校对/总提交校对' },
        { prop: 'userLevel', label: '用户等级' },
        { prop: 'transLevel', label: '翻译等级' },
        { prop: 'report', label: '被举报次数' },
        { prop: 'gold', label: '金币' },
        { prop: 'status', label: '状态' },
      ],
    };
  },

  created() {

  },

  methods: {
    banned() {

    },

    look() {

    },
  },

};
</script>

<template>
  <div class="translator-manuscript">
    <div class="translator-manuscript__info">
      <h2 style="font-size:1rem">用户情况</h2>

      <el-table
        :header-cell-style="{background:'#ecf5ff',color:'#606266'}"
        :data="infoList"
        border
      >

        <el-table-column
          v-for="column in infoColumns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :formatter="column.formatter"
        />

        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="banned(scope.row.id)"
            >封禁</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <AppList
      ref="list"
      :list.sync="list"
      api=""
      title="提交稿件"
      class="translator-list"
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
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                @click="look(scope.row.id)"
              >查看稿件</el-button>
            </template>
          </el-table-column>

        </el-table>

      </template>

    </AppList>

  </div>
</template>

<style lang="postcss">
.translator-list{
    padding: 0 !important;
}

.translator-manuscript__info .el-table th,
.translator-manuscript__info .el-table td{
    text-align: center;
}
</style>
