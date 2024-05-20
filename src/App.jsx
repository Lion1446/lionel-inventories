import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Ingredients from './pages/Ingredients'
import ProductsPage from './pages/ProductsPage'
import SalesAndAuditPage from './pages/SalesAndAuditPage'
import InventoryPage from './pages/InventoryPage'
import MainLayout from './layouts/MainLayout';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient()
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Ingredients/>} />
          <Route path="products" element={<ProductsPage/>} />
          <Route path="sales-and-audit" element={<SalesAndAuditPage/>} />
          <Route path="inventory" element={<InventoryPage/>} />
        </Route>
      </Routes>
    </Router>
    </QueryClientProvider>
  )
}

export default App
