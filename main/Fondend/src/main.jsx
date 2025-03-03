
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GlobalState } from './State/provider.jsx'
import reducer, { initialstate } from './State/reducer.jsx'

createRoot(document.getElementById('root')).render(
  <GlobalState initialstate={initialstate} reducer={reducer} >
    <App />
  </GlobalState>


)
