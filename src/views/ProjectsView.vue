<template>
    <div class="py-12 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">Loyihalar</h1>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Mening eng yaxshi ishlarim</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(project, index) in projects" :key="index" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">{{ project.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="(tech, techIndex) in project.technologies" :key="techIndex" class="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                  {{ tech }}
                </span>
              </div>
              <div class="flex justify-between">
                <a :href="project.demoUrl" target="_blank" class="text-primary-600 dark:text-primary-400 hover:underline">Demo</a>
                <a :href="project.codeUrl" target="_blank" class="text-primary-600 dark:text-primary-400 hover:underline">Code</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const projects = [
    {
      title: 'E-commerce Website',
      description: 'Online do\'kon uchun to\'liq funksional veb-sayt',
      image: '/projects/ecommerce.jpg',
      technologies: ['Vue.js', 'Tailwind CSS', 'Node.js', 'MongoDB'],
      demoUrl: 'https://example.com',
      codeUrl: 'https://github.com/username/project'
    },
    // Boshqa loyihalar...
  ]
  </script>