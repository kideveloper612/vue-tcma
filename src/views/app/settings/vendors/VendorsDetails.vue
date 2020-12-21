<template>
<div class="main-content">
    <page-title :page="textTitle" folder="settings.vendors" :section="$t('app.settings.vendors.details.breadcrumb_section')" :show-back="true">
        <div slot="actions" class="page-actions">
        </div>
    </page-title>
    <b-tabs class="" v-model="tabIndex" align="center">
        <!-- General Tab -->
        <b-tab :title="$t('app.settings.vendors.details.general_tab')">
            <b-row class="justify-content-md-center">
                <b-col lg="8">
                    <b-row>
                        <b-col cols="5">
                            <b-form-group id="input-group-name" :label="$t('app.settings.vendors.details.name_field')" label-for="name">
                                <b-form-input id="name" v-model="vendor.name" :state="validateState($v.vendor.name)"></b-form-input>
                                <div class="text-danger mt-1" v-if="$v.vendor.name.$error && !$v.vendor.name.required">{{ $t("app.settings.vendors.messages.name_required") }}</div>
                            </b-form-group>
                        </b-col>
                        <b-col cols="4">
                            <b-form-group id="input-group-contact" :label="$t('app.settings.vendors.details.contact_field')" label-for="contact">
                                <b-form-input id="contact" v-model="vendor.contactPerson" :state="validateState($v.vendor.contactPerson)"></b-form-input>
                                <div class="text-danger mt-1" v-if="$v.vendor.contactPerson.$error && !$v.vendor.contactPerson.required">{{ $t("app.settings.vendors.messages.contact_person_required") }}</div>
                            </b-form-group>
                        </b-col>
                        <b-col cols="3">
                            <b-form-group id="input-group-phone" :label="$t('app.settings.vendors.details.phone_field')" label-for="phone">
                                <b-form-input id="phone" v-model="vendor.phoneNumber"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row cols-md="2">
                        <b-col>
                            <b-row cols="1">
                                <b-col>
                                    <b-form-group id="input-group-culture" :label="$t('app.users.detail.culture_field')" label-for="culture">
                                        <v-select id="culture" :options="culturesList" v-model="vendor.culture" :reduce="item => item.value"></v-select>
                                    </b-form-group>
                                </b-col>
                                <b-col>
                                    <b-form-group id="input-group-email" :label="$t('app.settings.vendors.details.email')" label-for="email">
                                        <b-form-input id="email" v-model="vendor.email" :state="validateState($v.vendor.email)"></b-form-input>
                                        <div class="text-danger mt-1" v-if="$v.vendor.contactPerson.$error && !$v.vendor.contactPerson.required">{{ $t("app.settings.vendors.messages.email_required") }}</div>
                                    </b-form-group>
                                </b-col>
                                <b-col>
                                    <b-form-group id="input-group-address" :label="$t('app.settings.vendors.details.address')" label-for="address">
                                        <b-form-input id="address" v-model="vendor.address" :state="validateState($v.vendor.address)"></b-form-input>
                                        <div class="text-danger mt-1" v-if="$v.vendor.contactPerson.$error && !$v.vendor.contactPerson.required">{{ $t("app.settings.vendors.messages.address_required") }}</div>
                                    </b-form-group>
                                </b-col>
                                <b-col>
                                    <b-form-group id="input-group-notes" :label="$t('app.settings.vendors.details.notes')" label-for="notes">
                                        <b-form-textarea id="notes" name="brief" v-model="vendor.notes" rows="3" max-rows="6">
                                        </b-form-textarea>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col>
                            <b-row align-h="center">
                                <b-col cols="7">
                                    <b-form-group :label="$t('app.settings.vendors.details.logo_field')" label-for="upload-image">
                                        <wings-upload-image :label="$t('app.general.components.upload_image_label')" @callUpload="setFile" @clear="clearImage" v-if="showUploadFile">
                                        </wings-upload-image>
                                        <b-img :src="vendorLogo" rounded fluid alt="Responsive image" v-if="!showUploadFile"></b-img>
                                        <p class="text-muted font-italic mt-2 cursor-pointer" @click="clearImage" v-if="!showUploadFile">{{$t('app.settings.vendors.details.update_logo_info')}}</p>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <b-row align-h="between">
                        <b-col>
                            <b-button class="mr-2 mt-3" variant="outline-danger btn-tertiary" @click="deleteVendor" v-if="$canAccess('vendorsDelete')">
                                <span class="mdi mdi-trash-can-outline mdi-24px"></span>
                                <span class="ml-2">{{$t('app.settings.vendors.details.delete_button')}}</span>
                            </b-button>
                        </b-col>
                        <b-col>
                            <div class="float-right mt-3">
                                <b-button class="mx-4" variant="outline-primary " @click="cancelEdit()">
                                    {{$t('app.general.list.cancel_button')}}
                                </b-button>
                                <b-overlay :show="loadingFile" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block">
                                    <b-button variant="primary " @click="save()" v-if="$canAccess('vendorsEdit')">
                                        {{$t('app.general.list.save_button')}}
                                    </b-button>
                                </b-overlay>
                            </div>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-tab>

        <!-- History Tab -->
        <b-tab :title="$t('app.general.details.history_tab')" @click="getHistory()" v-if="$canAccess('auditsList')">
            <timeline :list="auditsList" :showMoreButton="historyParams.showMoreButton" @getMoreHistory="getHistory()"></timeline>
        </b-tab>
    </b-tabs>
