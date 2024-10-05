import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import VueTippy from 'vue-tippy'
import VClickOutside from 'click-outside-vue3'
import Notifications from '@kyvg/vue3-notification'

import router from '@/router'
import messages from '@/locales'

import App from './App.vue'

import vEsc from '@/directives/v-esc'

import '@/assets/main.css'

const pinia = createPinia()

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages,
})

const app = createApp(App)

app.directive('esc', vEsc)

app.use(pinia)
app.use(i18n)
app.use(router)
app.use(VClickOutside)
app.use(Notifications)
app.use(
    VueTippy,
    {
        directive: 'tippy', // => v-tippy
        component: 'tippy', // => <tippy/>
        componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
        defaultProps: {
            theme: 'dark',
            placement: 'auto-end',
            allowHTML: true,
            delay: 0,
            arrow: false,
            hideOnClick: false,
            touch: false,
            // trigger: 'click',
            offset: [0, 12],
            maxWidth: 'none',
        },
    },
)
app.mount('#app')
