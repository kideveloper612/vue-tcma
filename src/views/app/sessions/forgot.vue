<template>
<div class="auth-layout-wrap">
    <div class="auth-content">
        <div class="card o-hidden">
            <div class="row">
                <div class="col-md-12">
                    <div class="p-4">
                        <div class="auth-logo text-center mb-30">
                            <img :src="logo" alt="" />
                        </div>
                        <h1 class="mb-3 text-18">{{ $t("app.login.forgot_password") }}</h1>
                        <form action="">
                            <div class="form-group">
                                <label for="email">{{ $t("app.login.email_field") }}</label>
                                <input id="email" class="form-control" type="email" />
                            </div>
                            <button class="btn btn-primary btn-block mt-3">
                                {{ $t("app.login.forgot_button") }}
                            </button>
                        </form>
                        <div class="mt-3 text-center">
                            <router-link to="signIn" tag="a" class="text-muted ">
                                <u>{{ $t("app.login.title") }}</u>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 text-center " style="background-size: cover" v-if="socialLoginEnabled">
                    <div class="pr-3 auth-right">
                        <a class="btn btn-outline-primary btn-outline-email btn-block btn-icon-text" href="signup.html">
                            <i class="i-Mail-with-At-Sign"></i> Sign up with Email
                        </a>
                        <a class="btn btn-outline-primary btn-outline-google btn-block btn-icon-text">
                            <i class="i-Google-Plus"></i> Sign in with Google
                        </a>
                        <a class="btn btn-outline-primary btn-outline-facebook btn-block btn-icon-text">
                            <i class="i-Facebook-2"></i> Sign in with Facebook
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: "Forgot Password"
    },
    data() {
        return {
            logo: require("@/assets/images/logo.png"),
            socialLoginEnabled: false
        };
    }
};
</script>
