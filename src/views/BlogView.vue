<template>
    <div class="py-12 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">{{ $t('blog.title') }}</h1>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{{ $t('blog.subtitle') }}</p>
        </div>
        
        <!-- Search and Categories -->
        <div class="flex flex-col md:flex-row justify-between items-center mb-8">
          <div class="relative w-full md:w-64 mb-4 md:mb-0">
            <input 
              v-model="searchQuery"
              type="text" 
              :placeholder="$t('blog.searchPlaceholder')" 
              class="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="tag in popularTags" 
              :key="tag"
              @click="toggleTag(tag)"
              :class="[
                'px-3 py-1 text-sm rounded-full transition-colors',
                selectedTags.includes(tag)
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              ]">
              #{{ tag }}
            </button>
          </div>
        </div>
        
        <!-- Featured Post -->
        <div v-if="featuredPost" class="mb-12">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div class="md:flex">
              <div class="md:w-1/2">
                <img :src="featuredPost.image" :alt="featuredPost.title" class="w-full h-64 md:h-full object-cover" />
              </div>
              <div class="p-6 md:w-1/2 flex flex-col">
                <div class="flex items-center mb-4">
                  <span class="px-3 py-1 bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 text-sm font-medium rounded-full">
                    {{ $t('blog.featured') }}
                  </span>
                </div>
                <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">{{ featuredPost.title }}</h2>
                <p class="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{{ featuredPost.excerpt }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img :src="featuredPost.author.avatar" :alt="featuredPost.author.name" class="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <div class="text-gray-800 dark:text-white font-medium">{{ featuredPost.author.name }}</div>
                      <div class="text-gray-500 dark:text-gray-400 text-sm">{{ featuredPost.date }}</div>
                    </div>
                  </div>
                  <router-link :to="`/blog/${featuredPost.id}`" class="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                    {{ $t('blog.readMore') }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Blog Posts Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(post, index) in filteredPosts" 
            :key="post.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 500 } }">
            <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover" />
            <div class="p-6">
              <div class="flex flex-wrap gap-2 mb-3">
                <span 
                  v-for="tag in post.tags" 
                  :key="tag"
                  class="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                  #{{ tag }}
                </span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-3">{{ post.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{{ post.excerpt }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <img :src="post.author.avatar" :alt="post.author.name" class="w-8 h-8 rounded-full mr-2" />
                  <div class="text-gray-500 dark:text-gray-400 text-sm">{{ post.date }}</div>
                </div>
                <router-link :to="`/blog/${post.id}`" class="text-primary-600 dark:text-primary-400 font-medium hover:underline text-sm">
                  {{ $t('blog.readMore') }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <div class="flex justify-center mt-12">
          <nav class="flex items-center space-x-2">
            <button 
              @click="currentPage > 1 && (currentPage--)"
              :disabled="currentPage === 1"
              class="px-3 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50">
              <ChevronLeftIcon class="w-5 h-5" />
            </button>
            
            <button 
              v-for="page in totalPages" 
              :key="page"
              @click="currentPage = page"
              :class="[
                'px-3 py-1 rounded-md',
                currentPage === page
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'
              ]">
              {{ page }}
            </button>
            
            <button 
              @click="currentPage < totalPages && (currentPage++)"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50">
              <ChevronRightIcon class="w-5 h-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useMotion } from '@vueuse/motion';
  import { SearchIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next';
  
  const searchQuery = ref('');
  const selectedTags = ref([]);
  const currentPage = ref(1);
  const postsPerPage = 6;
  
  const popularTags = ['vuejs', 'javascript', 'webdev', 'frontend', 'programming', 'tutorial'];
  
  const toggleTag = (tag) => {
    if (selectedTags.value.includes(tag)) {
      selectedTags.value = selectedTags.value.filter(t => t !== tag);
    } else {
      selectedTags.value.push(tag);
    }
    currentPage.value = 1; // Reset to first page when filtering
  };
  
  const featuredPost = {
    id: 1,
    title: 'The Future of Web Development: Trends to Watch in 2023',
    excerpt: 'Explore the emerging technologies and methodologies that are shaping the future of web development. From WebAssembly to Edge Computing, discover what\'s next in the world of web development.',
    image: '/blog-featured.jpg',
    date: 'June 15, 2023',
    author: {
      name: 'John Doe',
      avatar: '/author-avatar.jpg'
    },
    tags: ['webdev', 'future', 'trends']
  };
  
  const blogPosts = [
    {
      id: 2,
      title: 'Getting Started with Vue.js 3 Composition API',
      excerpt: 'Learn how to use the Vue.js 3 Composition API to build more maintainable and scalable components.',
      image: '/blog-vue.jpg',
      date: 'May 28, 2023',
      author: {
        name: 'John Doe',
        avatar: '/author-avatar.jpg'
      },
      tags: ['vuejs', 'javascript', 'tutorial']
    },
    {
      id: 3,
      title: 'Mastering CSS Grid Layout',
      excerpt: 'A comprehensive guide to using CSS Grid Layout for creating complex web layouts with ease.',
      image: '/blog-css.jpg',
      date: 'May 15, 2023',
      author: {
        name: 'John Doe',
        avatar: '/author-avatar.jpg'
      },
      tags: ['css', 'webdev', 'frontend']
    },
    {
      id: 4,
      title: 'JavaScript Array Methods You Should Know',
      excerpt: 'Explore the most useful JavaScript array methods that will make your code cleaner and more efficient.',
      image: '/blog-js.jpg',
      date: 'April 30, 2023',
      author: {
        name: 'John Doe',
        avatar: '/author-avatar.jpg'
      },
      tags: ['javascript', 'programming', 'tutorial']
    },
    {
      id: 5,
      title: 'Building Responsive Websites with Tailwind CSS',
      excerpt: 'Learn how to use Tailwind CSS to create beautiful, responsive websites without writing custom CSS.',
      image: '/blog-tailwind.jpg',
      date: 'April 22, 2023',
      author: {
        name: 'John Doe',
        avatar: '/author-avatar.jpg'
      },
      tags: ['tailwindcss', 'css', 'frontend']
    },
    {
      id: 6,
      title: 'Introduction to Server-Side Rendering with Nuxt.js',
      excerpt: 'Discover the benefits of server-side rendering and how to implement it using Nuxt.js.',
      image: '/blog-nuxt.jpg',
      date: 'April 10, 2023',
      author: {
        name: 'John Doe',
        avatar: '/author-avatar.jpg'
      },
      tags: ['vuejs', 'nuxtjs', 'ssr']
    },
    {
      id: 7,
      title: 'State Management Patterns in Vue.js',
      excerpt: 'An overview of different state management patterns in Vue.js applications, from simple to complex.',
      image: '/blog-state.jpg',
      date: 'March 28, 2023',
      author: {
        name: 'John Doe',
        avatar: '/author-avatar.jpg'
      },
      tags: ['vuejs', 'javascript', 'statemanagement']
    },
    {
      id: 8,
      title: 'Optimizing Web Performance: A Developer\'s Guide',
      excerpt: 'Learn practical techniques to improve the performance of your web applications.',
      image: '/blog-performance.jpg',
      date: 'March 15, 2023',
      author: {
        name: 'John Doe',
        avatar: '/author-avatar.jpg'
      },
      tags: ['performance', 'webdev', 'optimization']
    },
    {
      id: 9,
      title: 'Building RESTful APIs with Node.js and Express',
      excerpt: 'A step-by-step guide to creating robust RESTful APIs using Node.js and Express.',
      image: '/blog-api.jpg',
      date: 'March 5, 2023',
      author: {
        name: 'John Doe',
        avatar: '/author-avatar.jpg'
      },
      tags: ['nodejs', 'api', 'backend']
    },
    {
      id: 10,
      title: 'Introduction to TypeScript for JavaScript Developers',
      excerpt: 'Learn how TypeScript can improve your JavaScript development experience with static typing.',
      image: '/blog-typescript.jpg',
      date: 'February 20, 2023',
      author: {
        name: 'John Doe',
        avatar: '/author-avatar.jpg'
      },
      tags: ['typescript', 'javascript', 'programming']
    }
  ];
  
  const filteredPosts = computed(() => {
    let result = [...blogPosts];
    
    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by selected tags
    if (selectedTags.value.length > 0) {
      result = result.filter(post => 
        selectedTags.value.every(tag => post.tags.includes(tag))
      );
    }
    
    return result;
  });
  
  const paginatedPosts = computed(() => {
    const startIndex = (currentPage.value - 1) * postsPerPage;
    return filteredPosts.value.slice(startIndex, startIndex + postsPerPage);
  });
  
  const totalPages = computed(() => {
    return Math.ceil(filteredPosts.value.length / postsPerPage);
  });
  </script>