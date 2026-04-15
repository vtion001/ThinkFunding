import { useState } from 'react'

const faqs = [
  {
    question: 'What is a merchant cash advance?',
    answer: 'A merchant cash advance (MCA) is not a loan—it\'s a purchase of future receivables. We purchase a portion of your future sales at a discount, and you repay us through daily ACH payments based on your sales volume.',
  },
  {
    question: 'How quickly can I get funded?',
    answer: 'Once approved, many businesses receive funding within 24-48 hours. The speed depends on how quickly you provide the required documentation.',
  },
  {
    question: 'What documents do I need?',
    answer: 'Typically, we need: 3-6 months of bank statements, business formation documents, EIN verification, and owner identification. We\'ll provide a complete checklist once you start your application.',
  },
  {
    question: 'How does repayment work?',
    answer: 'Repayment is made through daily ACH payments, usually a fixed percentage of your daily sales. This means payments adjust automatically based on your business volume.',
  },
  {
    question: 'What happens if I can\'t make a payment?',
    answer: 'If you experience temporary cash flow issues, contact us immediately. We\'ll work with you to find a solution. Repeated missed payments may result in default proceedings.',
  },
  {
    question: 'Is my information secure?',
    answer: 'Yes. We take data security seriously. All information is encrypted, stored securely, and never shared without your explicit consent.',
  },
  {
    question: 'What\'s the difference between an MCA and a traditional loan?',
    answer: 'Unlike a traditional loan, an MCA is a purchase of future receivables, not a debt. This means there\'s no interest rate, and repayment is tied to your sales volume rather than a fixed payment schedule.',
  },
  {
    question: 'How do I apply?',
    answer: 'Click "Apply Now" and complete our simple online application. It takes about 10-15 minutes. We\'ll review your information and get back to you within 24 hours.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-navy text-center mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between"
              >
                <span className="font-medium text-navy">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-teal-light p-8 rounded-lg">
          <h2 className="text-xl font-bold text-navy mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Our team is here to help. Contact us for more information.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}
