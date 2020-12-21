<template>
  <div>
    <draggable
      style="height: 100%"
      v-bind="dragOptions"
      tag="div"
      :list="list"
      :value="value"
      @input="emitter"
      @change="changed"
    >
      <b-list-group :key="el.id" v-for="el in realValue">
        <b-list-group-item
          variant="light"
          class="d-flex align-items-center rounded p-0 mb-1"
        >
          <span class="mx-3 font-weight-bold">{{ el.type }}</span>
          <span>|</span>
          <span class="ml-3 text-mute"
            >{{ el.label }}<span v-if="el.subLabel !== ''" class="m-1">/</span
            >{{ el.subLabel }}</span
          >
          <span class="ml-auto">
            <b-dropdown
              variant="link"
              toggle-class="text-decoration-none"
              size="sm"
              dropleft
              no-caret
            >
              <template v-slot:button-content class="_r_btn border-0">
                <span class="_dot _r_block-dot bg-dark"></span>
                <span class="_dot _r_block-dot bg-dark"></span>
                <span class="_dot _r_block-dot bg-dark"></span>
              </template>
              <b-dropdown-item
                v-b-modal.contact-list-table-modal-2
                @click="editMenuItem(el)"
              >
                <span class="mdi mdi-file-edit mdi-28px"></span>
                Edit
              </b-dropdown-item>

              <b-dropdown-item @click="deleteMenuItem(el)">
                <span class="mdi mdi-delete mdi-28px"></span>
                Delete
              </b-dropdown-item>
            </b-dropdown>
          </span>
        </b-list-group-item>
        <nested-draggable
          class="ml-4"
          :list="el.children"
          @editMenuItem="editMenuItem"
          @deleteMenuItem="deleteMenuItem"
        />
      </b-list-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import menuMixins from "@/mixins/menuMixins";

export default {
  name: "nested-draggable",
  components: {
    draggable,
  },
  mixins: [menuMixins],
  props: {
    value: {
      required: false,
      type: Array,
      default: null,
    },
    list: {
      required: false,
      type: Array,
      default: null,
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "menuItem",
        disabled: false,
        ghostClass: "ghost",
      };
    },
    realValue() {
      return this.value ? this.value : this.list;
    },
  },
  methods: {
    emitter(value) {
      this.updateElements(value);
      this.$emit("input", value);
    },
    changed(value) {
      if (
        "added" in value &&
        value.added.element.type ===
          this.$t("app.settings.portal_themes.menus.static_menu")
      ) {
        if (
          value.added.element.label ===
          this.$t("app.settings.portal_themes.menus.static_menu_list")[0]
        ) {
          this.$bvModal.show("parent-modal");
          
        } else {
          this.$bvModal.show("external-modal");
        }
      }
      this.updateEditElement(value.added.element);
      const depth = this.checkDepth(this.$store.state.nested.elements);
    },
    checkDepth(tree) {
      return (
        1 + Math.max(0, ...tree.map(({ children = [] }) => this.checkDepth(children)))
      );
    },
    editMenuItem(el) {
      if (el.type === this.$t("app.settings.portal_themes.menus.static_menu")) {
        if (
          el.label === this.$t("app.settings.portal_themes.menus.static_menu_list")[0]
        ) {
          this.$bvModal.show("parent-modal");
        } else {
          this.$bvModal.show("external-modal");
          
        }
      } else {
        this.$bvModal.show("child-modal");
      }
    },
    deleteMenuItem(el) {
      console.log(el);
      this.$bvModal.show("confirm-modal");
    },
  },
};
</script>
