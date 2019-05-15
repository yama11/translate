import EnglishList from './index.vue';
import NounList from '../components/noun';
import ChapterList from '../components/chapter';

export default [
  // 英-其他
  {
    path: '/english-list',
    name: 'EnglishList',
    component: EnglishList,
  },
  // 名词表
  {
    path: '/english-noun',
    name: 'NounList',
    component: NounList,
  },
  // 章节管理
  {
    path: '/english-chapter',
    name: 'ChapterList',
    component: ChapterList,
  },
];
