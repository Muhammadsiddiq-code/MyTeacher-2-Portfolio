import { createRouter, createWebHistory } from "vue-router"


const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Homeview.vue"),
  },
  {
    path: "/achievements",
    name: "achievements",
    component: () => import("../views/AchievementsView.vue"),
  },
  {
    path: "/students",
    name: "students",
    component: () => import("../views/StudentsView.vue"),
  },
  {
    path: "/courses",
    name: "courses",
    component: () => import("../views/CoursesView.vue"),
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("../views/BlogView.vue"),
  },
  {
    path: "/schedule",
    name: "schedule",
    component: () => import("../views/ScheduleView.vue"),
  },
  {
    path: "/qa",
    name: "qa",
    component: () => import("../views/QAView.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/ContactView.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
