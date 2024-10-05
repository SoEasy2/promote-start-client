<template>
    <CustomMenu
        v-model="menu"
        :menuWidth="185"
        customClass="flex"
        right
    >
        <template #activator>
            <SettingIcon
                class="text-gray-200 hover:text-purple transition-colors cursor-pointer"
                @click="menuHandler"
            />
        </template>

        <template #dropdown>
            <div
                class="py-3 pl-3 pr-1 grow min-w-46.25 w-max flex flex-col rounded-1.25 bg-white dark:bg-blue-840 border border-gray-100 dark:border-blue-720"
                @click.stop
            >
                <SelectList
                    :filter="settings"
                    prop="value"
                />

                <PrimaryBtn
                    class="mt-5 min-h-9.5 w-max"
                    @click="onSettings"
                >
                    Done
                </PrimaryBtn>
            </div>
        </template>
    </CustomMenu>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'

import CustomMenu from '@/components/menu/CustomMenu/CustomMenu.vue'
import SettingIcon from '@/components/icons/navigations/SettingIcon.vue'
import SelectList from '@/components/lists/SelectList.vue'
import PrimaryBtn from '@/components/buttons/PrimaryBtn.vue'

import { setActiveColumnsHeader } from '@/helpers/settings-header-table-helper'

import { useSettingsHeaderTableStore } from '@/store/settingsHaderTableStore'

const props = defineProps({
    headerType: {
        type: String,
        default: '',
    },
})

const settingsHeaderTableStore = useSettingsHeaderTableStore()

const menu = defineModel('menu', { type: Boolean, default: false })

const settings = reactive({
    values: [],
    value: [],
})

const headerTable = computed(() => settingsHeaderTableStore.getHeadersTable(props.headerType))

function menuHandler() {
    menu.value = !menu.value
}

function onSettings() {
    setActiveColumnsHeader(settings.value, props.headerType)
    headerTable.value.action(settings.value)

    menuHandler()
}

watch(menu, (newVal) => {
    if (newVal) {
        const { headers = [], activeColumns = [] } = headerTable.value

        settings.values = headers.filter((h) => !h.disabled)
        settings.value = [...activeColumns]
    }
})

</script>
