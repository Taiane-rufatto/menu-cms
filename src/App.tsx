import { Navigate, Route, Routes } from "react-router-dom"
import { AppLayout } from "./components/layout/app-layout"
import { CategoryPage } from "./pages/categories/category-page"
import { ProductPage } from "./pages/products/product-page"
import { SpotPage } from "./pages/spots/spot-page"

function App() {

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/categories" />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="spots" element={<SpotPage />} />
      </Route>
    </Routes>
  )
}

export default App
