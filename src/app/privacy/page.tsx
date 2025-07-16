export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Privacy Policy
          </h1>
          
          <div className="text-gray-700 space-y-6">
            <p className="text-lg">
              <strong>Effective Date:</strong> December 2024
            </p>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                When you use "When to Sex," we collect the following information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal information about you and your partner (names, ages, relationship details)</li>
                <li>Quiz responses and preferences</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Generate personalized quiz results and love notes</li>
                <li>Process payments for premium features</li>
                <li>Improve our service and user experience</li>
                <li>Send you service-related communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Data Security</h2>
              <p className="mb-4">
                We take data security seriously:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All data is encrypted in transit and at rest</li>
                <li>We use secure cloud infrastructure</li>
                <li>Payment processing is handled by Stripe (PCI compliant)</li>
                <li>Access to your data is strictly limited to necessary personnel</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Sharing</h2>
              <p className="mb-4">
                We do not sell or share your personal information with third parties, except:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With your explicit consent</li>
                <li>To process payments through Stripe</li>
                <li>To comply with legal requirements</li>
                <li>To protect our rights and safety</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. AI and Data Processing</h2>
              <p className="mb-4">
                We use OpenAI's GPT-4 to generate personalized love notes. Your data is:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processed by OpenAI to generate your personalized content</li>
                <li>Not used by OpenAI to train their models</li>
                <li>Handled according to OpenAI's privacy policy</li>
                <li>Not stored permanently by OpenAI</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
              <p className="mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your data</li>
                <li>Opt-out of communications</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Cookies and Tracking</h2>
              <p className="mb-4">
                We use minimal cookies and tracking:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Session cookies for app functionality</li>
                <li>Analytics cookies to improve our service</li>
                <li>No third-party advertising cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Data Retention</h2>
              <p>
                We retain your data only as long as necessary to provide our services or as required by law. 
                Quiz data and love notes are stored for up to 30 days unless you request deletion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Children's Privacy</h2>
              <p>
                Our service is not intended for individuals under 18 years of age. We do not knowingly 
                collect personal information from children under 18.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes 
                by posting the new policy on this page and updating the effective date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Us</h2>
              <p className="mb-4">
                If you have questions about this privacy policy, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> privacy@whentosex.com</p>
                <p><strong>Mail:</strong> 199 Biotechnologies, Privacy Officer</p>
              </div>
            </section>
          </div>

          <div className="mt-12 text-center">
            <a 
              href="/"
              className="inline-block bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors duration-200"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}