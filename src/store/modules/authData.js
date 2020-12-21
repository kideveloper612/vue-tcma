import firebase from "firebase/app";
import "firebase/auth";
import http from "@/http";
import router from '@/router';

export default {
    state: {
        loggedInUser: localStorage.getItem("userInfo") != null ?
            JSON.parse(localStorage.getItem("userInfo")) :
            null,
        userPermissions: localStorage.getItem("userPermissions") != null ?
            JSON.parse(localStorage.getItem("userPermissions")) :
            null,
        loading: false,
        error: null
    },
    getters: {
        loggedInUser: state => state.loggedInUser,
        userPermissions: state => state.userPermissions,
        loading: state => state.loading,
        error: state => state.error
    },
    mutations: {
        setUser(state, data) {
            state.loggedInUser = data;
            state.loading = false;
            state.error = null;
        },
        setLogout(state) {
            state.loggedInUser = null;
            state.loading = false;
            state.error = null;
            // this.$router.go("/");
        },
        setLoading(state, data) {
            state.loading = data;
            state.error = null;
        },
        setError(state, data) {
            state.error = data;
            state.loggedInUser = null;
            state.loading = false;
        },
        clearError(state) {
            state.error = null;
        }
    },
    actions: {
        login({ commit }, data) {
            commit("clearError");
            commit("setLoading", true);
            http.post('/users/authenticate', {
                email: data.email,
                password: data.password,
                returnSecureToken: true
            })
                .then(user => {
                    const newUser = {
                        uid: user.data.id,
                        firstName: user.data.firstName,
                        lastName: user.data.lastName,
                        picture: user.data.avatarSmallSquare,
                        culture: user.data.culture,
                        timezone: user.data.timezone
                    };
                    localStorage.setItem("userInfo", JSON.stringify(newUser));
                    localStorage.setItem("token", user.data.token);
                    commit("setUser", newUser);
                    http.get('/userroles/' + user.data.roleId)
                        .then(roles => {
                            localStorage.setItem("userPermissions", JSON.stringify(roles.data));
                            router.go(-1)
                        })
                        .catch(function (error) {
                            localStorage.removeItem("userPermissions");
                            commit("setError", error);
                        });
                })
                .catch(function (error) {
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("token");
                    commit("setError", error);
                });
        },

        signUserUp({
            commit
        }, data) {
            commit("setLoading", true);
            commit("clearError");
            firebase
                .auth()
                .createUserWithEmailAndPassword(data.email, data.password)
                .then(user => {
                    commit("setLoading", false);

                    const newUser = {
                        uid: user.user.uid
                    };
                    localStorage.setItem("userInfo", JSON.stringify(newUser));
                    commit("setUser", newUser);
                })
                .catch(error => {
                    commit("setLoading", false);
                    commit("setError", error);
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("token");
                    console.log(error);
                });
        },
        signOut({
            commit
        }) {
            firebase
                .auth()
                .signOut()
                .then(
                    () => {
                        localStorage.removeItem("userInfo");
                        localStorage.removeItem("token");
                        commit("setLogout");
                    },
                    _error => {
                        console.log(_error)
                    }
                );
        },
        startLoading({ commit }) {
            commit("setLoading", true);
        },
        stopLoading({ commit }) {
            commit("setLoading", false);
        },
    }
};