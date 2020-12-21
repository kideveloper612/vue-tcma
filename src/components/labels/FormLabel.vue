<template>
  <b-modal id="modal-add-label" :title="getTitle" centered="" :ok-title="$t('app.general.list.save_button')" :cancel-title="$t('app.general.list.cancel_button')" @ok="saveLabel" @shown="init()" v-if="$canAccess('labelsCreate')">
        <b-form>
            <b-badge pill :style="getStyleByColor(newLabel.colorHex)" class="badge-add-label mb-4">{{newLabel.name}}</b-badge>

            <b-form-group id="input-group-name" :label="$t('app.settings.labels.detail.name')" label-for="name">
                <b-form-input id="name" v-model="newLabel.name" :state="validateState($v.newLabel.name)"></b-form-input>
                <div class="text-danger mt-1" v-if="$v.newLabel.name.$error && !$v.newLabel.name.required">{{ $t("app.settings.labels.messages.name_required") }}</div>
            </b-form-group>

            <b-form-group id="input-group-color" :label="$t('app.settings.labels.detail.pick_color')" label-for="color">
                <v-swatches v-model="newLabel.colorHex" :swatches="getDarkColors()" swatch-size="22" inline></v-swatches>
            </b-form-group>

            <b-form-group id="input-group-description" :label="$t('app.settings.labels.detail.description')" label-for="description">
                <b-form-input id="description" v-model="newLabel.description"></b-form-input>
            </b-form-group>

            <div class="mt-4 mb-3 align-items-baseline" :class="{'d-flex': !labelHasValues()}">
                <h5 class="mt-4 mb-3" v-if="labelHasValues()">{{ $t('app.settings.labels.detail.manage_values') }}</h5>
                <h5 class="float-left mr-2" v-if="!labelHasValues()">{{ $t('app.settings.labels.detail.add_new_value') }}</h5>
                <div class="position-relative pr-32 values-content">
                    <b-badge pill class="body-01 mr-2 mb-2 badge-label" v-for="(labelValue, key) of newLabel.labelValues" :key="key" @click="editValue(labelValue)">
                        <span class="pill-label" :style="getStyleByColor(newLabel.colorHex)">{{newLabel.name}}</span>
                        <span class="pill-value" :style="getStyleByColor(labelValue.colorHex)">{{labelValue.name}}</span>
                        <span class="mdi mdi-close icon-link" @click.stop="removeValue(key, labelValue)" :style="getStyleByColor(labelValue.colorHex)"></span>
                    </b-badge>
                    <b-button id="add-value" variant="btn btn-circular btn-small" :class="{'absolute-top-right': labelHasValues()}" v-b-tooltip.hover.topleft :title="$t('app.settings.labels.tooltips.add_value')" @click="addValue">
                        <span class="mdi mdi-plus"></span>
                    </b-button>
                </div>
            </div>
            <b-popover custom-class="popover__value" target="add-value" placement="top" triggers="click" :show.sync="showPopover">
                <template #title>
                    <h5 class="mb-0">{{ $t('app.settings.labels.detail.add_new_value') }}</h5>
                    <b-button variant="btn btn-circular btn-small" @click="cancelValue">
                        <span class="mdi mdi-close"></span>
                    </b-button>
                </template>
                <b-form-group id="input-group-name" :label="$t('app.settings.labels.detail.value_name')" label-for="name">
                    <b-form-input id="name" v-model="newValue.name"></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-color">
                    <v-swatches class="values__swatch" v-model="newValue.colorHex" :swatches="getLightColors()" swatch-size="22" :spacing-size="8" inline></v-swatches>
                </b-form-group>
                <div class="popover-footer">
                    <b-row align-h="end">
                        <b-col class="col-md-auto">
                            <b-button class="btn-tertiary" variant="outline-primary" @click="cancelValue">{{$t('app.general.list.cancel_button')}}</b-button>
                        </b-col>
                        <b-col class="col-md-auto">
                            <b-button variant="outline-primary" @click="saveValue">
                                {{$t('app.general.list.save_button')}}
                            </b-button>
                        </b-col>
                    </b-row>
                </div>
            </b-popover>
        </b-form>
    </b-modal>
</template>

<script>
import commonMixins from "@/mixins/commonMixins";
import colorMixins from "@/mixins/colorMixins";
import {
    required,
} from "vuelidate/lib/validators";

