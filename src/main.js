import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"
import { createI18n } from "vue-i18n"
// import "./assets/main.css"

// Tarjimalar
const messages = {
  uz: {
    nav: {
      home: "Bosh sahifa",
      achievements: "Yutuqlar",
      students: "O'quvchilar",
      courses: "Kurslar",
      blog: "Blog",
      schedule: "Jadval",
      qa: "Savol-javob",
      contact: "Bog'lanish",
    },
    home: {
      hero: {
        title: "Zamonaviy ta'lim, zamonaviy yondashuv",
        subtitle: "Dasturlash va web-dizayn bo'yicha professional ta'lim",
        coursesButton: "Kurslarni ko'rish",
        contactButton: "Bog'lanish",
      },
      about: {
        title: "Men haqimda",
        description:
          "Professional o'qituvchi va dasturchi sifatida 10 yildan ortiq tajribaga egaman. Mening maqsadim - o'quvchilarni zamonaviy texnologiyalar bilan tanishtirish va ularga amaliy ko'nikmalarni o'rgatish.",
        readMoreButton: "Ko'proq o'qish",
        stats: {
          yearsExperience: "yillik tajriba",
          studentsCount: "o'quvchilar",
          coursesCount: "kurslar",
          awardsCount: "mukofotlar",
        },
      },
      courses: {
        title: "Mashhur kurslar",
        subtitle: "Eng ko'p talab qilinadigan va yuqori baholanadigan kurslarimiz",
        detailsButton: "Batafsil",
        allCoursesButton: "Barcha kurslar",
      },
      testimonials: {
        title: "O'quvchilar fikrlari",
        subtitle: "Bizning o'quvchilarimiz nima deyishadi",
      },
      cta: {
        title: "Karyerangizni bugun boshlang",
        description: "Zamonaviy dasturlash ko'nikmalarini o'rganing va IT sohasida muvaffaqiyatga erishing",
        button: "Ro'yxatdan o'tish",
      },
    },
    schedule: {
      title: "Dars jadvali",
      subtitle: "Joriy va kelgusi darslar jadvali",
      currentTime: "Hozirgi vaqt",
      currentClass: "Joriy dars",
      noCurrentClass: "Hozirda dars yo'q",
      weeklySchedule: "Haftalik jadval",
      time: "Vaqt",
      upcomingClasses: "Kelgusi darslar",
      class: "Dars",
      consultation: "Konsultatsiya",
      addToCalendar: "Taqvimga qo'shish",
    },
    students: {
      title: "O'quvchilar",
      subtitle: "Mening eng yaxshi o'quvchilarim va ularning yutuqlari",
      successMap: {
        title: "Muvaffaqiyat xaritasi",
      },
      testimonials: {
        title: "O'quvchilar fikrlari",
      },
    },
    courses: {
      title: "Kurslar",
      subtitle: "Barcha mavjud kurslar va o'quv dasturlari",
      categories: {
        all: "Barchasi",
        programming: "Dasturlash",
        design: "Dizayn",
        frontend: "Frontend",
        backend: "Backend",
      },
      paid: "Pullik",
      free: "Bepul",
      viewButton: "Ko'rish",
      youtube: {
        title: "YouTube darslari",
        viewAllButton: "Barcha videolarni ko'rish",
      },
      downloads: {
        title: "Yuklab olish uchun materiallar",
        downloadButton: "Yuklab olish",
      },
    },
    blog: {
      title: "Blog",
      subtitle: "Eng so'nggi maqolalar va yangiliklar",
      featured: "Tavsiya etilgan",
      readMore: "Ko'proq o'qish",
      searchPlaceholder: "Maqolalarni qidirish...",
    },
    achievements: {
      title: "Yutuqlar",
      subtitle: "Mening professional yutuqlarim va sertifikatlarim",
      tabs: {
        certificates: "Sertifikatlar",
        courses: "O'tilgan kurslar",
        awards: "Mukofotlar",
      },
      verifyButton: "Tekshirish",
    },
  },
  en: {
    nav: {
      home: "Home",
      achievements: "Achievements",
      students: "Students",
      courses: "Courses",
      blog: "Blog",
      schedule: "Schedule",
      qa: "Q&A",
      contact: "Contact",
    },
    // You can expand English content as needed
  },
  ru: {
    nav: {
      home: "Главная",
      achievements: "Достижения",
      students: "Студенты",
      courses: "Курсы",
      blog: "Блог",
      schedule: "Расписание",
      qa: "Вопросы",
      contact: "Контакты",
    },
    // You can expand Russian content as needed
  },
}

// Tilni tekshirish
const supportedLanguages = ["uz", "en", "ru"]
const savedLang = localStorage.getItem("language")
const locale = supportedLanguages.includes(savedLang) ? savedLang : "uz"

// i18n sozlamasi
const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: "uz",
  messages,
})

// Vue ilovasini yaratish
const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(i18n)

app.mount("#app")
