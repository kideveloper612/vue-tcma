<template>
<b-col>
    <span class="float-right">
        <span class="text-right mr-3 align-middle">{{label}}</span>
        <label class="switch switch-primary">
            <input type="checkbox" v-bind:value="value" v-on:input="$emit('input', $event.target.checked)">
            <span class="slider"></span>
        </label>
    </span>
</b-col>
</template>

<script>
export default {
    props: ['value', 'label'],
    data() {
        return {
            content: this.value
        }
    },
    methods: {
        handleInput(e) {
            this.$emit('input', this.content)
        }
    }
}
</script>

<style lang="scss">
</style>
