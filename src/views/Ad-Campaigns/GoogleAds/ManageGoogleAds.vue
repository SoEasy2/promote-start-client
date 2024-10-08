<template>
    <ManageLayout title="Google Ads">
        <CustomTableControls />

        <GoogleAdsTable />
    </ManageLayout>
</template>

<script setup>
import { onMounted } from 'vue'

import ManageLayout from '@/layouts/ManageLayout.vue'
import CustomTableControls from '@/components/table/controls/CustomTableControls.vue'
import GoogleAdsTable from '@/views/Ad-Campaigns/GoogleAds/components/tables/GoogleAdsTable.vue'
import { useManageGoogleAdsStore } from '@/store/app/ad-campaigns/google-ads/manageGoogleAds'

const manageGoogleAdsStore = useManageGoogleAdsStore()

onMounted(() => {
    manageGoogleAdsStore.goToLoadGoogleAds()
})
</script>
