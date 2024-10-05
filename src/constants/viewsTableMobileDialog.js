const VIEWS_TABLE_MOBILE_DIALOG = {
    main: {
        view: 'ViewMain',
        prevView: '',
    },
    filter: {
        view: 'ViewFilter',
        prevView: 'main',
    },
    filterStepAdd: {
        view: 'ViewFilterStepAdd',
        prevView: 'filter',
    },
    filterStepContent: {
        view: 'ViewFilterStepContent',
        prevView: 'filter',
    },
    sorting: {
        view: 'ViewSorting',
        prevView: 'main',
    },
    sortingStepAdd: {
        view: 'ViewSortingStepAdd',
        prevView: 'sorting',
    },
    settings: {
        view: 'ViewSettings',
        prevView: 'main',
    },
    settingsStepAdd: {
        view: 'ViewSettingsStepAdd',
        prevView: 'settings',
    },
}

export {
    VIEWS_TABLE_MOBILE_DIALOG,
}
