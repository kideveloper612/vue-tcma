import Vue from "vue";
import store from "./store";
import Router from "vue-router";
import NProgress from "nprogress";
import authenticate from "./auth/authenticate";
import canAccess from "./auth/canAccess";

Vue.use(Router);

// create new router

const routes = [
    {
        path: "/",
        component: () => import("./views/app"),
        beforeEnter: authenticate,
        redirect: { name: 'dashboard' },

        children: [
            {
                path: "/dashboard",
                component: () => import("./views/app/dashboard/Dashboard"),
                name: "dashboard"
            },
            {
                path: "/activity",
                component: () => import("./views/app/activity"),
                name: "activity"
            }, {
                path: "/templates",
                component: () => import("./views/app/templates"),
                name: "templates"
            }, {
                path: "/assets",
                component: () => import("./views/app/assets"),
                name: "assets"
            }, {
                path: "/workflows",
                component: () => import("./views/app/workflows"),
                name: "workflows"
            }, {
                path: "/products",
                component: () => import("./views/app/products"),
                name: "products"
            }, {
                path: "/audits",
                component: () => import("./views/app/audits"),
                name: "audits"
            },
            {
                path: "/settings",
                component: () => import("./views/app/settings"),
                name: "settings",
                children: [
                    {
                        path: "vendors",
                        component: () => import("./views/app/settings/vendors"),
                        name: "vendors",
                        redirect: { name: 'vendors.list' },
                        children: [
                            {
                                path: "",
                                component: () => import("./views/app/settings/vendors/Vendors"),
                                name: "vendors.list",
                                meta: {
                                    permission: 'vendorsList'
                                }
                            },
                            {
                                path: 'details/:id',
                                component: () => import("./views/app/settings/vendors/VendorsDetails"),
                                name: 'vendors.details',
                                meta: {
                                    permission: 'vendorsView'
                                }
                            },
                        ]
                    },
                    {
                        path: "portal_themes",
                        component: () => import("./views/app/settings/portal_themes"),
                        name: "portal_themes",
                        redirect: { name: 'list' },
                        children: [
                            {
                                path: "",
                                component: () => import("./views/app/settings/portal_themes/PortalThemesList"),
                                name: "list",
                            },
                            {
                                path: "add_menu/:id",
                                component: () => import("./views/app/settings/portal_themes/AddMenu"),
                                name: "add_menu",
                            },
                        ]
                    }
                ]
            },
            {
                path: "notAllowed",
                component: () => import("./views/app/pages/notAllowed"),
                name: "notAllowed"
            },
        ]
    },
    // sessions
    {
        path: "/sessions",
        component: () => import("./views/app/sessions"),
        name: "sessions",
        redirect: { name: 'sessions.signin' },
        children: [
            {
                path: "signIn",
                component: () => import("./views/app/sessions/signIn"),
                name: "sessions.signin"
            },
            {
                path: "forgot",
                component: () => import("./views/app/sessions/forgot"),
                name: "sessions.forgot"
            }
        ]
    },


    {
        path: "*",
        component: () => import("./views/app/pages/notFound")
    }
];

const router = new Router({
    mode: "history",
    linkActiveClass: "open",
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 };
    }
});

router.beforeEach((to, from, next) => {
    if (canAccess(to.meta.permission)) {
        if (to.path) {
            NProgress.start();
            NProgress.set(0.1);
        }
        next();
    } else {
        next({ name: 'notAllowed' })
    }
});

router.afterEach(() => {
    // Remove initial loading
    const gullPreLoading = document.getElementById("loading_wrap");
    if (gullPreLoading) {
        gullPreLoading.style.display = "none";
    }
    // Complete the animation of the route progress bar.
    setTimeout(() => NProgress.done(), 500);
    // NProgress.done();
    // if (isMobile) {
    if (window.innerWidth <= 1200) {
        store.dispatch("changeSidebarProperties");
        if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
            store.dispatch("changeSecondarySidebarProperties");
        }

        if (store.getters.getCompactSideBarToggleProperties.isSideNavOpen) {
            store.dispatch("changeCompactSidebarProperties");
        }
    } else {
        if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
            store.dispatch("changeSecondarySidebarProperties");
        }
    }
});

export default router;
