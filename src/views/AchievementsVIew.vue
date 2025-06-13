<template>
    <div class="py-12 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">{{ $t('achievements.title') }}</h1>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{{ $t('achievements.subtitle') }}</p>
        </div>
        
        <!-- Tabs -->
        <div class="flex flex-wrap justify-center mb-8">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-2 mx-2 mb-2 rounded-full font-medium transition-colors',
              activeTab === tab.id 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
            ]">
            {{ $t(tab.label) }}
          </button>
        </div>
        
        <!-- Certificates -->
        <div v-if="activeTab === 'certificates'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(certificate, index) in certificates" 
            :key="index"
            @click="openModal(certificate)"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 500 } }">
            <img :src="certificate.image" :alt="certificate.title" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">{{ certificate.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-2">{{ certificate.issuer }}</p>
              <div class="flex justify-between items-center">
                <span class="text-gray-500 dark:text-gray-400 text-sm">{{ certificate.date }}</span>
                <span class="text-primary-600 dark:text-primary-400">
                  <SearchIcon class="w-5 h-5" />
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Courses -->
        <div v-if="activeTab === 'courses'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(course, index) in taughtCourses" 
            :key="index"
            @click="openModal(course)"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 500 } }">
            <img :src="course.image" :alt="course.title" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">{{ course.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-2">{{ course.location }}</p>
              <div class="flex justify-between items-center">
                <span class="text-gray-500 dark:text-gray-400 text-sm">{{ course.date }}</span>
                <span class="text-primary-600 dark:text-primary-400">
                  <UsersIcon class="w-5 h-5" />
                  <span class="ml-1">{{ course.students }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Awards -->
        <div v-if="activeTab === 'awards'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(award, index) in awards" 
            :key="index"
            @click="openModal(award)"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 500 } }">
            <div class="bg-primary-600 dark:bg-primary-800 p-4 flex items-center justify-center">
              <AwardIcon class="w-16 h-16 text-white" />
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">{{ award.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-2">{{ award.presenter }}</p>
              <div class="flex justify-between items-center">
                <span class="text-gray-500 dark:text-gray-400 text-sm">{{ award.date }}</span>
                <span class="text-primary-600 dark:text-primary-400">
                  <TrophyIcon class="w-5 h-5" />
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Modal -->
        <transition name="fade">
          <div v-if="selectedItem" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" @click="closeModal">
            <div class="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
              <div class="relative">
                <button @click="closeModal" class="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                  <XIcon class="w-6 h-6" />
                </button>
                
                <div v-if="selectedItem.image" class="w-full h-64 md:h-80">
                  <img :src="selectedItem.image" :alt="selectedItem.title" class="w-full h-full object-cover" />
                </div>
                
                <div class="p-6">
                  <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">{{ selectedItem.title }}</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div v-if="selectedItem.issuer || selectedItem.presenter || selectedItem.location" class="flex items-center">
                      <BuildingIcon class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                      <span class="text-gray-700 dark:text-gray-300">
                        {{ selectedItem.issuer || selectedItem.presenter || selectedItem.location }}
                      </span>
                    </div>
                    
                    <div class="flex items-center">
                      <CalendarIcon class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                      <span class="text-gray-700 dark:text-gray-300">{{ selectedItem.date }}</span>
                    </div>
                    
                    <div v-if="selectedItem.students" class="flex items-center">
                      <UsersIcon class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                      <span class="text-gray-700 dark:text-gray-300">{{ selectedItem.students }} students</span>
                    </div>
                  </div>
                  
                  <p class="text-gray-600 dark:text-gray-300 mb-6">{{ selectedItem.description }}</p>
                  
                  <div v-if="selectedItem.skills" class="mb-6">
                    <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Skills Covered:</h4>
                    <div class="flex flex-wrap gap-2">
                      <span 
                        v-for="(skill, index) in selectedItem.skills" 
                        :key="index"
                        class="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                        {{ skill }}
                      </span>
                    </div>
                  </div>
                  
                  <a 
                    v-if="selectedItem.verifyLink" 
                    :href="selectedItem.verifyLink" 
                    target="_blank" 
                    class="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium">
                    {{ $t('achievements.verifyButton') }}
                    <ExternalLinkIcon class="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useMotion } from '@vueuse/motion';
  import { SearchIcon, UsersIcon, AwardIcon, TrophyIcon, XIcon, BuildingIcon, CalendarIcon, ExternalLinkIcon } from 'lucide-vue-next';
  
  const activeTab = ref('certificates');
  const selectedItem = ref(null);
  
  const tabs = [
    { id: 'certificates', label: 'achievements.tabs.certificates' },
    { id: 'courses', label: 'achievements.tabs.courses' },
    { id: 'awards', label: 'achievements.tabs.awards' }
  ];
  
  const certificates = [
    {
      title: 'Advanced Vue.js Development',
      issuer: 'Vue Mastery',
      date: 'June 2023',
      image: '/certificate-1.jpg',
      description: 'This certification validates expertise in building complex applications with Vue.js, including state management with Vuex, routing, and advanced component patterns.',
      verifyLink: 'https://example.com/verify',
      skills: ['Vue.js', 'Vuex', 'Vue Router', 'Composition API']
    },
    {
      title: 'Full Stack Web Development',
      issuer: 'Udacity',
      date: 'March 2022',
      image: '/certificate-2.jpg',
      description: 'Comprehensive certification covering both frontend and backend development, including React, Node.js, Express, and MongoDB.',
      verifyLink: 'https://example.com/verify',
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB']
    },
    {
      title: 'UI/UX Design Principles',
      issuer: 'Interaction Design Foundation',
      date: 'November 2021',
      image: '/certificate-3.jpg',
      description: 'Certification in user interface and user experience design principles, focusing on creating intuitive and accessible web applications.',
      verifyLink: 'https://example.com/verify',
      skills: ['UI Design', 'UX Research', 'Wireframing', 'Prototyping']
    },
    {
      title: 'JavaScript Algorithms and Data Structures',
      issuer: 'freeCodeCamp',
      date: 'August 2021',
      image: '/certificate-4.jpg',
      description: 'Certification in advanced JavaScript concepts, algorithms, and data structures implementation.',
      verifyLink: 'https://example.com/verify',
      skills: ['JavaScript', 'Algorithms', 'Data Structures', 'Problem Solving']
    },
    {
      title: 'Responsive Web Design',
      issuer: 'freeCodeCamp',
      date: 'May 2021',
      image: '/certificate-5.jpg',
      description: 'Certification in creating responsive web designs using HTML, CSS, and modern layout techniques like Flexbox and Grid.',
      verifyLink: 'https://example.com/verify',
      skills: ['HTML', 'CSS', 'Flexbox', 'CSS Grid']
    }
  ];
  
  const taughtCourses = [
    {
      title: 'Modern Frontend Development',
      location: 'IT Park Tashkent',
      date: 'Jan - Mar 2023',
      students: 45,
      image: '/course-taught-1.jpg',
      description: 'A comprehensive course on modern frontend development with Vue.js, covering components, state management, routing, and best practices.',
      skills: ['Vue.js', 'JavaScript', 'HTML/CSS', 'Responsive Design']
    },
    {
      title: 'Web Development Bootcamp',
      location: 'Digital City Samarkand',
      date: 'Apr - Jun 2022',
      students: 30,
      image: '/course-taught-2.jpg',
      description: 'An intensive bootcamp covering full stack web development from HTML/CSS basics to building complete applications with Node.js and MongoDB.',
      skills: ['HTML/CSS', 'JavaScript', 'Node.js', 'MongoDB']
    },
    {
      title: 'JavaScript Fundamentals',
      location: 'TUIT University',
      date: 'Sep - Dec 2022',
      students: 60,
      image: '/course-taught-3.jpg',
      description: 'A foundational course on JavaScript programming, covering syntax, functions, objects, arrays, and modern ES6+ features.',
      skills: ['JavaScript', 'ES6+', 'DOM Manipulation', 'Async Programming']
    },
    {
      title: 'Mobile App Development with Vue',
      location: 'Online Course',
      date: 'Jul - Sep 2022',
      students: 120,
      image: '/course-taught-4.jpg',
      description: 'A specialized course on building mobile applications using Vue.js and Ionic framework.',
      skills: ['Vue.js', 'Ionic', 'Mobile UI/UX', 'Progressive Web Apps']
    }
  ];
  
  const awards = [
    {
      title: 'Best Teacher of the Year',
      presenter: 'IT Education Association',
      date: 'December 2022',
      description: 'Awarded for excellence in teaching and significant contribution to IT education in Uzbekistan.',
    },
    {
      title: 'Innovation in Teaching',
      presenter: 'EdTech Summit',
      date: 'October 2022',
      description: 'Recognized for implementing innovative teaching methods and technologies in the classroom.',
    },
    {
      title: 'Community Contribution Award',
      presenter: 'Developer Community Uzbekistan',
      date: 'June 2022',
      description: 'Awarded for outstanding contribution to the local developer community through workshops, meetups, and mentorship.',
    }
  ];
  
  const openModal = (item) => {
    selectedItem.value = item;
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    selectedItem.value = null;
    document.body.style.overflow = '';
  };
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>