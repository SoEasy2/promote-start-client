<template>
    <div>
        <div class="grid grid-cols-2 gap-x-2 max-md:flex max-md:flex-col max-md:gap-y-2">
            <SideBarMainInput
                modelValue="Google Ad Campaign"
            />

            <div class="text-gray-280 max-mob:px-4 max-md:pb-4 text-xs min-md:hidden">
                Manage settings for this google ad campaign
            </div>

        </div>

        <div class="text-gray-280 max-mob:px-4 max-mob:pb-4 text-xs max-md:hidden">
            Manage settings for this google ad campaign
        </div>
    </div>
</template>

<script setup>
import SideBarMainInput from '@/components/inputs/SideBarMainInput.vue'
</script>
