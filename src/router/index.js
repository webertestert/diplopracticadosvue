import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CursosList from '@/views/cursos/CursosList.vue'
import EstudiantesList from '@/views/estudiantes/EstudiantesList.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/cursos',
    name: 'cursos',
    component: CursosList
  },
  {
    path: '/estudiantes',
    name: 'estudiantes',
    component: EstudiantesList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
