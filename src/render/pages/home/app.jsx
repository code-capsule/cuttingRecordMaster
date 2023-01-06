import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <h1>Home</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
