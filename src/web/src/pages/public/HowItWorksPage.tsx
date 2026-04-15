export default function HowItWorksPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-navy text-center mb-8">How It Works</h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Getting funded with Think Funding is simple. Here's our four-step process.
        </p>

        <div className="space-y-12">
          {[
            {
              step: 1,
              title: 'Apply',
              description: 'Complete our simple online application. We\'ll ask for basic information about your business, including time in operation, revenue, and how you\'d like to use the funds.',
              details: ['Business information', 'Owner details', 'Requested amount', 'Use of funds'],
            },
            {
              step: 2,
              title: 'Review',
              description: 'Our team reviews your application and analyzes your bank statements. We look at your business health, cash flow patterns, and ability to repay.',
              details: ['Bank statement analysis', 'Business health review', 'Underwriting decision'],
            },
            {
              step: 3,
              title: 'Fund',
              description: 'Once approved, funds are deposited directly into your business account. No lengthy waiting periods or complicated procedures.',
              details: ['Same-day funding available', 'Direct deposit to your account', 'Flexible amounts based on your needs'],
            },
            {
              step: 4,
              title: 'Repay',
              description: 'Repayment is made through daily ACH payments based on your business\'s cash flow. Small, manageable payments that won\'t strain your operations.',
              details: ['Daily ACH payments', 'Flexible payment schedule', 'No hidden fees'],
            },
          ].map((item) => (
            <div key={item.step} className="flex flex-col md:flex-row items-start">
              <div className="flex-shrink-0 w-20 h-20 bg-navy rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 md:mb-0 md:mr-8">
                {item.step}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-navy mb-4">{item.title}</h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.details.map((detail, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="text-teal mr-2">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/merchant/register"
            className="inline-block px-8 py-4 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-colors text-lg"
          >
            Start Your Application
          </a>
        </div>
      </div>
    </div>
  )
}
