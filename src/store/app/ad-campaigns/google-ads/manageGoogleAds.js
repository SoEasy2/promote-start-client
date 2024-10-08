import { defineStore } from 'pinia'
import { getGoogleAdsCampaigns } from '../../../../api/ad-campaigns/google-ads/google-ads-routes'

export const useManageGoogleAdsStore = defineStore('manageGoogleAdsStore', {
    state: () => ({
        loading: false,
        actionLoading: false,

        page: 1,
        page_size: 25,
        total: 1,
        items: [],
    }),

    actions: {
        async goToLoadGoogleAds() {
            // const defaultStore = useDefaultStore()
            this.loading = true

            const { success, payload, message } = await getGoogleAdsCampaigns({ page: this.page, page_size: this.page_size })

            if (success) {
                this.items = payload.data
                this.total = payload.total
                this.page_size = payload.page_size
            } else {
                console.log('message')
            }

            this.loading = false
        },
    },
})
