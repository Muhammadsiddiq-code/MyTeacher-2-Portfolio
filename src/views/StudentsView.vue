<template>
    <div class="py-12 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">{{ $t('students.title') }}</h1>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{{ $t('students.subtitle') }}</p>
        </div>
        
        <!-- Featured Students -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div 
            v-for="(student, index) in featuredStudents" 
            :key="index"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 500 } }">
            <div class="relative h-64">
              <img :src="student.image" :alt="student.name" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div class="p-4 text-white">
                  <h3 class="text-xl font-bold">{{ student.name }}</h3>
                  <p>{{ student.position }}</p>
                </div>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center mb-4">
                <BriefcaseIcon class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                <span class="text-gray-700 dark:text-gray-300">{{ student.company }}</span>
              </div>
              <div class="flex items-center mb-4">
                <GraduationCapIcon class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                <span class="text-gray-700 dark:text-gray-300">{{ student.education }}</span>
              </div>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ student.teacherNote }}</p>
              <div class="flex space-x-3">
                <a v-if="student.linkedin" :href="student.linkedin" target="_blank" class="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">
                  <LinkedinIcon class="w-5 h-5" />
                </a>
                <a v-if="student.github" :href="student.github" target="_blank" class="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">
                  <GithubIcon class="w-5 h-5" />
                </a>
                <a v-if="student.website" :href="student.website" target="_blank" class="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">
                  <GlobeIcon class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Success Stories Map -->
        <div class="mb-16">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">{{ $t('students.successMap.title') }}</h2>
          <div class="relative h-[400px] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
            <img src="/world-map.svg" alt="World Map" class="w-full h-full object-cover opacity-20" />
            
            <div 
              v-for="(marker, index) in successMarkers" 
              :key="index"
              :style="{ left: `${marker.x}%`, top: `${marker.y}%` }"
              class="absolute w-4 h-4 bg-primary-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              @mouseenter="activeMarker = marker"
              @mouseleave="activeMarker = null">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            </div>
            
            <transition name="fade">
              <div 
                v-if="activeMarker"
                :style="{ left: `${activeMarker.x}%`, top: `${activeMarker.y}%` }"
                class="absolute z-10 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 transform -translate-x-1/2 mt-2">
                <h4 class="font-bold text-gray-800 dark:text-white">{{ activeMarker.name }}</h4>
                <p class="text-gray-600 dark:text-gray-300 text-sm">{{ activeMarker.position }} at {{ activeMarker.company }}</p>
                <p class="text-gray-500 dark:text-gray-400 text-sm">{{ activeMarker.location }}</p>
              </div>
            </transition>
          </div>
        </div>
        
        <!-- Testimonials -->
        <div>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">{{ $t('students.testimonials.title') }}</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              v-for="(testimonial, index) in testimonials" 
              :key="index"
              class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              v-motion
              :initial="{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }"
              :visible="{ opacity: 1, x: 0, transition: { delay: index * 100, duration: 500 } }">
              <div class="flex items-start mb-4">
                <div class="mr-4">
                  <img :src="testimonial.avatar" :alt="testimonial.name" class="w-12 h-12 rounded-full" />
                </div>
                <div>
                  <h4 class="font-bold text-gray-800 dark:text-white">{{ testimonial.name }}</h4>
                  <p class="text-gray-500 dark:text-gray-400 text-sm">{{ testimonial.position }}</p>
                </div>
                <div class="ml-auto">
                  <QuoteIcon class="w-8 h-8 text-primary-200 dark:text-primary-900" />
                </div>
              </div>
              <p class="text-gray-600 dark:text-gray-300 italic">{{ testimonial.text }}</p>
              <div class="mt-4 flex">
                <StarIcon v-for="i in 5" :key="i" class="w-5 h-5" :class="i <= testimonial.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useMotion } from '@vueuse/motion';
  import { BriefcaseIcon, GraduationCapIcon, LinkedinIcon, GithubIcon, GlobeIcon, QuoteIcon, StarIcon } from 'lucide-vue-next';
  
  const activeMarker = ref(null);
  
  const featuredStudents = [
    {
      name: 'Aziz Karimov',
      position: 'Senior Frontend Developer',
      company: 'IT Park Tashkent',
      education: 'TUIT University, Computer Science',
      image: '/student-1.jpg',
      teacherNote: 'Aziz was one of my most dedicated students. I taught him for 3 years, and his progress was remarkable.',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      website: 'https://example.com'
    },
    {
      name: 'Malika Rakhimova',
      position: 'UI/UX Designer',
      company: 'Creative Solutions',
      education: 'National University of Uzbekistan',
      image: '/student-2.jpg',
      teacherNote: 'Malika showed exceptional creativity and attention to detail. She now leads design teams at her company.',
      linkedin: 'https://linkedin.com',
      github: null,
      website: 'https://example.com'
    },
    {
      name: 'Timur Aliyev',
      position: 'Full Stack Developer',
      company: 'Tech Innovators',
      education: 'Samarkand State University',
      image: '/student-3.jpg',
      teacherNote: 'Timur started with no coding experience and is now one of the most skilled developers I know.',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      website: null
    },
    {
      name: 'Nilufar Khamidova',
      position: 'Mobile App Developer',
      company: 'AppWorks',
      education: 'Tashkent University of Information Technologies',
      image: '/student-4.jpg',
      teacherNote: 'Nilufar specialized in mobile development and has published several successful apps.',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      website: 'https://example.com'
    },
    {
      name: 'Rustam Umarov',
      position: 'DevOps Engineer',
      company: 'Cloud Solutions',
      education: 'Turin Polytechnic University in Tashkent',
      image: '/student-5.jpg',
      teacherNote: 'Rustam excelled in backend and infrastructure. He now manages cloud systems for major clients.',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      website: null
    },
    {
      name: 'Zarina Karimova',
      position: 'Data Scientist',
      company: 'Analytics Pro',
      education: 'Webster University Tashkent',
      image: '/student-6.jpg',
      teacherNote: 'Zarina combined her strong math background with programming skills to become an excellent data scientist.',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      website: 'https://example.com'
    }
  ];
  
  const successMarkers = [
    { x: 48, y: 30, name: 'Aziz Karimov', position: 'Senior Frontend Developer', company: 'IT Park', location: 'Tashkent, Uzbekistan' },
    { x: 52, y: 28, name: 'Malika Rakhimova', position: 'UI/UX Designer', company: 'Creative Solutions', location: 'Samarkand, Uzbekistan' },
    { x: 45, y: 20, name: 'Bobur Alimov', position: 'Software Engineer', company: 'Google', location: 'Munich, Germany' },
    { x: 20, y: 30, name: 'Kamila Yusupova', position: 'Product Manager', company: 'Amazon', location: 'Seattle, USA' },
    { x: 80, y: 35, name: 'Timur Kholmatov', position: 'Backend Developer', company: 'ByteDance', location: 'Singapore' },
    { x: 30, y: 25, name: 'Lola Karimova', position: 'Frontend Developer', company: 'Spotify', location: 'Stockholm, Sweden' }
  ];
  
  const testimonials = [
    {
      name: 'Aziz Karimov',
      position: 'Senior Frontend Developer',
      avatar: '/testimonial-1.jpg',
      text: 'The knowledge and mentorship I received completely changed my career path. The practical approach to teaching made complex concepts easy to understand.',
      rating: 5
    },
    {
      name: 'Malika Rakhimova',
      position: 'UI/UX Designer',
      avatar: '/testimonial-2.jpg',
      text: 'The courses are well-structured and the teaching style is exceptional. I learned not just technical skills but also how to approach problems creatively.',
      rating: 5
    },
    {
      name: 'Timur Aliyev',
      position: 'Full Stack Developer',
      avatar: '/testimonial-3.jpg',
      text: 'I started with zero knowledge and now I can build my own web applications. The teacher was always patient and provided excellent guidance.',
      rating: 4
    },
    {
      name: 'Nilufar Khamidova',
      position: 'Mobile App Developer',
      avatar: '/testimonial-4.jpg',
      text: 'The hands-on projects were invaluable for gaining real-world experience. The teacher\'s industry insights helped me understand what employers are looking for.',
      rating: 5
    }
  ];
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