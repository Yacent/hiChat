<template>
  <div>
    <p>{{ getCount }}</p>
    <p>{{ msg }}</p>
    <ul>
      <li v-for="item in getAdded">
        {{ item }}
      </li>
    </ul>
    <p>asd</p>
    <button @click="increment">click me</button>
    <button @click="pushArr">click you</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'test',
  data () {
    return {
      msg: this.$store.state.count
    }
  },
  computed: {
    ...mapGetters([
      'getCount',
      'getAdded'
    ])
  },
  methods: {
    ...mapMutations([
      'increment',
      'pushArr'
    ]),
    doIt () {
      this.$store.dispatch('increment')
    }
  }
}
</script>

<style scoped>

</style>
