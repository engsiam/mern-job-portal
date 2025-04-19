import type { StateCreator } from "zustand"
import type { StoreState } from "."

export interface Application {
  id: string
  jobId: string
  status: "applied" | "interview" | "rejected" | "offer"
  date: string
}

export interface JobSeekerProfile {
  skills: string[]
  education: {
    degree: string
    institution: string
    year: string
  }[]
  experience: {
    title: string
    company: string
    duration: string
    description: string
  }[]
  resume: string | null
  profileCompleteness: number
}

export interface JobSeekerSlice {
  applications: Application[]
  savedJobs: string[]
  profile: JobSeekerProfile
  fetchApplications: () => Promise<void>
  fetchSavedJobs: () => Promise<void>
  applyToJob: (jobId: string) => Promise<void>
  withdrawApplication: (applicationId: string) => Promise<void>
  saveJob: (jobId: string) => Promise<void>
  unsaveJob: (jobId: string) => void
  updateProfile: (profile: Partial<JobSeekerProfile>) => Promise<void>
}

export const createJobSeekerSlice: StateCreator<StoreState, [], [], JobSeekerSlice> = (set, get) => ({
  applications: [],
  savedJobs: [],
  profile: {
    skills: ["UI/UX Design", "Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Wireframing", "HTML/CSS"],
    education: [
      {
        degree: "Bachelor of Design",
        institution: "Design University",
        year: "2018",
      },
    ],
    experience: [
      {
        title: "UI/UX Designer",
        company: "DesignCo",
        duration: "2018-2021",
        description: "Designed user interfaces for web and mobile applications.",
      },
      {
        title: "Senior UI/UX Designer",
        company: "TechCorp",
        duration: "2021-Present",
        description: "Lead designer for enterprise software products.",
      },
    ],
    resume: "John_Doe_Resume.pdf",
    profileCompleteness: 85,
  },

  fetchApplications: async () => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock data
      const applications: Application[] = [
        {
          id: "app1",
          jobId: "job1",
          status: "applied",
          date: "2023-04-10",
        },
        {
          id: "app2",
          jobId: "job2",
          status: "interview",
          date: "2023-04-05",
        },
        {
          id: "app3",
          jobId: "job3",
          status: "rejected",
          date: "2023-03-28",
        },
        {
          id: "app4",
          jobId: "job4",
          status: "offer",
          date: "2023-03-15",
        },
      ]

      set({ applications })
    } catch (error) {
      console.error("Failed to fetch applications:", error)
      throw error
    }
  },

  fetchSavedJobs: async () => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock data
      const savedJobs = ["job5", "job6", "job7"]
      set({ savedJobs })
    } catch (error) {
      console.error("Failed to fetch saved jobs:", error)
      throw error
    }
  },

  applyToJob: async (jobId) => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newApplication: Application = {
        id: Math.random().toString(36).substring(2, 9),
        jobId,
        status: "applied",
        date: new Date().toISOString().split("T")[0],
      }

      set((state) => ({
        applications: [...state.applications, newApplication],
      }))
    } catch (error) {
      console.error("Failed to apply to job:", error)
      throw error
    }
  },

  withdrawApplication: async (applicationId) => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      set((state) => ({
        applications: state.applications.filter((app) => app.id !== applicationId),
      }))
    } catch (error) {
      console.error("Failed to withdraw application:", error)
      throw error
    }
  },

  saveJob: async (jobId) => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      set((state) => ({
        savedJobs: [...state.savedJobs, jobId],
      }))
    } catch (error) {
      console.error("Failed to save job:", error)
      throw error
    }
  },

  unsaveJob: (jobId) => {
    set((state) => ({
      savedJobs: state.savedJobs.filter((id) => id !== jobId),
    }))
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
