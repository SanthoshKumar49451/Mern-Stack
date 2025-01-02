
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextprovider from './context/Shopcontext.jsx'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ShopContextprovider>
  <App />
  </ShopContextprovider>
  </BrowserRouter>,
)