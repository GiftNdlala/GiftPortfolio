import { useState } from 'react'
import { submitContactForm } from '../lib/portfolioApi'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await submitContactForm(formData)
      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('Error submitting form:', err)
      setError('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="container mx-auto p-8 bg-black text-white min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-400 rounded-lg p-8">
            <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">Message Sent!</h1>
            <p className="text-green-700 dark:text-green-300 mb-6">Thank you for reaching out. I'll get back to you soon!</p>
            <button
              onClick={() => setSuccess(false)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="container mx-auto p-8 bg-black text-white min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-green-500 dark:text-green-400">Get In Touch</h1>
        <p className="text-gray-600 dark:text-gray-200 mb-8">
          I'm always interested in hearing about new opportunities and exciting projects. 
          Feel free to reach out if you'd like to collaborate or just want to say hello!
        </p>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 border border-green-700/20 dark:border-green-400/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-400 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="What's this about?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Tell me about your project or just say hello..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending...
                </div>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
        {/* Alternative Contact Methods */}
        <div className="mt-12 bg-gray-50 dark:bg-white/10 rounded-lg p-8">
          <h2 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">Other Ways to Connect</h2>
          <p className="text-gray-700 dark:text-gray-200">You can also reach me via social media or email:</p>
          <ul className="mt-4 space-y-2">
            <li><span className="font-semibold text-green-600 dark:text-green-400">Email:</span> <a href="mailto:giftndlala@gmail.com" className="text-green-500 hover:underline">giftndlala@gmail.com</a></li>
            <li><span className="font-semibold text-green-600 dark:text-green-400">LinkedIn:</span> <a href="https://linkedin.com/in/giftndlala" className="text-green-500 hover:underline">linkedin.com/in/giftndlala</a></li>
            <li><span className="font-semibold text-green-600 dark:text-green-400">GitHub:</span> <a href="https://github.com/giftndlala" className="text-green-500 hover:underline">github.com/giftndlala</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
