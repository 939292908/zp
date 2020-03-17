<template>
  <div id="app" v-cloak>
    <img
      v-if="$config.project.isShowBg"
      class="bg"
      :src=" './static/images/bj'+ $config.project.localSuffix + '.png' "
    />
    <img
      v-if="showSearchBg"
      class="bg"
      :src="'./static/images/sousuobj'+ $config.project.localSuffix +'.png'"
    />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      bgImg: true
    };
  },
  created() {
    window.offlineAddress = this.$config.baiduMapPath;
    document.body.classList.add("theme-" + this.$config.project.locale);
    var title = document.querySelector("title");
    title.title = this.$config.project.name;
    title.text = this.$config.project.name;
  },
  watch: {
    $route(to, from) {
      if (
        ["Mark", "Expand", "Analysis"].indexOf(to.name) != 1 &&
        !this.$route.query.time
      ) {
        // this.$router.push({
        //   path: to.path,
        //   query : {
        //     time : (new Date()).getTime()
        //   }
        // });
        // location.reload();
        // this.$router.go(0);
      }
      to.path == "/" || to.path == "/search" || to.path == "/searchtp"
        ? (this.bgImg = false)
        : (this.bgImg = true);
    }
  },
  computed: {
    showSearchBg() {
      return (
        this.$route.path == "/search" ||
        this.$route.path == "/fullTextSearch" ||
        this.$route.path == "/searchtp" ||
        this.$route.path == "/collect"
      );
    },
    showOther() {
      return (
        this.$route.path == "/index" ||
        this.$route.path == "/search" ||
        this.$route.path == "/fullTextSearch" ||
        this.$route.path == "/searchtp" ||
        this.$route.path == "/heritage"
      );
    }
    // key(){
    //   return this.$route.path + Math.random();
    // }
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}
* {
  margin: 0;
  padding: 0;
}
ul li {
  list-style: none;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Microsoft YaHei, "Avenir", Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  min-width: 1200px;
  min-height: 600px;
  position: relative;
}
#app .bg,
#app .bgOther {
  width: 100%;
  height: 99.8%;
  position: absolute;
}
</style>


