<template>
    <div class="py-12 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">{{ $t('courses.title') }}</h1>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{{ $t('courses.subtitle') }}</p>
        </div>
        
        <!-- Course Categories -->
        <div class="flex flex-wrap justify-center mb-8">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="activeCategory = category.id"
            :class="[
              'px-6 py-2 mx-2 mb-2 rounded-full font-medium transition-colors',
              activeCategory === category.id 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
            ]">
            {{ $t(category.label) }}
          </button>
        </div>
        
        <!-- Courses Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(course, index) in filteredCourses" 
            :key="index"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 500 } }">
            <div class="relative">
              <img :src="course.image" :alt="course.title" class="w-full h-48 object-cover" />
              <div class="absolute top-0 right-0 m-2">
                <span 
                  :class="[
                    'px-3 py-1 text-xs font-medium rounded-full',
                    course.isPaid 
                      ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300' 
                      : 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                  ]">
                  {{ course.isPaid ? $t('courses.paid') : $t('courses.free') }}
                </span>
              </div>
            </div>
            
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white">{{ course.title }}</h3>
                <span class="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">
                  {{ course.category }}
                </span>
              </div>
              
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ course.description }}</p>
              
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="flex items-center">
                  <ClockIcon class="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <span class="text-gray-600 dark:text-gray-300 text-sm">{{ course.duration }}</span>
                </div>
                <div class="flex items-center">
                  <BookOpenIcon class="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <span class="text-gray-600 dark:text-gray-300 text-sm">{{ course.lessons }} lessons</span>
                </div>
                <div class="flex items-center">
                  <UsersIcon class="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <span class="text-gray-600 dark:text-gray-300 text-sm">{{ course.students }} students</span>
                </div>
                <div class="flex items-center">
                  <StarIcon class="w-4 h-4 text-yellow-500 mr-1" />
                  <span class="text-gray-600 dark:text-gray-300 text-sm">{{ course.rating }} ({{ course.reviews }})</span>
                </div>
              </div>
              
              <div class="flex justify-between items-center">
                <span v-if="course.isPaid" class="font-bold text-gray-800 dark:text-white">{{ course.price }}</span>
                <span v-else class="font-bold text-green-600 dark:text-green-400">{{ $t('courses.free') }}</span>
                
                <router-link :to="`/courses/${course.id}`" class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                  {{ $t('courses.viewButton') }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
        
        <!-- YouTube Lessons -->
        <div class="mt-16">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">{{ $t('courses.youtube.title') }}</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="(video, index) in youtubeVideos" 
              :key="index"
              class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              v-motion
              :initial="{ opacity: 0, y: 50 }"
              :visible="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 500 } }">
              <div class="relative">
                <img :src="video.thumbnail" :alt="video.title" class="w-full h-48 object-cover" />
                <div class="absolute inset-0 flex items-center justify-center">
                  <a :href="video.url" target="_blank" class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <PlayIcon class="w-8 h-8 text-white" />
                  </a>
                </div>
              </div>
              
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">{{ video.title }}</h3>
                <div class="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{{ video.views }} views</span>
                  <span>{{ video.date }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="text-center mt-8">
            <a href="https://youtube.com" target="_blank" class="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium">
              {{ $t('courses.youtube.viewAllButton') }}
              <ExternalLinkIcon class="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
        
        <!-- Downloads Section -->
        <div class="mt-16">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">{{ $t('courses.downloads.title') }}</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="(download, index) in downloads" 
              :key="index"
              class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              v-motion
              :initial="{ opacity: 0, y: 50 }"
              :visible="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 500 } }">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-4">
                  <component :is="getFileIcon(download.type)" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ download.title }}</h3>
                  <p class="text-gray-500 dark:text-gray-400 text-sm">{{ download.size }}</p>
                </div>
              </div>
              
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ download.description }}</p>
              
              <div class="flex justify-between items-center">
                <span class="text-gray-500 dark:text-gray-400 text-sm">{{ download.downloads }} downloads</span>
                <a :href="download.url" download class="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium">
                  {{ $t('courses.downloads.downloadButton') }}
                  <DownloadIcon class="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useMotion } from '@vueuse/motion';
  import { 
    ClockIcon, BookOpenIcon, UsersIcon, StarIcon, PlayIcon, 
    ExternalLinkIcon, DownloadIcon, FileTextIcon, FileIcon, 
    ImageIcon, FileArchiveIcon 
  } from 'lucide-vue-next';
  
  const activeCategory = ref('all');
  
  const categories = [
    { id: 'all', label: 'courses.categories.all' },
    { id: 'programming', label: 'courses.categories.programming' },
    { id: 'design', label: 'courses.categories.design' },
    { id: 'frontend', label: 'courses.categories.frontend' },
    { id: 'backend', label: 'courses.categories.backend' }
  ];
  
  const courses = [
    {
      id: 1,
      title: 'Web Development Fundamentals',
      category: 'Programming',
      description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites.',
      duration: '8 weeks',
      lessons: 24,
      students: 1250,
      rating: 4.8,
      reviews: 320,
      isPaid: true,
      price: '$49.99',
      image: '/course-web.jpg'
    },
    {
      id: 2,
      title: 'Advanced Vue.js',
      category: 'Frontend',
      description: 'Master Vue.js and build complex single-page applications.',
      duration: '10 weeks',
      lessons: 32,
      students: 850,
      rating: 4.9,
      reviews: 210,
      isPaid: true,
      price: '$69.99',
      image: '/course-vue.jpg'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      category: 'Design',
      description: 'Learn the fundamentals of user interface and user experience design.',
      duration: '6 weeks',
      lessons: 18,
      students: 720,
      rating: 4.7,
      reviews: 180,
      isPaid: true,
      price: '$59.99',
      image: '/course-design.jpg'
    },
    {
      id: 4,
      title: 'Node.js Backend Development',
      category: 'Backend',
      description: 'Build scalable backend services with Node.js, Express, and MongoDB.',
      duration: '12 weeks',
      lessons: 36,
      students: 680,
      rating: 4.8,
      reviews: 150,
      isPaid: true,
      price: '$79.99',
      image: '/course-node.jpg'
    },
    {
      id: 5,
      title: 'JavaScript Basics',
      category: 'Programming',
      description: 'A beginner-friendly introduction to JavaScript programming.',
      duration: '4 weeks',
      lessons: 12,
      students: 2100,
      rating: 4.6,
      reviews: 420,
      isPaid: false,
      price: 'Free',
      image: '/course-js.jpg'
    },
    {
      id: 6,
      title: 'Responsive Web Design',
      category: 'Frontend',
      description: 'Learn to create websites that work on any device and screen size.',
      duration: '5 weeks',
      lessons: 15,
      students: 1800,
      rating: 4.7,
      reviews: 360,
      isPaid: false,
      price: 'Free',
      image: '/course-responsive.jpg'
    }
  ];
  
  const filteredCourses = computed(() => {
    if (activeCategory.value === 'all') {
      return courses;
    }
    return courses.filter(course => course.category.toLowerCase() === activeCategory.value);
  });
  
  const youtubeVideos = [
    {
      title: 'Vue.js 3 Composition API Tutorial',
      thumbnail: '/youtube-1.jpg',
      url: 'https://youtube.com',
      views: '45K',
      date: '2 months ago'
    },
    {
      title: 'Building a Responsive Website with Tailwind CSS',
      thumbnail: '/youtube-2.jpg',
      url: 'https://youtube.com',
      views: '32K',
      date: '3 months ago'
    },
    {
      title: 'JavaScript Array Methods Every Developer Should Know',
      thumbnail: '/youtube-3.jpg',
      url: 'https://youtube.com',
      views: '78K',
      date: '1 month ago'
    },
    {
      title: 'CSS Grid Layout Tutorial for Beginners',
      thumbnail: '/youtube-4.jpg',
      url: 'https://youtube.com',
      views: '25K',
      date: '4 months ago'
    },
    {
      title: 'Node.js REST API Tutorial',
      thumbnail: '/youtube-5.jpg',
      url: 'https://youtube.com',
      views: '36K',
      date: '2 months ago'
    },
    {
      title: 'Vue.js State Management with Pinia',
      thumbnail: '/youtube-6.jpg',
      url: 'https://youtube.com',
      views: '18K',
      date: '2 weeks ago'
    }
  ];
  
  const downloads = [
    {
      title: 'Web Development Cheat Sheet',
      type: 'pdf',
      size: '2.4 MB',
      description: 'A comprehensive cheat sheet covering HTML, CSS, and JavaScript basics.',
      downloads: 3250,
      url: '/downloads/web-dev-cheatsheet.pdf'
    },
    {
      title: 'Vue.js Project Starter',
      type: 'zip',
      size: '1.8 MB',
      description: 'A starter template for Vue.js projects with best practices and folder structure.',
      downloads: 1850,
      url: '/downloads/vue-starter.zip'
    },
    {
      title: 'UI Design Resources Pack',
      type: 'image',
      size: '15.6 MB',
      description: 'A collection of UI design resources including icons, illustrations, and templates.',
      downloads: 2100,
      url: '/downloads/ui-resources.zip'
    },
    {
      title: 'JavaScript Algorithms Collection',
      type: 'text',
      size: '850 KB',
      description: 'A collection of common algorithms implemented in JavaScript with explanations.',
      downloads: 1650,
      url: '/downloads/js-algorithms.js'
    },
    {
      title: 'Responsive Design Guide',
      type: 'pdf',
      size: '3.2 MB',
      description: 'A comprehensive guide to responsive web design principles and techniques.',
      downloads: 2800,
      url: '/downloads/responsive-guide.pdf'
    },
    {
      title: 'Node.js Backend Boilerplate',
      type: 'zip',
      size: '2.1 MB',
      description: 'A boilerplate for Node.js backend projects with Express, MongoDB, and authentication.',
      downloads: 1450,
      url: '/downloads/node-boilerplate.zip'
    }
  ];
  
  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return FileTextIcon;
      case 'image':
        return ImageIcon;
      case 'zip':
        return FileArchiveIcon;
      default:
        return FileIcon;
    }
  };
  </script>