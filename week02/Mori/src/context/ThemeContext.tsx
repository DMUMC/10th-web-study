import { createContext } from 'react'

type ThemeContextValue = {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
