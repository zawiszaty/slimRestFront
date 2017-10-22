<template>
    <div class="plan">
        <div class="loading" v-if="loading">
            <div class="spinner"></div>
        </div>
        <div class="table__wraper" v-else>

            <table class="plan__table">
                <tr>
                    <th>godzina | {{curenTime}}</th>
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
                    <td>{{item.godzina}}</td>
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
                loading: 0,
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
        margin: 5em;
        background-color: #ffffff;
        text-align: center;
        box-shadow: 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
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

    tr {
        border-bottom: 1px solid rgba(0, 0, 0, .14);
    }

    tr:hover {
        background-color: #eeeeee;
    }

    tr:first-child {
        background-color: #3f51b5;

        color: #ffffff;
    }

    tr:hover:first-child {
        background-color: #3f51b5;
    }

    .back__link {
        padding: 2em;
    }

</style>
