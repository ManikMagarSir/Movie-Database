import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Clapperboard } from 'lucide-react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-cinema-800 border border-cinema-700/50 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cinema-gold focus:border-transparent motion-safe:transition-shadow motion-safe:duration-200"

  return (
    <section className="max-w-md mx-auto px-4 py-20" aria-label="Login form">
      <div className="text-center mb-8">
        <Clapperboard className="w-10 h-10 text-cinema-gold mx-auto mb-3" />
        <h2 className="text-3xl font-heading text-cinema-gold tracking-tight">Welcome Back</h2>
        <p className="text-gray-500 mt-2">Sign in to your CineVault account</p>
      </div>

      {error && (
        <div className="bg-cinema-red/10 border border-cinema-red/30 rounded-xl p-4 mb-6 text-cinema-red-light text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
          <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} required />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
          <input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} required />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cinema-gold text-black py-3 rounded-xl font-semibold hover:bg-cinema-gold-light motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinema-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cinema-900 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="text-center text-gray-500 mt-6 text-sm">
        Don't have an account?{' '}
        <Link to="/register" className="text-cinema-gold hover:text-cinema-gold-light">Sign up</Link>
      </p>
    </section>
  )
}

export default Login
