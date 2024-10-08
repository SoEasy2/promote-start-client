import { $axios } from '@/plugins/axios'

export const getGoogleAdsCampaigns = (params) => $axios.get('campaign-google-ads/paginate', { params })
