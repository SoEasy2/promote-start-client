<template>
    <div class="px-4 gap-2 flex flex-wrap">
        <div
            class="h-8 px-2 gap-x-2 flex items-center border border-gray-100 dark:border-blue-720 rounded-custom"
            v-for="item in items"
            :key="item.value"
            @click="onRemove(item)"
        >
            <CleanIcon class="min-w-4 min-h-4 text-gray-200 dark:text-blue-770"/>

           <div class="text-xs text-gray-370 dark:text-white">
               {{ item.name }}
           </div>
        </div>
    </div>
</template>

<script setup>
import CleanIcon from '@/components/icons/CleanIcon.vue'

defineProps({
    items: {
        type: Array,
        default: () => [],
    },
})

const emits = defineEmits(['onRemove'])

function onRemove(item) {
    emits('onRemove', item)
}
</script>
