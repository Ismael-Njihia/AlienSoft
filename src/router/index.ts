import { createRouter, createWebHistory } from "vue-router";
import login from "../views/LoginView.vue";
import products from "../views/ProductsView.vue";
import product from "../views/ProductView.vue";
import addNewProduct from "../views/AddProductView.vue";

import { useAuthStore } from '../stores/auth'


const routes =[
    {
        path: '/login',
        name: 'login',
        component: login
    }, 
    {
        path:'/',
        redirect: '/products'
    },
    {
        path: '/products',
        name: 'products',
        component: products,
        meta: { requiresAuth: true }
    },
    {
        path: '/products/new',
        name: 'add-product',
        component: addNewProduct,
        meta: { requiresAuth: true }
    },
    {
        path: '/products/:id',
        name: 'view-product',
        component: product,
        meta: { requiresAuth: true }
    }

]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ---- Route Guards ----
router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return '/login'
  }

  if (to.name === 'login' && auth.isAuthenticated) {
    return '/products'
  }
})