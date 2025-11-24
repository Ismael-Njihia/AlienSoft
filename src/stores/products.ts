
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
  state: () => ({
    products: [] as Product[],
    page: 1,
    limit: 4,
    total: 0,
    isLoading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchProducts(): Promise<void> {
        this.isLoading = true
        const auth = useAuthStore()

        const skip = (this.page - 1) * this.limit

        try {
          const res = await axios.get(
            `https://dummyjson.com/products?limit=${this.limit}&skip=${skip}`,
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          )

          this.products = res.data.products
          this.total = res.data.total // dummyjson gives total count
        } catch (err: any) {
          this.error = err.message
        } finally {
          this.isLoading = false
        }
      },

      nextPage() {
        if (this.page * this.limit < this.total) {
          this.page++
          this.fetchProducts()
        }
      },

      prevPage() {
        if (this.page > 1) {
          this.page--
          this.fetchProducts()
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
