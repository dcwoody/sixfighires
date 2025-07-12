'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await supabase
      .from('subscribers')
      .insert([{ email }])

    setIsLoading(false)

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('Success! Thank you for subscribing.')
      setEmail('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Subscribe'}
        </button>
      </div>
      {message && (
        <p className={`mt-2 text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </form>
  )
}