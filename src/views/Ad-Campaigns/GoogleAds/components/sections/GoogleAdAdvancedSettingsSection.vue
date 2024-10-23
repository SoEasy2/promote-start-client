<template>
    <div class="block-bg-border block-bg-border-max-mob mt-8 max-mob:mt-5 max-mob:px-4 max-mob:pt-4 pt-5 overflow-hidden">
        <div class="max-mob:px-0 px-5 uppercase app-text-lg">
            {{ t('ad-campaigns.googleAds.title-advanced-settings-section') }}
        </div>

        <div class="max-mob:px-0 px-5 pt-2 pb-4 app-text-xs ">
            {{ t('ad-campaigns.googleAds.title-description-advanced-settings-section') }}
        </div>

        <div>
            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('title-ad-serving-optimization-status-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('description-ad-serving-optimization-status-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('placeholder-ad-serving-optimization-status-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('title-local-services-campaign-settings-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('description-local-services-campaign-settings-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('placeholder-local-services-campaign-settings-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('title-travel-campaign-settings-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('description-travel-campaign-settings-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('placeholder-travel-campaign-settings-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('title-video-campaign-settings-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('description-video-campaign-settings-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('placeholder-video-campaign-settings-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('title-network-settings-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('description-network-settings-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('placeholder-network-settings-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('title-performance-max-upgrade-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('description-performance-max-upgrade-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('placeholder-performance-max-upgrade-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('title-optimization-goal-setting-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('description-optimization-goal-setting-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('placeholder-optimization-goal-setting-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('title-excluded-parent-asset-field-types-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('description-excluded-parent-asset-field-types-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('placeholder-excluded-parent-asset-field-types-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('title-excluded-parent-asset-set-types-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('description-excluded-parent-asset-set-types-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('placeholder-excluded-parent-asset-set-types-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('title-selective-optimization-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('description-selective-optimization-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('placeholder-selective-optimization-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('title-payment-mode-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('description-payment-mode-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('placeholder-payment-mode-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('title-url-expansion-opt-out-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('description-url-expansion-opt-out-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('placeholder-url-expansion-opt-out-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('title-video-brand-safety-suitability-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('description-video-brand-safety-suitability-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('placeholder-video-brand-safety-suitability-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('title-hotel-property-asset-set-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('description-hotel-property-asset-set-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('placeholder-hotel-property-asset-set-section')"
                />
            </div>

            <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

            <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
                <div>
                    <div class="app-text-sm pb-2">
                        {{ t('title-listing-type-advanced-settings-section') }}
                    </div>

                    <div class="app-text-xs max-w-100 pr-2">
                        {{ t('description-listing-type-section') }}
                    </div>
                </div>

                <FormInput
                    class="w-70 max-mob:w-full"
                    :placeholder="t('placeholder-listing-type-section')"
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
