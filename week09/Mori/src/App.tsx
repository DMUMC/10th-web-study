import CartPage from './pages/CartPage'
import Header from './components/Header'
import Modal from './components/Modal'

function App() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <CartPage />
      <Modal />
    </div>
  )
}

export default App
