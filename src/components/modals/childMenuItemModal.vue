<template>
  <!-- Add/Edit Child Menu Modal -->
  <b-modal
    id="child-modal"
    v-model="modalToggle"
    size="md"
    centered=""
    ok-only
    @ok="saveChildMenuItem"
    no-close-on-backdrop
    no-close-on-esc
  >
    <template #modal-title>
      <h3>
        {{ $t("app.settings.portal_themes.modal.child_title") }}
      </h3>
    </template>
    <b-form>
      <b-row>
        <b-col>
          <b-form-group
            :label="$t('app.settings.portal_themes.modal.title_field')"
            label-for="child-item-title"
          >
            <b-form-input
              id="child-item-title"
              v-model="childMenuItem.title"
              :state="validateState($v.childMenuItem.title)"
            ></b-form-input>
            <div
              class="text-danger mt-1"
              v-if="$v.childMenuItem.title.$error && !$v.childMenuItem.title.required"
            >
              {{ $t("app.settings.portal_themes.menus.messages.title_required") }}
            </div>
          </b-form-group>
          <b-row>
            <b-col
              ><b-form-group
                :label="$t('app.settings.portal_themes.modal.type_field')"
                label-for="child-item-type"
              >
                <b-form-select
                  id="child-item-type"
                  v-model="childMenuItem.type"
                  :options="typeOptions"
                  :state="validateState($v.childMenuItem.type)"
                ></b-form-select>
                <div
                  class="text-danger mt-1"
                  v-if="$v.childMenuItem.type.$error && !$v.childMenuItem.type.required"
                >
                  {{ $t("app.settings.portal_themes.menus.messages.type_required") }}
                </div>
              </b-form-group></b-col
            >
            <b-col
              ><b-form-group
                id="input-group-point"
                :label="$t('app.settings.portal_themes.modal.point_field')"
                label-for="parent-item-point"
              >
                <b-form-select
                  id="child-item-point"
                  v-model="childMenuItem.point"
                  :options="pointsOptions"
                  :state="validateState($v.childMenuItem.point)"
                ></b-form-select>
                <div
                  class="text-danger mt-1"
                  v-if="$v.childMenuItem.point.$error && !$v.childMenuItem.point.required"
                >
                  {{ $t("app.settings.portal_themes.menus.messages.point_required") }}
                </div>
              </b-form-group></b-col
            >
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-checkbox
            id="child-open-tab"
            v-model="openNewTab"
            name="child-open-tab"
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
  name: "child-menu-item-modal",
  mixins: [commonMixins, menuMixins, modalMixins],
  data() {
    return {
      openNewTab: false,
      modalToggle: false,
      childMenuItem: {},
      typeOptions: [{ value: "ParentOnly", text: "Asset", disabled: false }],
      pointsOptions: [{ value: "ParentOnly", text: "Apple", disabled: false }],
    };
  },
  validations: {
    childMenuItem: {
      title: {
        required,
        maxLength: maxLength(50),
      },
      type: {
        required,
      },
      point: {
        required,
      },
    },
  },
  methods: {
    saveChildMenuItem(event) {
      event.preventDefault();
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.resetForm();
        this.modalToggle = false;
        console.log(this.parentMenuItem);
      }
    },
  },
};
</script>
