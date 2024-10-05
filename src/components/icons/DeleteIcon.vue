<template>
    <svg
        :x="styles.x"
        :y="styles.y"
        :height="styles.height"
        :width="styles.width"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            v-if="bgColor"
            class="translate-x-0.5 translate-y-0.5 delete-icon-class"
            :class="bgColor"
            width="80%"
            height="80%"
            fill="currentColor"
        />
        <path class="delete-icon-class" d="M5.93842 8.50439L6.55479 18.2989C6.6211 19.3526 7.49504 20.1733 8.55084 20.1733H15.4454C16.5012 20.1733 17.3751 19.3526 17.4415 18.2989L18.0578 8.50439" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="delete-icon-class" d="M10.077 10.1335V16.147" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="delete-icon-class" d="M13.9214 10.1335V16.147" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="delete-icon-class" d="M4.19373 6.4563H19.8063" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="delete-icon-class" d="M9.22754 6.35754V4.82642C9.22754 4.27413 9.67525 3.82642 10.2275 3.82642H13.7763C14.3285 3.82642 14.7763 4.27413 14.7763 4.82642V6.09437" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>

<script setup>
 defineProps({
     styles: {
         type: Object,
         default: () => ({
             x: 0,
             y: 0,
             height: 24,
             width: 24,
         })
     },
     bgColor: {
         type: String,
         default: ''
     }
 })
</script>
