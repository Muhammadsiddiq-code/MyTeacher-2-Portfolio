<template>
  <nav class="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
    <div class="container mx-auto px-4 py-3">
      <div class="flex justify-between items-center">
        <router-link to="/" class="text-2xl font-bold text-primary-600 dark:text-primary-400">
          <span class="text-accent-600 dark:text-accent-400">Teacher</span>Portfolio
        </router-link>
        
        <div class="hidden md:flex space-x-8">
          <router-link v-for="item in menuItems" :key="item.path" :to="item.path" 
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {{ $t(item.label) }}
          </router-link>
        </div>
        
        <div class="flex items-center space-x-4">
          <div class="relative">
            <button @click="toggleLanguageDropdown" class="flex items-center text-gray-700 dark:text-gray-300">
              <span class="mr-1">{{ languageLabels[language] }}</span>
              <ChevronDownIcon class="w-4 h-4" />
            </button>
            <div v-if="isLanguageDropdownOpen" class="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
              <button v-for="(label, lang) in languageLabels" :key="lang" 
                @click="selectLanguage(lang)"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                {{ label }}
              </button>
            </div>
          </div>
          
          <button @click="themeStore.toggleDarkMode" class="text-gray-700 dark:text-gray-300">
            <SunIcon v-if="themeStore.isDarkMode" class="w-5 h-5" />
            <MoonIcon v-else class="w-5 h-5" />
          </button>
          
          <button @click="toggleMobileMenu" class="md:hidden text-gray-700 dark:text-gray-300">
            <MenuIcon v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <XIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div v-if="isMobileMenuOpen" class="md:hidden mt-4 pb-4">
        <router-link v-for="item in menuItems" :key="item.path" :to="item.path" 
          @click="isMobileMenuOpen = false"
          class="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
          {{ $t(item.label) }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '@/stores/theme';
import { SunIcon, MoonIcon, MenuIcon, XIcon, ChevronDownIcon } from 'lucide-vue-next';

const i18n = useI18n();
const themeStore = useThemeStore();

const language = ref(i18n.locale.value);
const isMobileMenuOpen = ref(false);
const isLanguageDropdownOpen = ref(false);

const menuItems = [
  { path: '/', label: 'nav.home' },
  { path: '/achievements', label: 'nav.achievements' },
  { path: '/students', label: 'nav.students' },
  { path: '/courses', label: 'nav.courses' },
  { path: '/blog', label: 'nav.blog' },
  { path: '/schedule', label: 'nav.schedule' },
  { path: '/qa', label: 'nav.qa' },
  { path: '/contact', label: 'nav.contact' }
];

const languageLabels = {
  uz: 'UZ',
  en: 'EN',
  ru: 'RU'
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const toggleLanguageDropdown = () => {
  isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value;
};

const selectLanguage = (lang) => {
  language.value = lang;
  i18n.locale.value = lang;
  localStorage.setItem('language', lang);
  isLanguageDropdownOpen.value = false;
};
</script>

<style scoped>
.router-link-active {
  color: var(--primary-color);
  font-weight: 500;
}
</style>
