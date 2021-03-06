import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import router from './router';
import swal from 'sweetalert';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        test: "test23",
        isLogin: 0,
        apiLink: 'http://localhost/slimRest/api/',
        liceum: {},
        technikum: {},
        branzowa: {},
        classList: {},
        plan: {}
    },
    getters: {
        testGetters(state) {
            return state.test;
        },
        isLoginGetters(state) {
            return state.isLogin;
        }
        ,
        classListGetters(state) {
            return state.classList;
        },
        liceumGetters(state) {
            return state.liceum;
        }
        ,
        technikumGetters(state) {
            return state.technikum;
        }
        ,
        branzowaGetters(state) {
            return state.branzowa;
        },
        planGetters(state) {
            return state.plan;
        }


    },
    mutations: {
        isLoginMutations(state, payload) {
            state.isLogin = payload;
        },
        classListMutations(state, payload) {
            state.classList = payload;
        },
        liceumMutations(state, payload) {
            state.liceum = payload;
        },
        technikumMutations(state, payload) {
            state.technikum = payload;
        }
        ,
        branzowaMutations(state, payload) {
            state.branzowa = payload;
        },
        planMutations(state, payload) {
            state.plan = payload;
        }
    },
    actions: {
        auth(context) {
            axios.post(this.state.apiLink + 'auth', {}, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => {

                }).catch(error => {
                    swal('Nie jesteś zalogowany');
                router.push({path: '/login'});
            });
        }
    }
});