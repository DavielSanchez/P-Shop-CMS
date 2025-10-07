import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Inventory from './pages/Inventory'
import Orders from './pages/Orders'
import Customers from './pages/Customers'
import Payments from './pages/Payments'
import Campaigns from './pages/Campaigns'
import Discounts from './pages/Discounts'
import Coupons from './pages/Coupons'
import Suppliers from './pages/Suppliers'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Users from './pages/Users'
import Layout from './components/Layout/MainLayout'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            {/* <Route path="products" element={<Products />} /> */}
            {/* <Route path="categories" element={<Categories />} /> */}
            {/* <Route path="inventory" element={<Inventory />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="payments" element={<Payments />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="discounts" element={<Discounts />} />
            <Route path="coupons" element={<Coupons />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<Users />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
