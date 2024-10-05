<template>
    <component
        :is="MainLayout"
        ref="appRef"
    />
</template>
<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import {provide, ref} from "vue";
import {viewPorts} from "@/constants/viewPorts";
import {useResizeObserver} from "@vueuse/core";

const currentViewSize = ref(0)
const appRef = ref(null)


provide('currentViewSize', currentViewSize)

useResizeObserver(appRef, (entries) => {
    const [entry] = entries
    const { contentRect } = entry
    const { width } = contentRect
    const name = Object.keys(viewPorts).find((name) => viewPorts[name] >= width)
    currentViewSize.value = viewPorts[name]
})


</script>
