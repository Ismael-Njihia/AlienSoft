// src/stores/auth.ts
import { defineStore } from 'pinia'
import api from '../plugins/axios'

interface LoginPayload {
  username: string
  password: string
}

interface User {
  id: number
  username: string
  [key: string]: any
}

interface AuthState {
  token: string | null
  user: User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'), 
    user: JSON.parse(localStorage.getItem('user') || 'null'),
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async login(payload: { username: string; password: string }): Promise<boolean> {
      try {
        const res = await api.post("/auth/login", payload);
        
        // Save token and user properly
        this.token = res.data.token || res.data.accessToken; // <- fallback to accessToken
        this.user = res.data;
        
        // Persist manually (optional if using pinia-persistedstate)
        localStorage.setItem("token", this.token!);
        localStorage.setItem("user", JSON.stringify(this.user));
        
        return true;
      } catch (err: any) {
        console.error("Login failed", err);
        return false;
      }
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  }
})
