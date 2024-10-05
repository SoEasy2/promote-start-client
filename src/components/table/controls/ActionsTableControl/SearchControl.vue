<template>
    <div
        class="flex items-center justify-between space-x-2 p-1 transition-width"
        :class="[
            visibleSearchInput ? width : search ? 'w-12' : 'w-6',
            mainBg
        ]"
    >
        <div class="w-6 h-6">
            <SearchIcon
                class="transition-colors cursor-pointer"
                :class="visibleSearchInput || search ? 'text-purple' : 'text-gray-200 hover:text-purple'"
                @click="showSearchInput"
            />
        </div>

        <div class="overflow-hidden" v-show="delayVisibleSearchInput">
            <input
                class="text-gray-200 bg-transparent text-xs"
                v-model="search"
                ref="searchRef"
            />
        </div>

        <div class="w-4 h-4">
            <CleanIcon
                v-show="visibleSearchInput || search"
                class="text-gray-100 hover:text-gray-200 dark:text-gray-700 dark:hover:text-gray-200 cursor-pointer"
                @click="cleanSearch"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

import SearchIcon from '@/components/icons/filterTable/SearchIcon.vue'
import CleanIcon from '@/components/icons/CleanIcon.vue'

const props = defineProps({
    searchTimeout: {
        type: Number,
        default: 500,
    },
    width: {
        type: String,
        default: 'w-45',
    },
    searchValue: {
        type: String,
        default: '',
    },
    mainBg: {
        type: String,
        default: 'bg-white dark:bg-blue-800',
    },
})

const emits = defineEmits(['onSearch'])

const visibleSearchInput = ref(false)
const delayVisibleSearchInput = ref(false)
const emptySearch = ref(true)
const search = ref('')
const searchRef = ref(null)

function showSearchInput() {
    visibleSearchInput.value = true
}

function inputFocus() {
    setTimeout(() => {
        searchRef.value.focus()
    })
}

function cleanSearch() {
    search.value = ''
    hideSearch()
    inputFocus()
}

function hideSearch() {
    visibleSearchInput.value = false
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

function setDefault() {
    if (props.searchValue) {
        showSearchInput()

        setTimeout(() => {
            search.value = props.searchValue
            delayVisibleSearchInput.value = true
            emptySearch.value = false
        })
    }
}

function delayTrigger(value) {
    setTimeout(() => {
        delayVisibleSearchInput.value = value

        inputFocus()
    }, 160)
}

watch(search, (value, oldValue) => {
    if (!value || getString(value) !== getString(oldValue)) {
        if (props.searchValue !== value || !value) {
            serverSearch(value)
        }
    }
})

watch(() => props.searchValue, setDefault, { immediate: true })

watch(visibleSearchInput, (value) => {
    delayTrigger(value)
})

onUnmounted(() => {
    clearInterval(serverSearchInterval)
})
</script>
