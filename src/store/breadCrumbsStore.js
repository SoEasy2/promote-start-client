import { defineStore } from 'pinia'

export const useBreadCrumbsStore = defineStore('breadCrumbs', {
    state: () => ({
        /** items
         * title - String required
         * routeName - String or view - Object
         */
        items: [],
        showMobileBC: false,
    }),

    actions: {
        setBreadCrumbs(items) {
            this.items = Array.isArray(items) ? items : [items]
        },

        addItem(item) {
            this.items.push(item)
        },

        addItemWithBack(item, quantity = 1) {
            this.items.splice(-1, quantity, item)
        },

        goBack(quantity = 1) {
            this.items.splice(-1, quantity)
        },

        goBackByIndex(index) {
            this.items = this.items.slice(0, index + 1)
        },

        changeShowMobileBC(value) {
            this.showMobileBC = value
        },
    },
})
