<template>
<div class="side-content-wrap" @mouseenter="isMenuOver = true" @mouseleave="isMenuOver = false" @touchstart="isMenuOver = true">
    <vue-perfect-scrollbar :settings="{ suppressScrollX: true, wheelPropagation: false }" :class="{ open: getSideBarToggleProperties.isSideNavOpen }" ref="myData" class="sidebar-left rtl-ps-none ps scroll">
        <div>
            <ul class="navigation-left">
                <li class="nav-item" :class="{ active: selectedRoute('dashboard') }" :data-submenu="false" @click="selectedRoute()">
                    <router-link tag="a" class="nav-item-hold" :to="{ name: 'dashboard'}">
                        <span class="mdi mdi-view-dashboard-outline mdi-28px"></span>
                        <span class="nav-text">{{ $t("app.template.navigation.dashboard") }}</span>
                    </router-link>
                    <div class="triangle"></div>
                </li>

                <li id="activity" :class="{ active: selectedRoute('activity') }" class="nav-item" @click.prevent.stop="toggleSubMenu('activity')">
                    <a class="nav-item-hold" href="#">
                        <span class="mdi mdi-axis-z-arrow mdi-28px"></span>
                        <span class="nav-text">{{ $t("app.template.navigation.activity") }}</span>
                    </a>
                    <div class="triangle"></div>
                </li>

                <li id="templates" :class="{ active: selectedRoute('templates') }" class="nav-item" @click.prevent.stop="toggleSubMenu('templates')">
                    <a class="nav-item-hold" href="#">
                        <span class="mdi mdi-file-cog-outline mdi-28px"></span>
                        <span class="nav-text">{{ $t("app.template.navigation.templates") }}</span>
                    </a>
                    <div class="triangle"></div>
                </li>

                <li id="assets" :class="{ active: selectedRoute('assets') }" class="nav-item" @click.prevent.stop="toggleSubMenu('assets')">
                    <a class="nav-item-hold" href="#">
                        <span class="mdi mdi-puzzle-outline mdi-28px"></span>
                        <span class="nav-text">{{ $t("app.template.navigation.assets") }}</span>
                    </a>
                    <div class="triangle"></div>
                </li>

                <li id="workflows" :class="{ active: selectedRoute('workflows') }" class="nav-item" @click.prevent.stop="toggleSubMenu('workflows')">
                    <a class="nav-item-hold" href="#">
                        <span class="mdi mdi-file-tree-outline mdi-28px"></span>
                        <span class="nav-text">{{ $t("app.template.navigation.workflows") }}</span>
                    </a>
                    <div class="triangle"></div>
                </li>

                <li id="products" :class="{ active: selectedRoute('products') }" class="nav-item" @click.prevent.stop="toggleSubMenu('products')">
                    <a class="nav-item-hold" href="#">
                        <span class="mdi mdi-language-xaml mdi-28px"></span>
                        <span class="nav-text">{{ $t("app.template.navigation.products") }}</span>
                    </a>
                    <div class="triangle"></div>
                </li>

                <li id="settings" :class="{ active: selectedRoute('settings') }" class="nav-item" @click.prevent.stop="toggleSubMenu('settings')">
                    <a class="nav-item-hold" href="#">
                        <span class="mdi mdi-cog-outline mdi-28px"></span>
                        <span class="nav-text">{{ $t("app.template.navigation.settings.main") }}</span>
                    </a>
                    <div class="triangle"></div>
                </li>

                <li id="audits" :class="{ active: selectedRoute('audits') }" class="nav-item" @click.prevent.stop="toggleSubMenu('audits')">
                    <a class="nav-item-hold" href="#">
                        <span class="mdi mdi-file-clock-outline mdi-28px"></span>
                        <span class="nav-text">{{ $t("app.template.navigation.audits") }}</span>
                    </a>
                    <div class="triangle"></div>
                </li>

            </ul>
        </div>
    </vue-perfect-scrollbar>

    <vue-perfect-scrollbar :class="{ open: getSideBarToggleProperties.isSecondarySideNavOpen }" :settings="{ suppressScrollX: true, wheelPropagation: false }" class="sidebar-left-secondary ps rtl-ps-none">
        <div ref="sidebarChild">
            <ul class="childNav d-none" data-parent="activity" :class="{ 'd-block': selectedParentMenu == 'activity' }">
                <li :class="{ active: selectedRoute('activity') }" class="nav-item">
                    <router-link tag="a" class="nav-item-hold" :to="{ name: 'activity'}">
                        <span class="nav-icon mdi mdi-factory mdi-28px"></span>
                        <span class="item-name">{{ $t("app.template.navigation.activity") }}</span>
                    </router-link>
                    <div class="triangle"></div>
                </li>
            </ul>
            <ul class="childNav d-none" data-parent="templates" :class="{ 'd-block': selectedParentMenu == 'templates' }">
                <li :class="{ active: selectedRoute('templates') }" class="nav-item" v-if="$canAccess('templatesList')">
                    <router-link tag="a" class="nav-item-hold" :to="{ name: 'templates'}">
                        <span class="nav-icon mdi mdi-factory mdi-28px"></span>
                        <span class="item-name">{{ $t("app.template.navigation.templates") }}</span>
                    </router-link>
                    <div class="triangle"></div>
                </li>
            </ul>
            <ul class="childNav d-none" data-parent="assets" :class="{ 'd-block': selectedParentMenu == 'assets' }">
                <li :class="{ active: selectedRoute('assets') }" class="nav-item" v-if="$canAccess('assetsList')">
                    <router-link tag="a" class="nav-item-hold" :to="{ name: 'assets'}">
                        <span class="nav-icon mdi mdi-factory mdi-28px"></span>
                        <span class="item-name">{{ $t("app.template.navigation.assets") }}</span>
                    </router-link>
                    <div class="triangle"></div>
                </li>
            </ul>
            <ul class="childNav d-none" data-parent="workflows" :class="{ 'd-block': selectedParentMenu == 'workflows' }">
                <li :class="{ active: selectedRoute('workflows') }" class="nav-item" v-if="$canAccess('workflowsList')">
                    <router-link tag="a" class="nav-item-hold" :to="{ name: 'workflows'}">
                        <span class="nav-icon mdi mdi-factory mdi-28px"></span>
                        <span class="item-name">{{ $t("app.template.navigation.workflows") }}</span>
                    </router-link>
                    <div class="triangle"></div>
                </li>
            </ul>
            <ul class="childNav d-none" data-parent="products" :class="{ 'd-block': selectedParentMenu == 'products' }">
                <li :class="{ active: selectedRoute('products') }" class="nav-item" v-if="$canAccess('productsList')">
                    <router-link tag="a" class="nav-item-hold" :to="{ name: 'products'}">
                        <span class="nav-icon mdi mdi-factory mdi-28px"></span>
                        <span class="item-name">{{ $t("app.template.navigation.products") }}</span>
                    </router-link>
                    <div class="triangle"></div>
                </li>
            </ul>
            <ul class="childNav d-none" data-parent="settings" :class="{ 'd-block': selectedParentMenu == 'settings' }">
                <li :class="{ active: selectedRoute('vendors') }" class="nav-item" v-if="$canAccess('vendorsList')">
                    <router-link tag="a" class="nav-item-hold" :to="{ name: 'vendors'}">
                        <span class="nav-icon mdi mdi-factory mdi-28px"></span>
                        <span class="item-name">{{ $t("app.template.navigation.settings.vendors") }}</span>
                    </router-link>
                    <div class="triangle"></div>
                </li>
                <li :class="{ active: selectedRoute('portal_themes') }" class="nav-item" v-if="$canAccess('vendorsList')">
                    <router-link tag="a" class="nav-item-hold" :to="{ name: 'portal_themes'}">
                        <span class="nav-icon mdi mdi-map-legend mdi-28px"></span>
                        <span class="item-name">{{ $t("app.template.navigation.settings.portal_themes") }}</span>
                    </router-link>
                    <div class="triangle"></div>
                </li>
            </ul>
            <ul class="childNav d-none" data-parent="audits" :class="{ 'd-block': selectedParentMenu == 'audits' }">
                <li :class="{ active: selectedRoute('audits') }" class="nav-item" v-if="$canAccess('auditsList')">
                    <router-link tag="a" class="nav-item-hold" :to="{ name: 'audits'}">
                        <span class="nav-icon mdi mdi-factory mdi-28px"></span>
                        <span class="item-name">{{ $t("app.template.navigation.audits") }}</span>
                    </router-link>
                    <div class="triangle"></div>
                </li>
            </ul>
            
        </div>
    </vue-perfect-scrollbar>

    <div @click="removeOverlay()" class="sidebar-overlay" :class="{ open: getSideBarToggleProperties.isSecondarySideNavOpen }"></div>
