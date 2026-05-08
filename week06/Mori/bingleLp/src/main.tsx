import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/900.css'
import '@fontsource/noto-sans-kr/400.css'
import '@fontsource/noto-sans-kr/700.css'
import '@fontsource/noto-sans-kr/900.css'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
