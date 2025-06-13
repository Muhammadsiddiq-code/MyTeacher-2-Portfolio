import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light')
    }
  }
})