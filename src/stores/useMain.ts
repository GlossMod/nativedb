import { defineStore } from 'pinia'
import axios from 'axios'

export const useMain = defineStore('main', {
    state: () => ({
        leftMenu: null,
        gameName: '',
    }),
    actions: {
    }
})