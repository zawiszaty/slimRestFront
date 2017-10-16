<template>
    <div class="hello">
        {{test}}
        <input type="text" v-model="input">
        <button v-on:click="testChange2">klik</button>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {mapMutations} from 'vuex'
    import { mapActions } from 'vuex'

    export default {
        name: 'HelloWorld',
        computed: {
            ...mapGetters({
                    test: 'testGetters'
                }
            ),
        },
        data: function () {
            return {
                input: ''
            }
        },
        methods:
            {
                ...mapMutations({
                    testChange: 'testMutations' // map `this.add()` to `this.$store.commit('increment')`
                }),
                testChange2() {
                    this.testChange(this.input);
                }


            },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