</div>
<!--=============== Left side End ================-->
</template>

<script>
import {
    isMobile
} from "mobile-device-detect";

import {
    mapGetters,
    mapActions
} from "vuex";

export default {
    data() {
        return {
            isDisplay: true,
            isMenuOver: false,
            isStyle: true,
            selectedParentMenu: "",
            isMobile
        };
    },
    mounted() {
        this.toggleSelectedParentMenu();
        window.addEventListener("resize", this.handleWindowResize);
        document.addEventListener("click", this.returnSelectedParentMenu);
        this.handleWindowResize();
    },

    beforeDestroy() {
        document.removeEventListener("click", this.returnSelectedParentMenu);
        window.removeEventListener("resize", this.handleWindowResize);
    },
    computed: {
        ...mapGetters(["getSideBarToggleProperties"])
    },

    methods: {
        ...mapActions([
            "changeSecondarySidebarProperties",
            "changeSecondarySidebarPropertiesViaMenuItem",
            "changeSecondarySidebarPropertiesViaOverlay",
            "changeSidebarProperties"
        ]),

        handleWindowResize() {
            if (window.innerWidth <= 1200) {
                if (this.getSideBarToggleProperties.isSideNavOpen) {
                    this.changeSidebarProperties();
                }
                if (this.getSideBarToggleProperties.isSecondarySideNavOpen) {
                    this.changeSecondarySidebarProperties();
                }
            } else {
                if (!this.getSideBarToggleProperties.isSideNavOpen) {
                    this.changeSidebarProperties();
                }
            }
        },
        toggleSelectedParentMenu() {
            const currentParentUrl = this.$route.path
                .split("/")
                .filter(x => x !== "")[1];

            if (currentParentUrl !== undefined && currentParentUrl !== null) {
                this.selectedParentMenu = currentParentUrl.toLowerCase();
            } else {
                this.selectedParentMenu = "dashboards";
            }
        },
        toggleSubMenu(parent) {
            var element = this.$el.querySelector("#" + parent);
            var viewportOffset = element.getBoundingClientRect();
            var bottomPosition = viewportOffset.bottom;

            this.selectedParentMenu = parent;
            this.$refs.sidebarChild.parentElement.style.bottom = 'calc(100vh - ' + bottomPosition + 'px)';
            this.changeSecondarySidebarPropertiesViaMenuItem(true);
        },

        removeOverlay() {
            this.changeSecondarySidebarPropertiesViaOverlay();
            if (window.innerWidth <= 1200) {
                this.changeSidebarProperties();
            }
            this.toggleSelectedParentMenu();
        },
        returnSelectedParentMenu() {
            if (!this.isMenuOver) {
                this.toggleSelectedParentMenu();
            }
        },

        toggleSidebarDropdwon(event) {
            let dropdownMenus = this.$el.querySelectorAll(".dropdown-sidemenu.open");

            event.currentTarget.classList.toggle("open");

            dropdownMenus.forEach(dropdown => {
                dropdown.classList.remove("open");
            });
        },

        selectedRoute(route) {
            if (this.$route.path.indexOf(route) > -1) {
                return true;
            }
            return false;
        }
    }
};
</script>

<style lang="scss" scoped>
.layout-sidebar-large .sidebar-left .navigation-left .nav-item {
    min-height: 77px;
    height: calc((100vh - 70px)/8);
    display: flex;
    align-items: center;

    .nav-item-hold {
        padding: 0;

        .nav-text {
            font-size: 11px;
        }
    }
}

.sidebar-left-secondary {
    height: auto;
    padding: 0;
    // bottom: 0;
    // top: auto;

    ul {
        margin: 0;
    }

    .childNav {
        li.nav-item {
            a {
                font-size: 11px;
                padding: 12px 16px;
                color: #000000;
                border-left: 3px solid $gray-400;
                &:hover, &.open {
                    color: $white;
                    background: $blue;
                    border-color: $light-blue;

                    .nav-icon {
                        color: $white
                    }
                    svg {
                        fill: $white;
                    }
                }

                .nav-icon {
                    color: #000000;
                    font-size: 16px;
                    margin-right: 12px;
                }
            }
        }
    }

    &.open {
        height: auto;
        top: auto;
    }

}

.mdi-28px {
    font-size: 28px;
}
</style>
