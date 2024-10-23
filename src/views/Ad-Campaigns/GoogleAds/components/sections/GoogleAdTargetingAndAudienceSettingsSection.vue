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
                    {{ t('ad-campaigns.googleAds.title-geo-target-type-settings-targeting-and-audience-settings-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-geo-target-type-settings-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-geo-target-type-settings-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-targeting-settings-targeting-and-audience-settings-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-targeting-settings-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-targeting-settings-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-audience-settings-targeting-and-audience-settings-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-audience-settings-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-audience-settings-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-dynamic-search-ads-settings-targeting-and-audience-settings-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-dynamic-search-ads-settings-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-dynamic-search-ads-settings-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-local-campaign-settings-targeting-and-audience-settings-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-local-campaign-settings-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-local-campaign-settings-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-app-campaign-settings-targeting-and-audience-settings-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-app-campaign-settings-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-app-campaign-settings-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-shopping-settings-targeting-and-audience-settings-section') }}
                </div>
                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-shopping-settings-section') }}
                </div>
            </div>
            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-shopping-settings-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-hotel-settings-targeting-and-audience-settings-section') }}
                </div>
                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-hotel-settings-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-hotel-settings-section')"
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
