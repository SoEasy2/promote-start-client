<template>
    <CustomMenu
        v-model="menu"
        :maxHeight="128"
        :menuWidth="128"
        hideTransitionSlider
    >
        <template #activator>
            <StatusMenuActivator
                :menu="menu"
                :selectedItem="selectedItem"
                @menuHandler="menuHandler"
            />
        </template>

        <template #dropdown>
            <StatusMenuDropdown
                :items="Object.values(VERIFICATION_STATUSES)"
                :disabledStatus="disabledStatus"
                @onSelectItem="onSelectItem"
            />
        </template>
    </CustomMenu>
</template>

<script setup>
import { computed, ref } from 'vue'

import CustomMenu from '@/components/menu/CustomMenu/CustomMenu.vue'
import StatusMenuActivator from '@/components/menu/StatusMenu/StatusMenuActivator.vue'
import StatusMenuDropdown from '@/components/menu/StatusMenu/StatusMenuDropdown.vue'

import { VERIFICATION_STATUSES } from '@/constants/verification'

defineProps({
    disabledStatus: {
        type: String,
        default: '',
    },
})

const modelValue = defineModel('modelValue', { type: String, default: '' })

const menu = ref(false)

const selectedItem = computed(() => {
    if (VERIFICATION_STATUSES[modelValue.value]) {
        return VERIFICATION_STATUSES[modelValue.value]
    }

    return VERIFICATION_STATUSES.in_review
})

function onSelectItem({ id }) {
    modelValue.value = id
}

function menuHandler() {
    menu.value = !menu.value
}
</script>
