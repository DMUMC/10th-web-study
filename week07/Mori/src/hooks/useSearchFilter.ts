import { useContext } from 'react'
import { SearchFilterContext, type SearchFilterCtx } from '../context/searchFilterContext'

export function useSearchFilter(): SearchFilterCtx {
  const ctx = useContext(SearchFilterContext)
  if (!ctx) {
    throw new Error('useSearchFilter must be used within SearchFilterProvider')
  }
  return ctx
}
