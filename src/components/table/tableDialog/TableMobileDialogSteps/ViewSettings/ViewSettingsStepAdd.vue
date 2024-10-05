<template>
    <div class="pt-4 pb-8 gap-y-4 grid custom-scroll-y">
        <div class="px-4">
            <InputSearch
                v-model:searchValue="searchValue"
                customClass="h-9 px-3 border border-gray-100 dark:border-blue-720 rounded-custom"
                placeholder="Search by Columns"
            />
        </div>

        <SelectList
            class="px-4"
            :filter="settings"
            prop="value"
            isBorder
        />
    </div>
</template>

<script setup>
import {
    computed, onMounted, reactive, ref, watch,
} from 'vue'

import InputSearch from '@/components/inputs/InputSearch.vue'
import SelectList from '@/components/lists/SelectList.vue'

import { localSearch } from '@/helpers/app-helper'

const settingsColumns = defineModel('settingsColumns', { type: Object, default: () => ({}) })

const searchValue = ref('')

const settings = reactive({
    values: [],
    value: [],
})

const headersWithoutDisabled = computed(() => {
    const { headers } = settingsColumns.value
    return headers.filter((h) => !h.disabled)
})

function parsProps() {
    const { activeColumns } = settingsColumns.value

    settings.value = activeColumns
    settings.values = headersWithoutDisabled.value
}

watch(() => settings.value, (newVal, oldVal) => {
    if (!oldVal.length) {
        return
    }

    settingsColumns.value.activeColumns = newVal
})

watch(searchValue, (search) => {
    settings.values = localSearch(headersWithoutDisabled.value, search, ['name'])
})

onMounted(parsProps)
</script>
