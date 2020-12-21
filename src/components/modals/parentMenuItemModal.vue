<template>
  <!-- Add/Edit ParentMenuItem Modal -->
  <b-modal
    id="parent-modal"
    v-model="modalToggle"
    size="md"
    centered=""
    ok-only
    @ok="saveParentMenuItem"
    no-close-on-backdrop
    no-close-on-esc
  >
    <template #modal-title>
      <h3>
        {{ $t("app.settings.portal_themes.modal.parent_title") }}
      </h3>
    </template>
    <b-form>
      <b-row>
        <b-col>
          <b-form-group
            :label="$t('app.settings.portal_themes.modal.title_field')"
            label-for="parent-item-title"
          >
            <b-form-input
              id="parent-item-title"
              v-model="parentMenuItem.title"
              :state="validateState($v.parentMenuItem.title)"
            ></b-form-input>
            <div
              class="text-danger mt-1"
              v-if="$v.parentMenuItem.title.$error && !$v.parentMenuItem.title.required"
            >
              {{ $t("app.settings.portal_themes.menus.messages.title_required") }}
            </div>
          </b-form-group>
          <b-form-group
            :label="$t('app.settings.portal_themes.modal.type_field')"
            label-for="parent-item-title"
          >
            <b-form-select
              v-model="parentMenuItem.type"
              :options="parentMenuItemOptions"
              :state="validateState($v.parentMenuItem.type)"
            ></b-form-select>
            <div
              class="text-danger mt-1"
              v-if="$v.parentMenuItem.type.$error && !$v.parentMenuItem.type.required"
            >
              {{ $t("app.settings.portal_themes.menus.messages.title_required") }}
            </div>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-checkbox
            id="parent-open-tab"
            v-model="parentMenuItem.openNewTab"
            name="parent-open-tab"
            :value="true"
            :unchecked-value="false"
            size="lg"
          >
            {{ $t("app.settings.portal_themes.modal.open_tab") }}
          </b-form-checkbox>
        </b-col>
      </b-row>
    </b-form>
    <template v-slot:modal-footer="{ ok }">
      <b-overlay
        rounded
        opacity="0.6"
        spinner-small
        spinner-variant="primary"
        class="d-inline-block"
      >
        <b-button variant="outline-primary" @click="modalToggle = false" class="mr-4">
          {{ $t("app.general.list.cancel_button") }}
        </b-button>
        <b-button variant="primary" @click="ok()">
          {{ $t("app.general.list.add_button") }}
        </b-button>
      </b-overlay>
    </template>
  </b-modal>
</template>

<script>
import commonMixins from "@/mixins/commonMixins";
import modalMixins from "@/mixins/modalMixins";
import menuMixins from "@/mixins/menuMixins";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  name: "parent-menu-item-modal",
  mixins: [commonMixins, menuMixins, modalMixins],
  data() {
    return {
      modalToggle: false,
      parentMenuItem: {},
      parentMenuItemOptions: [
        { value: "ParentOnly", text: "Parent Menu", disabled: false },
      ],
    };
  },
  validations: {
    parentMenuItem: {
      title: {
        required,
        maxLength: maxLength(50),
      },
      type: {
        required,
      },
    },
  },
  mounted() {
    this.getSavedMenuItems();
  },
  methods: {
    getSavedMenuItems() {
      if (this.getThemeID && this.getMenu) {
        this.$http
          .get(`/themes/${this.getThemeID}/menus/${this.getMenu.id}`)
          .then((res) => {});
      }
    },
    resetForm() {
      this.parentMenuItem = {};

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    getKeyList(tree, id) {
      const depth = this.dec(tree, id, 0);
    },
    insertUpdatedItem(panelMenuItems, data, editId) {
      for (let index = 0; index < panelMenuItems.length; index++) {
        if (panelMenuItems[index].id === editId) {
          const children = panelMenuItems[index].children;
          panelMenuItems[index] = data;
          panelMenuItems[index].children = children;
        }
      }
      return panelMenuItems;
    },
    saveParentMenuItem(event) {
      event.preventDefault();
      this.$v.$touch();
      this.startLoading();
      if (!this.$v.$invalid) {
        this.modalToggle = false;
        const menuId = this.getMenu.id;
        const label = this.parentMenuItem.title;
        const type = this.parentMenuItem.type;
        let data = {
          menuId: menuId,
          parentId: "",
          label: label,
          newTab: false,
          url: "",
          type: type,
          targetID: "",
          sequence: 0,
        };
        this.$http
          .post(`/themes/${this.getThemeID}/menus/${menuId}/items`, data)
          .then((res) => {
            data.id = res.data;
            data.children = [];
            data.subLabel = "";
            const updatedPanel = this.insertUpdatedItem(this.getElements, data, this.getEditElement.id);
            this.stopLoading();
            console.log(updatedPanel);
            this.updateElements(updatedPanel);
            console.log('=>', this.$store.state.nested.elements);
          });
      }
    },
  },
};
</script>
