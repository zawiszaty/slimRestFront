<template>
    <div class="editPlan">
        <div class="loading" v-if="loading">
            <div class="spinner"></div>
        </div>
        <form v-else class="form__edit">
            <table>
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
                    <td><input type="text" v-model="planGetters[index]['poniedzialek']"></td>
                    <td><input type="text" v-model="planGetters[index]['salap']"></td>
                    <td><input type="text" v-model="planGetters[index]['wtorek']"></td>
                    <td><input type="text" v-model="planGetters[index]['salaw']"></td>
                    <td><input type="text" v-model="planGetters[index]['sroda']"></td>
                    <td><input type="text" v-model="planGetters[index]['salas']"></td>
                    <td><input type="text" v-model="planGetters[index]['czwartek']"></td>
                    <td><input type="text" v-model="planGetters[index]['salac']"></td>
                    <td><input type="text" v-model="planGetters[index]['piatek']"></td>
                    <td><input type="text" v-model="planGetters[index]['salapi']"></td>
                </tr>

            </table>
            <div>
                <button type="submit" v-on:click="sendData" class="edit__button">Zmień plan</button>
            </div>
        </form>
        <router-link to="/panel" class="back__link">Wróć do panelu</router-link>
    </div>
</template>

<script>
    import axios from 'axios';
    import {mapMutations} from 'vuex'
    import {mapGetters} from 'vuex'

    export default {
        name: 'EditPlan',
        data: function () {
            return {
                loading: 0,
                id: ''
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
            getData() {
                this.loading = 1;
                axios.get(this.$store.state.apiLink + `plan/` + this.$route.params.id)
                    .then(response => {
                        this.planMutations(response.data);
                        this.loading = 0;
                    });
            },
            sendData(e) {
                e.preventDefault();
                axios.post(this.$store.state.apiLink + 'edit/class/' + this.id, this.planGetters, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(response => {
                            console.log('dziala');
                            this.getData();
                        }
                    )
                    .catch(error => {
                        console.log(error);
                    });
            }

        }
        ,
        created() {
            this.$store.dispatch('auth');

            this.id = this.$route.params.id;
            this.getData();
        }

    }
</script>
<style scoped="">
    .editPlan {
        background-color: #ffffff;
        margin: 2em;
        padding: 2em;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
        margin: 2em;
    }

    th {
        font-size: 3rem;
    }

    td, th {
        padding: 1.5em;
    }

    .form__edit table {
        width: 100%;

    }

    .edit__button {
        display: block;
        background-color: #ffffff;
        outline: 0;
        border: 0;
        font-size: 3rem;
        margin: auto;
    }
</style>


