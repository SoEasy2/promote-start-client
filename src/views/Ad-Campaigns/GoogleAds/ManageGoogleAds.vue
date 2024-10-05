<template>
    <ManageLayout title="Google Ads">
        <CustomTableControls />

        <GoogleAdsTable />
    </ManageLayout>
</template>

<script setup>
import ManageLayout from "@/layouts/ManageLayout.vue";
import CustomTableControls from "@/components/table/controls/CustomTableControls.vue";
import GoogleAdsTable from "@/views/Ad-Campaigns/GoogleAds/components/tables/GoogleAdsTable.vue";
</script>
