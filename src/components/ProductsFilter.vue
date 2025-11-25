<template>
  <div class="w-full bg-white rounded-2xl shadow p-4 flex items-center gap-4">

    <!-- Search Field -->
    <div class="flex items-center gap-2 flex-1 bg-gray-100 rounded-xl px-4 py-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
        />
      </svg>

      <input
        type="text"
        placeholder="Search by product name..."
        class="bg-transparent outline-none w-full text-sm"
        v-model="searchText"
        @input="emitSearch"
      />
    </div>

    <!-- Category Dropdown -->
    <select
      class="bg-gray-100 px-4 py-3 rounded-xl text-sm text-gray-700 outline-none cursor-pointer"
      v-model="category"
      @change="emitCategory"
    >
      <option value="All">Category</option>
      <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
    </select>

    <!-- Stock Status Dropdown -->
    <select
      class="bg-gray-100 px-4 py-3 rounded-xl text-sm text-gray-700 outline-none cursor-pointer"
      v-model="stock"
      @change="emitStock"
    >
      <option value="All">Stock Status</option>
      <option value="In Stock">In Stock</option>
      <option value="Low Stock">Low Stock</option>
      <option value="Out of Stock">Out of Stock</option>
    </select>

  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["search", "category", "stock"]);

// Local state
const searchText = ref("");
const category = ref("All");
const stock = ref("All");

const categories = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches"
];

// Emitters
const emitSearch = () => emit("search", searchText.value);
const emitCategory = () => emit("category", category.value);
const emitStock = () => emit("stock", stock.value);
</script>
