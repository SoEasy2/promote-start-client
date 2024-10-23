<template>
    <div class="block-bg-border block-bg-border-max-mob mt-8 max-mob:mt-5 max-mob:px-4 max-mob:pt-4 pt-5 overflow-hidden">
        <div class="max-mob:px-0 px-5 uppercase app-text-lg">
            {{ t('ad-campaigns.googleAds.title-reporting-and-tracking-options-section') }}
        </div>

        <div class="max-mob:px-0 px-5 pt-2 pb-4 app-text-xs ">
            {{ t('ad-campaigns.googleAds.title-description-reporting-and-tracking-options-section') }}
        </div>

        <CustomDivider class="max-mob:px-0 px-5" />

        <div>
            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('ad-campaigns.googleAds.title-ad-serving-optimization-status-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('ad-campaigns.googleAds.description-ad-serving-optimization-status-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('ad-campaigns.googleAds.placeholder-ad-serving-optimization-status-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('ad-campaigns.googleAds.title-local-services-campaign-settings-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('ad-campaigns.googleAds.description-local-services-campaign-settings-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('ad-campaigns.googleAds.placeholder-local-services-campaign-settings-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('ad-campaigns.googleAds.title-travel-campaign-settings-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('ad-campaigns.googleAds.description-travel-campaign-settings-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('ad-campaigns.googleAds.placeholder-travel-campaign-settings-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('ad-campaigns.googleAds.title-video-campaign-settings-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('ad-campaigns.googleAds.description-video-campaign-settings-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('ad-campaigns.googleAds.placeholder-video-campaign-settings-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('ad-campaigns.googleAds.title-network-settings-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('ad-campaigns.googleAds.description-network-settings-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('ad-campaigns.googleAds.placeholder-network-settings-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('ad-campaigns.googleAds.title-performance-max-upgrade-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('ad-campaigns.googleAds.description-performance-max-upgrade-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('ad-campaigns.googleAds.placeholder-performance-max-upgrade-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('ad-campaigns.googleAds.title-optimization-goal-setting-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('ad-campaigns.googleAds.description-optimization-goal-setting-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('ad-campaigns.googleAds.placeholder-optimization-goal-setting-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('ad-campaigns.googleAds.title-excluded-parent-asset-field-types-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('ad-campaigns.googleAds.description-excluded-parent-asset-field-types-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('ad-campaigns.googleAds.placeholder-excluded-parent-asset-field-types-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('ad-campaigns.googleAds.title-excluded-parent-asset-set-types-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('ad-campaigns.googleAds.description-excluded-parent-asset-set-types-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('ad-campaigns.googleAds.placeholder-excluded-parent-asset-set-types-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('ad-campaigns.googleAds.title-selective-optimization-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('ad-campaigns.googleAds.description-selective-optimization-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('ad-campaigns.googleAds.placeholder-selective-optimization-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('ad-campaigns.googleAds.title-payment-mode-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('ad-campaigns.googleAds.description-payment-mode-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('ad-campaigns.googleAds.placeholder-payment-mode-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('ad-campaigns.googleAds.title-url-expansion-opt-out-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('ad-campaigns.googleAds.description-url-expansion-opt-out-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('ad-campaigns.googleAds.placeholder-url-expansion-opt-out-section')"
                />
            </div>
        </div>

    </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'

import CustomDivider from '@/components/divider/CustomDivider.vue'
import FormInput from '@/components/inputs/FormInput.vue'

const { t } = useI18n()
</script>
