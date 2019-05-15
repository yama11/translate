import ChinaList from './index.vue';
import NounList from '../components/noun';
import ChapterList from '../components/chapter';

export default [
  // 中-其他
  {
    path: '/china-list',
    name: 'ChinaList',
    component: ChinaList,
  },
  // 名词表
  {
    path: '/china-noun',
    name: 'NounList',
    component: NounList,
  },
  // 章节管理
  {
    path: '/china-chapter',
    name: 'ChapterList',
    component: ChapterList,
  },
];
