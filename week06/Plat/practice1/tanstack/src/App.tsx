import './App.css'
import { WelcomeData } from './components/UserDataDisplay'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient();
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WelcomeData />
      </QueryClientProvider>
    </>
  )
}

export default App
