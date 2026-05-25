import { useState, type ReactNode } from 'react'
import { Header } from './Header'
import { AppSidebar } from './AppSidebar'
import { SearchFilterProvider } from '../context/SearchFilterProvider'

type AppChromeProps = {
  children: ReactNode
}

export function AppChrome({ children }: AppChromeProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function toggleSidebar() {
    setSidebarOpen((open) => !open)
  }

  return (
    <SearchFilterProvider>
      <div className="flex min-h-svh w-full flex-col bg-black font-sans font-normal antialiased">
        <Header
          menuOpen={sidebarOpen}
          onMenuToggle={toggleSidebar}
        />
        <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {children}
      </div>
    </SearchFilterProvider>
  )
}
