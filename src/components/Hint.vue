<template>
  <div>
    <div class="hint-description">

      <br>
      <br>
      <vue-mathjax v-if="text" :formula="description"></vue-mathjax> <!--if the hint is text, display description-->
      <img v-if="image" :src="path"> <!--if the hint is text, display image at path "path"-->
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
/*image displays with a height of 550px */
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 550px;
}
/*hints are in center with black text */
.hint-description {
  display: inline;
  text-align: center;
  color: black;
}
</style>