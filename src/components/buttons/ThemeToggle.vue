<template>
    <div
        class="relative h-4.5 w-9 rounded-xl cursor-pointer transition-all"
        :class="isDark ? 'bg-white' : 'bg-gray-780'"
        @click.stop="goToChangeTheme"
    >
        <div
            v-if="isDark"
            class="absolute inset-y-0 left-1.5 flex items-center justify-center"
        >
            <SunIcon class="w-2.5 h-2.5 text-gray-780" />
        </div>

        <div
            v-else
            class="absolute inset-y-0 right-1.5 flex items-center"
        >
            <MoonIcon class="text-white" />
        </div>

        <div
            class="w-3 h-3 absolute top-0.75 rounded-full transition-all"
            :class="theme === 'dark' ? 'bg-gray-780 translate-x-5' : 'bg-white translate-x-1'"
        />
    </div>
</template>

<script setup>
import {
    ref, onMounted, computed, watch,
} from 'vue'

import MoonIcon from '@/components/icons/theme/MoonIcon.vue'
import SunIcon from '@/components/icons/theme/SunIcon.vue'

import { changeTheme, currentTheme, isThemeDark } from '@/helpers/theme-local-storage-helper'
import { initFeaturebase, initFeaturebaseSurvey, initFeaturebaseChangelog } from '@/helpers/featurebase-helper'

import { THEMES } from '@/constants/themes'

const emits = defineEmits(['update:currentTheme'])

const theme = ref('')

const isDark = computed(() => theme.value === THEMES.dark.id)

onMounted(() => {
    setDefaultTheme()
})

function setDefaultTheme() {
    const { auto, dark, white } = THEMES

    if (currentTheme() === auto.id) {
        theme.value = isThemeDark() ? dark.id : white.id
    } else {
        theme.value = currentTheme()
    }
}

function goToChangeTheme() {
    const { dark, white } = THEMES
    theme.value = theme.value === white.id ? dark.id : white.id

    changeTheme(theme.value)

    initFeaturebase()
    initFeaturebaseSurvey()
    initFeaturebaseChangelog()
}

watch(theme, () => {
    const { dark, white } = THEMES
    emits('update:currentTheme', isDark.value ? dark.name : white.name)
}, { immediate: true })
</script>
