import FileDownload from 'js-file-download'

import { uniqBy } from 'lodash'

import { CARD_ERROR_CODES } from '@/constants/cardErrorCodes'

function checkFormValidity(formData) {
    return Object.keys(formData).every((name) => !formData[name].hasOwnProperty('valid') || formData[name].valid)
}

function collectFormData(formData) {
    return Object.keys(formData).reduce((data, name) => {
        data[name] = formData[name].value
        return data
    }, {})
}

function localSearch(items, search, searchFieldNames = ['name']) {
    if (!search) {
        return items
    }

    return items.filter((item) => searchFieldNames.some((name) => {
        const value = item[name] ? item[name] : ''

        return value.toString().toLowerCase().includes(search.toLowerCase())
    }))
}

function calculateTotalPages(items, onPage) {
    return Math.max(Math.ceil(items.length / onPage), 1)
}

function uniqArrayByField(array, field) {
    return uniqBy(array, field)
}

function localSort(items, type = 'string', sortBy = null, isDesc = false) {
    // if (!sortBy) {
    //     return items
    // }

    return copyArray(items).sort((a, b) => _customSorting(sortBy ? a[sortBy] : a, sortBy ? b[sortBy] : b, isDesc, type))
}

function copyArray(arr) {
    return JSON.parse(JSON.stringify(arr))
}

function _customSorting(a, b, desc, type) {
    switch (type) {
    case 'boolean':
        return _booleanSorting(a, b, desc)
    case 'number':
        return _numericSorting(a, b, desc)
    case 'time':
        return _timeSorting(a, b, desc)
    case 'date':
        return _dateSorting(a, b, desc)
    case 'status':
        return _numericSorting(a, b, !desc)
    default:
        return _stringSorting(a, b, desc)
    }
}

function _stringSorting(a, b, desc) {
    return desc ? `${b}`.toLowerCase().localeCompare(`${a}`.toLowerCase()) : `${a}`.toLowerCase().localeCompare(`${b}`.toLowerCase())
}

function _numericSorting(a, b, desc) {
    return desc ? b - a : a - b
}

function _booleanSorting(a, b, desc) {
    return desc ? Number(b) - Number(a) : Number(a) - Number(b)
}

function _timeSorting(a, b, desc) {
    const timeA = _calcTime(a)
    const timeB = _calcTime(b)

    return desc ? timeB - timeA : timeA - timeB
}

function _dateSorting(a, b, desc) {
    return desc ? new Date(b) - new Date(a) : new Date(a) - new Date(b)
}

function _calcTime(time) {
    const arr = time.split(':')

    return (arr[0] * 60 * 60) + (arr[1] * 60) + arr[2]
}

function onlyNumbers(event) {
    const regex = new RegExp('^[0-9]+$')
    const key = String.fromCharCode(!event.charCode ? event.which : event.charCode)
    if (!regex.test(key)) {
        event.preventDefault()
        return false
    }
}

function currency(value = 0, currency = 'USD', minimumFractionDigits = 0) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        minimumFractionDigits,
        currency,
    }).format(isNaN(value) ? 0 : +value)
}

function scrollToTopById(id) {
    const container = document.querySelector(id)

    if (container) {
        container.scrollTop = 0
    }
}

function checkUrl(url) {
    return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(url)
}

function stopPropagationForNotification() {
    const el = document.querySelector('.vue-notification-group')

    el.addEventListener('click', (e) => {
        e.stopPropagation()
    })
}

function copyInStash(text) {
    const tempInput = document.createElement('input')
    tempInput.value = text
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
}

function sortByDigits(a, b) {
    const digitA = a.pivot.digit === '0' ? 10 : a.pivot.digit
    const digitB = b.pivot.digit === '0' ? 10 : b.pivot.digit

    return digitA - digitB
}

function formatTime(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
}

function downloadFile(res) {
    let fileName = 'report.csv'
    if (res.headers['content-disposition']) {
        const positionStart = res.headers['content-disposition'].indexOf('filename=') + 9
        fileName = res.headers['content-disposition'].substr(positionStart).split(';')[0]
    }

    FileDownload(res.data, fileName)
}

function deepCopy(element) {
    if (!element || !Object.keys(element).length) {
        return element
    }

    return JSON.parse(JSON.stringify(element))
}

function getErrorMessage({ error = {} }) {
    const currentCode = CARD_ERROR_CODES.filter((code) => error[code.key]).map((code) => code.messages[error[code.key]])
    const [message = error.message] = currentCode
    return message
}

let serverInterval = null

function intervalDebounce(fn, wait) {
    clearInterval(serverInterval)

    serverInterval = setInterval(() => {
        clearInterval(serverInterval)
        fn()
    }, wait)
}

