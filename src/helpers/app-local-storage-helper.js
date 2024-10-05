import { LOCAL_STORAGE_TYPES } from '@/constants/localStorageTypes'

function getBarsPositions() {
    const positions = JSON.parse(localStorage.getItem('bars'))

    if (!positions) {
        return { miniMain: true, mini: false }
    }
    const { miniMain = true, mini = false } = positions

    return { miniMain, mini }
}

function setBarsPositions({ miniMain, mini }) {
    localStorage.setItem('bars', JSON.stringify({ miniMain, mini }))
}

function _getRestartLocalStorage() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_TYPES.restart))
}

function setRestartLocalStorage() {
    const restart = _getRestartLocalStorage()
    localStorage.setItem(LOCAL_STORAGE_TYPES.restart, JSON.stringify(!restart))
}

function addEventListenerStorage() {
    window.addEventListener('storage', ({ key, storageArea }) => {
        if (storageArea !== localStorage) return

        if (key === LOCAL_STORAGE_TYPES.restart) {
            location.reload()
        }
    })
}

function getGettingStartPageLocalStorage() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_TYPES.isGettingStart))
}

function setGettingStartPageLocalStorage() {
    const isGettingStart = getGettingStartPageLocalStorage()
    localStorage.setItem(LOCAL_STORAGE_TYPES.isGettingStart, JSON.stringify(!isGettingStart))
}

export {
    getBarsPositions,
    setBarsPositions,
    addEventListenerStorage,
    setRestartLocalStorage,
    getGettingStartPageLocalStorage,
    setGettingStartPageLocalStorage,
}
