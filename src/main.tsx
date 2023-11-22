import React from 'react'
import ReactDOM from 'react-dom/client'
import { CaptionCarousel } from './App'

const elem = document.getElementById('root')
if (elem) {
	ReactDOM.createRoot(elem).render(
		<React.StrictMode>
			<CaptionCarousel />
		</React.StrictMode>,
	)
}
