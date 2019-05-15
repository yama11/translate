/**
 * @overview 主应用路由
 */
import Empty from '@/views/Empty';
import Home from '@/views/Home';
import Translator from '@/views/Translator';
import Report from '@/views/Report';
import Word from '@/views/Word';
import China from '@/views/China';
import English from '@/views/English';
import Test from '@/views/Test';
import Manuscript from '@/views/Manuscript';
import Language from '@/views/Language';
import Upgrade from '@/views/Upgrade';
import Assess from '@/views/Assess';
import Lexicon from '@/views/Lexicon';

const routes = [
  ...Empty,
  ...Home,
  ...Translator,
  ...Report,
  ...Word,
  ...China,
  ...English,
  ...Test,
  ...Manuscript,
  ...Language,
  ...Upgrade,
  ...Assess,
  ...Lexicon,
];

export default routes;
