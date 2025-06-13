import { createStore } from 'vuex'

export default createStore({
  state: {
    isDarkMode: localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  },
  getters: {
  },
  mutations: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode
      localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light')
    }
  },
  actions: {
  },
  modules: {
  }
})