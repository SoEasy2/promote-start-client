<template>
    <div class="flex flex-col gap-y-3 custom-scroll-y">
        <div
            class="py-1.5 text-xs text-gray-370 dark:text-white border-b border-white-500 dark:border-gray-760"
            v-for="item in items"
            :key="item[prop]"
            @click="onSelectItem(item)"
        >
            {{ item[prop] }}
        </div>
    </div>
</template>

<script setup>

defineProps({
    items: {
        type: Array,
        default: () => [],
    },
    prop: {
        type: String,
        default: 'label',
    },
})

const emits = defineEmits(['onSelectItem'])

function onSelectItem(item) {
    emits('onSelectItem', item)
}
</script>
