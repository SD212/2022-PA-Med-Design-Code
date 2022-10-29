
<template>
    
    <div class="whiteboard">
        <button type="button" @click.prevent="$refs.VueCanvasDrawing.undo()" class="undo-button">
            Undo
        </button>
        <button type="button" @click.prevent="$refs.VueCanvasDrawing.redo()" class="redo-button">
            Redo    
        </button>
        <button type="button" @click.prevent="$refs.VueCanvasDrawing.reset()" class="reset-button">
            Reset
        </button>
        <div class="wb">
                
            <vue-drawing-canvas v-show="showWhiteboard"
                ref="VueCanvasDrawing"
                v-model:="image"
                :width="windowWidth"
                :height="windowHeight"
                :stroke-type="strokeType"
                :line-cap="lineCap"
                :line-join="lineJoin"
                :fill-shape="fillShape"
                :eraser="eraser"
                :lineWidth="line"
                :color="color"
                :background-color="backgroundColor"
                :background-image="backgroundImage"
                :watermark="watermark"
                
                
                :lock="enabled"
                @mousemove="getCoordinate($event)"
                :additional-images="additionalImages"
                 />
                 
        </div>
    </div>
</template>

<script>
import VueDrawingCanvas from "vue-drawing-canvas";

export default {
    name: 'Whiteboard',
    props: {
        
    },
    data() {
            return {
                x: 0,
                y: 0,
                image: "",
                eraser: false,
                disabled: false,
                fillShape: false,
                line: 5,
                color: "#000000",
                strokeType: "dash",
                lineCap: "square",
                lineJoin: "miter",
                backgroundColor: "#FFFFFF",
                backgroundImage: null,
                watermark: null,
                additionalImages: [],
                windowHeight: window.innerHeight,
                windowWidth: window.innerWidth,
                showWhiteboard: true,

            }
    },
    components: {
        VueDrawingCanvas
    },
    mounted() {
        this.$newTick(() => {
            window.addEventListener('resize', this.onResize);
        })
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        onResize() {
            this.windowHeight = window.innerHeight
            this.windowWidth = window.windowWidth  
        },
        async setImage(event) {
            let URL = window.URL;
            this.backgroundImage = URL.createObjectURL(event.target.files[0]);
            await this.$refs.VueCanvasDrawing.redraw();
        },
        async setWatermarkImage(event) {
            let URL = window.URL;
            this.watermark = {
                type: "Image",
                source: URL.createObjectURL(event.target.files[0]),
                x: 0,
                y: 0,
                imageStyle: {
                    width: 600,
                    height: 400,
                },
            };
        await this.$refs.VueCanvasDrawing.redraw();
        },
        getCoordinate(event) {
            let coordinates = this.$refs.VueCanvasDrawing.getCoordinates(event);
            this.x = coordinates.x;
            this.y = coordinates.y;
        },
        getStrokes() {
            window.localStorage.setItem(
                "vue-drawing-canvas",
                JSON.stringify(this.$refs.VueCanvasDrawing.getAllStrokes())
            );
            alert(
                "Strokes saved, reload your browser to see the canvas with previously saved image"
            );
        },
        removeSavedStrokes() {
            window.localStorage.removeItem("vue-drawing-canvas");
            alert("Strokes cleared from local storage");
        },
    }
}
</script>

<style scoped>
.wb {
    /* position: absolute; */
    z-index: 2;
    top: 0px;
    left: 0px;
    height: 200px;
}

.whiteboard button {
    position: relative;
    background-color: rgb(170, 228, 165);
    padding:10px;
    margin:10px;
    text-emphasis-color: white;
    border-radius: 10px;
    z-index: 1;
    cursor: pointer;
}

.whiteboard .reset-button {
    background-color: rgb(255, 91, 76);
}

.whiteboard .redo-button {
    background-color: rgb(235, 245, 102);
}
</style>