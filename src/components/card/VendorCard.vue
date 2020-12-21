<template>
<b-card no-body class="card-ecommerce-3 o-hidden" :class="{'card__deleted': isDeleted(cardObject)}">
    <div class="d-flex flex-column flex-sm-row card__body">
        <div>
            <b-avatar square class="card-img-left" variant="text-gray-400" text-primary :src="cardObject.fileLogoUrl" icon="image">
            </b-avatar>
        </div>
        <div class="flex-grow-1 pt-30 pl-4 pr-3">
            <h5 class="mb-2">{{cardObject.name}}</h5>
            <p class="text-description text-one-line m-0">
                <span class="t-font-bolder">
                    {{$t('app.settings.vendors.details.contact_field')}}:
                </span>
                {{cardObject.contactPerson}}
            </p>
            <p class="text-description text-one-line m-0">
                <span class="t-font-bolder">
                    {{$t('app.settings.vendors.details.email')}}:
                </span>
                {{cardObject.email}}
            </p>
            <slot name="labels"></slot>
            <router-link :to="cardRoute" v-if="cardShowLink">
                <div class="see-details">{{ $t('app.general.list.details_button') }}</div>
            </router-link>
        </div>
    </div>
    <div class="delete-action">
        <b-button variant="btn rounded-circle btn-outline-gray-100 btn-tertiary-icon" v-b-tooltip.hover :title="cardTooltipUndeleteButton" v-if="isDeleted(cardObject) && cardCanEdit">
            <span class="btn-icon mdi mdi-delete-restore undelete" @click="callUndelete()"></span>
        </b-button>
    </div>
    <b-badge class="badge-deleted" v-if="isDeleted(cardObject)">{{$t('app.general.list.label_deleted')}}</b-badge>
</b-card>
</template>

<script>
import dateMixins from "@/mixins/dateMixins";
export default {
    name: 'VendorCard',
    // props: ['cardImage', 'cardIsDeleted', 'cardTitle', 'cardDescription', 'cardShowLink', 'cardRoute', 'cardTooltipUndeleteButton', 'cardCanEdit'],
    props: ['cardObject', 'cardShowLink', 'cardRoute', 'cardTooltipUndeleteButton', 'cardCanEdit'],
    mixins: [
        dateMixins
    ],
    methods: {
        callUndelete() {
            this.$emit('cardUndeleteAction');
        }
    }
}
</script>

<style>

</style>
