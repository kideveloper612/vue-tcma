<template>
<b-card no-body class="card-ecommerce-3 o-hidden" :class="{'card__deleted': cardIsDeleted}">
    <div class="d-flex flex-column flex-sm-row card__body">
        <div>
            <b-avatar square class="card-img-left" variant="text-gray-400" text-primary :src="cardImage" icon="image">
            </b-avatar>
        </div>
        <div class="flex-grow-1 pt-30 pl-4 pr-3">
            <h5 class="m-0">{{cardTitle}}</h5>
            <p class="text-description mt-2 mb-0">{{cardDescription}}</p>
            <slot name="labels"></slot>
            <router-link :to="cardRoute" v-if="cardShowLink">
                <div class="see-details">{{ $t('app.general.list.details_button') }}</div>
            </router-link>
        </div>
    </div>
    <div class="delete-action">
        <b-button variant="btn rounded-circle btn-outline-gray-100 btn-tertiary-icon" v-b-tooltip.hover :title="cardTooltipUndeleteButton" v-if="cardIsDeleted && cardCanEdit">
            <span class="btn-icon mdi mdi-delete-restore undelete" @click="callUndelete()"></span>
        </b-button>
    </div>
    <b-badge class="badge-deleted" v-if="cardIsDeleted">{{$t('app.general.list.label_deleted')}}</b-badge>
</b-card>
</template>

<script>
export default {
    props: ['cardImage', 'cardIsDeleted', 'cardTitle', 'cardDescription', 'cardShowLink', 'cardRoute', 'cardTooltipUndeleteButton', 'cardCanEdit'],
    methods: {
        callUndelete() {
            this.$emit('cardUndeleteAction');
        }
    }
}
</script>

<style>

</style>
