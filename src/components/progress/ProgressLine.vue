<template>
    <div
        v-if="loading"
        class="absolute left-0 bottom-0 flex w-full bg-transparent h-0.5 z-100"
        :class="[
            end && 'justify-end',
            position
        ]"
    >
        <div class="bg-purple h-0.5 transition-width duration-10" :style="{ width: `${width}%` }"></div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    position: {
        type: String,
        default: 'absolute',
    },
})

const width = ref(0)
let incInterval = null
let decInterval = null
let end = false

const loading = computed(() => props.loading)

watch(loading, (loading) => {
    clearIntervals()

    if (loading) {
        setIntervalIncrement()
    } else {
        width.value = 0
    }
}, { immediate: true })

function setIntervalIncrement() {
    clearIntervals()
    end = false

    incInterval = setInterval(() => {
        if (width.value < 100) {
            ++width.value
        } else {
            setIntervalDecrement()
        }
    }, 10)
}
function setIntervalDecrement() {
    clearIntervals()
    end = true

    decInterval = setInterval(() => {
        if (width.value > 0) {
            --width.value
        } else {
            setIntervalIncrement()
        }
    }, 10)
}

function clearIntervals() {
    clearInterval(decInterval)
    clearInterval(incInterval)
}
</script>
