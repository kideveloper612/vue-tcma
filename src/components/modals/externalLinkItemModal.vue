<template>
  <!-- Add/Edit External Link Modal -->
  <b-modal
    id="external-modal"
    v-model="modalToggle"
    size="md"
    centered=""
    ok-only
    @ok="saveExternalLinkItem"
    no-close-on-backdrop
    no-close-on-esc
  >
    <template #modal-title>
      <h3>
        {{ $t("app.settings.portal_themes.modal.external_link") }}
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
              v-model="externalLinkItem.title"
              :state="validateState($v.externalLinkItem.title)"
            ></b-form-input>
            <div
              class="text-danger mt-1"
              v-if="
                $v.externalLinkItem.title.$error && !$v.externalLinkItem.title.required
              "
            >
              {{ $t("app.settings.portal_themes.menus.messages.title_required") }}
            </div>
          </b-form-group>
          <b-form-group
            :label="$t('app.settings.portal_themes.modal.external_link')"
            label-for="parent-item-link"
          >
            <b-form-input
              id="parent-item-link"
              v-model="externalLinkItem.externalLink"
              :state="validateState($v.externalLinkItem.externalLink)"
            ></b-form-input>
            <div
              class="text-danger mt-1"
              v-if="
                $v.externalLinkItem.externalLink.$error &&
                !$v.externalLinkItem.externalLink.required
              "
            >
              {{ $t("app.settings.portal_themes.menus.messages.external_required") }}
            </div>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-checkbox
            id="external-open-tab"
            v-model="externalLinkItem.openNewTab"
            name="external-open-tab"
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
      openNewTab: false,
      modalToggle: false,
      externalLinkItem: {},
      parentMenuItemOptions: [
        { value: "ParentOnly", text: "Parent Menu", disabled: false },
      ],
    };
  },
  validations: {
    externalLinkItem: {
      title: {
        required,
        maxLength: maxLength(50),
      },
      externalLink: {
        required,
      },
    },
  },
  methods: {
    getParentId(panelMenuItems, id) {
      for (let index = 0; index < panelMenuItems.length; index++) {
        const element = panelMenuItems[index];
        let result = loop(element, id);
        if (result == null) {
          continue;
        } else {
          return result;
        }
      }

      function loop(parent, id) {
        for (let index = 0; index < parent.children.length; index++) {
          const element = parent.children[index];
          if (element.id == id) {
            return parent.id;
          } else {
            loop(element, id);
          }
        }
        return null;
      }
    },
    saveExternalLinkItem(event) {
      event.preventDefault();
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const editMenu = this.getEditElement;
        const panelMenuItems = this.getElements;
        console.log(editMenu);

        const parentId = this.getParentId(panelMenuItems, editMenu.id);
        if (parentId !== undefined) {
          this.modalToggle = false;
          const data = {
            menuId: this.getMenu.id,
            parentId: parentId,
            label: this.externalLinkItem.title,
            newTab: false,
            url: this.externalLinkItem.externalLink,
            type: "ParentOnly",
            targetID: "",
            sequence: 0,
          };
          console.log(data);
          this.$http
            .post(`/themes/${this.getThemeID}/menus/${this.getMenu.id}/items`, data)
            .then((res) => {
              console.log(res);
            });
        }
      }
    },
  },
};
</script>
