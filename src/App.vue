<!-- <template>
  <div :class="{ 'dark': isDarkMode }">
    <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <header-component @toggle-theme="toggleTheme" @change-language="changeLanguage" :language="currentLanguage" />
      
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
import { ref, provide, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import LiveChat from './components/LiveChat.vue';

// Theme management
const isDarkMode = ref(localStorage.getItem('theme') === 'dark' || 
  (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches));

watch(isDarkMode, (newVal) => {
  localStorage.setItem('theme', newVal ? 'dark' : 'light');
});

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};

// Language management
const { locale } = useI18n();
const currentLanguage = ref(localStorage.getItem('language') || 'uz');

const changeLanguage = (lang) => {
  currentLanguage.value = lang;
  locale.value = lang;
  localStorage.setItem('language', lang);
};

// Provide theme and language to all components
provide('isDarkMode', isDarkMode);
provide('currentLanguage', currentLanguage);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #3B82F6;
  --secondary-color: #10B981;
  --accent-color: #8B5CF6;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

.dark {
  --primary-color: #60A5FA;
  --secondary-color: #34D399;
  --accent-color: #A78BFA;
}

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
</style>