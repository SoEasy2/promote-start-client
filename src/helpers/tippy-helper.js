function getTippyTable(content, maxWidth = 160, placement = 'bottom') {
    return {
        content,
        theme: 'table',
        placement,
        maxWidth,
    }
}

function getTippySidebar(content) {
    return {
        content,
        placement: 'right',
        theme: 'menu',
    }
}

function getTippyAlert(content) {
    return {
        content,
        placement: 'right',
        theme: 'alert',
    }
}

function getTippyNumber(content) {
    return {
        content,
        theme: 'table',
        placement: 'bottom',
        followCursor: true,
    }
}

function getTippyBottom(content, maxWidth) {
    return {
        content,
        theme: 'table',
        placement: 'bottom',
        maxWidth,
    }
}

function getTippyLeft(content, maxWidth) {
    return {
        content,
        theme: 'table',
        placement: 'left',
        maxWidth,
    }
}

function getTippyCalFlow(content, placement = 'right') {
    return {
        content,
        placement,
        theme: 'call-flow-menu',
    }
}

export {
    getTippyTable,
    getTippySidebar,
    getTippyNumber,
    getTippyAlert,
    getTippyLeft,
    getTippyCalFlow,
    getTippyBottom,
}
