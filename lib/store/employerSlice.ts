import type { StateCreator } from "zustand"
import type { StoreState } from "."

export interface Candidate {
  id: string
  jobId: string
  candidateName: string
  status: "new" | "reviewing" | "interview" | "shortlisted" | "rejected"
  date: string
}

export interface EmployerProfile {
  companyName: string
  industry: string
  companySize: string
  founded: string
  website: string
  location: string
  description: string
  logo?: string
}

export interface EmployerSlice {
  postedJobs: string[]
  candidates: Candidate[]
  profile: EmployerProfile
  fetchPostedJobs: () => Promise<void>
  fetchCandidates: () => Promise<void>
  postJob: (jobData: any) => Promise<string>
  closeJob: (jobId: string) => Promise<void>
  updateCandidateStatus: (candidateId: string, status: Candidate["status"]) => Promise<void>
  updateProfile: (profile: Partial<EmployerProfile>) => Promise<void>
}

export const createEmployerSlice: StateCreator<StoreState, [], [], EmployerSlice> = (set, get) => ({
  postedJobs: [],
  candidates: [],
  profile: {
    companyName: "Acme Corporation",
    industry: "Technology",
    companySize: "501-1000 employees",
    founded: "2010",
    website: "www.acmecorp.com",
    location: "San Francisco, CA",
    description:
      "Acme Corporation is a leading technology company specializing in innovative software solutions for businesses of all sizes. With a focus on user experience and cutting-edge technology, we help our clients transform their operations and achieve their goals.",
  },

  fetchPostedJobs: async () => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock data
      const postedJobs = ["job1", "job2", "job3", "job4"]
      set({ postedJobs })
    } catch (error) {
      console.error("Failed to fetch posted jobs:", error)
      throw error
    }
  },

  fetchCandidates: async () => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock data
      const candidates: Candidate[] = [
        {
          id: "cand1",
          jobId: "job1",
          candidateName: "Alice Johnson",
          status: "new",
          date: "2023-04-10",
        },
        {
          id: "cand2",
          jobId: "job1",
          candidateName: "Bob Smith",
          status: "reviewing",
          date: "2023-04-09",
        },
        {
          id: "cand3",
          jobId: "job2",
          candidateName: "Charlie Brown",
          status: "interview",
          date: "2023-04-08",
        },
        {
          id: "cand4",
          jobId: "job2",
          candidateName: "Diana Prince",
          status: "rejected",
          date: "2023-04-07",
        },
        {
          id: "cand5",
          jobId: "job3",
          candidateName: "Edward Norton",
          status: "shortlisted",
          date: "2023-04-06",
        },
      ]

      set({ candidates })
    } catch (error) {
      console.error("Failed to fetch candidates:", error)
      throw error
    }
  },

  postJob: async (jobData) => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const jobId = `job${Math.floor(Math.random() * 1000)}`

      set((state) => ({
        postedJobs: [...state.postedJobs, jobId],
      }))

      return jobId
    } catch (error) {
      console.error("Failed to post job:", error)
      throw error
    }
  },

  closeJob: async (jobId) => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      set((state) => ({
        postedJobs: state.postedJobs.filter((id) => id !== jobId),
      }))
    } catch (error) {
      console.error("Failed to close job:", error)
      throw error
    }
  },

  updateCandidateStatus: async (candidateId, status) => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      set((state) => ({
        candidates: state.candidates.map((candidate) =>
          candidate.id === candidateId ? { ...candidate, status } : candidate,
        ),
      }))
    } catch (error) {
      console.error("Failed to update candidate status:", error)
      throw error
    }
  },

  updateProfile: async (profile) => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      set((state) => ({
        profile: {
          ...state.profile,
          ...profile,
        },
      }))
    } catch (error) {
      console.error("Failed to update profile:", error)
      throw error
    }
  },
})
