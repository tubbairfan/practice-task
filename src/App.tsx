import { createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router'
import { GetProducts } from './screens/Products/components/GetProducts'

const rootRoute = createRootRoute()
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: GetProducts,
})
const routeTree = rootRoute.addChildren([indexRoute])
const router = createRouter({ routeTree })

export default function App() {
  return <RouterProvider router={router} />
}