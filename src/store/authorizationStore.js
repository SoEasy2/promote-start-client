import { defineStore } from 'pinia'

export const useAuthorizationStore = defineStore('authorizationStore', {
    state: () => ({
        account: null,
        user: null,
        carrotHash: null,
        isManager: false,
        role: '',
        workspace: null,
        workspaces: [],
        permissions: null,
        numbersPermissions: [],
        pinEnabled: false,
        verificationProgress: [],
        availablePaymentMethods: [],
    }),

    getters: {},

    actions: {},
})
