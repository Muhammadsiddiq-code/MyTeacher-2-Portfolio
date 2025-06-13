<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-r from-primary-600/80 to-accent-600/80 dark:from-primary-900/90 dark:to-accent-900/90 z-10"></div>
        <img src="" alt="Background" class="w-full h-full object-cover" />
      </div>
      
      <div class="container mx-auto px-4 z-20 text-center">
        <div v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 800 } }">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">{{ $t('home.hero.title') }}</h1>
          <p class="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">{{ $t('home.hero.subtitle') }}</p>
          <div class="flex flex-wrap justify-center gap-4">
            <router-link to="/courses" class="px-8 py-3 bg-white text-primary-600 font-medium rounded-full hover:bg-gray-100 transition-colors">
              {{ $t('home.hero.coursesButton') }}
            </router-link>
            <router-link to="/contact" class="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors">
              {{ $t('home.hero.contactButton') }}
            </router-link>
          </div>
        </div>
      </div>
      
      <div class="absolute bottom-10 left-0 right-0 flex justify-center">
        <button @click="scrollToAbout" class="animate-bounce">
          <ChevronDownIcon class="w-10 h-10 text-white" />
        </button>
      </div>
    </section>
    
    <!-- About Section -->
    <section ref="aboutSection" class="py-20 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="md:w-1/2" v-motion
            :initial="{ opacity: 0, x: -100 }"
            :visible="{ opacity: 1, x: 0, transition: { duration: 800 } }">
            <img src="" alt="Teacher" class="rounded-lg shadow-xl w-full max-w-md mx-auto" />
          </div>
          
          <div class="md:w-1/2" v-motion
            :initial="{ opacity: 0, x: 100 }"
            :visible="{ opacity: 1, x: 0, transition: { duration: 800 } }">
            <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">{{ $t('home.about.title') }}</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">{{ $t('home.about.description') }}</p>
            <div class="grid grid-cols-2 gap-4 mb-8">
              <div v-for="(stat, index) in stats" :key="index" class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">{{ stat.value }}</div>
                <div class="text-gray-600 dark:text-gray-400">{{ $t(stat.label) }}</div>
              </div>
            </div>
            <router-link to="/about" class="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium">
              {{ $t('home.about.readMoreButton') }}
              <ArrowRightIcon class="w-4 h-4 ml-2" />
            </router-link>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Featured Courses -->
    <section class="py-20 bg-gray-100 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12" v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">{{ $t('home.courses.title') }}</h2>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{{ $t('home.courses.subtitle') }}</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(course, index) in featuredCourses" :key="index" class="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden" v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 800 } }">
            <!-- <img :src="`/placeholder.svg?height=300&width=500&text=${course.title}`" :alt="course.title" class="w-full h-48 object-cover" /> -->
             <img src="" :alt="course.title "  class="w-full h-48 object-cover" >
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white">{{ course.title }}</h3>
                <span class="px-3 py-1 bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 text-sm font-medium rounded-full">
                  {{ course.category }}
                </span>
              </div>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ course.description }}</p>
              <div class="flex justify-between items-center">
                <span class="text-gray-500 dark:text-gray-400 flex items-center">
                  <ClockIcon class="w-4 h-4 mr-1" />
                  {{ course.duration }}
                </span>
                <router-link :to="`/courses/${course.id}`" class="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                  {{ $t('home.courses.detailsButton') }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <router-link to="/courses" class="px-8 py-3 bg-primary-600 text-white font-medium rounded-full hover:bg-primary-700 transition-colors">
            {{ $t('home.courses.allCoursesButton') }}
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- Testimonials -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12" v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">{{ $t('home.testimonials.title') }}</h2>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{{ $t('home.testimonials.subtitle') }}</p>
        </div>
        
        <div class="max-w-4xl mx-auto">
          <div class="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
            <div class="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
              <img src="" alt="Student" class="w-full h-full object-cover" />
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-lg italic mb-6">
              "Bu o'qituvchi mening karyeramni butunlay o'zgartirdi. Men olgan bilim va yo'naltirish juda qimmatli edi."
            </p>
            <h4 class="text-gray-800 dark:text-white font-bold">Aziz Karimov</h4>
            <p class="text-gray-500 dark:text-gray-400">IT Park dasturchi</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="py-20 bg-primary-600 dark:bg-primary-900">
      <div class="container mx-auto px-4 text-center" v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :visible="{ opacity: 1, scale: 1, transition: { duration: 800 } }">
        <h2 class="text-3xl font-bold text-white mb-6">{{ $t('home.cta.title') }}</h2>
        <p class="text-white/90 max-w-2xl mx-auto mb-8">{{ $t('home.cta.description') }}</p>
        <router-link to="/contact" class="px-8 py-3 bg-white text-primary-600 font-medium rounded-full hover:bg-gray-100 transition-colors">
          {{ $t('home.cta.button') }}
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMotion } from '@vueuse/motion';
import { ChevronDownIcon, ArrowRightIcon, ClockIcon } from 'lucide-vue-next';

const aboutSection = ref(null);

const scrollToAbout = () => {
  aboutSection.value.scrollIntoView({ behavior: 'smooth' });
};

const stats = [
  { value: '10+', label: 'home.about.stats.yearsExperience' },
  { value: '500+', label: 'home.about.stats.studentsCount' },
  { value: '15+', label: 'home.about.stats.coursesCount' },
  { value: '25+', label: 'home.about.stats.awardsCount' }
];

const featuredCourses = [
  {
    id: 1,
    title: 'Web Development Fundamentals',
    category: 'Programming',
    description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites.',
    duration: '8 weeks',
    image: '/course-web.jpg'
  },
  {
    id: 2,
    title: 'Advanced Vue.js',
    category: 'Frontend',
    description: 'Master Vue.js and build complex single-page applications.',
    duration: '10 weeks',
    image: '/course-vue.jpg'
  },
  {
    id: 3,
    title: 'Full Stack Development',
    category: 'Programming',
    description: 'Become a full stack developer with Node.js, Express, and MongoDB.',
    duration: '12 weeks',
    image: '/course-fullstack.jpg'
  }
];
</script>
