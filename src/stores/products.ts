
import { defineStore } from 'pinia'
import api from '../plugins/axios'


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
        this.isLoading = true;

        const skip = (this.page - 1) * this.limit;

        try {
          const res = await api.get(`/products?limit=${this.limit}&skip=${skip}`);

          this.products = res.data.products;
          this.total = res.data.total;
        } catch (err: any) {
          this.error = err.message;
        } finally {
          this.isLoading = false;
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
      try {
        const res = await api.get<Product>(`/products/${id}`);
        return res.data;
      } catch (err: any) {
        this.error = err.message;
      }
    },
    async addProduct(product: Product): Promise<Product | undefined> {
      try {
        const res = await api.post<Product>('/products/add', product);

        this.products.unshift(res.data); // Add to top of list
        return res.data;

      } catch (err: any) {
        this.error = err.response?.data?.message || err.message;
      }
    },
    async deleteProduct(id: number): Promise<void> {
      try {
        await api.delete(`/products/${id}`);
        this.products = this.products.filter(p => p.id !== id);
      } catch (err: any) {
        this.error = err.message;
      }
    }
  }
})