</div>
</template>

<script>
import dateMixins from "@/mixins/dateMixins";
import commonMixins from "@/mixins/commonMixins";
import timeline from "@/components/timeline";
import {
    required,
    maxLength
} from "vuelidate/lib/validators";
import WingsUploadImage from "@/components/WingsUploadImage";
import ObjectLabels from '@/components/labels/ObjectLabels.vue';

export default {
    name: 'VendorsDetails',
    components: {
        timeline,
        WingsUploadImage,
        ObjectLabels
    },
    mixins: [
        dateMixins,
        commonMixins
    ],
    data() {
        return {
            vendor: {},
            showUploadFile: false,
            tabIndex: 0,
            loadingFile: false,
            culturesList: [],
            auditsList: [],
            historyParams: {
                pageIndex: 0,
                pageSize: 25,
                fromDate: this.$moment().subtract(1, 'months').format(this.$moment.HTML5_FMT.DATETIME_LOCAL_MS),
                toDate: this.$moment().add(1, 'days').format(this.$moment.HTML5_FMT.DATETIME_LOCAL_MS),
                objectType: "vendor",
                targetID: "",
                showMoreButton: true
            },
        }
    },
    computed: {
        textTitle() {
            return this.vendor.name;
        },
        vendorLogo() {
            if(this.vendor.avatarMediumSquare) {
                return this.vendor.avatarMediumSquare[0];
            }
            return null
        }
    },
    validations: {
        vendor: {
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
    mounted() {
        this.getVendor();
        this.getCultures();
    },
    methods: {
        validateState(element) {
            const {
                $dirty,
                $error
            } = element;
            return $dirty ? !$error : null;
        },
        getVendor() {
            this.$http.get('/vendors/' + this.$route.params.id)
                .then(response => {
                    this.vendor = response.data;
                    this.historyParams.targetID = this.vendor.id;
                    this.tabIndex = 0;
                })
        },
        save() {
            event.preventDefault();
            this.$v.$touch();
            this.loadingFile = true;
            if (!this.$v.vendor.$invalid) {
                this.$http.put('/vendors', this.vendor)
                    .then(() => {
                        this.showToast(this.$t('app.settings.vendors.messages.vendor_updated', {
                            name: this.vendor.name
                        }), 'success');
                        this.loadingFile = false;
                        this.showUploadFile = false;
                        this.$router.push({
                            name: 'vendors'
                        })
                    })
                    .catch(error => {
                        this.showToast(error.message, 'danger');
                        this.loadingFile = false;
                        this.showUploadFile = false;
                    })
            } else {
                this.loadingFile = false;
            }
        },
        cancelEdit() {
            this.$router.push({
                name: 'vendors'
            })
        },
        deleteVendor() {
            this.$swal({
                title: this.$t('app.products.messages.delete_title'),
                text: this.$t('app.products.messages.delete_text'),
                confirmButtonText: this.$t('app.settings.vendors.messages.delete_confirm_button')
            }).then(result => {
                if (result.value) {
                    this.$http.delete('/vendors/' + this.vendor.id)
                        .then(() => {
                            this.showToast(this.$t('app.settings.vendors.messages.deleted_success'), 'success');
                            this.$router.push({
                                name: 'vendors.list'
                            });
                        })
                        .catch(error => {
                            this.showToast(error.message, 'danger');
                        })
                }
            });
        },
        undeleteVendor() {
            this.$http.put('/vendors/' + this.vendor.id)
                .then(() => {
                    this.$bvToast.toast(this.$t("app.settings.vendors.messages.undeleted_success"), {
                        variant: 'success',
                        solid: true,
                        toaster: 'b-toaster-bottom-center'
                    });
                    this.getVendor();
                })
        },
        getHistory() {
            this.startLoading();
            this.$http.post('/audits?PageIndex=' + this.historyParams.pageIndex + '&PageSize=' + this.historyParams.pageSize, this.historyParams)
                .then(response => {
                    if (response.data.length === 0 && this.historyParams.pageIndex == 0) {
                        this.historyParams.showMoreButton = false;
                    }
                    this.auditsList = this.auditsList.concat(response.data);
                    this.historyParams.pageIndex++;
                    if (response.data.length < 25) {
                        this.historyParams.toDate = this.historyParams.fromDate;
                        this.historyParams.fromDate = this.$moment(this.historyParams.fromDate).subtract(1, 'months').format(this.$moment.HTML5_FMT.DATETIME_LOCAL_MS);
                        this.historyParams.pageIndex = 0;
                    }
                    this.stopLoading();
                })
                .catch(error => {
                    this.stopLoading();
                    this.showToast(error.message, 'danger');
                });
        },
        setFile(objectFile) {
            this.loadingFile = true;
            if (objectFile) {
                this.vendor.logo = objectFile.file;
                this.vendor.logoFileName = objectFile.title;
                this.loadingFile = false;
            } else {
                this.vendor.logo = null;
                this.vendor.logoFileName = null;
                this.loadingFile = false;
            }
        },
        clearImage() {
            this.showUploadFile = true;
            this.vendor.logo = {};
        },
        getCultures() {
            this.$http.get('/users/cultures')
                .then(response => {
                    this.culturesList = [];
                    response.data.forEach(culture => {
                        if (culture.cultureId) {
                            var option = {
                                value: culture.cultureId,
                                label: culture.englishName
                            }
                            this.culturesList.push(option);
                        }
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        },
    }
}
</script>

<style>

</style>
