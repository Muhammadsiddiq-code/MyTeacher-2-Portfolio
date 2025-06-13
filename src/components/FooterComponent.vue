<template>
    <footer class="bg-white dark:bg-gray-800 shadow-md py-8 mt-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Logo and About -->
          <div>
            <div class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
              <span class="text-accent-600 dark:text-accent-400">Teacher</span>Portfolio
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Professional o'qituvchi va dasturchi portfoliosi. Zamonaviy ta'lim va zamonaviy yondashuv.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" class="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" class="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" class="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>
          
          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Tezkor havolalar</h3>
            <ul class="space-y-2">
              <li><router-link to="/" class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Bosh sahifa</router-link></li>
              <li><router-link to="/achievements" class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Yutuqlar</router-link></li>
              <li><router-link to="/students" class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">O'quvchilar</router-link></li>
              <li><router-link to="/courses" class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Kurslar</router-link></li>
              <li><router-link to="/blog" class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Blog</router-link></li>
            </ul>
          </div>
          
          <!-- Contact Info -->
          <div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Bog'lanish</h3>
            <ul class="space-y-2">
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 mt-1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span class="text-gray-600 dark:text-gray-300">IT Park, Tashkent, Uzbekistan</span>
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 mt-1"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span class="text-gray-600 dark:text-gray-300">+998 90 123 45 67</span>
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 mt-1"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span class="text-gray-600 dark:text-gray-300">info@teacherportfolio.uz</span>
              </li>
            </ul>
          </div>
          
          <!-- Newsletter -->
          <div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Yangiliklar</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">Yangiliklar va foydali ma'lumotlar uchun obuna bo'ling</p>
            <form @submit.prevent="subscribeNewsletter" class="flex">
              <input 
                type="email" 
                placeholder="Email manzilingiz" 
                class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button 
                type="submit" 
                class="px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 transition-colors"
              >
                Obuna
              </button>
            </form>
          </div>
        </div>
        
        <div class="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p class="text-gray-600 dark:text-gray-300">
            &copy; {{ new Date().getFullYear() }} Teacher Portfolio. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  const subscribeNewsletter = () => {
    // Newsletter subscription logic
    console.log('Newsletter subscription submitted')
  }
  </script>
  