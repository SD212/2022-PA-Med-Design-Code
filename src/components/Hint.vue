<template>
  <div>
    <div class="hint-description">
      <br>
      <br>
      <vue-mathjax v-if="text" :formula="description" style="z-index: 950;"></vue-mathjax>
      <img v-if="image" :src="path">
    </div>
  </div>
</template>

<script>
import {VueMathjax} from 'vue-mathjax'

export default {
    name: 'Hint',
    props: {
      'vue-mathjax': VueMathjax,
      'description': String, //hint in text
      'text': Boolean, //true if hint is text
      'image': Boolean, //true if hint is an image
      'path': String //hint in image
    },
    components: {
      'vue-mathjax': VueMathjax
    },
    data() {
      return {
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
  z-index: 950;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 550px;
  z-index: 950;
}
/*hints are in center with black text */
.hint-description {
  display: inline;
  text-align: center;
  color: black;
  z-index: 950;
}
</style>