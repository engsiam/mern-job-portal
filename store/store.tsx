import { create } from "zustand"
import { persist } from "zustand/middleware"
import { createUserSlice, type UserSlice } from "@/lib/store/userSlice"
import { createJobSeekerSlice, type JobSeekerSlice } from "@/lib/store/jobSeekerSlice"
import { createEmployerSlice, type EmployerSlice } from "@/lib/store/employerSlice"
import { createSettingsSlice, type SettingsSlice } from "@/lib/store/settingsSlice"

export type StoreState = UserSlice & JobSeekerSlice & EmployerSlice & SettingsSlice

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createUserSlice(...a),
      ...createJobSeekerSlice(...a),
      ...createEmployerSlice(...a),
      ...createSettingsSlice(...a),
    }),
    {
      name: "job-portal-storage",
    },
  ),
)
