'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

export type FilterState = {
  keyword: string
  sortBy_id: 1 | 2 | 3
  categoryId: number | null
  difficultyLevelId: number | null
  ratingId: number | null
  learnerAccessibilityType: 'free' | 'paid' | null
  durationId: number | null
}

export const defaultFilters: FilterState = {
  keyword: '',
  sortBy_id: 1,
  categoryId: null,
  difficultyLevelId: null,
  ratingId: null,
  learnerAccessibilityType: null,
  durationId: null,
}

type CourseFiltersContextValue = {
  filters: FilterState
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>
}

const CourseFiltersContext = createContext<CourseFiltersContextValue | null>(null)

export function CourseFiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  return (
    <CourseFiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </CourseFiltersContext.Provider>
  )
}

export function useCourseFilters() {
  const ctx = useContext(CourseFiltersContext)
  if (!ctx) throw new Error('useCourseFilters must be used within CourseFiltersProvider')
  return ctx
}
