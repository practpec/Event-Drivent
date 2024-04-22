import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import WebSocketComponent from './productosPagados.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <WebSocketComponent />
  </>
)
