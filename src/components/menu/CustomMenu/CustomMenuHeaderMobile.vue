<template>
    <div class="mb-4">
        <div class="p-4 flex items-center justify-between border-b-1 border-gray-100 dark:border-blue-720">
            <div
                v-if="typeWithoutArrow"
                class="text-gray-370 dark:text-white font-medium text-lg uppercase select-none"
            >
                {{ backArrowTitle }}
            </div>

            <div
                v-else
                class="gap-x-1 flex items-center text-purple select-none"
                @click="closeMenu"
            >
                <ArrowRightLongIcon class="rotate-180"/>

                <div class="text-xs font-medium">
                    {{ backArrowTitle }}
                </div>
            </div>

            <slot>
                <CloseIconMini
                    class="text-gray-200"
                    @click="closeMenu"
                />
            </slot>
        </div>

        <div
            v-if="!disableSearch"
            class="pt-4 px-4"
        >
            <InputSearch
                :searchValue="search"
                customClass="h-9 px-3 border border-gray-100 dark:border-blue-720 rounded-1.25"
                placeholder="Search"
                focusWithSelect
                @update:searchValue="onSearch"
            />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import InputSearch from '@/components/inputs/InputSearch.vue'
import CloseIconMini from '@/components/icons/CloseIconMini.vue'
import ArrowRightLongIcon from '@/components/icons/arrow/ArrowRightLongIcon.vue'

const props = defineProps({
    disableSearch: {
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
    searchValue: {
        type: [String, Number],
        default: null,
    },
    defaultValue: {
        type: String,
        default: '',
    },
})

const emits = defineEmits(['closeMenu', 'onSearch', 'handleClick'])

const search = ref(null)

onMounted(() => {
    search.value = props.defaultValue
})

function closeMenu() {
    emits('closeMenu')
}

function onSearch(value) {
    emits('onSearch', value)
}
</script>
