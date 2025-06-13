<!-- <template>
  <div :class="{ 'dark': $store.state.isDarkMode }">
    <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <header-component />
      
      <main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      
      <footer-component />
      
      <live-chat />
    </div>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
// import FooterComponent from './components/FooterComponent.vue'
// import LiveChat from './components/LiveChat.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    // FooterComponent,
    // LiveChat
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> -->










<template>
  <div :class="{ 'dark': themeStore.isDarkMode }">
    <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <header-component />
      
      <main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      
      <footer-component />
      
      <live-chat />
    </div>
  </div>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import LiveChat from '@/components/LiveChat.vue'

const themeStore = useThemeStore()
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>