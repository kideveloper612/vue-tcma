import {
    mapActions
} from "vuex";

const commonMixins = {
    data () {
        return {
            customEditorToolbar: [
                [{
                    size: ["small", false, "large", "huge"]
                }],
                ["bold", "italic", "underline"],
                [{
                    list: "ordered"
                }, {
                    list: "bullet"
                }],
            ]
        }
    },
    methods: {
        ...mapActions([
            "startLoading",
            "stopLoading"
        ]),
        showInitials(firstName, lastName) {
            if (firstName && lastName) {
                return (firstName.substring(0, 1) + lastName.substring(0, 1)).toUpperCase();
            }
            return '';
        },
        showToast(content, variant) {
            this.$bvToast.toast(content, {
                variant: variant,
                solid: true,
                toaster: 'b-toaster-bottom-center'
            });
        },
        validateState(element) {
            const {
                $dirty,
                $error
            } = element;
            return $dirty ? !$error : null;
        },
    }
}

export default commonMixins;