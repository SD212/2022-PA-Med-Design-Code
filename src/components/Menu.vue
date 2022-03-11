<template>
    <div class='menu'>
        <input type="radio" id="factoring" value="Factoring" v-model="picked" class='checkbox'>
        <label for="factoring">Factoring</label>
        <br>
        <input type="radio" id="trig" value="Trig" v-model="picked" class='checkbox'>
        <label for="trig">Trig</label>
        <br>
        <span>Picked: {{ getPicked() }}</span>
    </div>  
</template>

<script>
export default{
    data(){
        return {
            picked:""
        }
    },
    methods: {
        getPicked() {
            /*if (isLocalStorage() ) {
               localStorage.setItem('problemType', this.picked)
            }*/

            localStorage.trig = false
            localStorage.factoring = false

            if (this.picked == "Trig") {
                localStorage.trig = true
            } else {
                localStorage.factoring = true
            }

            localStorage.problemType = this.picked

            return this.picked
        }
    }
}
</script>

<style scoped>
    .menu{
        position: absolute;
        Top: 20 px;
        left: 20 px;
        border: 1px solid black;
        height: 50%;
        width: 12%;
        text-align: left;
        padding:10px;
    }
    .checkbox{
        padding: 10px;
        margin: 10px;
    }
</style>
