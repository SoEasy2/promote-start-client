import { FILTER_RULES, FILTER_SELECT_RULES } from '@/constants/filterRules'
import { FILTERS_TABLE } from '@/constants/filtersTable'

function createRangeForSend(range = [], preset = {}) {
    const { key } = preset

    return {
        range,
        preset: key,
    }
}

function createFiltersForSend(filters) {
    return filters.reduce((allFilters, filter) => {
        const {
            type, key, value, rule = {},
        } = filter

        if (type === FILTERS_TABLE.date && value) {
            const [firstDate, lastDate] = value
            allFilters[key] = firstDate
            allFilters[`${key}To`] = lastDate
        } else if (type === FILTERS_TABLE.select) {
            allFilters[key] = createSelectValue(key, value, rule)
        } else if (type === FILTERS_TABLE.select_with_empty) {
            allFilters[key] = createSelectValue(key, value, rule)
        } else if (type === FILTERS_TABLE.caller_profile) {
            allFilters[key] = value || undefined
        } else if (type === FILTERS_TABLE.parameters) {
            if (!value) {
                return allFilters
            }

            allFilters[key] = createParametersValue(value)
        } else if (rule) {
            allFilters[key] = {
                value,
                rule: rule.key,
            }
        }

        return allFilters
    }, {})
}

function createSelectValue(key, value, rule) {
    const allFilters = {
        value: value ? value.id : undefined,
        rule: rule.key,
    }

    if (checkName(key) && value) {
        allFilters.name = value.name
    }

    return allFilters
}

function checkEqualsFilter(newFilter, oldFilter) {
    return JSON.stringify(newFilter) === JSON.stringify(oldFilter)
}

function createParametersValue(parameters) {
    const parametersFilter = {}

    parameters.forEach((el, index) => {
        const { filter = {} } = el
        const { key, value } = filter
        parametersFilter[`${key}][${[index]}`] = value
    })

    return parametersFilter
}

function setFilter(filter, itemsFilter) {
    const { filterSettings = {} } = filter
    const { type, key } = filterSettings

    const item = {
        ...filterSettings,
        rule: FILTER_RULES[type][0],
    }

    const findIndex = itemsFilter.findIndex((f) => f.key === key)

    if (findIndex !== -1) {
        itemsFilter.splice(findIndex, 1, item)

        return {
            items: itemsFilter,
            filterOpen: findIndex,
        }
    }
    const items = [...itemsFilter, item]

    return {
        items,
        filterOpen: items.length - 1,
    }
}

function addFilterInColumn(headers, filters) {
    return headers.map((column) => {
        const { filterSettings, value } = column

        const findColumnSettings = filters.find((f) => f.key === value)

        if (filterSettings && findColumnSettings) {
            return { ...column, filterSettings: findColumnSettings }
        }

        return column
    })
}

function createSortForSend(sorts, headers) {
    return sorts.reduce((allSorts, sort) => {
        const { key, value } = sort
        allSorts[key] = value.key

        _updateHeaderColumn(headers, key, value.key)
        return allSorts
    }, {})
}

function setSorting(sort, itemsSort) {
    const { sortSettings = {}, value = {}, name } = sort
    const { sortBy } = sortSettings

    const item = {
        label: name,
        key: sortBy,
        value,
    }

    const findIndex = itemsSort.findIndex((s) => s.key === sortBy)

    if (findIndex !== -1) {
        itemsSort.splice(findIndex, 1, item)
    } else {
        itemsSort.push(item)
    }

    return itemsSort
}

function _updateHeaderColumn(headers, sortBy, key) {
    const findHeader = headers.find((h) => h.sortSettings && h.sortSettings.sortBy === sortBy)
    if (!findHeader) return
    findHeader.sortSettings.key = key
}

function updateSortHeaderColumn({ sortSettings = {}, value = {} }, headers) {
    const findHeader = headers.find((h) => h.sortSettings && h.sortSettings.sortBy === sortSettings.sortBy)

    if (findHeader) {
        findHeader.sortSettings.key = value.key
    }

    return headers
}

function updateSortingControl({ sortSettings = {} }, sorting, value) {
    const findItem = sorting.find((s) => s.key === sortSettings.sortBy)
    findItem.hideSelect = value

    return sorting
}

function updateHeaderAfterSort(headers, resetField = {}) {
    return headers.map((el) => {
        const { sortSettings = {} } = el
        if (sortSettings.sortBy && !resetField[sortSettings.sortBy]) {
            sortSettings.key = ''
            return el
        }

        return el
    })
}

function updateSortingAfterReset(sorting) {
    return sorting.map((el) => {
        const { hideSelect, ...other } = el
        return other
    })
}

