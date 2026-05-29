import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import Header from './components/Header'
import CartPage from './pages/CartPage'
import PurchaseListPage from './pages/PurchaseListPage'
import { store } from './store/store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-stone-50">
          <Header />
          <Routes>
            <Route path="/" element={<PurchaseListPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
