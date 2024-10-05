<template>
    <div class="px-4 gap-y-3 grid">
        <div
            class="h-8 gap-x-4 flex items-center"
            v-for="(item, index) in selectedSorting"
            :key="item.label"
        >
            <div
                class="px-2 h-full w-full flex items-center justify-between bg-purple-60 dark:bg-blue-770 border border-gray-100 dark:border-blue-720 rounded-custom"
                @click="onChangeItem(item)"
            >
                <div class="pr-1 w-11/12 text-xs text-gray-370 dark:text-white truncate">
                    {{ item.label }}
                </div>

                <ArrowSelect class="text-gray-200 dark:text-white"/>
            </div>

            <SortByMobileMenu
                :item="item"
                @onChange="oncChangeSortBy($event, item, index)"
            />

            <DeleteIcon
                class="min-w-6 min-h-6 text-gray-200"
                @click="onDelete(item)"
            />
        </div>
    </div>
</template>

<script setup>
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import ArrowSelect from '@/components/icons/ArrowSelect.vue'
import SortByMobileMenu from '@/components/table/tableMenu/SortByMobileMenu.vue'

defineProps({
    selectedSorting: {
        type: Array,
        default: () => [],
    },
})

const emits = defineEmits(['onSelectedSorting', 'onChangeItem'])

function onDelete(item) {
    emits('onSelectedSorting', item, 'delete')
}

function onChangeItem(item) {
    emits('onChangeItem', item)
}

function oncChangeSortBy(value, item) {
    if (value.key !== item.value.key) {
        item.value = value
        emits('onSelectedSorting', {}, 'update')
    }
}
</script>
