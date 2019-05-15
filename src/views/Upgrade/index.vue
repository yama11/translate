<script>
/**
 * @overview 升级方式
 */

export default {
  name: 'UpgradeList',

  data() {
    return {
      upgradeList: [
        { condition: 'Lv1~Lv.2', chapterNumber: 5, multiple: '' },
        { condition: 'Lv2~Lv.3', chapterNumber: 20, multiple: '' },
        { condition: 'Lv3~Lv.4', chapterNumber: 50, multiple: '' },
        { condition: 'Lv4~Lv.5', chapterNumber: 200, multiple: '1.1' },
      ],

      columns: [
        { prop: 'condition', label: '升级条件' },
        { prop: 'chapterNumber', label: '需通过章节数' },
      ],

      updateList: [],

      visible: false,
    };
  },

  created() {

  },

  methods: {
    update() {
      this.visible = true;
      this.updateList = [
        ...this.upgradeList,
        { condition: 'add', chapterNumber: '', multiple: '' },
      ];
    },

    sureSubmit() {
      this.cancelSubmit();
    },

    cancelSubmit() {
      this.visible = false;
      this.updateList = [];
    },

    addLevel() {
      const newList = this.updateList.filter(item => item.condition !== 'add');

      newList.push({ condition: '', chapterNumber: '', multiple: '' });

      this.updateList = [
        ...newList,
        { condition: 'add', chapterNumber: '', multiple: '' },
      ];
    },
  },

};
</script>

<template>
  <div class="upgrade-list">
    <h2>升级方式</h2>

    <el-button
      size="small"
      type="primary"
      class="upgrade-list__update"
      @click="update"
    >修改</el-button>

    <el-table
      :header-cell-style="{background:'#ecf5ff',color:'#606266'}"
      :data="upgradeList"
      border
      style="width: 601px"
    >

      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :formatter="column.formatter"
        width="200"
      />

      <el-table-column
        prop="multiple"
        label="获得金币倍数"
        width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.multiple">
            X{{ scope.row.multiple }}
          </span>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog
      :visible.sync="visible"
      :before-close="cancelSubmit"
      title="升级方式修改"
      width="700px"
      class="upgrade-list__dialog">
      <div
        class="upgrade-list-dialog__content">

        <el-table
          :header-cell-style="{background:'#ecf5ff',color:'#606266'}"
          :data="updateList"
          border
          class="upgrade-list__table"
        >

          <el-table-column
            prop="condition"
            label="升级条件"
            width="200">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.condition !== 'add'"
                v-model="scope.row.condition"
                placeholder=" "
              />
              <span
                v-else
                class="upgrade-list-dialog__add"
                @click="addLevel">
                新增
              </span>
            </template>
          </el-table-column>

          <el-table-column
            prop="chapterNumber"
            label="需通过章节数"
            width="200">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.condition !== 'add'"
                v-model="scope.row.chapterNumber"
                placeholder=" "
              />
            </template>
          </el-table-column>

          <el-table-column
            prop="multiple"
            label="获得金币倍数"
            width="200">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.condition !== 'add'"
                v-model="scope.row.multiple"
                placeholder=" "
              />
            </template>
          </el-table-column>

        </el-table>

      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          @click="sureSubmit()">
          提交
        </el-button>

        <el-button
          @click="cancelSubmit()">
          取消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<style lang="postcss">
.upgrade-list{
  min-width: 800px;
}

.upgrade-list > h2{
  display: inline-block;
  font-size: 1rem;
}

.upgrade-list__update{
  margin-left: 475px;
}

.upgrade-list__table{
  width: 601px;
  margin-left: 20px;
}

.upgrade-list .el-table th,
.upgrade-list .el-table td{
    text-align: center;
}

.upgrade-list-dialog__content{
  max-height: 500px;
  overflow: auto;
}

.upgrade-list-dialog__add{
  cursor: pointer;
  color: #0099ff;
}

.upgrade-list__dialog .el-dialog__footer{
  text-align: center;
}

.upgrade-list__dialog .el-dialog__footer .el-button{
  width: 150px;
}
</style>
