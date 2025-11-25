<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from "../stores/products";

const router = useRouter()
const store = useProductStore()

const error = ref(null)
const isLoading = ref(false)

const fileInput = ref(null)
const previewImage = ref(null)

const form = reactive({
  title: "",
  category: "",
  price: null,
  stock: null,
  description: "",
  image: null
})

// Pick file dialog
const pickImage = () => {
  fileInput.value.click()
}

// On file select
const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.image = file
    previewImage.value = URL.createObjectURL(file)
  }
}

// Handle drag & drop
const onDrop = (event) => {
  const file = event.dataTransfer.files[0]
  if (file) {
    form.image = file
    previewImage.value = URL.createObjectURL(file)
  }
}

const submitForm = async () => {
  isLoading.value = true
  error.value = ""

  const added = await store.addProduct(form)

  if (added) {
    router.push("/products")
  } else {
    error.value = "Failed to save product."
  }

  isLoading.value = false
}
</script>


<template>
  <div class="min-h-screen flex justify-center pt-16 bg-gray-50">

    <div class="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">

      <h1 class="text-2xl font-semibold mb-6 text-gray-800">
        Add New Product
      </h1>

      <!-- Error -->
      <div v-if="error" class="text-red-600 mb-4">
        {{ error }}
      </div>

      <!-- Media Upload Box -->

      <!-- Form -->
      <form @submit.prevent="submitForm" class="space-y-5 mt-8">

        <!-- Name -->
        <div>
          <label class="block mb-1 text-gray-700 font-medium">Name</label>
          <input v-model="form.title"
            type="text"
            class="w-full px-4 py-2 border rounded-lg"
            placeholder="Product name"
            required
          />
        </div>

        <!-- Category Dropdown -->
        <div>
          <label class="block mb-1 text-gray-700 font-medium">Category</label>
          <select
            v-model="form.category"
            class="w-full px-4 py-2 border rounded-lg bg-white"
            required
          >
            <option disabled value="">Select Category</option>
            <option>Electronics</option>
            <option>Home Appliances</option>
            <option>Clothing</option>
            <option>Beauty</option>
            <option>Food</option>
          </select>
        </div>

        <!-- Price -->
        <div>
          <label class="block mb-1 text-gray-700 font-medium">Price</label>
          <input v-model.number="form.price"
            type="number"
            class="w-full px-4 py-2 border rounded-lg"
            placeholder="e.g 1200"
            required
          />
        </div>

        <!-- Stock -->
        <div>
          <label class="block mb-1 text-gray-700 font-medium">Stock</label>
          <input v-model.number="form.stock"
            type="number"
            class="w-full px-4 py-2 border rounded-lg"
            placeholder="e.g 40"
            required
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block mb-1 text-gray-700 font-medium">Description</label>
          <textarea
            v-model="form.description"
            class="w-full px-4 py-2 border rounded-lg"
            placeholder="Product description..."
            rows="4"
          ></textarea>
        </div>

        <div
        class="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:bg-gray-100 transition"
        @click="pickImage"
        @dragover.prevent
        @drop.prevent="onDrop"
      >
        <input ref="fileInput" type="file" class="hidden" @change="onFileChange" />
        
        <div v-if="!previewImage">
          <p class="text-gray-600">
            <span class="font-medium">Click to upload</span> or drag & drop
          </p>
          <p class="text-gray-400 text-sm mt-1">
            SVG, PNG, JPG, GIF (Max 5MB)
          </p>
        </div>

        <div v-else class="flex justify-center">
          <img :src="previewImage" class="h-32 rounded-lg shadow" />
        </div>
      </div>

        <!-- Bottom Buttons -->
        <div class="flex gap-4 mt-6">
          <button
            type="button"
            @click="router.push('/products')"
            class="px-4 py-2 rounded-lg border text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            :disabled="isLoading"
            class="px-4 py-2 rounded-lg bg-primary text-white hover:bg-blue-900 transition"
          >
            <span v-if="!isLoading">Save Product</span>
            <span v-else>Saving...</span>
          </button>
        </div>

      </form>
    </div>
  </div>
</template>



