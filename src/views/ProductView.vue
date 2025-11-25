<template>
  <div class="min-h-screen bg-gray-50">

    <!-- ======================= HEADER ======================= -->
    <header class="w-full bg-white shadow-sm px-8 py-4 flex items-center justify-between">
      
      <!-- Left: Title -->
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Product Management</h1>
        <p class="text-gray-500 text-sm mt-0.5">
          /products/{{ product.title }}
        </p>
      </div>

      <!-- Right: Search + Add + Notifications + Profile -->
      <div class="flex items-center gap-4">

        <!-- Search Input -->
        <div class="relative">
          <input
            type="text"
            placeholder="Search product..."
            class="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary w-64"
          />
          <span class="absolute left-3 top-2.5 text-gray-400">
            🔍
          </span>
        </div>

        <!-- Add Product -->
        <router-link :to="{ name: 'add-product' }">
          <button
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 shadow cursor-pointer"
          >
            + Add Product
          </button>
        </router-link>

        <!-- Notification Icon -->
        <button class="relative">
          <span class="material-symbols-outlined text-3xl text-gray-600 cursor-pointer hover:text-gray-800 transition">
            notifications
          </span>
          <span
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full"
          >
            3
          </span>
        </button>

        <!-- Profile -->
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          class="w-10 h-10 rounded-full border shadow-sm cursor-pointer"
        />
      </div>
    </header>

    <!-- ======================= PAGE BODY ======================= -->
    <div class="p-8">

      <!-- Back Button -->
      <button
        class="mb-6 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
        @click="$router.back()"
      >
        ← Back
      </button>

      <!-- Loading + Error -->
      <div v-if="isLoading" class="text-gray-600 text-lg">Loading...</div>
      <div v-else-if="error" class="text-red-600">{{ error }}</div>

      <!-- ======================= PRODUCT DETAILS ======================= -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow rounded-2xl p-8"
      >
        <!-- LEFT: Image -->
        <div class="flex items-center justify-center">
          <img
            :src="product.images ? product.images[0] : ''"
            alt="Product Image"
            class="rounded-xl shadow max-h-[500px] object-cover"
          />
        </div>

        <!-- RIGHT: Info -->
        <div>
          <h1 class="text-3xl font-bold mb-4 text-gray-900">
            {{ product.title }}
          </h1>

          <!-- Price + Category -->
          <div class="flex items-center gap-3 mb-4">
            <span class="text-2xl font-semibold text-gray-900">
              ${{ product.price }}
            </span>

            <span
              class="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium"
            >
              {{ product.category }}
            </span>
          </div>

          <!-- Stock -->
          <p class="mb-4">
            <span
              class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
            >In Stock</span>
            <span class="ml-2 text-gray-600">{{ product.stock }} units</span>
          </p>

          <!-- Description -->
          <h2 class="text-lg font-semibold mt-6 mb-2 text-gray-900">
            Description
          </h2>
          <p class="text-gray-600 leading-relaxed">
            {{ product.description }}
          </p>

          <!-- Edit Button -->
          <button
            class="mt-6 px-5 py-2 rounded-lg text-white bg-primary hover:bg-primary/90 transition font-medium shadow"
          >
            Edit Product
          </button>
        </div>
      </div>

      <!-- ======================= REVIEWS ======================= -->
      <div class="mt-12 bg-white rounded-2xl shadow p-8">
        <h2 class="text-xl font-semibold mb-4">Customer Reviews</h2>

        <div class="flex items-center gap-6">
          <div class="text-4xl font-bold">4.5</div>

          <div class="space-y-2 w-full">
            <div class="flex items-center">
              <span class="w-10 text-sm">5 ⭐</span>
              <div class="h-2 bg-gray-200 w-full rounded ml-2">
                <div class="h-full bg-primary rounded" style="width: 75%"></div>
              </div>
            </div>

            <div class="flex items-center">
              <span class="w-10 text-sm">4 ⭐</span>
              <div class="h-2 bg-gray-200 w-full rounded ml-2">
                <div class="h-full bg-primary rounded" style="width: 15%"></div>
              </div>
            </div>

            <div class="flex items-center">
              <span class="w-10 text-sm">3 ⭐</span>
              <div class="h-2 bg-gray-200 w-full rounded ml-2">
                <div class="h-full bg-primary rounded" style="width: 5%"></div>
              </div>
            </div>
          </div>
        </div>

        <p class="text-gray-500 text-sm mt-3">Based on 120 reviews</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()

const product = ref({})
const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await axios.get(`https://dummyjson.com/products/${route.params.id}`)
    product.value = res.data
    console.log(res.data)
  } catch (err) {
    error.value = 'Failed to load product'
  } finally {
    isLoading.value = false
  }
})
</script>
