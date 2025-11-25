<script setup>
import { computed, onMounted, ref } from "vue";
import { useProductStore } from "../stores/products";
import ProductsFilter from "../components/ProductsFilter.vue";
import ProductRow from "../components/ProductRow.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useProductStore();

const search = ref("");
const category = ref("All");
const stock = ref("All");

// const products = ref([]);
// const currentPage = ref(1);
// const pageSize = 4;

// Fetch products from API
onMounted(() => {
  store.fetchProducts();
});

console.log(store.products);

const currentPage = computed(() => store.page)
const totalPages = computed(() => Math.ceil(store.total / store.limit))

function nextPage() {
  store.nextPage()
}

function prevPage() {
  store.prevPage()
}

function goToPage(page) {
  store.page = page
  store.fetchProducts()
}


  const filteredList = computed(() => {
    return store.products
      // Search filter
      .filter(p =>
        p.title.toLowerCase().includes(search.value.toLowerCase())
      )

      // Category filter
      .filter(p =>
        category.value === "All" ? true : p.category === category.value
      )

      // Stock filter
      .filter(p => {
        if (stock.value === "All") return true;
        if (stock.value === "In Stock") return p.stock > 0;
        if (stock.value === "Low Stock") return p.stock > 0 && p.stock < 20;
        if (stock.value === "Out of Stock") return p.stock === 0;
      });
  });

    const onSearch = val => {
    search.value = val
    }

    const onCategoryFilter = val => {
    category.value = val
    }

    const onStockFilter = val => {
    stock.value = val
    }

const goToAddProduct = () => {
  router.push("/products/new");
};

const viewProduct = id => {
  router.push(`/products/${id}`);
};
</script>

<template>
  <div class="flex h-screen">

    <!-- ========== LEFT SIDEBAR (20%) ========== -->
    <div class="w-[20%] bg-white shadow-xl border-r flex flex-col justify-between p-6">

      <!-- TOP SECTION -->
      <div>
        <!-- CIRCLE LOGO -->
        <div class="flex justify-center mb-8">
          <div class="w-28 h-28 bg-yellow-900 text-white rounded-full flex items-center justify-center text-center text-lg font-semibold">
            E-commerce<br />Admin Panel
          </div>
        </div>

        <!-- NAVIGATION MENU -->
        <nav class="space-y-4 text-gray-700">
          <div class="flex items-center gap-3 cursor-pointer hover:text-blue-800 transition">
            <span class="material-icons">dashboard</span>
            <span>Dashboard</span>
          </div>

          <div class="flex items-center gap-3 cursor-pointer hover:text-blue-800 transition">
            <span class="material-icons">inventory_2</span>
            <span>Products</span>
          </div>

          <div class="flex items-center gap-3 cursor-pointer hover:text-blue-800 transition">
            <span class="material-icons">shopping_cart</span>
            <span>Orders</span>
          </div>

          <div class="flex items-center gap-3 cursor-pointer hover:text-blue-800 transition">
            <span class="material-icons">group</span>
            <span>Customers</span>
          </div>
        </nav>
      </div>

      <!-- BOTTOM SECTION -->
      <div class="space-y-4">
        <div class="flex items-center gap-3 cursor-pointer hover:text-blue-800 transition">
          <span class="material-icons">settings</span>
          <span>Settings</span>
        </div>

        <button class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
          Logout
        </button>
      </div>
    </div>


    <!-- ========== RIGHT CONTENT AREA (80%) ========== -->
    <div class="w-[80%] overflow-y-auto p-8 bg-gray-50">

      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-semibold text-gray-800">Products</h1>
          <p class="text-gray-500 text-sm">
            Manage your inventory and view product performance.
          </p>
        </div>

        <button
          @click="goToAddProduct"
          class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition flex items-center gap-2"
        >
          <span>＋</span>
          Add New Product
        </button>
      </div>

      <!-- Filters -->
      <ProductsFilter
        @search="onSearch"
        @category="onCategoryFilter"
        @stock="onStockFilter"
      />

      <!-- Table -->
      <div class="bg-white rounded-xl shadow overflow-hidden mt-6">
        <table class="w-full">
          <thead class="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th class="px-6 py-3 text-left">Product</th>
              <th class="px-6 py-3 text-left">Category</th>
              <th class="px-6 py-3 text-left">Price</th>
              <th class="px-6 py-3 text-left">Stock</th>
              <th class="px-6 py-3"></th>
            </tr>
          </thead>

          <tbody>
            <ProductRow
              v-for="product in filteredList"
              :key="product.id"
              :product="product"
              @view="viewProduct"
            />
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
    <div class="flex justify-center items-center gap-4 mt-6">

    <!-- Prev Button -->
    <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 border rounded disabled:opacity-50"
    >
        ←
    </button>

    <!-- Page Indicator -->
    <span class="font-medium">
         {{ currentPage }} 
    </span>

    <!-- Next Button -->
    <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 border rounded disabled:opacity-50"
    >
         →
    </button>

</div>

  </div>

  </div>
</template>

