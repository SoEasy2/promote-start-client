<template>
    <div class="px-3 py-3 grid gap-y-3 rounded-1.25 bg-blue-840 border border-gray-100 dark:border-gray-700">
        <div
            class="flex items-center cursor-pointer hover:opacity-80 transition-all"
            v-for="(item, index) in items"
            :key="index"
            @click="onChange(item)"
        >
            <div
                class="mr-2 w-2 h-2 rounded-full"
                :style="background(item)"
            />

            <div
                class="text-xs"
                :style="textColor(item)"
            >
                {{ item[itemText] }}
            </div>
        </div>
    </div>
</template>

<script setup>

defineProps({
    items: {
        type: Array,
        default: () => [],
    },
    itemText: {
        type: String,
        default: 'name',

    },
})

const emits = defineEmits(['onChange'])

function background({ style = {} }) {
    const { color } = style

    return { background: color }
}

function textColor({ style = {} }) {
    const { color } = style

    return { color }
}

function onChange(item) {
    emits('onChange', item)
}
</script>
