<template>
    <div
        v-bind="containerProps"
        class="grow p-1.25 max-mob:px-4 max-mob:pt-0 max-mob:pb-4 relative z-50 custom-scroll-y"
        id="listDropdownBodyId"
    >
        <div
            v-bind="wrapperProps"
            class="max-mob:flex max-mob:flex-col gap-y-3"
        >
            <div
                v-for="item in list"
                :key="item.index"
                class="gap-x-2 flex items-center rounded-1.25 max-mob:rounded-none cursor-pointer"
                :class="wrapClass(item.data, item.index)"
                @click="changeItem(returnObject ? item.data : item.data[itemValue])"
            >
                <CustomCheckBox
                    v-if="multiple"
                    :checked="isSelected(item.data[itemValue])"
                    :disabled="isDisabled(returnObject ? item.data : item.data[itemValue])"
                />

<!--                <CountryFlag-->
<!--                    v-if="isCountry"-->
<!--                    class="rounded-0.5 normal-size__dropdown"-->
<!--                    :country="item.data.code"-->
<!--                />-->

                <div
                    class="flex items-center truncate whitespace-nowrap"
                    :class="{ 'justify-center': center }"
                >
                     <span
                        class="text-xs font-medium text-gray-370 dark:text-white truncate whitespace-nowrap select-none"
                        :class="isCountry && 'w-9'"
                        v-html="item.data[itemText]"
                    />

                    <span
                        v-if="isCountry"
                        class="text-xs font-medium text-gray-370 dark:text-white select-none"
                    >
                        {{ item.data.name }}
                    </span>
                </div>

                <div
                    v-if="isMobView && isSelected(item.data[itemValue])"
                    class="ml-auto pl-2"
                >
                    <OkLongIcon class="text-gray-200" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useVirtualList } from '@vueuse/core'

import CustomCheckBox from '@/components/inputs/CustomCheckBox.vue'
import OkLongIcon from '@/components/icons/OkLongIcon.vue'

import { scrollToTopById } from '@/helpers/app-helper'

const props = defineProps({
    selectItems: {
        type: Array,
        default: () => [],
    },
    disabledItems: {
        type: Array,
        default: () => [],
    },
    isCountry: {
        type: Boolean,
        default: false,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    itemValue: {
        type: String,
        default: 'id',
    },
    returnObject: {
        type: Boolean,
        default: false,
    },
    mini: {
        type: Boolean,
        default: false,
    },
    itemText: {
        type: String,
        default: 'name',
    },
    center: {
        type: Boolean,
        default: false,
    },
    isMobView: {
        type: Boolean,
        default: false,
    },
    search: {
        type: String,
        default: '',
    },
})

const emits = defineEmits(['clickItem', 'focusInput', 'closeMenu'])

const currentItemLocal = defineModel('currentItemLocal', { type: [String, Number, Object, Array], default: null })

const items = computed(() => props.selectItems)

const { list, containerProps, wrapperProps } = useVirtualList(
    items,
    {
        itemHeight: getItemHeight(),
    },
)

function getItemHeight() {
    if (props.isMobView) {
        return 47
    }

    if (props.mini) {
        return 30
    }

    return 40
}

function wrapClass(item, index) {
    if (props.isMobView) {
        return [
            'h-7.25 py-1.5 border-b border-white-500 dark:border-gray-760',
            props.isCountry ? 'px-0' : 'px-1.5',
        ]
    }

    return [
        'hover:bg-gray-80 dark:hover:bg-blue-770',
        { 'bg-gray-80 dark:bg-blue-770': isSelected(item[props.itemValue]) },
        props.mini ? index && 'mt-0.5' : index && 'mt-1',
        props.isCountry ? 'px-0' : 'px-2.5',
        props.isCountry
            ? 'py-0 h-9'
            : props.mini ? 'py-1.5' : 'py-2.5',
    ]
}

function isSelected(item) {
    if (props.multiple) {
        if (!Array.isArray(currentItemLocal.value)) {
            return false
        }

        return !!currentItemLocal.value.find((i) => (props.returnObject ? i[props.itemValue] : i) === item)
    }

    if (!currentItemLocal.value) {
        return false
    }

    return props.returnObject
        ? item === currentItemLocal.value[props.itemValue]
        : item === currentItemLocal.value
}

function isDisabled(item) {
    if (!props.disabledItems.length) {
        return false
    }

    if (props.returnObject) {
        return props.disabledItems.some((d) => d[props.itemValue] === item[props.itemValue])
    }

    return props.disabledItems.some((d) => d === item)
}

function focusInput() {
    emits('focusInput')
}

function closeMenu() {
    emits('closeMenu')
}

function changeItem(item) {
    if (isDisabled(item)) {
        return
    }

    if (props.loading) {
        return
    }

    emits('clickItem', item)

    if (!props.multiple) {
        currentItemLocal.value = item
        closeMenu()
        return
    }

    if (!currentItemLocal.value) {
        currentItemLocal.value = []
        focusInput()
        return
    }

    const itemId = props.returnObject ? item[props.itemValue] : item

    if (currentItemLocal.value.find((i) => (props.returnObject ? i[props.itemValue] : i) === itemId)) {
        currentItemLocal.value = currentItemLocal.value.filter((i) => (props.returnObject ? i[props.itemValue] : i) !== itemId)
        focusInput()
        return
    }

    currentItemLocal.value.push(item)
    focusInput()
}

watch(() => props.search, () => {
    scrollToTopById('#listDropdownBodyId')
})
</script>
