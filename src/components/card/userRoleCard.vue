<template>
<b-card no-body class="card-userrole o-hidden" :class="{'card__deleted': cardIsDeleted}">
    <div class="d-flex flex-column card__body">
        <div class="p-3 w-100 text-center">
            <b-avatar size="5rem" variant="gray-200 text-gray-500" class="userrole__image" text-primary :src="cardImage" icon="key-fill">
            </b-avatar>
        </div>
        <div class="flex-grow-1 px-3 pb-2">
            <h6 class="m-0 card__title">{{cardTitle}}</h6>
            <div class="card__description">{{cardDescription}}</div>
            <slot name="labels"></slot>
            <router-link :to="cardRoute" v-if="cardShowLink">
                <div class="see-details">{{ $t('app.general.list.details_button') }}</div>
            </router-link>
        </div>
    </div>
    <b-badge class="badge-deleted" v-if="cardIsDeleted">{{$t('app.general.list.label_deleted')}}</b-badge>
    <div class="delete-action">
        <b-button variant="btn rounded-circle btn-outline-gray-100 btn-tertiary-icon" v-b-tooltip.hover :title="$t('app.userroles.tooltips.delete_role')" v-if="!cardIsDeleted && cardCanDelete">
            <span class="btn-icon mdi mdi-trash-can-outline delete" @click="callDeleteUser()"></span>
        </b-button>
        <b-button variant="btn rounded-circle btn-outline-gray-100 btn-tertiary-icon" v-b-tooltip.hover :title="$t('app.userroles.tooltips.undelete_role')" v-if="cardIsDeleted && cardCanEdit">
            <span class="btn-icon mdi mdi-delete-restore undelete" @click="callUndeleteUser()"></span>
        </b-button>
    </div>
</b-card>
</template>

<script>
export default {
    props: ['cardImage', 'cardAvatarText', 'cardIsDeleted', 'cardTitle', 'cardDescription', 'cardShowLink', 'cardRoute', 'cardCanDelete', 'cardCanEdit'],
    methods: {
        callDeleteUser() {
            this.$emit('cardDeleteAction');
        },
        callUndeleteUser() {
            this.$emit('cardUndeleteAction');
        }
    }
}
</script>

<style>

</style>