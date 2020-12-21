<template>
<b-card no-body class="card-user o-hidden" :class="{'card__deleted': cardIsDeleted}">
    <div class="d-flex flex-column flex-sm-row card__body">
        <div class="p-3">
            <b-avatar size="5rem" variant="gray-400 text-white" text-primary :src="cardImage" :text="cardAvatarText">
            </b-avatar>
        </div>
        <div class="flex-grow-1 pl-2 pr-3 pt-30">
            <h4 class="m-0">{{cardTitle}}</h4>
            <slot name="labels"></slot>
            <router-link :to="cardRoute" v-if="cardShowLink">
                <div class="see-details">{{ $t('app.general.list.details_button') }}</div>
            </router-link>
        </div>
    </div>
    <b-badge class="badge-deleted" v-if="cardIsDeleted">{{$t('app.general.list.label_deleted')}}</b-badge>
    <div class="delete-action">
        <b-button variant="btn rounded-circle btn-outline-gray-100 btn-tertiary-icon" v-b-tooltip.hover :title="$t('app.users.tooltips.delete_user')" v-if="!cardIsDeleted && cardCanDelete">
            <span class="btn-icon mdi mdi-trash-can-outline delete" @click="callDeleteUser()"></span>
        </b-button>
        <b-button variant="btn rounded-circle btn-outline-gray-100 btn-tertiary-icon" v-b-tooltip.hover :title="$t('app.users.tooltips.undelete_user')" v-if="cardIsDeleted && cardCanEdit">
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