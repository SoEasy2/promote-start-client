<template>
    <label
        for="search"
        class="flex justify-center items-center w-full"
        :class="[
            customClass,
            isBorder && 'border-b-1 border-gray-100 dark:border-blue-720',
        ]"
    >
        <div
            v-if="isBig"
            class="min-w-9.5 min-h-9.5 flex items-center justify-center"
        >
            <SearchBigIcon class="text-gray-200"/>
        </div>

        <SearchIcon
            v-else
            class="min-w-4.5 max-w-4.5 min-h-4.5 max-h-4.5 text-gray-200"
        />

        <input
            v-if="!showOnlySearchIcon"
            class="w-full bg-transparent placeholder:text-gray-280 text-gray-370 dark:text-white"
            :class="[
                isBig ? 'ml-3 text-lg' : 'ml-2 text-xxs ',
                text,
            ]"
            v-model="search"
            :placeholder="placeholder"
            ref="searchRef"
            @focus="onFocus"
        >

        <div
            v-if="showCleanIcon"
            class="flex justify-between items-center ml-3"
        >
            <CleanIcon
                class="text-gray-200 dark:text-gray-700 cursor-pointer"
                @click="cleanValue"
            />
        </div>
    </label>
</template>

<script setup>
import {
    computed, onMounted, ref, watch,
} from 'vue'

import SearchIcon from '@/components/icons/SearchIcon.vue'
import SearchBigIcon from '@/components/icons/SearchBigIcon.vue'
import CleanIcon from '@/components/icons/CleanIcon.vue'

const props = defineProps({
    searchValue: {
        type: [String, Number],
        default: '',
    },
    customClass: {
        type: String,
        default: 'py-4',
    },
    isBorder: {
        type: Boolean,
        default: false,
    },
    isBig: {
        type: Boolean,
        default: false,
    },
    placeholder: {
        type: String,
        default: 'Search...',
    },
    searchTimeout: {
        type: Number,
        default: 500,
    },
    autoFocus: {
        type: Boolean,
        default: false,
    },
    focusWithSelect: {
        type: Boolean,
        default: false,
    },
    showCleanIcon: {
        type: Boolean,
        default: false,
    },
    text: {
        type: String,
        default: '',
    },
    showOnlySearchIcon: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['onSearch', 'update:searchValue'])

const emptySearch = ref(true)
const searchRef = ref(null)

const search = computed({
    get() {
        return props.searchValue
    },
    set(data) {
        return emits('update:searchValue', data)
    },
})

function cleanValue() {
    search.value = ''
}

function inputFocus() {
    setTimeout(() => {
        searchRef.value.focus()
    })
}

function onFocus(event) {
    if (props.focusWithSelect) {
        event.target.select()
    }
}

function getString(value) {
    return value ? value.toString().trim() : ''
}

let serverSearchInterval = null

function serverSearch(search) {
    if (!emptySearch.value || search && search.length) {
        emptySearch.value = !search

        clearInterval(serverSearchInterval)

        serverSearchInterval = setInterval(() => {
            clearInterval(serverSearchInterval)
            emits('onSearch', search.trim() ? search.trim() : null)
        }, props.searchTimeout)
    }
}

watch(search, (value, oldValue) => {
    if (!value || getString(value) !== getString(oldValue)) {
        serverSearch(value)
    }
})

watch(() => props.autoFocus, (autoFocus) => {
    if (autoFocus) {
        inputFocus()
    }
})

onMounted(() => {
    if (props.autoFocus) inputFocus()
})
</script>
