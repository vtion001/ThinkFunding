import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy to-navy-light text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Smarter Funding for Growing Businesses
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              Fast, disciplined merchant cash advances that help established businesses
              access the capital they need.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/merchant/register"
                className="w-full sm:w-auto px-8 py-4 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-colors text-lg"
              >
                Get Started
              </Link>
              <Link
                to="/how-it-works"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-navy transition-colors text-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Value Props Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-navy mb-12">
            Why Choose Think Funding
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Fast Decisions',
                description: 'Decisions in as little as 24 hours',
              },
              {
                icon: '📋',
                title: 'Transparent Terms',
                description: 'No hidden fees or surprise charges',
              },
              {
                icon: '🛡️',
                title: 'Trusted Partner',
                description: "We're here when you need us",
              },
              {
                icon: '🤝',
                title: 'Simple Process',
                description: 'Four easy steps to funding',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-teal-light rounded-xl flex items-center justify-center mx-auto mb-4 text-3xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-navy mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Apply', description: 'Complete our simple online application' },
              { step: 2, title: 'Review', description: 'We review your application and bank statements' },
              { step: 3, title: 'Fund', description: 'Funds deposited directly into your account' },
              { step: 4, title: 'Repay', description: 'Daily ACH payments based on your schedule' },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-center">
                  <div className="w-20 h-20 bg-navy rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-navy mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {item.step < 4 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-teal"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-navy mb-12">
            Are You Eligible?
          </h2>
          <div className="bg-teal-light border-l-4 border-teal p-8 rounded-r-lg">
            <ul className="space-y-4">
              {[
                '2+ Years in Business',
                '$30,000+ Monthly Revenue',
                'Low NSF History (fewer than 3 per month)',
                'Active Bank Account',
                'U.S.-Based Business',
              ].map((item, index) => (
                <li key={index} className="flex items-center text-lg text-gray-800">
                  <span className="text-teal mr-3 text-xl">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center mt-10">
            <Link
              to="/merchant/register"
              className="inline-block px-8 py-4 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-colors text-lg"
            >
              Check Your Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-navy mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              'What is a merchant cash advance?',
              'How quickly can I get funded?',
              'What documents do I need?',
              'How does repayment work?',
              'What happens if I can\'t make a payment?',
            ].map((question, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-navy">{question}</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/faq" className="text-teal hover:text-teal-dark font-medium">
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-navy to-navy-light text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-200 mb-10">
            Apply now and get a decision in as little as 24 hours
          </p>
          <Link
            to="/merchant/register"
            className="inline-block px-10 py-4 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-colors text-lg"
          >
            Start Your Application
          </Link>
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-300">
            <span>🔒 Secure & Confidential</span>
            <span>⚡ Quick & Easy</span>
            <span>✓ No Obligation</span>
          </div>
        </div>
      </section>
    </div>
  )
}