import VSwatches from 'vue-swatches'
import "vue-swatches/dist/vue-swatches.css"

export default {
    name: "FormLabel",
    props: {
        activeLabel: {
            type: Object,
            required: true
        },
    },
    mixins: [
        commonMixins,
        colorMixins
    ],
    data() {
        return {
            newLabel: {},
            newValue: {},
            showPopover: false
        }
    },
    components: {
        VSwatches
    },
    validations: {
        newLabel: {
            name: {
                required
            }
        }
    },
    computed: {
        getTitle() {
            if(this.newLabel.id) {
                return this.$t('app.settings.labels.detail.edit')
            }
            return this.$t('app.settings.labels.detail.create_new')
        }
    },
    methods: {
        init() {
            this.newLabel = this.activeLabel;
        },
        finish() {
            this.$emit('finish');
        },
        saveLabel(event) {
            event.preventDefault();
            this.$v.$touch();
            if (!this.$v.newLabel.$invalid) {
                var currentMethod = '';
                var toastMessage = '';
                if (this.newLabel.id) {
                    currentMethod = 'put';
                    toastMessage = this.$t('app.settings.labels.messages.label_updated');
                } else {
                    currentMethod = 'post';
                    toastMessage = this.$t('app.settings.labels.messages.label_created');
                }
                this.$http('/labels', {
                        method: currentMethod,
                        data: this.newLabel
                    })
                    .then(response => {
                        if (this.newLabel.labelValues) {
                            if(currentMethod == 'post') {
                                this.newLabel.id = response.data;
                            }
                            var currentMethodValue = '';
                            var promises = [];
                            this.newLabel.labelValues.forEach(value => {
                                value.labelId = this.newLabel.id;
                                if (value.id) {
                                    currentMethodValue = 'put';
                                } else {
                                    currentMethodValue = 'post';
                                }
                                promises.push(this.$http('/labels/' + this.newLabel.id + '/values', {
                                    method: currentMethodValue,
                                    data: value
                                }));

                            });
                            if (this.newLabel.removedValues) {
                                this.newLabel.removedValues.forEach(valueId => {
                                    promises.push(this.$http.delete('/labels/' + this.newLabel.id + '/values/' + valueId))
                                });
                            }
                            Promise.all(promises)
                                .then(() => {
                                    this.$bvModal.hide('modal-add-label');
                                    this.showToast(toastMessage, 'success');
                                    this.resetForm();
                                    this.finish();
                                })
                        } else {
                            this.$bvModal.hide('modal-add-label');
                            this.showToast(toastMessage, 'success');
                            this.resetForm();
                            this.finish();
                        }
                    })
                    .catch(error => {
                        this.$bvToast.toast(error.message, {
                            variant: 'danger',
                            solid: true,
                            toaster: 'b-toaster-bottom-center'
                        });
                    });
            }
        },
        resetForm() {
            this.newLabel = {};

            this.$nextTick(() => {
                this.$v.$reset();
            });
        },
        saveValue() {
            if (!this.newLabel.labelValues) {
                this.newLabel.labelValues = [];
            }
            if(!this.newValue.id) {
                this.newLabel.labelValues.push(this.newValue);
            }
            this.showPopover = false;
            this.newValue = {};
        },
        addValue() {
            this.newValue = {};
            this.newValue.colorHex = this.newLabel.colorHex;
            this.showPopover = true;
        },
        editValue(value) {
            this.newValue = value;
            this.showPopover = true;
        },
        cancelValue() {
            this.showPopover = false;
            this.newValue = {};
        },
        removeValue(key, value) {
            this.newLabel.labelValues.splice(key, 1)
            if (!this.newLabel.removedValues) {
                this.newLabel.removedValues = [];
            }
            if (value.id) {
                this.newLabel.removedValues.push(value.id);
            }
            this.$forceUpdate()
        },
        labelHasValues() {
            if (this.newLabel.labelValues && this.newLabel.labelValues.length) {
                return true
            }
            return false
        }
    }
}
</script>

<style lang="scss">
.values-content {
    min-height: 1.5rem;
}

.popover__value {
    .popover-header {
        .btn-circular {
            position: absolute;
            top: 0.25rem;
            right: 0.5rem;
        }
    }

    .values__swatch {
        .vue-swatches__row {
            margin-bottom: 0.5rem;
        }
    }
}
</style>