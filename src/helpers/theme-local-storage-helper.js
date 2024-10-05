import { setUserDataToCarrotquest } from '@/helpers/carrot-quest-helper'

import { THEMES } from '@/constants/themes'

function _setDarkTheme() {
    document.documentElement.classList.add('dark', 'bg-black-590')
    localStorage.theme = THEMES.dark.id
}

function _setWhiteTheme() {
    document.documentElement.classList.remove('dark', 'bg-black-590')
    localStorage.theme = THEMES.white.id
}

function _setAutoTheme() {
    const hours = new Date().getHours()
    if (hours >= 9 && hours < 17) {
        _setWhiteTheme()
    } else {
        _setDarkTheme()
    }

    localStorage.theme = THEMES.auto.id
}

function changeTheme(theme) {
    const { dark, white } = THEMES

    if (theme === dark.id) {
        _setDarkTheme()
    } else if (theme === white.id) {
        _setWhiteTheme()
    } else {
        _setAutoTheme()
    }

    setUserDataToCarrotquest([
        { op: 'update_or_create', key: 'theme', value: getCurrentTheme() },
    ])
}

function currentTheme() {
    const { theme = THEMES.dark.id } = localStorage
    return theme
}

function isThemeDark() {
    if (currentTheme() === THEMES.auto.id) {
        const hours = new Date().getHours()
        return !(hours >= 9 && hours < 17)
    }
    return currentTheme() === THEMES.dark.id
}

function createThemeTimer() {
    const start = new Date().setHours(9)
    const end = new Date().setHours(17)
    const millisecondCurrent = new Date().getTime()
    const millisecondMorning = new Date(new Date(start).setMinutes(0, 0, 0)).getTime()
    const millisecondNight = new Date(new Date(end).setMinutes(0, 0, 0)).getTime()

    const hours = new Date().getHours()
    if (hours >= 9 && hours <= 17) {
        return millisecondNight - millisecondCurrent
    }
    const dayMillisecond = 86400000
    const diff = millisecondCurrent - millisecondMorning
    return dayMillisecond - diff
}

function setTheme() {
    const theme = currentTheme()

    changeTheme(theme)

    if (theme !== 'auto') {
        return
    }

    const timer = createThemeTimer()

    const id = setTimeout(() => {
        changeTheme('auto')
        setTheme()
    }, timer)

    return id
}

function getCurrentTheme() {
    const isDark = document.documentElement.classList.contains('dark')

    return isDark ? THEMES.dark.id : THEMES.white.id
}

export {
    changeTheme,
    currentTheme,
    createThemeTimer,
    setTheme,
    isThemeDark,
    getCurrentTheme,
}
