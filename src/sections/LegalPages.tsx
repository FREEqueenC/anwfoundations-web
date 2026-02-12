import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface LegalPageProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: LegalPageProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F7FA] pt-24 pb-16">
      <div ref={contentRef} className="max-w-3xl mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#7B3FF2] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to site
        </button>

        <h1 className="text-3xl font-bold text-[#0B0C10] mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none text-[#6B7280]">
          <p className="text-sm text-[#6B7280] mb-8">Last updated: February 9, 2025</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">1. Introduction</h2>
            <p>ANW Foundations LLC ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">2. Information We Collect</h2>
            <p>We collect the following types of information:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, billing address</li>
              <li><strong>Payment Information:</strong> Credit card details (processed securely through Stripe - we never store full card numbers)</li>
              <li><strong>Order Information:</strong> Products purchased, order history, preferences</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, cookies</li>
              <li><strong>Usage Data:</strong> How you interact with our website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Communicate about your orders and account</li>
              <li>Provide customer support</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website and products</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">4. Information Sharing</h2>
            <p>We share your information only with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Payment Processors:</strong> Stripe (for secure payment processing)</li>
              <li><strong>Shipping Partners:</strong> Suppliers and carriers (to fulfill orders)</li>
              <li><strong>Service Providers:</strong> Email, hosting, analytics providers</li>
              <li><strong>Legal Authorities:</strong> When required by law</li>
            </ul>
            <p className="mt-4">We do not sell your personal information to third parties.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">5. Data Security</h2>
            <p>We implement appropriate security measures including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>SSL/TLS encryption for all data transmission</li>
              <li>PCI DSS compliant payment processing through Stripe</li>
              <li>Regular security assessments</li>
              <li>Limited access to personal information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
              <li>Export your data</li>
            </ul>
            <p className="mt-4">To exercise these rights, contact us at privacy@anwfoundations.com</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">7. Cookies</h2>
            <p>We use cookies to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Keep you logged in</li>
              <li>Remember your preferences</li>
              <li>Analyze website traffic</li>
              <li>Improve user experience</li>
            </ul>
            <p className="mt-4">You can disable cookies in your browser settings, but this may affect website functionality.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">8. Children's Privacy</h2>
            <p>Our website is not intended for children under 13. We do not knowingly collect information from children under 13.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">10. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, contact us at:</p>
            <p className="mt-2">
              <strong>ANW Foundations LLC</strong><br />
              Email: privacy@anwfoundations.com<br />
              Address: [Your Business Address]
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export function TermsOfService({ onBack }: LegalPageProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F7FA] pt-24 pb-16">
      <div ref={contentRef} className="max-w-3xl mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#7B3FF2] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to site
        </button>

        <h1 className="text-3xl font-bold text-[#0B0C10] mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none text-[#6B7280]">
          <p className="text-sm text-[#6B7280] mb-8">Last updated: February 9, 2025</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">1. Agreement to Terms</h2>
            <p>By accessing or using the ANW Foundations LLC website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">2. Use of Our Services</h2>
            <p>You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Use our services in any way that violates applicable laws</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with other users' access to our services</li>
              <li>Use our services to transmit harmful code or malware</li>
              <li>Engage in fraudulent activities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">3. Account Registration</h2>
            <p>To make purchases, you may need to create an account. You agree to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">4. Products and Pricing</h2>
            <p>All product descriptions and prices are subject to change without notice. We reserve the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Modify or discontinue products without notice</li>
              <li>Limit quantities of any product</li>
              <li>Refuse service to anyone for any reason</li>
              <li>Correct pricing errors (we will notify you and give option to cancel)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">5. Orders and Payment</h2>
            <p>By placing an order, you:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Represent that you are authorized to use the payment method</li>
              <li>Agree to pay all charges at the prices in effect</li>
              <li>Authorize us to charge your payment method</li>
              <li>Understand that prices do not include applicable taxes or shipping</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">6. Shipping and Delivery</h2>
            <p>We use third-party suppliers who ship directly to you. Delivery times are estimates and not guaranteed. Risk of loss passes to you upon delivery to the carrier.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">7. Returns and Refunds</h2>
            <p>Our return policy:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Returns accepted within 30 days of delivery</li>
              <li>Items must be unused and in original packaging</li>
              <li>Customer pays return shipping unless item is defective</li>
              <li>Refunds processed within 5-7 business days of receipt</li>
              <li>Custom orders and perishables are final sale</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">8. Intellectual Property</h2>
            <p>All content on our website (text, graphics, logos, images, software) is the property of ANW Foundations LLC and is protected by copyright and trademark laws. You may not use our content without written permission.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">9. Disclaimer of Warranties</h2>
            <p>Our services are provided "as is" without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, timely, secure, or error-free.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">10. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, ANW Foundations LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability shall not exceed the amount you paid for the specific product or service.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">11. Indemnification</h2>
            <p>You agree to indemnify and hold harmless ANW Foundations LLC and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our services or violation of these Terms.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">12. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of [Your State], without regard to conflict of law principles.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">13. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of our services constitutes acceptance of the modified Terms.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">14. Contact Information</h2>
            <p>Questions about these Terms should be sent to:</p>
            <p className="mt-2">
              <strong>ANW Foundations LLC</strong><br />
              Email: legal@anwfoundations.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export function ShippingReturns({ onBack }: LegalPageProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F7FA] pt-24 pb-16">
      <div ref={contentRef} className="max-w-3xl mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#7B3FF2] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to site
        </button>

        <h1 className="text-3xl font-bold text-[#0B0C10] mb-8">Shipping & Returns</h1>
        
        <div className="prose prose-lg max-w-none text-[#6B7280]">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">Shipping Information</h2>
            
            <h3 className="text-lg font-medium text-[#0B0C10] mb-2">Processing Time</h3>
            <p>Orders are typically processed within 1-2 business days. During peak periods, processing may take up to 3 business days.</p>
            
            <h3 className="text-lg font-medium text-[#0B0C10] mb-2 mt-4">Shipping Methods & Timeframes</h3>
            <table className="w-full mt-4 border-collapse">
              <thead>
                <tr className="border-b border-[#0B0C10]/10">
                  <th className="text-left py-2 text-[#0B0C10]">Method</th>
                  <th className="text-left py-2 text-[#0B0C10]">Timeframe</th>
                  <th className="text-left py-2 text-[#0B0C10]">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#0B0C10]/5">
                  <td className="py-3">Standard Shipping</td>
                  <td className="py-3">5-7 business days</td>
                  <td className="py-3">Free over $200</td>
                </tr>
                <tr className="border-b border-[#0B0C10]/5">
                  <td className="py-3">Expedited Shipping</td>
                  <td className="py-3">3-5 business days</td>
                  <td className="py-3">$15</td>
                </tr>
                <tr>
                  <td className="py-3">Express Shipping</td>
                  <td className="py-3">2-3 business days</td>
                  <td className="py-3">$35</td>
                </tr>
              </tbody>
            </table>
            
            <h3 className="text-lg font-medium text-[#0B0C10] mb-2 mt-4">Shipping Restrictions</h3>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>We currently ship to the continental United States only</li>
              <li>PO boxes may not be accepted for large items</li>
              <li>Some remote areas may have extended delivery times</li>
            </ul>
            
            <h3 className="text-lg font-medium text-[#0B0C10] mb-2 mt-4">Tracking</h3>
            <p>You will receive a tracking number via email once your order ships. Please allow 24 hours for tracking information to update.</p>
            
            <h3 className="text-lg font-medium text-[#0B0C10] mb-2 mt-4">Lost or Damaged Packages</h3>
            <p>If your package is lost or arrives damaged:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Contact us within 48 hours of expected delivery</li>
              <li>For damaged items, include photos of the package and product</li>
              <li>We will file a claim with the carrier and send a replacement</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">Return Policy</h2>
            
            <h3 className="text-lg font-medium text-[#0B0C10] mb-2">Eligibility</h3>
            <p>We accept returns within 30 days of delivery for most items. To be eligible:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Item must be unused and in original condition</li>
              <li>Original packaging must be intact</li>
              <li>Proof of purchase (order number) required</li>
            </ul>
            
            <h3 className="text-lg font-medium text-[#0B0C10] mb-2 mt-4">Non-Returnable Items</h3>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Seeds and nutrients (perishable)</li>
              <li>Custom or special-order items</li>
              <li>Items marked as "Final Sale"</li>
              <li>Gift cards</li>
            </ul>
            
            <h3 className="text-lg font-medium text-[#0B0C10] mb-2 mt-4">Return Process</h3>
            <ol className="list-decimal pl-6 mt-2 space-y-2">
              <li>Email support@anwfoundations.com with your order number and reason for return</li>
              <li>We will provide a Return Authorization Number (RAN)</li>
              <li>Package the item securely in original packaging</li>
              <li>Include the RAN on the outside of the package</li>
              <li>Ship to the address provided (customer pays return shipping)</li>
              <li>Once received and inspected, refund will be processed within 5-7 business days</li>
            </ol>
            
            <h3 className="text-lg font-medium text-[#0B0C10] mb-2 mt-4">Refunds</h3>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Refunds are issued to the original payment method</li>
              <li>Original shipping costs are non-refundable</li>
              <li>Return shipping costs are the customer's responsibility unless item is defective</li>
              <li>Credit card refunds may take 5-10 business days to appear</li>
            </ul>
            
            <h3 className="text-lg font-medium text-[#0B0C10] mb-2 mt-4">Defective Items</h3>
            <p>If you receive a defective item:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Contact us within 48 hours of delivery</li>
              <li>Include photos of the defect</li>
              <li>We will send a prepaid return label</li>
              <li>Replacement shipped at no cost or full refund issued</li>
            </ul>
            
            <h3 className="text-lg font-medium text-[#0B0C10] mb-2 mt-4">Exchanges</h3>
            <p>We do not offer direct exchanges. To exchange an item:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Return the original item following the process above</li>
              <li>Place a new order for the desired item</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B0C10] mb-4">Contact Us</h2>
            <p>For shipping or return questions:</p>
            <p className="mt-2">
              Email: support@anwfoundations.com<br />
              Phone: [Your Phone Number]<br />
              Hours: Monday-Friday, 9am-5pm EST
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
