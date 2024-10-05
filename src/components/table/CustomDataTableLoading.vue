<template>
    <tr align="center">
        <td
            class="p-0"
            :colspan="colspan"
        >
            <LoadingText/>
        </td>
    </tr>
</template>

<script setup>
import LoadingText from '@/components/buttons/LoadingText.vue'

defineProps({
    colspan: {
        type: Number,
        default: 0,
    },
})
</script>
