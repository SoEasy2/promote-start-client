<template>
    <div class="py-3 px-5 gap-y-4 flex flex-col bg-blue-840 border border-gray-100 dark:border-blue-720 rounded-1.25">
        <div
            class="h-6 flex justify-center items-center hover:opacity-80 text-xs text-white rounded-1.25 border transition-all cursor-pointer"
            :class="{ 'pointer-events-none opacity-30' : disabledStatus === item.id }"
            v-for="item in items"
            :key="item.label"
            :style="item.style"
            @click="onSelectItem(item)"
        >
            {{ item.label }}
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
    disabledStatus: {
        type: String,
        default: '',
    },
})

const emits = defineEmits(['onSelectItem'])

function onSelectItem(item) {
    if (props.disabledStatus === item.id) {
        return
    }

    emits('onSelectItem', item)
}
</script>
