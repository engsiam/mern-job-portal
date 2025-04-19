/**
 * Utility functions for search functionality across the application
 */

/**
 * Performs a case-insensitive search across multiple fields of an object
 *
 * @param item The object to search within
 * @param searchTerm The term to search for
 * @param fields Array of field names to search in
 * @returns Boolean indicating if the search term was found
 */
export function searchInFields<T>(item: T, searchTerm: string, fields: (keyof T)[]): boolean {
  if (!searchTerm) return true

  const lowerSearchTerm = searchTerm.toLowerCase()

  return fields.some((field) => {
    const value = item[field]
    if (typeof value === "string") {
      return value.toLowerCase().includes(lowerSearchTerm)
    }
    return false
  })
}

/**
 * Updates URL search parameters
 *
 * @param currentParams Current URLSearchParams
 * @param updates Object with parameter updates (key-value pairs)
 * @returns New URLSearchParams object
 */
export function updateSearchParams(
  currentParams: URLSearchParams,
  updates: Record<string, string | null>,
): URLSearchParams {
  const params = new URLSearchParams(currentParams.toString())

  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === "") {
      params.delete(key)
    } else {
      params.set(key, value)
    }
  })

  return params
}

/**
 * Extracts search parameters from URL for components
 *
 * @param searchParams URLSearchParams object
 * @param defaultValues Default values for parameters
 * @returns Object with extracted parameters
 */
export function extractSearchParams<T extends Record<string, string>>(
  searchParams: URLSearchParams,
  defaultValues: T,
): T {
  const result = { ...defaultValues }

  Object.keys(defaultValues).forEach((key) => {
    const value = searchParams.get(key)
    if (value !== null) {
      result[key as keyof T] = value as T[keyof T]
    }
  })

  return result
}
