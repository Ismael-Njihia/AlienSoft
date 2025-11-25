<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const username = ref("");
const password = ref("");
const showPassword = ref(false);
const error = ref("");


const handleLogin = async ()=> {
    error.value = "";

    try {
        const success = await auth.login({
            username: username.value,
            password: password.value,
        })
        if (success) {
            router.push("/products");
        } else {
            error.value = "Invalid credentials. Please try again.";
        }
    } catch (err: any) {
        console.error("Login error:", err);
        error.value = err?.message || "An error occurred during login. Please try again later.";
    }
}

</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F4F4F7] px-4">
    <div class="w-full max-w-md text-center">

      <!-- Logo -->
      <div class="flex flex-col items-center mb-10">
        <div
          class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-md"
        >
          <span class="text-2xl">🟦</span>
        </div>
        <h1 class="mt-3 text-xl font-semibold text-primary">Platform Logo</h1>
      </div>

      <!-- Login Card -->
      <div class="bg-white p-10 rounded-2xl shadow-md border border-gray-100">
        <h2 class="text-2xl font-semibold mb-1">Welcome Back</h2>
        <p class="text-gray-500 mb-7">Sign in to manage your products.</p>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Username -->
          <div class="text-left">
            <label class="block mb-1 text-gray-700 text-sm font-medium">
              Email or Username
            </label>
            <input
              v-model="username"
              type="text"
              placeholder="you@example.com"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <!-- Password -->
          <div class="text-left">
            <label class="block mb-1 text-gray-700 text-sm font-medium">
              Password
            </label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                👁
              </button>
            </div>
          </div>

          <!-- Remember + Forgot -->
          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                class="rounded border-gray-400"
              />
              Remember me
            </label>

            <button type="button" class="text-primary hover:underline font-medium">
              Forgot Password?
            </button>
          </div>

          <!-- Login button -->
          <button
            type="submit"
            class="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-blue-900 transition"
          >
            Login
          </button>

          <p v-if="error" class="text-red-600 text-sm text-left mt-2">
            {{ error }}
          </p>
        </form>
      </div>

      <!-- Footer -->
      <p class="text-gray-500 text-sm mt-8">
        © 2024 Platform Inc. All Rights Reserved.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* primary color defined in Tailwind config (example: #000080) */
</style>
