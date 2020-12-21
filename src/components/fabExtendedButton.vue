<template>
<span>
    <b-button variant="primary rounded" class="extended-fab d-none d-md-flex" @click="$emit('event')" :disabled="disabled">
        <span class="mr-2">{{ label }}</span>
        <span class="mdi mdi-plus mdi-24px"></span>
    </b-button>
    <b-button variant="primary btn-icon rounded-circle" class="d-block d-md-none" @click="$emit('event')" :disabled="disabled">
        <span class="mdi mdi-plus mdi-24px"></span>
    </b-button>
</span>
</template>

<script>
export default {
    props: ['label', 'disabled'],
}
</script>

<style lang="scss">
.extended-fab {
    padding: 3px 10px 3px 20px;
    display: flex;
    align-items: center;
}
</style>
