<template>
    <div class="flex items-center">
        <CustomDivider
            class="grow"
            color="border-black/5 dark:border-blue-720/40"
        />

        <div class="flex-0 px-2 text-gray-280 text-xs font-medium select-none">
            AND
        </div>

        <CustomDivider
            class="grow"
            color="border-black/5 dark:border-blue-720/40"
        />
    </div>
</template>

<script setup>
import CustomDivider from '@/components/divider/CustomDivider.vue'
</script>
