<template>
  <nested-draggable
    class="offset-2"
    v-model="treeMenuItems"
  />
</template>

<script>
import menuMixins from "@/mixins/menuMixins";
import NestedDraggable from "./nestedDraggable.vue";

export default {
  name: "tree-menu",
  components: { NestedDraggable },
  mixins: {},
  computed: {
    treeMenuItems: {
      get() {
        return this.$store.state.nested.elements;
      },
      set(value) {
        this.$store.dispatch("nested/updateElements", value);
      },
    },
  },
  mounted() {},
  methods: {
  },
};
</script>
