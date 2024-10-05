import { useAuthorizationStore } from '@/store/authorizationStore'

function getSettingsHeaderTable() {
    const settingsHeaderTable = localStorage.getItem('settings_header_table')
    return settingsHeaderTable ? JSON.parse(settingsHeaderTable) : {}
}

function getSettingsHeaderTableDefault() {
    return checkHeaderForWorkspace(getSettingsHeaderTable())
}

function checkHeaderForWorkspace(settingsHeaderTable = {}) {
    const authorizationStore = useAuthorizationStore()

    if (settingsHeaderTable[authorizationStore.getWorkspaceSlug]) {
        return settingsHeaderTable
    }

    return {
        ...settingsHeaderTable,
        [authorizationStore.getWorkspaceSlug]: {},
    }
}

function setSettingsHeaderTable(settings) {
    localStorage.setItem('settings_header_table', settings)
}

function getActiveColumnsHeader(headers, type) {
    const authorizationStore = useAuthorizationStore()

    const columnByType = getSettingsHeaderTableDefault()[authorizationStore.getWorkspaceSlug][type]

    if (columnByType) {
        return columnByType
    }

    const isActiveDefault = headers.some((el) => el.hasOwnProperty('activeDefault'))
    return isActiveDefault
        ? headers.filter((el) => el.activeDefault || !el.hasOwnProperty('activeDefault')).map((el) => el.value || !el.hasOwnProperty('activeDefault'))
        : headers.map((el) => el.value)
}

function setActiveColumnsHeader(settings, type) {
    const authorizationStore = useAuthorizationStore()

    const activeHeaders = {
        ...getSettingsHeaderTableDefault(),
    }
    activeHeaders[authorizationStore.getWorkspaceSlug][type] = settings
    setSettingsHeaderTable(JSON.stringify(activeHeaders))
}

function getActiveHeadersTable(header, activeColumnHeader = []) {
    const clone = JSON.parse(JSON.stringify(header))
    if (activeColumnHeader.length) {
        return clone.filter((f) => activeColumnHeader.some((key) => key === f.value))
    }
    return header
}

function removeHeaderTableSettings() {
    localStorage.removeItem('settings_header_table')
}

export {
    getActiveColumnsHeader,
    setActiveColumnsHeader,
    getActiveHeadersTable,
    removeHeaderTableSettings,
}
