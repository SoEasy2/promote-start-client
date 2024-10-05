<template>
    <div
        v-if="items.length"
        class="grid"
    >
        <div
            class="grid gap-y-0.5 custom-scroll"
            :style="styles"
        >
            <div
                class="h-7 px-2.5 rounded-1.25 hover:bg-gray-80 dark:hover:bg-blue-770 cursor-pointer"
                v-for="item in showItems"
                :key="item[prop]"
                @click="onHandlerItem(item)"
            >
                <span class="text-xs font-medium text-gray-370 dark:text-white">
                    {{ item[prop] }}
                </span>
            </div>
        </div>

        <div
            v-if="isShowMore"
            class="flex items-center h-7 gap-x-3 px-2.5 cursor-pointer hover:bg-gray-80 dark:hover:bg-blue-770 rounded-1.25"
            @click="onShowAll"
        >
            <PointerIcon class="text-gray-200"/>

            <div class="text-gray-280 text-xs">
                {{ counter }} more
            </div>
        </div>
    </div>

    <div
        v-else
        class="h-7 px-2.5 flex items-center text-xs text-gray-200"
    >
        {{ emptyMessage }}
    </div>
</template>

<script setup>
import { computed } from 'vue'

import PointerIcon from '@/components/icons/PointerIcon.vue'

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
    prop: {
        type: String,
        default: 'label',
    },
    maxShow: {
        type: Number,
        default: 5,
    },
    emptyMessage: {
        type: String,
        default: 'No results',
    },
})

const emits = defineEmits(['onHandlerItem', 'update:maxShow'])

const counter = computed(() => props.items.length - props.maxShow)

const isShowMore = computed(() => props.maxShow < props.items.length)

const showItems = computed(() => [...props.items].splice(0, props.maxShow))

const styles = computed(() => {
    const height = 28
    const gap = 2
    const count = showItems.value.length <= 12 ? showItems.value.length : 12

    return {
        maxHeight: `${(height * count) + (gap * (count - 1))}px`,
    }
})

function onHandlerItem(item) {
    emits('onHandlerItem', item)
}

function onShowAll() {
    emits('update:maxShow', props.items.length)
}
</script>
