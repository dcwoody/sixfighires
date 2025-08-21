'use client';

import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setEmail('');
      } else {
        setMessage(data.message || 'Something went wrong');
      }
    } catch {
      setMessage('Something went wrong');
    }
  };

  return (
    <section className="py-20 bg-blue-50 text-center">
      <h2 className="text-2xl font-bold mb-4">Get the Latest Jobs Delivered to Your Inbox</h2>
      <p className="text-gray-700 mb-6">Subscribe to our newsletter for weekly updates on the best new job openings.</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row justify-center items-center gap-2 max-w-md mx-auto"
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
        />
        <Button type="submit" className="w-full sm:w-auto">Subscribe</Button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </section>
  );
};

export default NewsletterSignup;
