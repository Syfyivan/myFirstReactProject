import React, {lazy, Suspense} from 'react'
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage'
import IndexPage from './pages/index/IndexPage'
// import NotFound from './pages/404/NotFound'
import HomePage from './pages/index/home/HomePage'
import UsersPage from './pages/index/users/UsersPage'
import RolesPage from './pages/index/roles/RolesPage'
import ProductsCategory from './pages/index/products/ProductsCategory'
import ProductsList from './pages/index/products/ProductsList'

const NotFound = lazy(() => import('./pages/404/NotFound'))

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
       <BrowserRouter>
        <Routes>
          {/* 重定向 */}
          <Route path='/' element={<Navigate to="/home"/>}></Route>

          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/' element={<IndexPage />}>
            <Route path = 'home' element={<HomePage />}></Route>
            <Route path = 'users' element={<UsersPage></UsersPage>}></Route>
            <Route path = 'roles' element={<RolesPage></RolesPage>}></Route>
            {/* <Route path='products' element={<ProductsPage />}></Route> */}
            <Route path='products/category' element={<ProductsCategory />}></Route>
            <Route path='products/list' element={<ProductsList />}></Route>
            {/* 这些都是同级路由，后面这两个斜线不是嵌套*/}
          </Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
    
  )
}

export default App
