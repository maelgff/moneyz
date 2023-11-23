import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { App } from 'src/App'

const queryClient = new QueryClient()

const elem = document.getElementById('root')
if (elem) {
	ReactDOM.createRoot(elem).render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</React.StrictMode>,
	)
}
