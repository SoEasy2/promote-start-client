<template>
    <div
        class="px-2 h-10 gap-x-2 flex items-center border-gray-100 dark:border-blue-720 border rounded-1.25 cursor-pointer"
        @click="menuHandler"
    >
        <div
            class="min-w-22 h-6 flex items-center justify-center text-white text-xs border rounded-1.25"
            :style="selectedItem.style"
        >
            {{ selectedItem.label }}
        </div>

        <ArrowSelect
            class="w-3 transform transition-all"
            :class="menu ? 'rotate-180 text-purple' : 'text-gray-280'"
        />
    </div>
</template>

<script setup>
import ArrowSelect from '@/components/icons/ArrowSelect.vue'

defineProps({
    menu: {
        type: Boolean,
        default: false,
    },
    selectedItem: {
        type: Object,
        default: () => ({}),
    },
})

const emits = defineEmits(['menuHandler'])

function menuHandler() {
    emits('menuHandler')
}
</script>
