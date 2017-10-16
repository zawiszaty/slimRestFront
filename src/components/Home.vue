<template>
    <div class="home">
        <div class="card">
            <h2> liceum</h2>
            <div class="loading" v-if="loading1">
                <div class="spinner"></div>
            </div>
            <div v-else>
                <ul v-for="item in liceumGetters">
                    <li>
                        <router-link :to="{ name: 'plan', params: { id: item.id }}" class="card__item">{{item.name}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="card">
            <h2>technikum</h2>
            <div class="loading" v-if="loading2">
                <div class="spinner"></div>
            </div>
            <div v-else>
                <ul v-for="item in technikumGetters">
                    <li>
                        <router-link :to="{ name: 'plan', params: { id: item.id }}" class="card__item">{{item.name}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="card">
            <h2> szkoła branzowa</h2>
            <div class="loading" v-if="loading3">
                <div class="spinner"></div>
            </div>
            <div v-else>
                <ul v-for="item in branzowaGetters">
                    <li>
                        <router-link :to="{ name: 'plan', params: { id: item.id }}" class="card__item">{{item.name}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {mapGetters} from 'vuex'
    import {mapMutations} from 'vuex'

    export default {
        name: 'Home',
        data: function () {
            return {
                loading1: 0,
                loading2: 0,
                loading3: 0,

            }
        },
        computed: {
            ...mapGetters([
                'liceumGetters',
                'technikumGetters',
                'branzowaGetters'
            ]),
        },
        methods: {
            ...mapMutations([
                'liceumMutations',
                'technikumMutations',
                'branzowaMutations',
            ]),
        },
        created() {
            this.loading1 = 1;
            this.loading2 = 1;
            this.loading3 = 1;
            axios.get(this.$store.state.apiLink + `class/2`)
                .then(response => {
                    this.technikumMutations(response.data);
                    this.loading1 = 0;
                });
            axios.get(this.$store.state.apiLink + `class/1`)
                .then(response => {
                    this.liceumMutations(response.data);
                    this.loading2 = 0;
                });
            axios.get(this.$store.state.apiLink + `class/3`)
                .then(response => {
                    this.branzowaMutations(response.data);
                    this.loading3 = 0;
                });
        }
    }
</script>
<style scoped="">
    .card {
        margin: 5em;
        background-color: #ffffff;
        padding: 2em;
    }

    .card > h2 {
        text-align: center;
        font-size: 4rem;
    }

    .card ul {
        list-style-type: none;
    }

    .card ul li {
        text-align: center;
    }

    .card__item {
        display: block;
        color: #000000;
        text-decoration: none;
        margin: 2em 0;
        font-size: 3rem;
        transition: all 0.5s;
    }
    .card__item:hover
    {
        color: #cccccc;
    }
</style>
