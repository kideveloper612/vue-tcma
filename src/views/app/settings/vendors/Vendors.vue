<template>
<div class="main-content">
    <page-title :page="$t('app.settings.vendors.list.title')">
        <div slot="actions" class="page-actions col-md-5 p-0">
            <b-form-group label-for="input-search" class="w-100 mr-3 mb-0">
                <b-form-input id="input-search" :placeholder="$t('app.general.list.search')" @input="filter = $event"></b-form-input>
            </b-form-group>
            <fab-extended-button @event="addVendor" :label="$t('app.settings.vendors.list.add_button')" v-if="$canAccess('vendorsCreate')"></fab-extended-button>
        </div>
    </page-title>
    <div class="row">
        <b-col md="12" class="mb-30 text-center pr-0">
            <include-delete-switch :label="$t('app.general.list.include_deleted')" v-model="includeDelete"></include-delete-switch>
        </b-col>

        <b-col lg="6" xl="4" md="6" class="mt-1 mb-30" v-for="vendor of filteredVendors" :key="vendor.id">
            <vendor-card :card-object="vendor" :card-show-link="$canAccess('vendorsView')" :card-route="{ name: 'vendors.details', params: { id: vendor.id }}" :card-can-edit="$canAccess('vendorsEdit')" :card-tooltip-undelete-button="$t('app.settings.vendors.tooltips.vendor_undelete')" @card-undelete-action="undeleteVendor(vendor)">
                <template v-slot:labels>
                    <b-row>
                        <object-labels :object-id="vendor.id" object-type="Vendor" :assigned-labels="vendor.labels" :can-show-more="true" v-if="vendor.labels"></object-labels>
                    </b-row>
                </template>
            </vendor-card>
        </b-col>

    </div>
    <b-modal id="modal-add-vendor" size="lg" :title="$t('app.settings.vendors.list.add_button')" centered="" ok-only @ok="save" no-close-on-backdrop no-close-on-esc :hide-header-close="loadingFile" v-if="$canAccess('vendorsCreate')">
        <b-form>
            <b-row>
                <b-col cols="5">
                    <b-form-group id="input-group-name" :label="$t('app.settings.vendors.details.name_field')" label-for="name">
                        <b-form-input id="name" v-model="newVendor.name" :state="validateState($v.newVendor.name)"></b-form-input>
                        <div class="text-danger mt-1" v-if="$v.newVendor.name.$error && !$v.newVendor.name.required">{{ $t("app.settings.vendors.messages.name_required") }}</div>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group id="input-group-contact" :label="$t('app.settings.vendors.details.contact_field')" label-for="contact">
                        <b-form-input id="contact" v-model="newVendor.contactPerson" :state="validateState($v.newVendor.contactPerson)"></b-form-input>
                        <div class="text-danger mt-1" v-if="$v.newVendor.contactPerson.$error && !$v.newVendor.contactPerson.required">{{ $t("app.settings.vendors.messages.contact_person_required") }}</div>
                    </b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-form-group id="input-group-phone" :label="$t('app.settings.vendors.details.phone_field')" label-for="phone">
                        <b-form-input id="phone" v-model="newVendor.phoneNumber"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row cols-md="2">
                <b-col>
                    <b-row cols="1">
                        <b-col>
                            <b-form-group id="input-group-email" :label="$t('app.settings.vendors.details.email')" label-for="email">
                                <b-form-input id="email" v-model="newVendor.email" :state="validateState($v.newVendor.email)"></b-form-input>
                                <div class="text-danger mt-1" v-if="$v.newVendor.contactPerson.$error && !$v.newVendor.contactPerson.required">{{ $t("app.settings.vendors.messages.email_required") }}</div>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group id="input-group-address" :label="$t('app.settings.vendors.details.address')" label-for="address">
                                <b-form-input id="address" v-model="newVendor.address" :state="validateState($v.newVendor.address)"></b-form-input>
                                <div class="text-danger mt-1" v-if="$v.newVendor.contactPerson.$error && !$v.newVendor.contactPerson.required">{{ $t("app.settings.vendors.messages.address_required") }}</div>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group id="input-group-notes" :label="$t('app.settings.vendors.details.notes')" label-for="notes">
                                <b-form-textarea id="notes" name="brief" v-model="newVendor.notes" rows="3" max-rows="6">
                                </b-form-textarea>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col>
                    <b-row align-h="center">
                        <b-col cols="7">
                            <b-form-group :label="$t('app.settings.vendors.details.logo_field')" label-for="upload-image">
                                <wings-upload-image :label="$t('app.general.components.upload_image_label')" @callUpload="setFile" @clear="clearImage">
                                </wings-upload-image>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-form>
        <template v-slot:modal-footer="{ ok }">
            <b-overlay :show="loadingFile" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block">
                <b-button variant="primary" @click="ok()">
                    {{$t('app.general.list.save_button')}}
                </b-button>
            </b-overlay>
        </template>
    </b-modal>
