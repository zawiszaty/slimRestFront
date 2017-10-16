<template>
    <div class="plan">
        <div class="loading" v-if="loading">
            <div class="spinner"></div>
        </div>
        <div class="table__wraper" v-else>
            <table class="plan__table">
                <tr>
                    <!--<th>godzina</th>-->
                    <th>poniedzialek</th>
                    <th>sala</th>
                    <th>wtorek</th>
                    <th>sala</th>
                    <th>sroda</th>
                    <th>sala</th>
                    <th>czwartek</th>
                    <th>sala</th>
                    <th>piatek</th>
                    <th>sala</th>
                </tr>
                <tr v-for="(item, index) in planGetters">
                    <td>{{item.poniedzialek}}</td>
                    <td>{{item.salap}}</td>
                    <td>{{item.wtorek}}</td>
                    <td>{{item.salaw}}</td>
                    <td>{{item.sroda}}</td>
                    <td>{{item.salas}}</td>
                    <td>{{item.czwartek}}</td>
                    <td>{{item.salac}}</td>
                    <td>{{item.piatek}}</td>
                    <td>{{item.salapi}}</td>
                </tr>
            </table>
        </div>
        <router-link to="/" class="back__link">Wybierz inna klase</router-link>
    </div>
</template>

<script>
    import axios from 'axios';
    import {mapGetters} from 'vuex'
    import {mapMutations} from 'vuex'

    export default {
        name: 'Plan',
        data: function () {
            return {
                loading: 0
            }
        },
        computed: {
            ...mapGetters([
                'planGetters'
            ]),
        },
        methods: {
            ...mapMutations([
                'planMutations',
            ]),
        },
        created() {
            this.loading = 1;
            axios.get(this.$store.state.apiLink + `plan/` + this.$route.params.id)
                .then(response => {
                    this.planMutations(response.data);
                    this.loading = 0;
                });

        }
    }
</script>
<style>
    .plan {
        margin: 2em;
        background-color: #ffffff;
        padding: 5em;
        text-align: center;
    }

    .table__wraper {
        overflow: auto;
    }

    .plan__table {
        width: 100%;
        font-size: 3rem;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    td, th {
        padding: 1.5em;
    }

    tr:nth-child(odd) {
        background-color: #f5f5f5;
    }
</style>
