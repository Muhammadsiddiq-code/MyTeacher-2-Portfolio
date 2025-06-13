// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'
// import { createI18n } from 'vue-i18n'
// import './assets/main.css'

// // Tarjimalar
// const messages = {
//   uz: {
//     nav: {
//       home: 'Bosh sahifa',
//       achievements: 'Yutuqlar',
//       students: 'O\'quvchilar',
//       courses: 'Kurslar',
//       blog: 'Blog',
//       schedule: 'Jadval',
//       qa: 'Savol-javob'
//     },
//     home: {
//       hero: {
//         title: 'Zamonaviy ta\'lim, zamonaviy yondashuv',
//         subtitle: 'Dasturlash va web-dizayn bo\'yicha professional ta\'lim',
//         coursesButton: 'Kurslarni ko\'rish',
//         contactButton: 'Bog\'lanish'
//       },
//       about: {
//         title: 'Men haqimda',
//         description: 'Professional o\'qituvchi va dasturchi sifatida 10 yildan ortiq tajribaga egaman. Mening maqsadim - o\'quvchilarni zamonaviy texnologiyalar bilan tanishtirish va ularga amaliy ko\'nikmalarni o\'rgatish.',
//         readMoreButton: 'Ko\'proq o\'qish',
//         stats: {
//           yearsExperience: 'yillik tajriba',
//           studentsCount: 'o\'quvchilar',
//           coursesCount: 'kurslar',
//           awardsCount: 'mukofotlar'
//         }
//       },
//       courses: {
//         title: 'Mashhur kurslar',
//         subtitle: 'Eng ko\'p talab qilinadigan va yuqori baholanadigan kurslarimiz',
//         detailsButton: 'Batafsil',
//         allCoursesButton: 'Barcha kurslar'
//       },
//       testimonials: {
//         title: 'O\'quvchilar fikrlari',
//         subtitle: 'Bizning o\'quvchilarimiz nima deyishadi'
//       },
//       cta: {
//         title: 'Karyerangizni bugun boshlang',
//         description: 'Zamonaviy dasturlash ko\'nikmalarini o\'rganing va IT sohasida muvaffaqiyatga erishing',
//         button: 'Ro\'yxatdan o\'tish'
//       }
//     },
//     // Boshqa tarjimalar...
//   },
//   en: {
//     nav: {
//       home: 'Home',
//       achievements: 'Achievements',
//       students: 'Students',
//       courses: 'Courses',
//       blog: 'Blog',
//       schedule: 'Schedule',
//       qa: 'Q&A'
//     },
//     // Ingliz tilidagi tarjimalar...
//   },
//   ru: {
//     nav: {
//       home: 'Главная',
//       achievements: 'Достижения',
//       students: 'Студенты',
//       courses: 'Курсы',
//       blog: 'Блог',
//       schedule: 'Расписание',
//       qa: 'Вопросы'
//     },
//     // Rus tilidagi tarjimalar...
//   }
// }

// const i18n = createI18n({
//   legacy: false,
//   locale: localStorage.getItem('language') || 'uz',
//   fallbackLocale: 'uz',
//   messages
// })

// const app = createApp(App)

// app.use(router)
// app.use(store)
// app.use(i18n)

// app.mount('#app')




import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import './assets/main.css'

// Tarjimalar
const messages = {
  uz: {
    // Tarjimalar...
  },
  en: {
    // Tarjimalar...
  },
  ru: {
    // Tarjimalar...
  }
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'uz',
  fallbackLocale: 'uz',
  messages
})

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(i18n)

app.mount('#app')