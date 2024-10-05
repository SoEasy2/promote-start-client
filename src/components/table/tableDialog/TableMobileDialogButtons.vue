<template>
    <div class="px-4 gap-y-1 w-full flex flex-col items-start">
        <div
            v-if="!hideActionButton"
            class="w-full"
            @click="onAdd"
        >
            <div class="py-1.5 gap-x-2 flex items-center">
                <AddIcon class="text-gray-280 dark:text-white" />

                <div class="text-xs text-gray-180 dark:text-white uppercase">
                    {{ addButtonName }}
                </div>
            </div>

            <CustomDivider class="w-full" color="border-white-500 dark:border-gray-760" />
        </div>

        <div
            v-if="!hideClearButton"
            class="w-full"
            @click="onClear"
        >
            <div class="py-1.5 gap-x-2 flex items-center">
                <WashIcon class="text-gray-280 dark:text-white" />

                <div class="text-xs text-gray-180 dark:text-white uppercase">
                    Clear all
                </div>
            </div>

            <CustomDivider class="w-full" color="border-white-500 dark:border-gray-760" />
        </div>
    </div>
</template>

<script setup>
import AddIcon from '@/components/icons/AddIcon.vue'
import WashIcon from '@/components/icons/WashIcon.vue'
import CustomDivider from '@/components/divider/CustomDivider.vue'

defineProps({
    addButtonName: {
        type: String,
        default: 'Add',
    },
    hideClearButton: {
        type: Boolean,
        default: false,
    },
    hideActionButton: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['onClear', 'onAdd'])

function onAdd() {
    emits('onAdd')
}

function onClear() {
    emits('onClear')
}
</script>
