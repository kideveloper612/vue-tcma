<template>
<div class="auth-layout-wrap">
    <div class="auth-content">
        <div class="card o-hidden">
            <div class="row">
                <div class="col-md-12">
                    <div class="p-4">
                        <div class="auth-logo text-center mb-30">
                            <img :src="logo" />
                        </div>
                        <h1 class="mb-3 text-18">{{ $t("app.login.title") }}</h1>
                        <b-form @submit.prevent="formSubmit">
                            <b-form-group :label="$t('app.login.email_field')" class="text-12">
                                <b-form-input class="form-control" type="text" v-model="email" email required></b-form-input>
                            </b-form-group>

                            <b-form-group :label="$t('app.login.password_field')" class="text-12">
                                <b-form-input class="form-control" type="password" v-model="password"></b-form-input>
                            </b-form-group>

                            <b-button type="submit" tag="button" class="btn-block mt-2" variant="primary mt-2" :disabled="loading">
                                {{ $t("app.login.button") }}
                            </b-button>
                            <div v-once class="typo__p" v-if="loading">
                                <div class="spinner sm spinner-primary mt-3"></div>
                            </div>
                            <b-button to="signUp" block variant="primary mt-2" v-if="false">Create an account</b-button>
                        </b-form>

                        <div class="mt-3 text-center">
                            <router-link to="forgot" tag="a" class="text-muted">
                                <u>{{ $t("app.login.forgot_password") }}</u>
                            </router-link>
                        </div>
                    </div>
                </div>

                <b-col md="6" class="text-center" style="backgroundSize: cover;" v-if="socialLogin">
                    <div class="pr-3 auth-right">
                        <router-link to="signUp" class="btn btn-outline-primary btn-outline-email btn-block btn-icon-text" href="signup.html">
                            <i class="i-Mail-with-At-Sign"></i> Sign up with Email
                        </router-link>
                        <a class="btn btn-outline-primary btn-outline-google btn-block btn-icon-text">
                            <i class="i-Google-Plus"></i> Sign up with Google
                        </a>
                        <a class="btn btn-outline-primary btn-block btn-icon-text btn-outline-facebook">
                            <i class="i-Facebook-2"></i> Sign up with Facebook
                        </a>
                    </div>
                </b-col>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
export default {
    metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: "SignIn"
    },
    data() {
        return {
            email: "",
            password: "",
            logo: require("@/assets/images/logo.png"),
            socialLogin: false,
            backgroundList: {}
        };
    },

    computed: {
        validation() {
            return this.userId.length > 4 && this.userId.length < 13;
        },
        ...mapGetters(["loggedInUser", "loading", "error"])
    },
    mounted() {
        this.importBackgrounds(require.context("@/assets/login_background", false, /\.jpg$/));
        var indexBG = Math.floor(Math.random() * 10);
    },

    methods: {
        ...mapActions(["login"]),
        formSubmit() {
            this.login({
                email: this.email,
                password: this.password
            });
        },
        importBackgrounds(r) {
            var imgs = []
            r.keys().forEach(key => {
                imgs.push(key.replace('./',''));
            })
            this.backgroundList = imgs;
        },

    },

};
</script>

<style>
.spinner.sm {
    height: 2em;
    width: 2em;
}
</style>
