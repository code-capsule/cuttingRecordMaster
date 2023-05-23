import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { ReactComponent as CloseIcon } from './mic.svg'
import './index.less'

function App() {
  const [count, setCount] = useState<number>(0)
  return (
    <div className="App">
      <h1>Home</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <CloseIcon />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
