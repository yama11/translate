<script>
/**
 * @overview 空页面
 */


export default {
  name: 'EmptyList',

  data() {
    return {

    };
  },

  created() {
    this.getUrl();
  },

  methods: {
    getUrl() {
      const path = this.$route.query;
      const urlList = [];

      // eslint-disable-next-line
      for (let i in path) {
        urlList.push(path[i]);
      }

      this.$router.push(urlList.join(''));
    },
  },

};
</script>

<template>
  <div class="empty-list"/>
</template>

<style lang="postcss">

</style>
