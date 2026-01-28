import { createRootRoute, createRoute, createRouter, RouterProvider,Outlet } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { GetProducts } from './screens/Products/components/GetProducts'
import { CartDisplay } from './screens/Carts/CartDisplay'

const queryClient = new QueryClient()

const rootRoute = createRootRoute({
  component: Layout,
})

function Layout() {
  return (
    <div>
      <nav className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">FakeStore</h1>
        <div className="space-x-4">
          <a href="/" className="hover:underline">Products</a>
          <a href="/cart" className="hover:underline">Cart</a>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: GetProducts,
})

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartDisplay,
})

const routeTree = rootRoute.addChildren([indexRoute, cartRoute])
const router = createRouter({ routeTree })

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  )
}