</div>
</template>

<script>
import dateMixins from "@/mixins/dateMixins";
import commonMixins from "@/mixins/commonMixins";
import {
    required,
    maxLength
} from "vuelidate/lib/validators";

import includeDeleteSwitch from "@/components/includeDeleteSwitch";
import fabExtendedButton from "@/components/fabExtendedButton";
import VendorCard from "@/components/card/VendorCard";
import WingsUploadImage from "@/components/WingsUploadImage";
import ObjectLabels from '@/components/labels/ObjectLabels.vue';

export default {
    name: 'VendorsList',
    mixins: [
        dateMixins,
        commonMixins
    ],
    data() {
        return {
            vendorsList: [],
            includeDelete: false,
            filter: '',
            newVendor: {},
            loadingFile: false
        }
    },
    components: {
        includeDeleteSwitch,
        fabExtendedButton,
        VendorCard,
        WingsUploadImage,
        ObjectLabels
    },
    computed: {
        filteredVendors() {
            var filteredVendorsList = this.vendorsList;
            if (!this.includeDelete) {
                filteredVendorsList = this.vendorsList.filter(vendor =>
                    !this.isDeleted(vendor)
                );
            }
            return filteredVendorsList;
        },
    },
    mounted() {
        this.getVendors();
        if (this.$route.params.showDeleted) {
            this.includeDelete = true;
        }
    },
    validations: {
        newVendor: {
            name: {
                required,
                maxLength: maxLength(125)
            },
            contactPerson: {
                required,
                maxLength: maxLength(125)
            },
            email: {
                required,
                maxLength: maxLength(125)
            },
            address: {
                required
            },
        }
    },
    methods: {
        getVendors() {
            this.startLoading();
            this.$http.get('/vendors')
                .then(response => {
                    this.vendorsList = response.data;
                    this.stopLoading();
                })
                .catch(error => {
                    this.stopLoading();
                    console.log(error);
                });
        },
        addVendor() {
            this.$bvModal.show('modal-add-vendor');
        },
        validateState(element) {
            const {
                $dirty,
                $error
            } = element;
            return $dirty ? !$error : null;
        },
        resetForm() {
            this.newVendor = {};

            this.$nextTick(() => {
                this.$v.$reset();
            });
        },
        save(event) {
            event.preventDefault();
            this.$v.$touch();
            this.loadingFile = true;
            if (!this.$v.$invalid) {
                this.$http.post('/vendors', this.newVendor)
                    .then(response => {
                        this.showToast(this.$t("app.settings.vendors.messages.created"), 'success');
                        this.loadingFile = false;
                        this.$bvModal.hide('modal-add-vendor');
                        this.resetForm();
                        this.$router.push({
                            name: 'vendors.details',
                            params: {
                                id: response.data
                            }
                        })
                    })
                    .catch(error => {
                        this.showToast(error.message, 'danger');
                        this.loadingFile = false;
                    });
            } else {
                this.loadingFile = false;
            }
        },
        undeleteVendor(vendor) {
            this.$http.put('/vendors', vendor)
                .then(() => {
                    this.$bvToast.toast(this.$t('app.settings.vendors.messages.undeleted_success', {
                        name: vendor.name
                    }), {
                        variant: 'success',
                        solid: true,
                        toaster: 'b-toaster-bottom-center'
                    });
                    this.getVendors();
                })
                .catch(error => {
                    this.$bvToast.toast(error.message, {
                        variant: 'danger',
                        solid: true,
                        toaster: 'b-toaster-bottom-center'
                    });
                })
        },
        setFile(objectFile) {
            this.loadingFile = true;
            if (objectFile) {
                this.newVendor.fileLogo = objectFile.file;
                this.newVendor.logoFileName = objectFile.title;
                this.loadingFile = false;
            } else {
                this.newVendor.fileLogo = null;
                this.newVendor.logoFileName = null;
                this.loadingFile = false;
            }
        },
        clearImage() {
            this.newVendor.fileLogo = {};
        },
    }
}
</script>

<style lang="scss">
.v-select-toggle {
    width: 100%;
    height: calc(1.9695rem + 2px);
    line-height: 1.5;
    color: #665c70 !important;
    align-items: center !important;
    background: #fff !important;
    /* background-size: 8px 10px; */
    border: 1px solid #ced4da !important;
    border-radius: 0.25rem;
}
</style>
