import TranslatorList from './index.vue';
import TranslatorManuscript from './Manuscript';

export default [
  // 译者信息
  {
    path: '/translator-list',
    name: 'TranslatorList',
    component: TranslatorList,
  },
  // 查看稿件
  {
    path: '/translator-manuscript/:id',
    name: 'TranslatorManuscript',
    component: TranslatorManuscript,
  },
];
