<template>
  <tr class="border-b hover:bg-gray-50 cursor-pointer"
   @click="$emit('view', product.id)">
    
    <!-- Product -->
    <td class="px-6 py-4">
      <div class="flex items-center gap-3">
        <img :src="product.thumbnail" class="w-12 h-12 rounded-lg object-cover" />
        <div>
          <p class="font-medium text-gray-800">{{ product.title }}</p>
          <p class="text-gray-500 text-xs">
          {{ product.description.length > 100 
              ? product.description.substring(0, 100) + '…' 
              : product.description 
          }}
        </p>
        </div>
      </div>
    </td>

    <!-- Category -->
    <td class="px-6 py-4">
      <span class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
        {{ product.category }}
      </span>
    </td>

    <!-- Price -->
    <td class="px-6 py-4 text-gray-700">
      ${{ product.price }}
    </td>

    <!-- Stock -->
    <td class="px-6 py-4 flex items-center gap-2">
      <span
        class="w-2 h-2 rounded-full"
        :class="{
          'bg-green-500': product.stock > 40,
          'bg-yellow-500': product.stock > 0 && product.stock <= 40,
          'bg-red-500': product.stock === 0,
        }"
      ></span>

      <span class="text-gray-700">
        {{ product.stock > 0 ? product.stock + ' In Stock' : 'Out of Stock' }}
      </span>
    </td>

    <!-- Options -->
    <td class="px-6 py-4 text-right">
      <button @click="$emit('view', product.id)" class="text-gray-500">
        ⋮
      </button>
    </td>
  </tr>
</template>

<script setup>
defineProps({
  product: { type: Object, required: true }
});
</script>
