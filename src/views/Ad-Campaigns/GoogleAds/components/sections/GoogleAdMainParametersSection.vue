<template>
    <div class="block-bg-border block-bg-border-max-mob mt-8 max-mob:mt-5 max-mob:px-4 max-mob:pt-4 pt-5 overflow-hidden">
        <div class="max-mob:px-0 px-5 uppercase app-text-lg">
            {{ t('ad-campaigns.googleAds.title-main-parameters-section') }}
        </div>

        <div class="max-mob:px-0 px-5 pt-2 pb-4 app-text-xs ">
            {{ t('ad-campaigns.googleAds.title-description-main-parameters-section') }}
        </div>

        <CustomDivider class="max-mob:px-0 px-5" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-resource-name-main-parameters-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-resource-name-main-parameters-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-resource-name-main-parameters-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-id-main-parameters-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-id-main-parameters-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-id-main-parameters-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-name-main-parameters-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-name-main-parameters-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-name-main-parameters-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-status-main-parameters-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-status-main-parameters-section') }}
                </div>
            </div>

            <FormSelect
                class="w-70 max-mob:w-full"
                :label="t('ad-campaigns.googleAds.placeholder-status-main-parameters-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-advertising-channel-type-main-parameters-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-advertising-channel-type-main-parameters-section') }}
                </div>
            </div>

            <FormSelect
                class="w-70 max-mob:w-full"
                :label="t('ad-campaigns.googleAds.placeholder-advertising-channel-type-main-parameters-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-campaign-budget-main-parameters-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-campaign-budget-main-parameters-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-campaign-budget-main-parameters-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-campaign-group-main-parameters-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-campaign-group-main-parameters-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-campaign-group-main-parameters-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-labels-main-parameters-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-labels-main-parameters-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-labels-main-parameters-section')"
            />
        </div>

    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

import CustomDivider from '@/components/divider/CustomDivider.vue'
import FormInput from '@/components/inputs/FormInput.vue'
import FormSelect from '@/components/selects/FormSelect/FormSelect.vue'

const { t } = useI18n()
</script>
