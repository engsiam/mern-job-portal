import { create } from "zustand"
import { persist } from "zustand/middleware"
import { createUserSlice, type UserSlice } from "./userSlice"
import { createJobSeekerSlice, type JobSeekerSlice } from "./jobSeekerSlice"
import { createEmployerSlice, type EmployerSlice } from "./employerSlice"

export type StoreState = UserSlice & JobSeekerSlice & EmployerSlice

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createUserSlice(...a),
      ...createJobSeekerSlice(...a),
      ...createEmployerSlice(...a),
    }),
    {
      name: "job-portal-storage",
    },
  ),
)
