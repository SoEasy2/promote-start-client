<template>
    <div class="block-bg-border block-bg-border-max-mob mt-8 max-mob:mt-5 max-mob:px-4 max-mob:pt-4 pt-5 overflow-hidden">
        <div class="max-mob:px-0 px-5 uppercase app-text-lg">
            {{ t('ad-campaigns.googleAds.title-betting-strategies-options-section') }}
        </div>

        <div class="max-mob:px-0 px-5 pt-2 pb-4 app-text-xs ">
            {{ t('ad-campaigns.googleAds.title-description-betting-strategies-options-section') }}
        </div>

        <CustomDivider class="max-mob:px-0 px-5" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-bidding-strategy-betting-strategies-options-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-bidding-strategy-betting-strategies-options-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-bidding-strategy-betting-strategies-options-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-bidding-strategy-type-betting-strategies-options-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-bidding-strategy-type-betting-strategies-options-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-bidding-strategy-type-betting-strategies-options-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-bidding-strategy-system-status-betting-strategies-options-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-bidding-strategy-system-status-betting-strategies-options-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-bidding-strategy-system-status-betting-strategies-options-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-manual-cpc-betting-strategies-options-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-manual-cpc-betting-strategies-options-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-manual-cpc-betting-strategies-options-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-manual-cpm-betting-strategies-options-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-manual-cpm-betting-strategies-options-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-manual-cpm-betting-strategies-options-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-manual-cpv-betting-strategies-options-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-manual-cpv-betting-strategies-options-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-manual-cpv-betting-strategies-options-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-maximize-conversions-betting-strategies-options-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-maximize-conversions-betting-strategies-options-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-maximize-conversions-betting-strategies-options-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-maximize-conversion-value-betting-strategies-options-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-maximize-conversion-value-betting-strategies-options-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-maximize-conversion-value-betting-strategies-options-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-target-cpa-betting-strategies-options-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-target-cpa-betting-strategies-options-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-target-cpa-betting-strategies-options-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-target-roas-betting-strategies-options-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-target-roas-betting-strategies-options-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-target-roas-betting-strategies-options-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-target-spend-betting-strategies-options-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-target-spend-betting-strategies-options-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-target-spend-betting-strategies-options-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-target-impression-share-betting-strategies-options-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-target-impression-share-betting-strategies-options-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-target-impression-share-betting-strategies-options-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-target-cpm-betting-strategies-options-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-target-cpm-betting-strategies-options-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-target-cpm-betting-strategies-options-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-target-cpm-betting-strategies-options-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-target-cpm-betting-strategies-options-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-target-cpm-betting-strategies-options-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-target-cpv-betting-strategies-options-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-target-cpv-betting-strategies-options-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-target-cpv-betting-strategies-options-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-commission-betting-strategies-options-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-commission-betting-strategies-options-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-commission-betting-strategies-options-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-percent-cpc-betting-strategies-options-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-percent-cpc-betting-strategies-options-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-percent-cpc-betting-strategies-options-section')"
            />
        </div>
    </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'

import CustomDivider from '@/components/divider/CustomDivider.vue'
import FormInput from '@/components/inputs/FormInput.vue'

const { t } = useI18n()
</script>
