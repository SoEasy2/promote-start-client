<template>
    <div class="block-bg-border block-bg-border-max-mob mt-8 max-mob:mt-5 max-mob:px-4 max-mob:pt-4 pt-5 overflow-hidden">
        <div class="max-mob:px-0 px-5 uppercase app-text-lg">
            {{ t('ad-campaigns.googleAds.title-time-parameters-section') }}
        </div>

        <div class="max-mob:px-0 px-5 pt-2 pb-4 app-text-xs ">
            {{ t('ad-campaigns.googleAds.title-description-time-parameters-section') }}
        </div>

        <CustomDivider class="max-mob:px-0 px-5" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-start-date-time-parameters-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-start-date-time-parameters-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-start-date-time-parameters-section')"
            />
        </div>

        <CustomDivider class="max-mob:px-4 px-5 my-1.25" />

        <div class="flex justify-between py-4 max-mob:px-4 px-5 items-center">
            <div>
                <div class="app-text-sm pb-2">
                    {{ t('ad-campaigns.googleAds.title-end-date-time-parameters-section') }}
                </div>

                <div class="app-text-xs max-w-100 pr-2">
                    {{ t('ad-campaigns.googleAds.description-end-date-time-parameters-section') }}
                </div>
            </div>

            <FormInput
                class="w-70 max-mob:w-full"
                :placeholder="t('ad-campaigns.googleAds.placeholder-end-date-time-parameters-section')"
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
