<template>
    <div class="panel">
        <div class="class__list">
            <ul>
                <li v-for="item in classListGetters">
                    <router-link :to="{ name: 'editPlan', params: { id: item.id }}">{{item.name}}</router-link>
                </li>
            </ul>
        </div>
        <div class="class__add">
            <form>
                <input type="text" name="name" v-model="newClass['newClass']['name']">
                <input type="text" name="educator" v-model="newClass['newClass']['educator']">
                <select name="type" id="type" v-model="newClass['newClass']['type_id']">
                    <option value="1">Liceum</option>
                    <option value="2">Technikum</option>
                    <option value="3">Szkoła Branżowa</option>
                </select>
                <button type="submit" v-on:click="addClass">Dodaj klase</button>
            </form>
        </div>
        <div class="class_del">
            <form>
                <select name="delClass_id" id="delClass_id" v-model="delClass_id['id']">
                    <option v-for="item in classListGetters" :value="item.id">{{item.name}}</option>
                </select>
                <button type="submit" v-on:click="delClass">Usuń</button>
            </form>
        </div>
        <div class="logout__card">
            <button v-on:click="logout">Wyloguj</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {mapGetters} from 'vuex'
    import {mapMutations} from 'vuex'
    import swal from 'sweetalert';

    export default {
        name: 'Panel',
        data: function () {
            return {
                newClass: {
                    newClass: {}
                },
                delClass_id: {
                    id: ''
                }
            }
        },
        computed: {
            ...mapGetters([
                'classListGetters'
            ]),
        },
        methods: {
            ...mapMutations([
                'classListMutations',
            ]),
            logout() {
                localStorage.removeItem('token');
                swal('zostałes wylogowany');
                this.$router.push('/');

            }
            ,
            getData() {
                axios.get(this.$store.state.apiLink + 'all/class')
                    .then(response => {
                        this.classListMutations(response.data);
                    })
            }
            ,
            addClass(e) {
                e.preventDefault();
                axios.post(this.$store.state.apiLink + 'add/class', this.newClass, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(response => {
                        swal('Dodano klase',{
                            icon: "success"
                        });
                            this.getData()
                        }
                    )
                    .catch(error => {
                        swal('Coś poszło nie tak :( Prawdopodobnie klasa już została dodana', {
                            icon: "error",
                        });
                    });

            },
            delClass(e) {
                e.preventDefault();
                swal('Na pewno ????',{ buttons: ['Nie','TAK'],})
                    .then((willDelete) => {
                        if (willDelete) {
                        axios.post(this.$store.state.apiLink + 'del/class', this.delClass_id, {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        }).then(response => {
                            this.getData()
                        })
                            .catch(error => {
                                swal('Coś poszło nie tak :( Prawdopodobnie klasa już została usunieta');
                            })
                        swal('Usunięto kalse', {
                            icon: "success",
                        })}
                    });
            }
        },
        created() {
            this.$store.dispatch('auth');
            this.getData();
        }
    }
</script>
<style scoped="">
    .class__list, .class__add, .class_del, .logout__card {
        background-color: #ffffff;
        margin: 2em;
        padding: 2em;
        text-align: center;
        box-shadow: 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
    }

    .class__list > ul {
        list-style-type: none;
    }

    .class__list > ul > li {
        margin: 2em;
    }

    .class__list > ul > li > a {
        text-decoration: none;
        color: #000000;
        font-size: 4rem;
        transition: all 0.5s;

    }

    .class__list > ul > li > a:hover {
        color: #999999;
    }

    .logout__card > button, .class_del button, .class__add button {
        background-color: #ffffff;
        outline: 0;
        border: 0;
        transition: all 0.5s;
    }

    .logout__card > button:hover, .class_del button:hover, .class__add button:hover {
        color: #cccccc;
    }

    @media screen and (min-width: 720px) {
        .panel {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
        }

        .logout__card {
            grid-column: 2;
        }
    }
</style>


