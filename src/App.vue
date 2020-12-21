<template>
  <div>
    <router-view></router-view>
    <div class="loading" v-if="loading"></div>

    <!-- <customizer></customizer> -->
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getThemeMode", "loading"]),
    themeName() {
      return this.getThemeMode.dark ? "dark-theme" : " ";
    },
    rtl() {
      return this.getThemeMode.rtl ? "rtl" : " ";
    }
  },
  methods: {
  },
  metaInfo() {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: "RobotoDocs",
      // all titles will be injected into this template
      titleTemplate: "%s",
      bodyAttrs: {
        class: [this.themeName, "text-left"]
      },
      htmlAttrs: {
        dir: this.rtl
      }
    };
  }
};
</script>

<style>
</style>


