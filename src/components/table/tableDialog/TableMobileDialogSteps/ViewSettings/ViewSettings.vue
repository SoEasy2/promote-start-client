<template>
    <div class="pt-4 pb-8 custom-scroll-y">
        <template v-if="items.length">
            <SettingsList
                :items="items"
                @onRemove="onRemove"
            />

            <CustomDivider class="mt-4 mb-1 w-full"/>
        </template>

        <TableMobileDialogButtons
            addButtonName="add settings"
            :hideClearButton="!items.length"
            :hideActionButton="hideActionButton"
            @onClear="onClear"
            @onAdd="onAdd"
        />
    </div>
</template>

<script setup>
import { computed } from 'vue'

import TableMobileDialogButtons from '@/components/table/tableDialog/TableMobileDialogButtons.vue'
import SettingsList from '@/components/table/tableList/SettingsList.vue'
import CustomDivider from '@/components/divider/CustomDivider.vue'

import { VIEWS_TABLE_MOBILE_DIALOG } from '@/constants/viewsTableMobileDialog'

const emits = defineEmits(['goToNextView'])

const settingsColumns = defineModel('settingsColumns', { type: Object, default: () => ({}) })
const selectedItem = defineModel('selectedItem', { type: Object, default: () => ({}) })

const hideActionButton = computed(() => {
    const { headers = [], activeColumns = [] } = settingsColumns.value
    return headers.length === activeColumns.length
})

const items = computed(() => {
    const { headers = [], activeColumns = [] } = settingsColumns.value
    const headersWithoutDisabled = headers.filter((h) => !h.disabled)

    const items = []

    activeColumns.forEach((key) => {
        const findItem = headersWithoutDisabled.find((h) => h.value === key)
        if (findItem) {
            items.push(findItem)
        }
    })

    return items
})

function onAdd() {
    selectedItem.value = null
    goToNextView()
}

function onClear() {
    const { headers = [] } = settingsColumns.value
    settingsColumns.value.activeColumns = headers.filter((h) => h.disabled).map((h) => h.value)

    emits('changeActiveColumn')
}

function onRemove({ value }) {
    settingsColumns.value.activeColumns = settingsColumns.value.activeColumns.filter((key) => key !== value)
    emits('changeActiveColumn')
}

function goToNextView() {
    emits('goToNextView', VIEWS_TABLE_MOBILE_DIALOG.settingsStepAdd)
}
</script>
