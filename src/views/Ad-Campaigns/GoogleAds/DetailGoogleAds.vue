<template>
    <DetailLayout>
        <GoogleAdMainSection />

        <GoogleAdMainParametersSection />

        <GoogleAdTimeParametersSection />

        <GoogleAdBettingStrategiesOptionsSection />

        <GoogleAdTargetingAndAudienceSettingsSection />

        <GoogleAdReportingAndTrackingSettingsSection />

        <GoogleAdAdvancedSettingsSection />
    </DetailLayout>
</template>
<script setup>
import DetailLayout from '@/layouts/DetailLayout.vue'
import GoogleAdMainSection from '@/views/Ad-Campaigns/GoogleAds/components/sections/GoogleAdMainSection.vue'
import GoogleAdMainParametersSection from '@/views/Ad-Campaigns/GoogleAds/components/sections/GoogleAdMainParametersSection.vue'
import GoogleAdTimeParametersSection from '@/views/Ad-Campaigns/GoogleAds/components/sections/GoogleAdTimeParametersSection.vue'
import GoogleAdBettingStrategiesOptionsSection from '@/views/Ad-Campaigns/GoogleAds/components/sections/GoogleAdBettingStrategiesOptionsSection.vue'
import GoogleAdTargetingAndAudienceSettingsSection from '@/views/Ad-Campaigns/GoogleAds/components/sections/GoogleAdTargetingAndAudienceSettingsSection.vue'
import GoogleAdReportingAndTrackingSettingsSection from '@/views/Ad-Campaigns/GoogleAds/components/sections/GoogleAdReportingAndTrackingSettingsSection.vue'
import GoogleAdAdvancedSettingsSection from '@/views/Ad-Campaigns/GoogleAds/components/sections/GoogleAdAdvancedSettingsSection.vue'
</script>
