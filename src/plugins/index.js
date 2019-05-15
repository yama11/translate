import { http, rules, token, times, nums } from '@/utils';

/* eslint-disable no-param-reassign */
export default {
  install(Vue) {
    Vue.prototype.$http = http;
    Vue.prototype.$rules = rules;
    Vue.prototype.$token = token;
    Vue.prototype.$times = times;
    Vue.prototype.$nums = nums;
  },
};
