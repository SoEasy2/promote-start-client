import { defineStore } from 'pinia'
export const useAppStore = defineStore('app', {
    state: () => ({
        timezones: [],
        countries: [],
        languages: [],
        themeTimerId: null,
        routeIsLoading: false,
    }),

    actions: {
        setRouteLoading(loading) {
            this.routeIsLoading = loading
        },
    }
})
