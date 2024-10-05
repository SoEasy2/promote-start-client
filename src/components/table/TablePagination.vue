<template>
    <div
        class="relative"
        :class="padding"
    >
        <div
            class="sticky left-0 bottom-0 flex justify-center items-center gap-1 pt-7.5 select-none"
            :class="[width]"
        >
            <div
                class="group h-6 w-6 flex justify-center items-center mr-1 transition-all"
                :class="{ 'cursor-pointer': currentPage > 1 }"
                @click="prevPage"
            >
                <PaginationArrowLeftIcon
                    class="transition-all"
                    :class="[
                    { 'text-gray-100 dark:text-gray-700': currentPage === 1 },
                    { 'text-gray-200': currentPage > 1 },
                    { 'min-mb:group-hover:text-purple': currentPage > 1 && !loading },
                ]"
                />
            </div>

            <div
                v-for="(page, index) in pagination"
                :key="'page' + index"
                class="group px-5 w-6 h-6 rounded-0.75 flex justify-center items-center"
                :class="[
                { 'ml-0.5': page !== 1 },
                { 'cursor-pointer min-mb:hover:bg-purple': currentPage !== page && page !== 'dot' && !loading },
                { 'bg-purple': currentPage === page },
            ]"
                @click="changePage(page)"
            >
            <span
                v-if="page === 'dot'"
                class="text-xs text-purple-150 dark:text-white"
            >...</span>

                <span
                    v-else
                    class="text-xs transition-colors"
                    :class="[
                    { 'text-white dark:text-gray-50': currentPage === page },
                    { 'text-purple-150 dark:text-white': currentPage !== page },
                    { 'min-mb:group-hover:text-white': currentPage !== page && !loading },
                    { 'px-2': page.toString().length > 3 },
                ]"
                >{{ page }}</span>
            </div>

            <div
                class="group h-6 w-6 flex justify-center items-center ml-1"
                :class="{ 'cursor-pointer': currentPage < totalCount }"
                @click="nextPage"
            >
                <PaginationArrowLeftIcon
                    class="transition-colors rotate-180"
                    :class="[
                    { 'text-gray-100 dark:text-gray-700': currentPage === totalCount },
                    { 'text-gray-200': currentPage < totalCount },
                    { 'min-mb:group-hover:text-purple': currentPage < totalCount && !loading },
                ]"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

import PaginationArrowLeftIcon from '@/components/icons/arrow/PaginationArrowLeftIcon.vue'

const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    totalCount: {
        type: Number,
        default: 1,
    },
    padding: {
        type: String,
        default: '',
    },
    width: {
        type: String,
        default: 'max-mb:w-screen-filter-mob',
    },
})

const currentPage = defineModel('page', { type: Number, default: 1 })

const pagination = computed(() => {
    const arr = [1]
    const dot = 'dot'

    if (props.totalCount <= 7) {
        for (let i = 2; i <= props.totalCount; i++) {
            arr.push(i)
        }
        return arr
    }

    if (currentPage.value <= 4) {
        return arr.concat([2, 3, 4, 5, dot, props.totalCount])
    }

    if (currentPage.value >= props.totalCount - 3) {
        return arr.concat([dot, props.totalCount - 4, props.totalCount - 3, props.totalCount - 2, props.totalCount - 1, props.totalCount])
    }

    return arr.concat([dot, currentPage.value - 1, currentPage.value, currentPage.value + 1, dot, props.totalCount])
})

function changePage(page) {
    if (props.loading) {
        return
    }

    if (page === currentPage.value || page === 'dot') {
        return
    }

    currentPage.value = page
}

function prevPage() {
    if (props.loading) {
        return
    }

    if (currentPage.value === 1) {
        return
    }

    currentPage.value -= 1
}

function nextPage() {
    if (props.loading) {
        return
    }

    if (currentPage.value === props.totalCount) {
        return
    }

    currentPage.value += 1
}
</script>
