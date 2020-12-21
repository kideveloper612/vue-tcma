<template>
  <div class="main-content">
    <page-title
      :page="pageTitle"
      folder="settings.portal_themes"
      :section="$t('app.settings.portal_themes.details.breadcrumb_section')"
      :subsection="$t('app.settings.portal_themes.modal.add_menu')"
      :show-back="true"
    >
      <div slot="actions" class="page-actions"></div>
    </page-title>
    <b-row>
      <b-col lg="3" md="4" sm="12" class="mt-1 mb-30">
        <b-form-group
          id="menu-title"
          :label="$t('app.settings.portal_themes.menus.menu_title')"
          label-for="menu-title"
        >
          <b-form-input
            id="menu-title"
            v-model="pageMenu.title"
            :state="validateState($v.pageMenu.title)"
          ></b-form-input>
          <div
            class="text-danger mt-1"
            v-if="$v.pageMenu.title.$error && !$v.pageMenu.title.required"
          >
            {{ $t("app.settings.portal_themes.menus.messages.title_required") }}
          </div>
        </b-form-group>
        <b-row>
          <b-col>
            <b-form-checkbox
              id="mega-checkbox"
              v-model="pageMenu.megaCheckBox"
              :state="validateState($v.pageMenu.megaCheckBox)"
              name="mega-checkbox"
              :value="true"
              :unchecked-value="false"
              size="lg"
              >{{ $t("app.settings.portal_themes.menus.check_box") }}</b-form-checkbox
            >
          </b-col>
        </b-row>

        <b-row class="mt-3">
          <b-col>
            <draggable
              :list="subMenuItems"
              :group="{ name: 'menuItem', pull: 'clone', put: false }"
              :handle="'.list-accordion'"
              :clone="cloneMenuItem"
              class="draggable-menu"
            >
              <b-list-group
                class="accordion"
                role="tablist"
                v-for="subMenuItem in subMenuItems"
                :key="subMenuItem.id"
              >
                <b-list-group-item
                  v-if="subMenuItem.objectType === ''"
                  v-b-toggle="subMenuItem.name"
                  variant="primary"
                  role="tab"
                >
                  {{ subMenuItem.name }} <i class="nav-icon i-Arrow-Down float-right"></i>
                </b-list-group-item>

                <b-collapse :id="subMenuItem.objectType" accordion="list-accordion">
                  <b-list-group-item variant="info" class="list-accordion">{{
                    subMenuItem.name
                  }}</b-list-group-item>
                </b-collapse>
              </b-list-group>
            </draggable>
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="9" md="8" sm="12" class="mt-1 mb-30">
        <b-card class="position-relative">
          <b-row>
            <h3 class="ml-3 mb-4">
              {{ $t("app.settings.portal_themes.menus.panel_title") }}
            </h3>
          </b-row>
          <b-row>
            <b-col style="min-height: 300px">
              <tree-menu class="h-100 pb-2 mb-5"></tree-menu>
              <b-overlay
                rounded
                opacity="0.6"
                spinner-small
                spinner-variant="primary"
                style="bottom: 0; right: 8px"
                class="position-absolute d-inline-block"
              >
                <router-link tag="a" class="" :to="'/settings/portal_themes'"
                  ><b-button variant="outline-primary" @click="show = false" class="mr-4">
                    {{ $t("app.general.list.back_button") }}
                  </b-button>
                </router-link>

                <b-button variant="primary" @click="saveManu()">
                  {{ $t("app.general.list.save_button") }}
                </b-button>
              </b-overlay>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <parent-menu-item-modal></parent-menu-item-modal>
    <external-link-item-modal></external-link-item-modal>
    <child-menu-item-modal></child-menu-item-modal>
    <delete-confirm-modal></delete-confirm-modal>
  </div>
</template>

<script>
import commonMixins from "@/mixins/commonMixins";
import menuMixins from "@/mixins/menuMixins";
import treeMenu from "@/components/draggable/treeMenu";
import parentMenuItemModal from "@/components/modals/parentMenuItemModal";
import externalLinkItemModal from "@/components/modals/externalLinkItemModal";
import childMenuItemModal from "@/components/modals/childMenuItemModal";
import deleteConfirmModal from "@/components/modals/deleteConfirmModal";

