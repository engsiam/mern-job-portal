import type { StateCreator } from "zustand"
import type { StoreState } from "."

export type UserRole = "job-seeker" | "employer" | null

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export interface UserSlice {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>
  updateProfile: (userData: Partial<User>) => Promise<void>
}

export const createUserSlice: StateCreator<StoreState, [], [], UserSlice> = (set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true })

    try {
      // In a real app, this would be an API call
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data based on email
      const isEmployer = email.includes("employer") || email.includes("recruiter")
      const user: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: isEmployer ? "Acme Corporation" : "John Doe",
        email,
        role: isEmployer ? "employer" : "job-seeker",
        avatar: isEmployer
          ? "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=96&h=96&q=80&crop=entropy&cs=tinysrgb&fit=crop"
          : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      }

      set({ user, isAuthenticated: true, isLoading: false })
    } catch (error) {
      console.error("Login failed:", error)
      set({ isLoading: false })
      throw new Error("Login failed. Please check your credentials.")
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false })
  },

  signup: async (name, email, password, role) => {
    set({ isLoading: true })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user: User = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role,
        avatar:
          role === "employer"
            ? "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=96&h=96&q=80&crop=entropy&cs=tinysrgb&fit=crop"
            : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      }

      set({ user, isAuthenticated: true, isLoading: false })
    } catch (error) {
      console.error("Signup failed:", error)
      set({ isLoading: false })
      throw new Error("Signup failed. Please try again.")
    }
  },

  updateProfile: async (userData) => {
    set({ isLoading: true })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const currentUser = get().user
      if (!currentUser) throw new Error("Not authenticated")

      const updatedUser = { ...currentUser, ...userData }
      set({ user: updatedUser, isLoading: false })
    } catch (error) {
      console.error("Profile update failed:", error)
      set({ isLoading: false })
      throw new Error("Profile update failed. Please try again.")
    }
  },
})
