<template>
    <div class="py-12 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">{{ $t('schedule.title') }}</h1>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{{ $t('schedule.subtitle') }}</p>
        </div>
        
        <!-- Current Time -->
        <div class="flex flex-col md:flex-row items-center justify-center mb-12 gap-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center w-full md:w-auto">
            <h2 class="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">{{ $t('schedule.currentTime') }}</h2>
            <div class="text-4xl font-bold text-gray-800 dark:text-white">{{ currentTime }}</div>
          </div>
          
          <div v-if="currentClass" class="bg-primary-600 dark:bg-primary-800 rounded-lg shadow-md p-6 text-center w-full md:w-auto">
            <h2 class="text-lg font-semibold text-white/80 mb-2">{{ $t('schedule.currentClass') }}</h2>
            <div class="text-2xl font-bold text-white mb-1">{{ currentClass.title }}</div>
            <div class="text-white/80">{{ currentClass.time }}</div>
          </div>
          
          <div v-else class="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md p-6 text-center w-full md:w-auto">
            <h2 class="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">{{ $t('schedule.currentClass') }}</h2>
            <div class="text-xl font-medium text-gray-800 dark:text-white">{{ $t('schedule.noCurrentClass') }}</div>
          </div>
        </div>
        
        <!-- Weekly Schedule -->
        <div class="mb-12">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white">{{ $t('schedule.weeklySchedule') }}</h2>
            
            <div class="flex items-center space-x-2">
              <button 
                @click="previousWeek"
                class="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <ChevronLeftIcon class="w-5 h-5" />
              </button>
              <span class="text-gray-700 dark:text-gray-300 font-medium">{{ weekRange }}</span>
              <button 
                @click="nextWeek"
                class="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <ChevronRightIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <div class="min-w-[800px]">
              <div class="grid grid-cols-8 gap-2">
                <!-- Time Column -->
                <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                  <div class="h-12 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300">
                    {{ $t('schedule.time') }}
                  </div>
                  <div 
                    v-for="time in timeSlots" 
                    :key="time"
                    class="h-20 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                    {{ time }}
                  </div>
                </div>
                
                <!-- Days Columns -->
                <div 
                  v-for="(day, index) in weekDays" 
                  :key="index"
                  class="bg-white dark:bg-gray-800 rounded-lg">
                  <div 
                    class="h-12 flex flex-col items-center justify-center font-bold text-gray-800 dark:text-white"
                    :class="{ 'bg-primary-100 dark:bg-primary-900 rounded-t-lg': isToday(day.date) }">
                    <div>{{ day.name }}</div>
                    <div class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ formatDate(day.date) }}</div>
                  </div>
                  
                  <div class="relative">
                    <div 
                      v-for="time in timeSlots" 
                      :key="time"
                      class="h-20 border-t border-gray-200 dark:border-gray-700">
                    </div>
                    
                    <div 
                      v-for="(event, eventIndex) in getEventsForDay(day.date)" 
                      :key="eventIndex"
                      :style="{
                        top: `${getEventPosition(event.startTime)}px`,
                        height: `${getEventHeight(event.startTime, event.endTime)}px`
                      }"
                      :class="[
                        'absolute left-1 right-1 rounded-md p-2 overflow-hidden',
                        event.type === 'class' ? 'bg-primary-500 text-white' : 'bg-yellow-500 text-white'
                      ]">
                      <div class="text-sm font-semibold truncate">{{ event.title }}</div>
                      <div class="text-xs opacity-80 truncate">{{ event.startTime }} - {{ event.endTime }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Upcoming Classes -->
        <div>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">{{ $t('schedule.upcomingClasses') }}</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="(event, index) in upcomingEvents" 
              :key="index"
              class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              v-motion
              :initial="{ opacity: 0, y: 50 }"
              :visible="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 500 } }">
              <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                  <h3 class="text-xl font-bold text-gray-800 dark:text-white">{{ event.title }}</h3>
                  <span 
                    :class="[
                      'px-3 py-1 text-xs font-medium rounded-full',
                      event.type === 'class' 
                        ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300' 
                        : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
                    ]">
                    {{ event.type === 'class' ? $t('schedule.class') : $t('schedule.consultation') }}
                  </span>
                </div>
                
                <div class="flex items-center mb-3">
                  <CalendarIcon class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <span class="text-gray-600 dark:text-gray-300">{{ formatFullDate(event.date) }}</span>
                </div>
                
                <div class="flex items-center mb-3">
                  <ClockIcon class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <span class="text-gray-600 dark:text-gray-300">{{ event.startTime }} - {{ event.endTime }}</span>
                </div>
                
                <div class="flex items-center mb-4">
                  <MapPinIcon class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <span class="text-gray-600 dark:text-gray-300">{{ event.location }}</span>
                </div>
                
                <p class="text-gray-600 dark:text-gray-300 mb-4">{{ event.description }}</p>
                
                <button class="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                  {{ $t('schedule.addToCalendar') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { useMotion } from '@vueuse/motion';
  import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-vue-next';
  
  // Current time
  const currentTime = ref('');
  let timeInterval;
  
  onMounted(() => {
    updateCurrentTime();
    timeInterval = setInterval(updateCurrentTime, 1000);
  });
  
  onUnmounted(() => {
    clearInterval(timeInterval);
  });
  
  const updateCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    currentTime.value = `${hours}:${minutes}:${seconds}`;
    
    // Update current class
    checkCurrentClass();
  };
  
  // Week navigation
  const currentWeekStart = ref(getStartOfWeek(new Date()));
  
  const previousWeek = () => {
    const date = new Date(currentWeekStart.value);
    date.setDate(date.getDate() - 7);
    currentWeekStart.value = date;
  };
  
  const nextWeek = () => {
    const date = new Date(currentWeekStart.value);
    date.setDate(date.getDate() + 7);
    currentWeekStart.value = date;
  };
  
  function getStartOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    return new Date(d.setDate(diff));
  }
  
  const weekRange = computed(() => {
    const start = new Date(currentWeekStart.value);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    
    return `${formatDate(start)} - ${formatDate(end)}`;
  });
  
  const weekDays = computed(() => {
    const days = [];
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart.value);
      date.setDate(date.getDate() + i);
      days.push({
        name: dayNames[i],
        date: new Date(date)
      });
    }
    
    return days;
  });
  
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };
  
  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };
  
  const formatFullDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  // Time slots
  const timeSlots = [
    '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];
  
  // Schedule events
  const scheduleEvents = [
    {
      title: 'Web Development Fundamentals',
      type: 'class',
      date: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
      startTime: '9:00',
      endTime: '11:00',
      location: 'Room 101, IT Building',
      description: 'Introduction to HTML, CSS, and JavaScript basics.'
    },
    {
      title: 'Advanced Vue.js',
      type: 'class',
      date: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
      startTime: '13:00',
      endTime: '15:00',
      location: 'Room 205, IT Building',
      description: 'Deep dive into Vue.js Composition API and advanced patterns.'
    },
    {
      title: 'Student Consultations',
      type: 'consultation',
      date: new Date(new Date().setDate(new Date().getDate() + 2)), // Day after tomorrow
      startTime: '10:00',
      endTime: '12:00',
      location: 'Office 304, IT Building',
      description: 'Open office hours for student questions and project guidance.'
    },
    {
      title: 'JavaScript Fundamentals',
      type: 'class',
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      startTime: '14:00',
      endTime: '16:00',
      location: 'Room 101, IT Building',
      description: 'Core JavaScript concepts and programming fundamentals.'
    },
    {
      title: 'UI/UX Design Workshop',
      type: 'class',
      date: new Date(new Date().setDate(new Date().getDate() + 4)),
      startTime: '9:00',
      endTime: '12:00',
      location: 'Design Lab, Art Building',
      description: 'Hands-on workshop on user interface and experience design principles.'
    },
    {
      title: 'Project Consultations',
      type: 'consultation',
      date: new Date(new Date().setDate(new Date().getDate() + 4)),
      startTime: '15:00',
      endTime: '18:00',
      location: 'Office 304, IT Building',
      description: 'Individual project reviews and technical guidance.'
    }
  ];
  
  // Current class
  const currentClass = ref(null);
  
  const checkCurrentClass = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    currentClass.value = null;
    
    for (const event of scheduleEvents) {
      if (isSameDay(event.date, now)) {
        const [startHour, startMinute] = event.startTime.split(':').map(Number);
        const [endHour, endMinute] = event.endTime.split(':').map(Number);
        
        if ((currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) && 
            (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute))) {
          currentClass.value = event;
          break;
        }
      }
    }
  };
  
  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() && 
           date1.getMonth() === date2.getMonth() && 
           date1.getFullYear() === date2.getFullYear();
  };
  
  // Get events for a specific day
  const getEventsForDay = (date) => {
    return scheduleEvents.filter(event => isSameDay(event.date, date));
  };
  
  // Calculate event position and height in the schedule grid
  const getEventPosition = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const hourIndex = hours - 9; // 9:00 is the first slot
    return hourIndex * 80 + (minutes / 60) * 80 + 12; // 80px per hour, 12px for the header
  };
  
  const getEventHeight = (startTime, endTime) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    const durationMinutes = endTotalMinutes - startTotalMinutes;
    
    return (durationMinutes / 60) * 80 - 4; // 80px per hour, minus 4px for padding
  };
  
  // Upcoming events
  const upcomingEvents = computed(() => {
    const now = new Date();
    return scheduleEvents
      .filter(event => event.date >= now)
      .sort((a, b) => a.date - b.date)
      .slice(0, 3);
  });
  </script> 