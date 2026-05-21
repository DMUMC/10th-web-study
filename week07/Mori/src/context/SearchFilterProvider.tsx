import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchFilterContext } from './searchFilterContext'

export function SearchFilterProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement | null>(null)

  const focusHeaderSearch = useCallback(() => {
    const leavingCurrent = pathname !== '/'
    if (leavingCurrent) navigate('/')

    const applyFocus = () => {
      searchInputRef.current?.focus({ preventScroll: false })
    }

    if (leavingCurrent) window.setTimeout(applyFocus, 0)
    else applyFocus()
  }, [navigate, pathname])

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      searchInputRef,
      focusHeaderSearch,
    }),
    [searchQuery, focusHeaderSearch],
  )

  return (
    <SearchFilterContext.Provider value={value}>{children}</SearchFilterContext.Provider>
  )
}
