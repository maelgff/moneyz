import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { App } from 'src/App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Wishlist } from './components/wishlist/Wishlist'

const queryClient = new QueryClient()

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/wishlist',
		element: <Wishlist />,
	},
])

const elem = document.getElementById('root')
if (elem) {
	ReactDOM.createRoot(elem).render(
		<React.StrictMode>
			<ChakraProvider>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</ChakraProvider>
		</React.StrictMode>,
	)
}
