import { mapActions, mapGetters, mapState } from "vuex";

const menuMixins = {
    computed: {
        ...mapState({
            getMenuItems: "nested"
        }),
        ...mapGetters(["getThemeID", "getMenu", "getMenuList"]),
        ...mapGetters({
            getElements: "nested/getElements",
            getEditElement: "nested/getEditElement"
        }),
        treeMenuItems: {
            get() {
                return this.getMenuItems;
            },
            set(value) {
                this.updateElements(value);
            }
        },
        editElement: {
            get() {
                return this.getEditElement;
            },
            set(value) {
                this.updateEditElement = value;
            }
        }
    },
    methods: {
        ...mapActions(["setThemeID", "setMenu", "setMenuList"]),
        ...mapActions({
            updateElements: "nested/updateElements",
            updateEditElement: "nested/updateEditElement"
        })
    },
}

export default menuMixins;