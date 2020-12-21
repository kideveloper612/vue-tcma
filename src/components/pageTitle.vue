<template>
<div>
    <div class="breadcrumb page-title-content">
        <slot>
            <h1>{{page}}</h1>
        </slot>
        <slot name="actions">

        </slot>
    </div>
    <div class="border-top pt-3 mb-3">
        <b-button variant="btn rounded-circle btn-icon btn-gray-200" v-b-tooltip.hover :title="$t('app.general.tooltips.back_button')" v-if="showBack">
            <span class="mdi mdi-arrow-left mdi-24px" @click="$router.go(-1)"></span>
        </b-button>
        <ul class="breadcrumb-pill ml-3" v-if="folder">
            <li>
                <router-link tag="a" class="nav-item-hold" :to="'/app/' + folder.toLowerCase()">
                    {{$t('app.template.navigation.' + folder.replace('/', '.'))}}
                </router-link>
            </li>
            <li v-if="section"> 
                <span v-if="!subsection">
                    {{section}} 
                </span>
                <router-link tag="a" class="nav-item-hold" :to="'/app/' + folder.toLowerCase() + '/details/' + sectionId" v-if="subsection">
                    {{section}}
                </router-link>
            </li>
            <li v-if="subsection"> {{subsection}} </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    props: ['page', 'folder', 'section', 'subsection', 'sectionId', 'showBack'],

}
</script>

<style lang="scss">
h1 {
    font-weight: 500;
}

ul.breadcrumb-pill {
    padding: 4px;
    height: 27px;
    border-radius: 50rem !important;
    background: #ffffff;
    min-width: 0;
    display: inline-block;
    li {
        font-size: 11px;
        padding: 0 13px;
        height: 15px;
        line-height: 15px;
        list-style: none;
        display: inline-block;
    }
    li:not(:last-child) {
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        border-right: 1px solid #C6D0E6;
    }

    li:not(:first-child) {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
    }
}
</style>