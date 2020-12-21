<template>
  <!-- Delete Confirm Modal -->
  <b-modal
    id="confirm-modal"
    v-model="modalToggle"
    size="md"
    centered=""
    ok-only
    @ok="DeleteMenuItem"
    no-close-on-backdrop
    no-close-on-esc
  >
    <template #modal-title>
      <h3>
        {{ $t("app.settings.portal_themes.modal.delete_title") }}
      </h3>
    </template>
    <b-form>
      <b-row>
        <b-col>
          <h4>{{ $t("app.settings.portal_themes.modal.delete_confirm") }}</h4>
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
          {{ $t("app.general.list.label_delete") }}
        </b-button>
      </b-overlay>
    </template>
  </b-modal>
</template>

<script>
import commonMixins from "@/mixins/commonMixins";
import modalMixins from "@/mixins/modalMixins";
import menuMixins from "@/mixins/menuMixins";

export default {
  name: "delete-confirm-modal",
  mixins: [commonMixins, menuMixins, modalMixins],
  data() {
    return {
      modalToggle: false,
    };
  },
  methods: {
    DeleteMenuItem(event) {
      this.modalToggle = false;
    },
  },
};
</script>
