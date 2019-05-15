<script>
/**
 * @overview 主页面 - 菜单
 */

export default {
  name: 'MainMenu',

  data: () => ({
    menus: [
      {
        name: '首页',
        permission: 'home',
        index: '/home-list',
        children: [],
      },
      {
        name: '译者管理',
        permission: 'translate',
        children: [
          {
            name: '译者信息',
            permission: 'translator',
            index: '/translator-list',
          },
          {
            name: '举报信息',
            permission: 'report',
            index: '/report-list',
          },
          {
            name: '特殊词处理',
            permission: 'word',
            index: '/word-list',
          },
        ],
      },
      {
        name: '书籍总览',
        permission: 'book',
        children: [
          {
            name: '中-其他',
            permission: 'china',
            index: '/china-list',
          },
          {
            name: '英-其他',
            permission: 'english',
            index: '/english-list',
          },
        ],
      },
      {
        name: '考核',
        permission: 'check',
        children: [
          {
            name: '试题管理',
            permission: 'test',
            index: '/test-list',
          },
          {
            name: '考核译稿',
            permission: 'manuscript',
            index: '/manuscript-list',
          },
        ],
      },
      {
        name: '设置',
        permission: 'setting',
        children: [
          {
            name: '语言管理',
            permission: 'language',
            index: '/language-list',
          },
          {
            name: '升级方式',
            permission: 'upgrade',
            index: '/upgrade-list',
          },
          {
            name: '考核设置',
            permission: 'assess',
            index: '/assess-list',
          },
          {
            name: '词库管理',
            permission: 'lexicon',
            index: '/lexicon-list',
          },
        ],
      },
    ],

    isPath: '',
  }),

  computed: {
    children() {
      return this.menus.flatMap(item => item.children);
    },

    defaultActive() {
      const { path } = this.$route;
      const pattern = /(\/\w+)/;

      const match = (pattern.exec(path) || [])[0];
      const target = this.children
        .find(({ index }) => index.startsWith(match));

      return target ? target.index : path;
    },
  },

  mounted() {

  },

  methods: {
    /**
     * @param {String} index 菜单项的唯一标识，同时也是点击该菜单项所进入的页面路由
     */
    onSelectMenu(index) {
      const path = (index === '/home-list'
      || index === '/assess-list'
      || index === '/upgrade-list'
      || index === '/language-list')
        ? index
        : `${index}?start=1&listRow=10`;

      this.$router.push({ path: '/empty-list', query: path });
    },
  },
};
</script>

<template>
  <div class="main-menu">
    <h1 class="main-menu__title">WebComics<br>翻译平台</h1>
    <el-menu
      :default-active="defaultActive"
      :unique-opened="true"
      mode="vertical"
      @select="onSelectMenu"
    >

      <div
        v-for="menu in menus"
        :key="menu.permission">
        <el-menu-item
          v-if="menu.children.length === 0"
          :index="menu.index"
          :class="'main-menu__text ' + menu.index">
          {{ menu.name }}
        </el-menu-item>

        <el-submenu
          v-else
          :index="menu.permission"
        >
          <span slot="title">{{ menu.name }}</span>
          <el-menu-item
            v-for="submenu in menu.children"
            :key="submenu.index"
            :index="submenu.index"
            :class="submenu.index"
            style="padding-left:62px;"
          >
            <span
              slot="title"
              style="font-size:16px;">{{ submenu.name }}</span>
          </el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<style lang="postcss">
.main-menu {
  display: flex;
  flex-direction: column;
  position: fixed;
  margin-right: 2em;
  top: 0;
  left: 0;
  height: 100vh;
  width: 200px;
  text-align: center;
  background-color: #fff;
}

.main-menu::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  background-color: #e6e6e6;
}

.main-menu__title {
  padding: 1em 0;
  border-bottom: 1px solid #e6e6e6;
  font-size: 1.25rem;
  margin: 0;
}

.main-menu__text{
  font-size: 18px;
}

.main-menu > .el-menu {
  flex: auto;
  overflow-y: auto;
  overflow-x: hidden;
}

.main-menu .el-submenu__title {
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
}

.main-menu .el-menu-item.is-active{
  background: #ecf5ff;
}
</style>
