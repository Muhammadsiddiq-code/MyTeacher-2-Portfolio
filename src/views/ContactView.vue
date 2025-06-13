<template>
    <div class="py-12 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-12">
            <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">Bog'lanish</h1>
            <p class="text-gray-600 dark:text-gray-300">Savollaringiz bo'lsa, menga xabar yuboring</p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <form @submit.prevent="submitForm">
              <!-- Form fields -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ismingiz</label>
                  <input v-model="form.name" type="text" id="name" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input v-model="form.email" type="email" id="email" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
                </div>
              </div>
              <div class="mb-6">
                <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mavzu</label>
                <input v-model="form.subject" type="text" id="subject" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
              </div>
              <div class="mb-6">
                <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Xabar</label>
                <textarea v-model="form.message" id="message" rows="5" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white"></textarea>
              </div>
              <div class="text-center">
                <button type="submit" class="px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors">
                  Yuborish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const form = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const submitForm = async () => {
    // EmailJS yoki Netlify Forms orqali yuborish
    console.log('Form submitted:', form.value)
    
    // Form yuborilgandan so'ng
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    
    alert('Xabaringiz yuborildi!')
  }
  </script>