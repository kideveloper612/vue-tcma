<template>
<b-card no-body class="card-ecommerce-3 o-hidden">
    <div class="d-flex flex-column card__body">
        <div>
            <b-img-lazy v-bind="mainProps" :src="cardObject.previewMediumSquare[0]" v-if="cardObject"></b-img-lazy>

            <wings-upload-image :label="$t('app.general.components.upload_image_label')" :instant-upload="true" @callUpload="callUpload" v-if="!cardObject">
            </wings-upload-image>
        </div>
        <div class="flex-grow-1 p-3 pb-0">
            <h6 class="mb-3" :class="{'text-gray-400': !cardObject}">{{cardTitle}}</h6>
            <div class="ul-widget-card__rate-icon --version-2 justify-content-space-between">
                <b-col class="p-0 md-auto">
                    <b-button variant="btn rounded-circle btn-outline-gray-100 btn-tertiary-icon" v-b-tooltip.hover :title="$t('app.products.images.main')" @click="callMainImage()" v-if="cardCanEdit && cardObject">
                        <span class="mdi mdi-home-outline mdi-18px p-0 m-0" :class="{'text-success': cardIndex === 0}"></span>
                    </b-button>
                    <b-button variant="btn rounded-circle btn-outline-gray-100 btn-tertiary-icon" v-b-tooltip.hover :title="$t('app.products.images.upload')" @click="callUploadForm()" v-if="cardCanEdit && !cardObject">
                        <span class="mdi mdi-cloud-upload-outline mdi-18px p-0 m-0"></span>
                    </b-button>
                    <b-button variant="btn rounded-circle btn-outline-gray-100 btn-tertiary-icon" v-b-tooltip.hover :title="$t('app.products.images.view_full')" @click="callZoom()" v-if="cardCanEdit && cardObject">
                        <span class="mdi mdi-magnify-plus-outline mdi-18px p-0 m-0"></span>
                    </b-button>
                </b-col>
                <b-col class="p-0 col-md-auto text-right">
                    <b-button variant="btn rounded-circle btn-outline-gray-100 btn-tertiary-icon" v-b-tooltip.hover :title="$t('app.products.images.delete')" @click="callDelete()" v-if="cardCanEdit && cardObject">
                        <span class="mdi mdi-trash-can-outline mdi-18px text-danger p-0 m-0"></span>
                    </b-button>
                </b-col>
            </div>
        </div>
    </div>
</b-card>
</template>

<script>
import dateMixins from "@/mixins/dateMixins";
import WingsUploadImage from "@/components/WingsUploadImage";

export default {
    name: 'ProductImageCard',
    props: ['cardObject', 'cardCanEdit', 'cardIndex', 'showLoading'],
    mixins: [
        dateMixins
    ],
    components: {
        WingsUploadImage
    },
    data() {
        return {
            mainProps: {
                center: true,
                fluidGrow: true,
                blank: true,
                blankColor: '#596680',
                class: 'card-img-top'
            }
        }
    },
    computed: {
        cardTitle() {
            return this.cardObject ? this.cardObject.title : this.$t('app.products.images.new_title');
        }
    },
    methods: {
        callMainImage() {
            this.$emit('cardMainAction');
        },
        callUpload(file) {
            this.$emit('cardUploadAction', file, this.cardIndex);
        },
        callZoom() {
            this.$emit('cardZoomAction');
        },
        callDelete() {
            this.$emit('cardDeleteAction', this.cardObject);
        },
        callUploadForm() {
            this.$emit('cardUploadFormAction');
        }
    }
}
</script>

<style>
</style>
