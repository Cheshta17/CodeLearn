import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Code2, Trophy, Users } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const Home = () => {
  const user = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()

  const handleGetStarted = () => {
    if (user.id) {
      navigate('/challenges')
    } else {
      navigate('/register')
    }
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Level Up Your Coding Skills
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Join thousands of developers mastering coding through interactive challenges, 
            real-time feedback, and competitive learning.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={handleGetStarted}
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              Get Started
            </button>
            <Link
              to="/challenges"
              className="text-sm font-semibold leading-6 text-gray-300 hover:text-white"
            >
              Browse Challenges <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything you need to excel
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Our platform provides all the tools and resources you need to become a better programmer.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-white">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to start your coding journey?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Join our community of developers and start improving your coding skills today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/signup"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="text-sm font-semibold leading-6 text-gray-300 hover:text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link to="/about" className="text-gray-400 hover:text-gray-300">
              About
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-gray-300">
              Privacy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-gray-300">
              Terms
            </Link>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-sm leading-5 text-gray-400">
              &copy; {new Date().getFullYear()} CodeLearn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    name: 'Interactive Challenges',
    description:
      'Practice with hands-on coding challenges that test your skills and provide immediate feedback.',
    icon: Code2,
  },
  {
    name: 'Competitive Learning',
    description:
      'Compete with other developers, earn points, and climb the leaderboard as you improve.',
    icon: Trophy,
  },
  {
    name: 'Community Driven',
    description:
      'Join a community of developers, share solutions, and learn from others.',
    icon: Users,
  },
]

export default Home


