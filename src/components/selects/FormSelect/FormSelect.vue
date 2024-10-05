<template>
    <div :class="$attrs.classes">
        <CustomMenu
            v-model="menu"
            :persistent="persistent"
            :positionsCustom="positionsCustom"
            :maxHeight="maxHeight"
            :menuWidth="menuWidth"
            :right="right"
            :fullScreen="isMobView"
        >
            <template #activator>
                <FormSelectActivator
                    v-bind="$attrs"
                    v-model:search="search"
                    v-model:selectInput="selectInput"
                    :menu="menu"
                    :label="label"
                    :isTransparent="isTransparent"
                    :textInput="textInput"
                    :mini="mini"
                    :valid="valid"
                    :loading="loading"
                    :defaultClasses="defaultClasses"
                    :disableSearch="disableSearch"
                    :showCleanIcon="showCleanIcon"
                    :readonly="readonly"
                    :modelValue="modelValue"
                    :rules="rules"
                    :subMessage="subMessage"
                    :valueClass="valueClass"
                    :returnObject="returnObject"
                    :itemText="itemText"
                    :itemTextLabel="itemTextLabel"
                    :prefix="prefix"
                    :items="items"
                    :itemValue="itemValue"
                    :multiple="multiple"
                    @inputMouseDown="inputMouseDown"
                    @cleanValue="cleanValue"
                    @updateValid="updateValid"
                    @changeMenu="changeMenu"
                />
            </template>

            <template #dropdown>
                <ListDropdown
                    v-if="menu"
                    v-model:currentItem="currentItem"
                    :menu="menu"
                    :search="search"
                    :items="items"
                    :disabledItems="disabledItems"
                    :emptyMessage="emptyMessage"
                    :multiple="multiple"
                    :returnObject="returnObject"
                    :disableSearch="false"
                    :mini="mini"
                    :itemText="itemText"
                    :itemValue="itemValue"
                    :typeWithoutArrow="typeWithoutArrow"
                    :backArrowTitle="backArrowTitle"
                    :defaultValue="getDefaultValue()"
                    @closeMenu="closeMenu"
                    @focusInput="focusInput"
                    @clickItem="clickItem"
                >
                    <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
                        <slot :name="slot" v-bind="scope" />
                    </template>
                </ListDropdown>
            </template>
        </CustomMenu>
    </div>
</template>

<script setup>
import {
    ref, computed, watch, nextTick, inject,
} from 'vue'

import CustomMenu from '@/components/menu/CustomMenu/CustomMenu.vue'
import ListDropdown from '@/components/menu/dropdown/ListDropdown/ListDropdown.vue'
import FormSelectActivator from '@/components/selects/FormSelect/FormSelectActivator.vue'

import { viewPorts } from '@/constants/viewPorts'

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    isButton: {
        type: Boolean,
        default: false,
    },
    showLabel: {
        type: Boolean,
        default: false,
    },
    items: {
        type: Array,
        default: () => [],
    },
    disabledItems: {
        type: Array,
        default: () => [],
    },
    modelValue: {
        type: [String, Number, Object, Array],
        default: null,
    },
    itemText: {
        type: String,
        default: 'name',
    },
    itemTextLabel: {
        type: String,
        default: null,
    },
    prefix: {
        type: String,
        default: '',
    },
    itemValue: {
        type: String,
        default: 'id',
    },
    defaultClasses: {
        type: String,
        default: 'px-6 max-mob:px-4 h-11.5',
    },
    valueClass: {
        type: [String, Boolean],
        default: 'font-medium',
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    emitFirstChangeValue: {
        type: Boolean,
        default: true,
    },
    valid: {
        type: Boolean,
        default: true,
    },
    right: {
        type: Boolean,
        default: false,
    },
    rules: {
        type: Array,
        default: () => [],
    },
    emptyMessage: {
        type: String,
        default: 'No data available',
    },
    subMessage: {
        type: String,
        default: null,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    returnObject: {
        type: Boolean,
        default: false,
    },
    subAccountName: {
        type: Boolean,
        default: false,
    },
    disableSearch: {
        type: Boolean,
        default: false,
    },
    mini: {
        type: Boolean,
        default: false,
    },
    showCleanIcon: {
        type: Boolean,
        default: false,
    },
    menuWidth: {
        type: [Number, String],
        default: '',
    },
    maxHeight: {
        type: [Number, String],
        default: 300,
    },
    maxHeightWithButton: {
        type: String,
        default: '55vh',
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    positionsCustom: {
        type: Object,
        default: () => ({}),
    },
    textInput: {
        type: Boolean,
        default: false,
    },
    isTransparent: {
        type: Boolean,
        default: false,
    },
    backArrowTitle: {
        type: String,
        default: 'Back',
    },
    typeWithoutArrow: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['update:modelValue', 'changeValue', 'update:valid', 'close', 'clickItem', 'closeMenu'])

const currentViewSize = inject('currentViewSize')

const currentItem = props.multiple ? ref([]) : ref(null)
const menu = ref(false)
const search = ref('')

const isMobView = computed(() => viewPorts.mob >= currentViewSize.value)

const persistent = computed(() => (isMobView.value ? true : props.multiple))

const getItemTextLabel = computed(() => (props.itemTextLabel ? props.itemTextLabel : props.itemText))

function clickItem(item) {
    emits('clickItem', item)
}

let clickInInput = false

function changeMenu(value) {
    menu.value = value
}

function closeMenu() {
    if (!clickInInput) {
        menu.value = false
    }

    clickInInput = false
}

function inputMouseDown() {
    clickInInput = true
}

const selectInput = ref(null)

function getDefaultValue() {
    if (props.multiple) {
        return ''
    }

    return getValue()
}

function focusInput() {
    if (props.disableSearch) {
        return
    }

    if (!props.multiple) {
        search.value = getValue()
    }

    nextTick(() => {
        if (selectInput.value) {
            selectInput.value.focus()
        }
    })
}

function cleanValue() {
    const value = props.returnObject ? {} : null

    emits('update:modelValue', value)
    emits('changeValue', value)
}

function updateValid(value) {
    emits('update:valid', value)
}

function getValue() {
    if (props.returnObject && !props.multiple) {
        return props.modelValue ? props.modelValue[props.itemText] : props.label
    }

    return getName(props.modelValue, props.currentItem)
}

function getName(value) {
    if (!value) {
        return props.label
    }

    if (props.multiple && value?.length) {
        return value.length === 1
            ? props.returnObject ? value[0][props.itemText] : getNameById(value[0])
            : `${value.length} ${props.label}`
    }

    const currentItem = props.items.find((item) => item[props.itemValue] === value)

    if (!currentItem) {
        return props.label
    }

    return `${props.prefix}${currentItem.hasOwnProperty(getItemTextLabel.value) ? currentItem[getItemTextLabel.value] : currentItem}`
}

watch(currentItem, (item, oldValue) => {
    if (!props.emitFirstChangeValue && !oldValue) {
        return
    }

    emits('update:modelValue', item)
    emits('changeValue', item)

    if (props.multiple) {
        return
    }

    if (item) {
        closeMenu()
    }
}, { deep: true })

watch(() => props.modelValue, (value) => {
    if (!value) {
        currentItem.value = props.multiple ? [] : null
    } else {
        currentItem.value = value
    }
}, { immediate: true })

watch(menu, () => {
    if (menu.value) {
        focusInput()
    } else {
        search.value = ''
        emits('closeMenu')
    }
})
</script>
