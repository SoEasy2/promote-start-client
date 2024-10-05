export default {
    mounted(el, binding) {
        const escapeHandler = (event) => {
            if (event.key === 'Escape') {
                binding.value()
            }
        }

        document.addEventListener('keydown', escapeHandler)
        el._escEvent = escapeHandler
    },

    unmounted(el) {
        document.removeEventListener('keydown', el._escEvent)
        delete el._escEvent
    },
}
