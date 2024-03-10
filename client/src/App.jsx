import { useState } from 'react'
import './App.css'
import ImageUpload from './components/ImageUpload'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container mt-4'>
      <h4 className='display-4 text-center mb-4'>Image Upload</h4>
      <ImageUpload/>

    </div>
  )
}

export default App
