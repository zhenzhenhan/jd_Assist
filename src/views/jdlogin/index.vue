<template>
  <iframe
    src="https://plogin.m.jd.com/login/login"
    frameborder="0"
    width="100%"
    height="600px"
  ></iframe>
  <button @click="test">获取</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

let pt_pin = ref('')
let pt_key = ref('')

const test = () => {
  pt_pin.value = $cookies.get('pt_pin')
  pt_key.value = $cookies.get('pt_key')
  console.log(pt_pin.value, pt_key.value)
  console.log($cookies.keys())
}
</script>

<style scoped></style>
