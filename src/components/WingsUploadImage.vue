<template>
<div :class="{'content-upload': !instantUpload}">
    <div class="container-image">
        <div class="image-box">
            <vue-cropper ref="cropper" :guides="true" :view-mode="1" :aspect-ratio="1" :auto-crop-area="1" drag-mode="move" :crop-box-resizable="false" :crop-box-movable="false" :rotatable="true" :zoom-on-wheel="false"
                :src="imageSource" v-if="imageSource" :class="{'d-none': !showCrop}" preview=".preview" @crop="cropFile()">
            </vue-cropper>
            <div class="preview" v-if="imageSource && !showCrop">
            </div>
            <b-form-file accept="image/*" @change="setFile" v-if="!imageSource">
                <template slot="placeholder">
                    <div class="box-info">
                        <div class="mdi mdi-cloud-upload-outline mdi-60px"></div>
                        <p class="text-16 p-2">
                            {{label}}
                        </p>
                    </div>
                </template>
                <template slot="drop-placeholder">
                    <div class="box-info">
                        <div class="mdi mdi-cloud-upload-outline mdi-60px"></div>
                        <p class="text-16 p-2">
                            {{label}}
                        </p>
                    </div>
                </template>
                <template slot="file-name">
                    <b-overlay :show="true" rounded opacity="0.6" spinner-small spinner-variant="primary">
                        <div class="box-info">
                            <div class="mdi mdi-cloud-upload-outline mdi-60px"></div>
                            <p class="text-16 p-2">
                                {{label}}
                            </p>
                        </div>
                    </b-overlay>
                </template>
            </b-form-file>

        </div>
    </div>
    <b-row align-h="between" class="no-gutters p-2 actions-upload" v-if="showCrop">
        <b-col class="col-md-auto">
            <b-button-group size="sm">
                <b-button variant="gray-100" @click="zoomOut()">
                    <span class="mdi mdi-magnify-minus-outline"></span>
                </b-button>
                <b-button variant="gray-100" @click="zoomIn()">
                    <span class="mdi mdi-magnify-plus-outline"></span>
                </b-button>
            </b-button-group>
        </b-col>
        <b-col class="col-md-auto">
            <b-button-group size="sm">
                <b-button variant="gray-100" @click="rotateLeft()">
                    <span class="mdi mdi-rotate-left"></span>
                </b-button>
                <b-button variant="gray-100" @click="rotateRight()">
                    <span class="mdi mdi-rotate-right"></span>
                </b-button>
            </b-button-group>
        </b-col>
        <b-col class="text-right col-md-auto">
            <b-button-group size="sm">
                <b-button variant="gray-100" @click="clear()">
                    <span class="mdi mdi-close"></span>
                </b-button>
            </b-button-group>
        </b-col>
    </b-row>
    <b-row align-h="center" class="no-gutters p-2 actions-upload" v-if="imageSource && !showCrop">
        <b-col class="col-md-auto">
            <b-button-group size="sm">
                <b-button variant="gray-100" @click="clear()">
                    <span class="mdi mdi-close"></span>
                </b-button>
            </b-button-group>
        </b-col>
    </b-row>
</div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

export default {
    name: 'WingsUploadImage',
    props: ['label', 'showCrop', 'instantUpload'],
    components: {
        VueCropper
    },
    data() {
        return {
            imageSource: null,
            returnData: {}
        }
    },
    methods: {
        setFile(e) {
            let file = null;
            if (e.target.files) {
                file = e.target.files[0];
            } else if (e.dataTransfer.files) {
                file = e.dataTransfer.files[0];
            }
            if (typeof FileReader === "function") {
                const reader = new FileReader();
                reader.onload = event => {
                    this.returnData.file = event.target.result.replace(/^.+?(\bbase64\b)/, '').substring(1);
                    if (!this.instantUpload) {
                        this.imageSource = event.target.result;
                    }
                };
                reader.onloadend = () => {
                    if(this.instantUpload) {
                        this.$emit('callUpload', this.returnData);
                    }
                }
                if (file) {
                    this.returnData.title = file.name;
                    reader.readAsDataURL(file);
                } else {
                    this.returnData.title = null;
                }
            } else {
                console.log("Sorry, FileReader API not supported");
            }
        },
        zoomIn() {
            this.$refs.cropper.relativeZoom(0.1);
        },
        zoomOut() {
            this.$refs.cropper.relativeZoom(-0.1);
        },
        clear() {
            this.$refs.cropper.clear();
            this.imageSource = null;
            this.$emit('clear');
        },
        rotateRight() {
            this.$refs.cropper.rotate(45);
        },
        rotateLeft() {
            this.$refs.cropper.rotate(-45);
        },
        cropFile() {
            this.returnData.file = this.$refs.cropper.getCroppedCanvas().toDataURL().replace(/^.+?(\bbase64\b)/, '').substring(1);
            this.$emit('callUpload', this.returnData);
        }
    }
}
</script>

<style lang="scss">
.container-image {
    width: 100%;
    padding-top: 100%;
    position: relative;
}

.image-box {
    position: absolute;

    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 10px;

    .custom-file,
    .custom-file-input,
    .custom-file-label {
        height: 100%;
    }

    .custom-file-input {
        &:focus {
            outline: none;
        }
    }

    .custom-file-label {
        color: $gray-300;
        white-space: normal;
        text-align: center;
        cursor: pointer;
        border: 1px dashed $gray-500;
        padding: 0;
        margin: 0;

        &::after {
            display: none;
        }

        .form-file-text {
            display: flex !important;
            height: 100%;
        }
    }

    .dragging {
        border: 2px solid $blue;
        background: $gray-200;
    }

    .custom-file-input:focus~.custom-file-label {
        box-shadow: none;
    }

    .box-info {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    // .cropper-container {
    //     height: auto !important;

    //     .cropper-crop-box {
    //         transform: none !important;
    //         //definir width and height
    //         width: 180px;
    //         height: 180px;
    //         img {
    //             transform: none !important;
    //         }
    //     }
    // }

    .preview {
        overflow: hidden;
        width: 100%;
        height: 100%;
    }

}
.content-upload {
    border: 1px solid $gray-500;
    
    .actions-upload {
        background: $gray-500;
    }
}
</style>
