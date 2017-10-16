<template>
    <div class="login">
        <div class="card">
            <form>
                <input type="text" v-model="user['user']['login']">
                <input type="password" v-model="user['user']['password']">
                <button type="submit" @click="loginSend" class="login__button">Zaloguj sie</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {mapGetters} from 'vuex'
    import {mapMutations} from 'vuex'

    export default {
        name: 'Login',
        data: function () {
            return {
                user: {
                    'user': {}
                }
            }
        },
        computed: {
            ...mapGetters([
                'isLoginGetters'
            ]),
        },
        methods: {
            ...mapMutations([
                'isLoginMutations',
            ]),
            loginSend(e) {
                e.preventDefault();
                axios.post(this.$store.state.apiLink + 'login', this.user)
                    .then(response => {
                        localStorage.setItem('token', response.data);
                        this.isLoginMutations(1);
                        this.$router.push('/panel');
                    }).catch(function (error) {
                    console.log(error);
                    localStorage.removeItem('token');
                });
            }
        },
        created() {
            axios.post(this.$store.state.apiLink + 'auth', {token: localStorage.getItem('token')})
                .then(response => {
                    this.$router.push('/panel');
                })
        }
    }
</script>
<style scoped="">
    input {
        display: block;
        margin: 2em auto;
    }

    input[type=text],input[type=password]
    {
        border: 0;
        outline: 0;
        background-color: #f5f5f5;
        padding: 1.5em;
    }
    .card {
        background-color: #ffffff;
        margin: 2em auto;
        padding: 2em;
        text-align: center;
        width: 50em;

    }

    .login__button {
        border: 0;
        outline: 0;
        background-color: #ffffff;
    }
</style>
