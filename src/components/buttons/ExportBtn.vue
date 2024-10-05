<template>
    <div
        class="relative w-9.5 max-mob:w-8 h-9.5 max-mob:h-8 flex justify-center items-center border-1 rounded-custom border-gray-100 dark:border-gray-700 hover:border-purple text-gray-200 hover:text-purple transition-colors cursor-pointer"
        :class="{ 'relative': loading }"
        @click="onExport"
    >
        <ExportIcon :class="{ 'opacity-0': loading }"/>

        <div
            v-if="loading"
            class="absolute inset-0 flex justify-center items-center"
        >
            <PreLoader
                wrapStyle="h-4 w-4"
                :class="outlined ? 'text-purple' : 'text-gray dark:text-white'"
            />
        </div>
    </div>
</template>

<script setup>
import ExportIcon from '@/components/icons/filterTable/ExportIcon.vue'
import PreLoader from '@/components/icons/preloaders/PreLoader.vue'

defineProps({
    outlined: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['onExport'])

function onExport() {
    emits('onExport')
}
</script>
