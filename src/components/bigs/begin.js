import React from 'react'
import { Link } from 'react-router-dom'

export default function Begin() {
  return (
    <div>
      <h1>Welcome to KisodO App</h1>
      <div>
        <button>
          <Link to="/signup">Sign up</Link>
        </button>
        <button>
          <Link to="/login">Login</Link>
        </button>
      </div>
    </div>
  )
}
