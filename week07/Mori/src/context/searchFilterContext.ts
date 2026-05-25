import { createContext, type RefObject } from 'react'

export type SearchFilterCtx = {
  searchQuery: string
  setSearchQuery: (next: string) => void
  searchInputRef: RefObject<HTMLInputElement | null>
  focusHeaderSearch: () => void
}

export const SearchFilterContext = createContext<SearchFilterCtx | null>(null)