function getQuery() {
    const { search } = window.location
    const sorting = {}
    const filter = {}
    const otherFilter = {}
    const range = []
    let preset = null
    let accountForSend = null
    let workspaceForSend = null

    const query = search.substring(1, search.length)

    const listQuery = decodeURI(query).split('&')

    listQuery.forEach((item) => {
        const [key, value] = item.split('=')
        if (item.includes('by')) {
            sorting[key] = value
        } else if (item.includes('Value') && value) {
            const name = key.substring(0, key.length - 5)
            filter[name] = {
                ...filter[key],
                value: value && value.includes('[') ? JSON.parse(value) : value.split('_').join(' '),
            }
        } else if (item.includes('Name') && value) {
            const name = key.substring(0, key.length - 4)
            filter[name].name = value
        } else if (item.includes('Key') && value) {
            const name = key.substring(0, key.length - 3)
            filter[name].key = value
        } else if (item.includes('Rule')) {
            const name = key.substring(0, key.length - 4)
            filter[name] = {
                ...filter[name],
                rule: value,
            }
        } else if (item.includes('parameters')) {
            const name = key.substring(10, key.length).split('%2B').join(' ').split('+')
                .join(' ')

            filter.parameters = {
                ...filter.parameters,
                [name]: value,
            }
        } else if (item.includes('range')) {
            range.push(value)
        } else if (item.includes('Other')) {
            const name = key.substring(0, key.length - 5)
            otherFilter[name] = value
        } else if (item.includes('preset')) {
            preset = value
        } else if (item.includes('accountForSend')) {
            accountForSend = value
        } else if (item.includes('workspaceForSend')) {
            workspaceForSend = value
        }
    })

    return {
        sorting, filter, range, otherFilter, preset, accountForSend, workspaceForSend,
    }
}

function checkName(key) {
    const names = ['numbers', 'trafficSources', 'types', 'replacementNumber', 'callerProfile']

    return names.some((name) => name === key)
}

function setQuery({
    sortingForSend, filtersForSend, otherFiltersForSend, rangeForSend, accountForSend, workspaceForSend,
}) {
    const queryFilter = {}
    const queryOtherFilter = {}

    if (filtersForSend) {
        Object.keys(filtersForSend).forEach((key) => {
            if (key === 'parameters') {
                Object.keys(filtersForSend[key]).forEach((name) => {
                    queryFilter[`${key}${name}`] = filtersForSend[key][name]
                })
            } else if (filtersForSend[key].value && key === 'account') {
                queryFilter[`${key}Value`] = filtersForSend[key].value
            } else if (Array.isArray(filtersForSend[key].value)) {
                queryFilter[`${key}Value`] = JSON.stringify(filtersForSend[key].value)
            } else if (filtersForSend[key].value && !checkName(key)) {
                queryFilter[`${key}Value`] = filtersForSend[key].value.split(' ').join('_')
            } else if (filtersForSend[key].value && key === 'callerProfile') {
                queryFilter[`${key}Value`] = filtersForSend[key].value.split(' ').join('_')
                queryFilter[`${key}Key`] = filtersForSend[key].key.split(' ').join('_')
            } else if (filtersForSend[key].value && (key === 'numbers' || key)) {
                queryFilter[`${key}Value`] = filtersForSend[key].value
                queryFilter[`${key}Name`] = filtersForSend[key].name
            } else if (filtersForSend[key].value && key === 'trafficSources') {
                queryFilter[`${key}Value`] = filtersForSend[key].value
                queryFilter[`${key}Name`] = filtersForSend[key].name.split(' ').join('_')
            } else if (filtersForSend[key].value && key === 'types') {
                queryFilter[`${key}Value`] = filtersForSend[key].value
                queryFilter[`${key}Name`] = filtersForSend[key].name
            }
            queryFilter[`${key}Rule`] = filtersForSend[key].rule
        })
    }

    if (otherFiltersForSend) {
        Object.keys(otherFiltersForSend).forEach((key) => {
            queryOtherFilter[`${key}Other`] = otherFiltersForSend[key]
        })
    }

    return {
        ...rangeForSend,
        ...sortingForSend,
        ...queryFilter,
        ...queryOtherFilter,
        accountForSend,
        workspaceForSend,
    }
}

export {
    createRangeForSend,
    createFiltersForSend,
    createSortForSend,
    setFilter,
    checkEqualsFilter,
    addFilterInColumn,
    updateHeaderAfterSort,
    setSorting,
    updateSortHeaderColumn,
    updateSortingControl,
    updateSortingAfterReset,
    getQuery,
    setQuery,
}