import draggable from "vuedraggable";
import { mapGetters, mapActions } from "vuex";
import { isMobile } from "mobile-device-detect";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  name: "AddMenu",
  components: {
    draggable,
    treeMenu,
    parentMenuItemModal,
    externalLinkItemModal,
    childMenuItemModal,
    deleteConfirmModal,
  },
  mixins: [commonMixins, menuMixins],
  data() {
    return {
      pageTitle: "",
      themeID: "",
      pageMenu: {},
      subMenuItems: [],
      menuEditItems: [],
      parentModalToggle: false,
    };
  },
  validations: {
    pageMenu: {
      title: {
        required,
        maxLength: maxLength(50),
      },
      megaCheckBox: {
        required,
      },
    },
  },
  computed: {},
  mounted() {
    this.getMenuInitialItems();
  },
  methods: {
    saveManu() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log(this.pageMenu);
      }
    },
    uuidv4() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    test() {
      const menuId = "c6671d82-21a9-44a0-a4eb-1e84ef25bbfb";
      const data = {
        menuId: menuId,
        parentId: "",
        label: "Menu #2 item ##1",
        newTab: false,
        url: "",
        type: "ParentOnly",
        targetID: "",
        sequence: 0,
      };
      this.$http
        .post(
          `/themes/${this.getThemeID}/menus/c6671d82-21a9-44a0-a4eb-1e84ef25bbfb/items`,
          data
        )
        .then((res) => {
        });
    },
    addStaticParentMenu() {
      let collapseID = [];
      for (let i = 1; i >= 0; i--) {
        const id = this.uuidv4();
        this.subMenuItems.unshift({
          id: id,
          name: this.$t("app.settings.portal_themes.menus.static_menu_list")[i],
          objectType: this.$t("app.settings.portal_themes.menus.static_menu"),
        });
        collapseID.push(id);
      }
      this.subMenuItems.unshift({
        id: this.uuidv4(),
        name: this.$t("app.settings.portal_themes.menus.static_menu"),
        objectType: "",
        collapseID: collapseID,
      });
    },
    getMenuInitialItems() {
      const menuName = this.getMenu.name;
      this.pageTitle = menuName;
      this.pageMenu.title = menuName;
      this.pageMenu.megaCheckBox = false;
      this.startLoading();

      if (this.getThemeID !== "") {
        const themeID = this.getThemeID;
        this.$http.get(`/themes/${themeID}/menus/options`).then((res) => {
          const responseRecords = res.data;
          let collapseID = [];

          for (let i = responseRecords.length - 1; i > 0; i--) {
            collapseID.unshift(responseRecords[i].id);
            this.subMenuItems.unshift(responseRecords[i]);
            if (responseRecords[i].objectType !== responseRecords[i - 1].objectType) {
              this.subMenuItems.unshift({
                id: this.uuidv4(),
                name: responseRecords[i].objectType,
                objectType: "",
                collapseID: collapseID,
              });
              collapseID = [];
            }
          }
          this.subMenuItems.unshift({
            id: this.uuidv4(),
            name: responseRecords[0].objectType,
            objectType: "",
            collapseID: collapseID,
          });
          this.addStaticParentMenu();
          this.stopLoading();
        });
      } else {
        this.$router.push({ name: "portal_themes" });
      }
    },
    cloneMenuItem(value) {
      let newRecord = {
        id: this.uuidv4(),
        parentId: "",
        menuId: "",
        label: value.objectType,
        subLabel: value.name,
        newTab: true,
        url: "",
        type: value.objectType,
        targetID: "",
        sequence: 0,
        children: [],
      };
      if (
        this.$t("app.settings.portal_themes.menus.static_menu_list").indexOf(value.name) > -1
      ) {
        newRecord.subLabel = "";
        newRecord.label = value.name;
      }
      return newRecord;
    },
  },
};
</script>

<style lang="scss" scoped>
.draggable-menu {
  user-select: none;
}
</style>
