<template>
    <tr
        class="group/row h-10 transition"
        :class="{ 'cursor-pointer': clickableRow }"
        @click="clickRow"
    >
        <td
            v-if="showSelect"
            class="pl-4 cursor-pointer border-gray-100 dark:border-gray-700 transition-colors"
            :class="dynamicClass"
            @click.stop="onSelectRow"
        >
            <CustomCheckBox
                v-if="!hideSelectChild"
                :checked="checkIncludingItem"
                hidden
            />
        </td>

        <td
            class="border-gray-100 dark:border-gray-700 transition-colors"
            :class="tdClass(index)"
            v-for="(value, index) in headersValue"
            :key="`td-${index}`"
            :style="[
               headers[index].hasOwnProperty('right') ? { right: `${headers[index].right}rem` } : {},
            ]"
        >
            <div class="text-gray-370 dark:text-gray-100 text-xs relative whitespace-nowrap">
                <slot :name="`item.${value}`" :item="item" :index="index" :rowIndex="rowIndex">
                    {{ item[value] }}
                </slot>
            </div>
        </td>
    </tr>
</template>

<script setup>
import { computed } from 'vue'

import CustomCheckBox from '@/components/inputs/CustomCheckBox.vue'

const props = defineProps({
    rowIndex: {
        type: Number,
        default: -1,
    },
    rowIndexChild: {
        type: Number,
        default: -1,
    },
    activeChildrenTableIndex: {
        type: Number,
        default: -1,
    },
    isLastRowIndexChild: {
        type: Boolean,
        default: false,
    },
    clickableRow: {
        type: Boolean,
        default: false,
    },
    item: {
        type: Object,
        default: () => ({}),
    },
    showSelect: {
        type: Boolean,
        default: false,
    },
    selectCheckboxByClickRow: {
        type: Boolean,
        default: false,
    },
    hideSelectChild: {
        type: Boolean,
        default: false,
    },
    isChild: {
        type: Boolean,
        default: false,
    },
    disabledEventClickRow: {
        type: Boolean,
        default: false,
    },
    headers: {
        type: Array,
        default: () => [],
    },
    itemKey: {
        type: String,
        default: 'slug',
    },
    mainBg: {
        type: String,
        default: 'bg-white dark:bg-blue-800',
    },
    mainBgChildren: {
        type: String,
        default: 'bg-gray-80 dark:bg-blue-780',
    },
})

const selected = defineModel('selected', { type: Object, default: () => [] })
const activeRow = defineModel('activeRow', { type: Number, default: -1 })

const headersValue = computed(() => props.headers.map((h) => h.value))

const checkIncludingItem = computed(() => !!selected.value.find((i) => i[props.itemKey] === props.item[props.itemKey]))

const isChildRow = computed(() => props.rowIndex === props.activeChildrenTableIndex)
const isFirstChildRow = computed(() => isChildRow.value && props.rowIndexChild === -1)

const border = computed(() => {
    if (props.activeChildrenTableIndex !== 0 && props.rowIndex === 0) {
        return ''
    }

    if (props.activeChildrenTableIndex + 1 === props.rowIndex) {
        return ''
    }

    return 'border-t'
})

const dynamicClass = computed(() => {
    if (isChildRow.value) {
        return [
            border.value,
            props.mainBgChildren,
            'first:border-l-1 last:border-r-1',
            { 'first:rounded-bl-1.25 last:rounded-br-1.25': props.isLastRowIndexChild },
            { 'first:rounded-tl-1.25 last:rounded-tr-1.25': isFirstChildRow.value },
            { 'border-b': props.isLastRowIndexChild },
        ]
    }

    return [
        border.value,
        activeRow.value === props.rowIndex ? 'bg-tableSelect-purple50 dark:bg-tableSelect-purple700' : props.mainBg,
        { 'group-hover/row:bg-gray-80 dark:group-hover/row:bg-blue-780': activeRow.value !== props.rowIndex },
    ]
})

function tdClass(index) {
    return [
        `px-3 td-item-${index} ${props.rowIndex}`,
        props.headers[index].align && `text-${props.headers[index].align}`,
        { 'sticky transition-colors': props.headers[index].sticky },
        ...dynamicClass.value,
    ]
}

function onSelectRow() {
    changeSelectedItem()
}

function changeSelectedItem() {
    if (props.hideSelectChild) {
        return
    }

    const foundIndex = selected.value.findIndex((i) => i[props.itemKey] === props.item[props.itemKey])

    if (foundIndex + 1) {
        selected.value.splice(foundIndex, 1)
    } else {
        selected.value = [...selected.value, props.item]
    }
}

function setActiveRow(rowIndex) {
    activeRow.value = activeRow.value === rowIndex ? -1 : rowIndex
}

function clickRow() {
    if (props.disabledEventClickRow) {
        return
    }

    if (props.showSelect && props.selectCheckboxByClickRow) {
        changeSelectedItem()
    }

    setActiveRow(props.rowIndex)
}
</script>
