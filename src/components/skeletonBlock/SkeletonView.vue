<template>
    <div class="max-mob:px-4">
        <SkeletonBlock
            class="mb-8"
            width="w-86 max-mob:w-full"
            height="h-11"
        />

        <SkeletonBlock
            class="mb-6"
            height="h-62"
        />

        <SkeletonBlock
            class="mb-6"
            height="h-62"
        />

        <SkeletonBlock
            height="h-62"
        />
    </div>
</template>

<script setup>
import SkeletonBlock from '@/components/skeletonBlock/SkeletonBlock.vue'
</script>
