<template>
<div class="main-header">
    <div class="logo">
        <img src="@/assets/images/logo.png" alt />
    </div>

    <!-- <div @click="sideBarToggle" class="menu-toggle">
        <div></div>
        <div></div>
        <div></div>
    </div> -->
    <h1 class="logo">RobotoDocs</h1>

    <div style="margin: auto"></div>

    <div class="header-part-right">
        <!-- <span class="mdi mdi-school-outline header-icon d-none d-sm-inline-block mdi-36px" @click="initTour"></span> -->

        <!-- Full screen toggle -->
        <!-- <i class="i-Full-Screen header-icon d-none d-sm-inline-block" @click="handleFullScreen"></i> -->

        <!-- User avatar dropdown -->
        <div class="dropdown">
            <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2 user col align-self-end" toggle-class="text-decoration-none" no-caret variant="link">
                <template slot="button-content">
                    <!-- <img :src="loggedInUser.picture" id="userDropdown" alt data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" /> -->
                    <b-avatar id="userDropdown" size="2.5rem" alt data-toggle="dropdown" variant="gray-400 text-white" :src="loggedInUser.picture" :text="showInitials(loggedInUser.firstName, loggedInUser.lastName)"></b-avatar>
                </template>

                <div class="dropdown-menu-right" aria-labelledby="userDropdown">
                    <div class="dropdown-header">
                        <i class="i-Lock-User mr-1"></i> {{loggedInUser.firstName + ' ' + loggedInUser.lastName}}
                    </div>
                    <a class="dropdown-item" href="#" @click.prevent="logoutUser">Logout</a>
                </div>
            </b-dropdown>
        </div>
    </div>
</div>

<!-- header top menu end -->
</template>

<script>
import Util from "@/utils";
import {
    isMobile
} from "mobile-device-detect";
import {
    mapGetters,
    mapActions
} from "vuex";
import {
    mixin as clickaway
} from "vue-clickaway";
import commonMixins from "@/mixins/commonMixins";

export default {
    mixins: [
        clickaway,
        commonMixins
    ],

    data() {
        return {
            isDisplay: true,

            isStyle: true,
            isMouseOnMegaMenu: true,
            isMegaMenuOpen: false
        };
    },
    mounted() {
        // document.addEventListener("click", this.closeMegaMenu);
    },
    computed: {
        ...mapGetters(["getSideBarToggleProperties", "loggedInUser"])
    },

    methods: {
        ...mapActions([
            "changeSecondarySidebarProperties",

            "changeSidebarProperties",
            "changeThemeMode",
            "signOut"
        ]),

        handleFullScreen() {
            Util.toggleFullScreen();
        },
        logoutUser() {
            this.signOut();

            this.$router.push({name: 'sessions.signin'});
        },

        closeMegaMenu() {
            this.isMegaMenuOpen = false;
        },
        toggleMegaMenu() {
            this.isMegaMenuOpen = !this.isMegaMenuOpen;
        },

        sideBarToggle() {
            if (
                this.getSideBarToggleProperties.isSideNavOpen &&
                this.getSideBarToggleProperties.isSecondarySideNavOpen &&
                isMobile
            ) {
                this.changeSidebarProperties();
                this.changeSecondarySidebarProperties();
            } else if (
                this.getSideBarToggleProperties.isSideNavOpen &&
                this.getSideBarToggleProperties.isSecondarySideNavOpen
            ) {
                this.changeSecondarySidebarProperties();
            } else if (this.getSideBarToggleProperties.isSideNavOpen) {
                this.changeSidebarProperties();
            } else if (
                !this.getSideBarToggleProperties.isSideNavOpen &&
                !this.getSideBarToggleProperties.isSecondarySideNavOpen &&
                !this.getSideBarToggleProperties.isActiveSecondarySideNav
            ) {
                this.changeSidebarProperties();
            } else if (
                !this.getSideBarToggleProperties.isSideNavOpen &&
                !this.getSideBarToggleProperties.isSecondarySideNavOpen
            ) {

                this.changeSidebarProperties();
                this.changeSecondarySidebarProperties();
            }
        },

        initTour() {
            console.log('Iniciar Tour');
        }
    }
};
</script>

<style lang="scss">
.main-header {
    // height: 70px !important;

    .logo {
        img {
            height: 50px !important;
            width: 50px !important;
        }
    }

    h1.logo {
        font-size: 28px;
        font-weight: 300;
    }
}
</style>
