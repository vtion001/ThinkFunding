export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-navy text-center mb-8">About Think Funding</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 text-center mb-12">
            We are a small, disciplined, technology-enabled merchant cash advance company.
            Our goal is to provide fast, transparent funding to growing businesses.
          </p>

          <div className="bg-gray-50 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold text-navy mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To provide smart, disciplined merchant cash advances that help established 
              businesses access the capital they need to grow—all while maintaining strict 
              underwriting and risk discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-teal-light p-6 rounded-lg">
              <h3 className="text-xl font-bold text-navy mb-3">Our Approach</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Strict underwriting and risk discipline</li>
                <li>✓ Transparent terms, no hidden fees</li>
                <li>✓ Technology-enabled processes</li>
                <li>✓ Focus on established businesses</li>
              </ul>
            </div>
            <div className="bg-navy text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">What We Look For</h3>
              <ul className="space-y-2">
                <li>✓ 2+ years in business</li>
                <li>✓ $30K+ monthly revenue</li>
                <li>✓ Low NSF history</li>
                <li>✓ Stable cash flow</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-navy text-white font-semibold rounded-lg hover:bg-navy-dark transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
