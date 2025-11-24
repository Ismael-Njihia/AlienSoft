// src/stores/product.ts
import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

// Define a Product interface
export interface Product {
  id?: number
  title: string
  description: string
  category: string
  price: number
  stock: number
  thumbnail: string
  rating?: number
  discountPercentage?: number
}

interface ProductState {
  products: Product[]
  isLoading: boolean
  error: string | null
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchProducts(): Promise<void> {
      this.isLoading = true
      const auth = useAuthStore()
      try {
        const res = await axios.get<{ products: Product[] }>('https://dummyjson.com/products', {
          headers: { 'Authorization': `Bearer ${auth.token}` }
        })
        this.products = res.data.products
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
    async fetchProductById(id: number): Promise<Product | undefined> {
      const auth = useAuthStore()
      try {
        const res = await axios.get<Product>(`https://dummyjson.com/products/${id}`, {
          headers: { 'Authorization': `Bearer ${auth.token}` }
        })
        return res.data
      } catch (err: any) {
        this.error = err.message
      }
    },
    async addProduct(product: Product): Promise<Product | undefined> {
      const auth = useAuthStore()
      try {
        const res = await axios.post<Product>('https://dummyjson.com/products/add', product, {
          headers: { 'Authorization': `Bearer ${auth.token}` }
        })
        this.products.push(res.data)
        return res.data
      } catch (err: any) {
        this.error = err.message
      }
    },
    async deleteProduct(id: number): Promise<void> {
      const auth = useAuthStore()
      try {
        await axios.delete(`https://dummyjson.com/products/${id}`, {
          headers: { 'Authorization': `Bearer ${auth.token}` }
        })
        this.products = this.products.filter(p => p.id !== id)
      } catch (err: any) {
        this.error = err.message
      }
    }
  }
})
