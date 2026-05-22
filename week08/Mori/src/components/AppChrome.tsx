import type { ReactNode } from 'react'
import { Header } from './Header'
import { AppSidebar } from './AppSidebar'
import { SearchFilterProvider } from '../context/SearchFilterProvider'
import { useSidebar } from '../hooks/useSidebar'

type AppChromeProps = {
  children: ReactNode
}

export function AppChrome({ children }: AppChromeProps) {
  const { isOpen, close, toggle } = useSidebar()

  return (
    <SearchFilterProvider>
      <div className="flex min-h-svh w-full flex-col bg-black font-sans font-normal antialiased">
        <Header menuOpen={isOpen} onMenuToggle={toggle} />
        <AppSidebar open={isOpen} onClose={close} />
        {children}
      </div>
    </SearchFilterProvider>
  )
}
