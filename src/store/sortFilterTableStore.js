import { defineStore } from 'pinia'
import { VIEWS_TABLE_MOBILE_DIALOG } from '@/constants/viewsTableMobileDialog'

export const useSortFilterTableStore = defineStore('sortFilterTable', {
    state: () => ({
        enableFilter: false,
        enableSorting: false,
        filtersTable: [],
        indexOpenFilter: null,
        showTableSortMenu: false,
        showDialog: false,
        currentView: VIEWS_TABLE_MOBILE_DIALOG.main,
        selectedItem: null,
        headerType: null,
    }),

    actions: {
        checkFilter(headerType) {
            return this.filtersTable.includes(headerType)
        },

        removeFilter(headerType) {
            this.filtersTable = this.filtersTable.filter((el) => el !== headerType)
        },

        openCloseFilter(headerType) {
            if (this.checkFilter(headerType)) {
                this.removeFilter(headerType)
            } else {
                this.filtersTable.push(headerType)
            }
        },

        openCloseSorting(value) {
            this.enableSorting = value
        },

        changeIndexOpen(headerType, index) {
            this.indexOpenFilter = { [headerType]: index }
        },

        openCloseTableSortMenu(value) {
            this.showTableSortMenu = value
        },

        openCloseDialog(headerType) {
            if (this.checkFilter(headerType)) {
                this.removeFilter(headerType)
            } else {
                this.filtersTable.push(headerType)
            }
        },

        changeCurrentView(view) {
            this.currentView = view
        },

        onSelectedItem(item) {
            this.selectedItem = item
        },
    },
})
