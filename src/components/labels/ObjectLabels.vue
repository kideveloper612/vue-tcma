<template>
<div class="labels-container mb-2" :class="{'can-overflow': canShowAdd}" ref="labelsContainer">
    <b-badge pill class="body-02 mr-1 mb-1 badge-label" v-for="label of assignedLabels" :key="label.id">
        <span class="pill-label" :style="getStyleByColor(label.labelColorHex)">{{label.labelName}}</span>
        <span class="pill-value" :style="getStyleByColor(label.valueColorHex)">{{label.valueName}}</span>
    </b-badge>
    <b-button :id="getPopoverId" variant="btn btn-circular btn-small" class="button-show-more" v-b-tooltip.hover :title="$t('app.settings.labels.tooltips.show_more')" @click="showPopover = true" v-if="showMoreLabels">
        <span class="mdi mdi-dots-horizontal mdi-18px p-0 m-0"></span>
    </b-button>
    <b-popover custom-class="popover__value" :target="getPopoverId" placement="topleft" triggers="click" :show.sync="showPopover" v-if="showMoreLabels">
        <template #title>
            <h5 class="mb-0">{{ $t('app.settings.labels.detail.all_labels') }}</h5>
            <b-button variant="btn btn-circular btn-small" @click="cancelPopover">
                <span class="mdi mdi-close"></span>
            </b-button>
        </template>
        <b-badge pill class="body-02 mr-1 mb-1 badge-label" v-for="label of assignedLabels" :key="label.id">
            <span class="pill-label" :style="getStyleByColor(label.labelColorHex)">{{label.labelName}}</span>
            <span class="pill-value" :style="getStyleByColor(label.valueColorHex)">{{label.valueName}}</span>
        </b-badge>
    </b-popover>

    <b-button :id="getPopoverId" variant="btn btn-circular" class="button-add-label" v-b-tooltip.hover :title="$t('app.settings.labels.tooltips.label_add')" @click="addLabel" v-if="canShowAdd">
        <span class="mdi mdi-plus mdi-18px p-0 m-0"></span>
    </b-button>

    <b-modal id="modal-add-label" :title="$t('app.settings.labels.list.add')" centered="" :ok-title="$t('app.general.list.save_button')" :cancel-title="$t('app.general.list.cancel_button')" @ok="saveAddLabel">
        <div class="accordion mt-32">
            <b-card no-body class="ul-card__border-radius accordion__item" v-for="(label, index) of filteredLabels" :key="label.id">
                <b-card-header header-tag="header" class="accordion__title">
                    <b-button block class="accordion_btn bg-white" href="#" v-b-toggle="'accordion-' + index.toString()" variant="transparent" @click="getValues(label)">
                        <b-row align-v="baseline" align-h="between">
                            <b-col class="col-md-auto d-flex">
                                <b-badge pill :style="getStyleByColor(label.colorHex)" class="mr-32">{{label.name}}</b-badge>
                            </b-col>
                            <b-col class="col-md-auto d-flex">
                                <span class="mdi mdi-chevron-down mdi-24px ml-3" :class="{'mdi-chevron-up': label.opened}"></span>
                            </b-col>
                        </b-row>
                    </b-button>
                </b-card-header>
                <b-collapse :id="'accordion-' + index.toString()" class="bg-gray-200" :accordion="index.toString()" role="tabpanel" v-model="label.opened">
                    <b-card-body class="accordion__body pb-3">
                        <div class="body-02 mb-2">{{$t('app.settings.labels.list.label_values')}}</div>
                        <b-badge pill class="body-02 mr-2 mb-2 badge-checkbox" v-for="labelValue of label.labelValues" :key="labelValue.id" :style="getStyleByColor(label.colorHex)">
                            <b-form-checkbox size="sm" button-variant="primary-outline" v-model="checkedValues[labelValue.id]" @change="updateSavedCheckList($event, labelValue)">
                                <span class="body-02 pill-label" :style="getStyleByColor(label.colorHex)">{{label.name}}</span>
                                <span class="body-02 pill-value" :style="getStyleByColor(labelValue.colorHex)">{{labelValue.name}}</span>
                            </b-form-checkbox>
                        </b-badge>
                    </b-card-body>
                </b-collapse>
            </b-card>
        </div>
    </b-modal>
</div>
</template>

<script>
import colorMixins from "@/mixins/colorMixins";
import commonMixins from "@/mixins/commonMixins";

