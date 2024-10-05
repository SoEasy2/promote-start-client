<template>
    <tr align="center">
        <td
            class="p-0"
            :colspan="colspan"
        >
            <div class="py-4 text-xs text-purple dark:text-gray-50 select-none whitespace-nowrap">
                No data available
            </div>
        </td>
    </tr>
</template>

<script setup>
defineProps({
    colspan: {
        type: Number,
        default: 0,
    },
})
</script>
