<template>
<div class="main-content">
    <page-title :page="pageTitle" folder="settings.portal_themes" :section="$t('app.settings.portal_themes.details.breadcrumb_section')" :show-back="true">
        <div slot="actions" class="page-actions">
        </div>
    </page-title>
    <b-tabs class="" v-model="tabIndex" align="center">
        <!-- Layouts -->
        <b-tab :title="$t('app.settings.portal_themes.details.layouts_tab')">
        </b-tab>

        <!-- Layouts -->
        <b-tab :title="$t('app.settings.portal_themes.details.widgets_tab')">
        </b-tab>

        <!-- Layouts -->
        <b-tab :title="$t('app.settings.portal_themes.details.menus_tab')" @click.prevent.stop="getInitialMenuList()">
        </b-tab>

        <!-- Layouts -->
        <b-tab :title="$t('app.settings.portal_themes.details.inside_page_layouts')">
        </b-tab>

        <!-- Layouts -->
        <b-tab :title="$t('app.settings.portal_themes.details.style')">
        </b-tab>

    </b-tabs>

    <div class="float-right d-block mb-4">
        <fab-extended-button @event="$bvModal.show('modal-add-vendor')" :label="$t('app.settings.portal_themes.modal.add_menu')"></fab-extended-button>
    </div>

    <div class="clearfix"></div>

    <b-card-group deck class="menu-group mb-4">
        <b-card v-for="menu in menuList" :key="menu.id" :title="menu.name" class="min-width-30" @mouseenter="setMenu(menu)">
            <b-card-text>
                {{$t('app.settings.portal_themes.menus.lorem_text')}}
            </b-card-text>
            <template>
                <router-link tag="a" :to="'/settings/portal_themes/add_menu/' + menu.id" >
                    <strong class="text-primary float-right">{{$t('app.settings.portal_themes.menus.edit_menu')}}</strong>
                </router-link>
            </template>
        </b-card>
    </b-card-group>

    <!-- Add Menu Modal -->
    <b-modal v-model="show" id="modal-add-vendor" size="md" centered="" ok-only @ok="save" no-close-on-backdrop no-close-on-esc>
        <template #modal-title>
            <h3>
                {{$t('app.settings.portal_themes.modal.add_menu')}}
            </h3>
        </template>
        <b-form>
            <b-row>
                <b-col>
                    <b-form-group id="input-group-title" :label="$t('app.settings.portal_themes.modal.title_field')" label-for="title">
                        <b-form-input id="title" v-model="newMenu.title" :state="validateState($v.newMenu.title)"></b-form-input>
                        <div class="text-danger mt-1" v-if="$v.newMenu.title.$error && !$v.newMenu.title.required">{{ $t("app.settings.portal_themes.menus.messages.title_required") }}</div>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-checkbox
                        id="mega-checkbox"
                        v-model="megaCheckBox"
                        name="mega-checkbox"
                        value="checked"
                        unchecked-value="not_checked"
                        size="lg"
                        >
                        {{$t('app.settings.portal_themes.menus.check_box')}}
                    </b-form-checkbox>
                </b-col>
            </b-row>
        </b-form>
        <template v-slot:modal-footer="{ ok }">
            <b-overlay rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block">
                <b-button variant="outline-primary" @click="show=false" class="mr-4">
                    {{$t('app.general.list.cancel_button')}}
                </b-button>
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
import menuMixins from "@/mixins/menuMixins"
import { mapActions, mapGetters } from 'vuex';
import { required, maxLength} from "vuelidate/lib/validators";
import fabExtendedButton from "@/components/fabExtendedButton";


export default {
    name: 'PortalThemesList',
    components: {
        fabExtendedButton
    },
    mixins: [
        dateMixins,
        commonMixins,
        menuMixins
    ],
    data() {
        return {
            tabIndex: 0,
            pageTitle: 'Vintage',
            themeID: '',
            menuList: [],
            newMenu: {},
            megaCheckBox: false,
            show: false
        }
    },
    computed: {
    },
    validations: {
        newMenu: {
            title: {
                required,
                maxLength: maxLength(125)
            },
        }
    },
    mounted() {
        this.getInitialMenuList();
    },
    methods: {
        getInitialMenuList() {
            this.tabIndex = 2;
            if (this.getMenuList.length > 0) {
                this.menuList = this.getMenuList;
            } else {
                this.startLoading();
                this.$http.get(`/themes`).then(res => {
                    if (res.data && res.data.length > 0) {
                        this.setThemeID(res.data[0].id);
                        this.themeID = this.getThemeID;
                        this.$http.get(`/themes/${this.themeID}/menus`).then(res => {
                            if (res.data) {
                                this.setMenuList(res.data);
                            }
                            this.menuList = this.getMenuList;
                            this.stopLoading();
                        }, error => {
                            this.stopLoading();
                            console.log(error);
                        });
                    }
                }, error => {
                    console.log(error);
                });
            }
            
        },
        resetForm() {
            this.newMenu = {};

            this.$nextTick(() => {
                this.$v.$reset();
            });
        },
        save(event) {
            event.preventDefault();
            this.$v.$touch();
            if (!this.$v.$invalid) {
                const data = {
                    'name': this.newMenu.title
                }
                
                this.$http.post(`/themes/${this.themeID}/menus/`, data).then(res => {
                    this.menuList.push(res.data[0]);
                    this.showToast(this.$t("app.settings.portal_themes.menus.messages.created"), 'success');
                    this.$bvModal.hide('modal-add-vendor');
                    this.resetForm();
                    
                }).catch(error => {
                    this.showToast(error.message, 'danger');
                });
            } else {
                this.loadingFile = false;
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.menu-group {
    display: grid !important;;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
}

@media only screen and (max-width: 992px) {
    .menu-group {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media only screen and (max-width: 576px) {
    .menu-group {
        grid-template-columns: repeat(1, 1fr);
    }
}

</style>
