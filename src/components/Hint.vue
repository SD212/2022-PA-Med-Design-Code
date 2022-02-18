<template>
  <div>
  <div class="hint-board">
    
    <div class="hint-description">

      <br>
      <br>
      <vue-mathjax :formula="description"></vue-mathjax>
    </div>
  </div>
  </div>
</template>

<script>
import {VueMathjax} from 'vue-mathjax'

export default {
    name: 'Hint',
    props: {
      'vue-mathjax': VueMathjax,
      'description': String
    },
    components: {
      'vue-mathjax': VueMathjax
    },
    data() {
      return {
        num: 1,
        //description: 'This is descroption for hint 1'
        //formula: ''
      }
    },
    methods: {
      
    }
  }
</script>

<style scoped>
.hint-board {
  color: blue;
  text-align: left;
  display: inline-block;
  
  width: 100%;
}

.hint-description {
  display: inline;
  text-align: center;
  color: black;
}
</style>