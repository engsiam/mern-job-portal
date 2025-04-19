import type { StateCreator } from "zustand"
import type { StoreState } from "."

export interface SettingsSlice {
  theme: "light" | "dark" | "system"
  notifications: boolean
  emailAlerts: boolean
  setTheme: (theme: "light" | "dark" | "system") => void
  toggleNotifications: () => void
  toggleEmailAlerts: () => void
}

export const createSettingsSlice: StateCreator<StoreState, [], [], SettingsSlice> = (set) => ({
  theme: "system",
  notifications: true,
  emailAlerts: true,

  setTheme: (theme) => set({ theme }),
  toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
  toggleEmailAlerts: () => set((state) => ({ emailAlerts: !state.emailAlerts })),
})