function splitByEnterSpaceComma(text) {
    return text.split(/[\s,]+/)
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
        return '0'
    }
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['byte', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}

function getMbFromBytes(bytes) {
    return bytes / (1024 * 1024)
}

function truncateFile(file, decimals = 50) {
    const [name, extension] = file.split('.')

    if (name.length > decimals) {
        const newName = name.slice(0, decimals)
        return `${newName}...${extension}`
    }

    return file
}

function getNoun(number, one, two, five) {
    let n = Math.abs(number)
    n %= 100
    if (n >= 5 && n <= 20) {
        return five
    }
    n %= 10
    if (n === 1) {
        return one
    }
    if (n >= 2 && n <= 4) {
        return two
    }
    return five
}

function splitString(str) {
    const items = str.split('')

    const newArray = items.map((el, index) => {
        if (index !== 0 && el === el.toUpperCase()) {
            return ` ${el}`
        }

        return el
    })

    return newArray.join('')
}

function checkEqualsArrays(newArray, oldArray) {
    return JSON.stringify(localSort(newArray)) === JSON.stringify(localSort(oldArray))
}
function checkEqualsObject(newObj, oldObj) {
    return JSON.stringify(newObj) === JSON.stringify(oldObj)
}

function removeFirstPlusForSearch(value) {
    if (!value) {
        return undefined
    }

    if (value[0] === '+') {
        return value.length === 1 ? undefined : value.slice(1)
    }

    return value
}

function separatingWordsCharacter(text, symbol = '_') {
    return text.split(symbol).join(' ')
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function getTextWidth(text, styles) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    context.font = `${styles.fontSize} "Fira Sans", sans-serif`

    return context.measureText(text).width + styles.padding
}

function getRandomColor() {
    const red = getRandomHexValue(20, 255)
    const green = getRandomHexValue(20, 255)
    const blue = getRandomHexValue(20, 255)

    return `#${red}${green}${blue}`
}

function getRandomHexValue(min, max) {
    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min
    return randomValue.toString(16).padStart(2, '0')
}

function parseUrlParameter(parameter = 'ref') {
    const { search } = window.location
    const params = new URLSearchParams(search)
    return params.get(parameter)
}

function parseCards(items = []) {
    if (!items.length) {
        return
    }

    return items.map(({ id, card = {}, metadata = {} }) => ({
        name: `${card.brand} - **** ${card.last4}`,
        id,
        status: !(Array.isArray(metadata) || metadata.validated === 'true'),
    }))
}

function convertToNumber(value, defaultValue = 0) {
    const number = Number(value)

    return isNaN(number) ? defaultValue : number
}

function showHideLiveChat(hide) {
    const liveChatElement = document.getElementById('carrotquest-messenger-collapsed-container')

    if (liveChatElement) {
        liveChatElement.style.display = hide ? 'none' : 'block'
    }
}

function getRandomUUID() {
    return self?.crypto?.randomUUID() || new Date().getTime()
}

function getKeys(obj, prefix = '') {
    const keys = []

    Object.keys(obj).forEach((key) => {
        const path = prefix ? `${prefix}.${key}` : key

        if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            keys.push(...getKeys(obj[key], path))
        } else {
            keys.push({ id: path, name: key })
        }
    })

    return keys
}

function getKeysFromXML(node, prefix = '') {
    const keys = []

    node.childNodes.forEach((child) => {
        if (child.nodeType === 1) {
            const path = prefix ? `${prefix}.${child.nodeName}` : child.nodeName

            if (child.childNodes.length > 0 && Array.from(child.childNodes).some((c) => c.nodeType === 1)) {
                keys.push(...getKeysFromXML(child, path))
            } else {
                keys.push({ id: path, name: child.nodeName })
            }
        }
    })

    return keys
}

export {
    checkFormValidity,
    collectFormData,
    localSearch,
    calculateTotalPages,
    localSort,
    onlyNumbers,
    currency,
    checkUrl,
    scrollToTopById,
    stopPropagationForNotification,
    copyInStash,
    sortByDigits,
    formatTime,
    deepCopy,
    getErrorMessage,
    intervalDebounce,
    splitByEnterSpaceComma,
    formatBytes,
    truncateFile,
    getNoun,
    splitString,
    checkEqualsArrays,
    checkEqualsObject,
    getMbFromBytes,
    downloadFile,
    removeFirstPlusForSearch,
    uniqArrayByField,
    separatingWordsCharacter,
    capitalizeFirstLetter,
    getTextWidth,
    getRandomColor,
    parseUrlParameter,
    parseCards,
    convertToNumber,
    showHideLiveChat,
    getRandomUUID,
    getKeys,
    getKeysFromXML,
}
