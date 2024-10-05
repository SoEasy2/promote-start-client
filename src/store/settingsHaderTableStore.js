import { defineStore } from 'pinia'

export const useSettingsHeaderTableStore = defineStore('settingsHeaderTable', {
    actions: {
        getHeadersTable(type) {
            switch (type) {}
        },

        // getGoogleConversation() {
        //     const googleConversationStore = useGoogleConversationStore()
        //
        //     return {
        //         headers: GOOGLE_CONVERSATION_HEADERS,
        //         activeColumns: googleConversationStore.activeColumnsTable,
        //         action: googleConversationStore.changeHeaders,
        //     }
        // },
    },
})
