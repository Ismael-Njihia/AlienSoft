<template>
  <div class="p-8">
    <button
      class="mb-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
      @click="$router.back()"
    >
      ← Back
    </button>

    <div v-if="isLoading" class="text-gray-600 text-lg">Loading...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>

    <div v-else class="bg-white shadow rounded-xl p-6">
      <h1 class="text-2xl font-semibold mb-4">{{ product.title }}</h1>

      <p class="text-gray-700 mb-2">
        <strong>Category:</strong> {{ product.category }}
      </p>
      <p class="text-gray-700 mb-2">
        <strong>Price:</strong> ${{ product.price }}
      </p>
      <p class="text-gray-700 mb-2">
        <strong>Stock:</strong> {{ product.stock }}
      </p>

      <p class="text-gray-600 mt-4">{{ product.description }}</p>
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
  } catch (err) {
    error.value = 'Failed to load product'
  } finally {
    isLoading.value = false
  }
})
</script>
