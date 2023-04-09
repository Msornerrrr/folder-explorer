<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, toRaw } from 'vue';
import * as pdfjs from 'pdfjs-dist';

const route = useRoute();
const baseUrl = "http://localhost:8080";
const relativeUrl = route.path;

const pdfDoc = ref(null);
const pageNum = ref(1);
const totalNum = ref(0);
const canvas = ref(null);
const scale = ref(1.5);

onMounted(() => {
  pdfjs.GlobalWorkerOptions.workerSrc = '../../node_modules/pdfjs-dist/build/pdf.worker.js';
  pdfjs.getDocument(baseUrl + relativeUrl + '.pdf').promise.then(pdfDoc_ => {
    pdfDoc.value = pdfDoc_;
    pageNum.value = 1;
    totalNum.value = pdfDoc_.numPages;
    renderPage(pageNum.value)
  }, err => console.log(err));
})

const renderPage = num => {
  /** @brief use toRaw() to handle proxy issue
   * https://stackoverflow.com/questions/72738037/can-you-store-and-use-pdfdocumentproxy-pdfpageproxy-objects-from-pdf-js-as-mem
  */
  toRaw(pdfDoc.value).getPage(num).then(page => {
    const ctx = canvas.value.getContext('2d');
    const viewport = page.getViewport({ scale: scale.value });

    canvas.value.width = viewport.width;
    canvas.value.height = viewport.height;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    }
    page.render(renderContext);
  });
}

const nextPage = () => {
  if (pageNum.value >= totalNum.value) return;
  pageNum.value++;
  renderPage(pageNum.value);
}

const prevPage = () => {
  if (pageNum.value <= 1) return;
  pageNum.value--;
  renderPage(pageNum.value);
}
</script>

<template>
  <v-container v-if="pdfDoc">
    <v-row justify="center" align="center">
      <v-col cols="auto">
        <v-btn size="small" @click="prevPage" :disabled="pageNum === 1"> Prev </v-btn>
      </v-col>

      <v-col cols="auto">
        <p>{{ pageNum }} / {{ totalNum }}</p>
      </v-col>

      <v-col cols="auto">
        <v-btn size="small" @click="nextPage" :disabled="pageNum === totalNum"> Next </v-btn>
      </v-col>
    </v-row>

    <v-row justify="center">
      <canvas ref="canvas" class="canvas"></canvas>
    </v-row>
  </v-container>
</template>

<style>
.canvas {
  border: 1px solid black;
}
.slider {
  width: 50px;
}
</style>