export default {
    name: 'ObjectLabels',
    props: {
        objectId: {
            type: String,
            required: true
        },
        objectType: {
            type: String,
            required: true
        },
        assignedLabels: {
            type: Array
        },
        canShowMore: {
            type: Boolean
        },
        canShowAdd: {
            type: Boolean
        }
    },
    mixins: [
        colorMixins,
        commonMixins
    ],
    computed: {
        getPopoverId() {
            return 'popover-' + this.objectId;
        }
    },
    data() {
        return {
            filteredLabels: [],
            showMoreLabels: false,
            showPopover: false,
            saveLabelsList: [],
            removeLabelsList: [],
            checkedValues: []
        }
    },
    mounted() {
        this.initCheckedValues();
        this.showMoreLabels = this.isOverflowing() && this.canShowMore && !this.canShowAdd;
    },
    updated() {
        this.showMoreLabels = this.isOverflowing() && this.canShowMore && !this.canShowAdd;
    },
    methods: {
        isOverflowing() {
            var element = this.$refs.labelsContainer;
            if (element) {
                return (element.offsetHeight < element.scrollHeight)
            }
            return false;
        },
        cancelPopover() {
            this.showPopover = false;
        },
        addLabel() {
            this.getLabels();
            this.$bvModal.show('modal-add-label');
        },
        getLabels() {
            this.startLoading();
            this.$http.get('/labels')
                .then(response => {
                    this.filteredLabels = response.data;
                    this.stopLoading();
                })
                .catch(error => {
                    this.stopLoading();
                    console.log(error)
                });
        },
        getValues(label) {
            if (!label.opened) {
                this.startLoading();
                this.$http.get('/labels/' + label.id)
                    .then(response => {
                        label.labelValues = response.data.labelValues;
                        this.stopLoading();
                    })
                    .catch(error => {
                        this.stopLoading();
                        console.log(error)
                    });
            }
        },
        initCheckedValues() {
            this.checkedValues = [];
            this.assignedLabels.forEach(element => {
                var newItem = {
                    id: element.labelValueID,
                    labelId: element.labelID,
                    checked: true
                }
                this.checkedValues[element.labelValueID] = true;
                this.saveLabelsList.push(newItem)
            });
        },
        updateSavedCheckList(event, labelValue) {
            if (event) {
                this.saveLabelsList.push(labelValue)
                var indexRemove = this.removeLabelsList.findIndex(lv => lv.id == labelValue.id);
                if (indexRemove > -1) {
                    this.removeLabelsList.splice(indexRemove, 1)
                }
            } else {
                var indexAdd = this.saveLabelsList.findIndex(lv => lv.id == labelValue.id);
                if (indexAdd > -1) {
                    this.saveLabelsList.splice(indexAdd, 1)
                }
                this.removeLabelsList.push(labelValue)
            }
        },
        saveAddLabel() {
            var promises = [];
            this.saveLabelsList.forEach(element => {
                if(!this.assignedLabels.find(label => label.labelValueID == element.id)) {
                    var saveElement = {
                        labelValueID: element.id,
                        targetObjectID: this.objectId,
                        targetType: this.objectType
                    }
                    promises.push(this.$http.post('/labels/' + element.labelId + '/assignments', saveElement));
                }
            });
            this.removeLabelsList.forEach(element => {
                var index = this.assignedLabels.findIndex(label => label.labelValueID == element.id)
                if(index > -1) {
                    var selectedLabel = this.assignedLabels[index];
                    promises.push(this.$http.delete('/labels/' + element.labelId + '/assignments/' + selectedLabel.assignmentID));
                }
            });

            Promise.all(promises)
                .then(() => {
                    this.$bvModal.hide('modal-add-label');
                    this.showToast(this.$t('app.settings.labels.messages.assigned_success'), 'success');
                    this.finish();
                })
        },
        finish() {
            this.$emit('assignLabels');
            this.$forceUpdate();
        },
    }
}
</script>

<style lang="scss">
.labels-container {
    position: relative;
    background: white;
    padding: 0.5rem 0.75rem;
    padding-right: 2rem;
    height: 53px;
    overflow: hidden;
}

.can-overflow {
    overflow: none;
    height: auto;
    min-height: 53px;
}

.button-show-more,
.button-add-label {
    position: absolute;
    right: 0.5rem;
    top: 14px;
}

.button-add-label {
    top: 9px;
}

.popover__add-label {
    min-width: 472px !important;

    .popover-header {
        .btn-circular {
            position: absolute;
            top: 0.25rem;
            right: 0.5rem;
        }
    }
}
</style>
