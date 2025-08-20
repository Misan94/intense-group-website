import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'For Talent': [
      { name: 'Join us', href: '#careers' },
      { name: 'Culture', href: '#culture' },
      { name: 'Benefits', href: '#benefits' },
    ],
    'For Brands': [
      { name: 'See how', href: '#brands' },
      { name: 'Case Studies', href: '#case-studies' },
      { name: 'Pricing', href: '#pricing' },
    ],
    'For Partners': [
      { name: 'Partner with us', href: '#partners' },
      { name: 'Supplier Network', href: '#suppliers' },
      { name: 'Quality Standards', href: '#quality' },
    ],
  }

  return (
    <footer id="contact" className="bg-brand-black text-white">
      <div className="section-padding py-16">
        <div className="container-max">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity duration-300">
                <Image
                  src="/logo.png"
                  alt="Intense Group"
                  width={80}
                  height={28}
                  className="h-7 w-auto object-contain"
                />
              </Link>
              <p className="text-gray-300 mb-6">
                We unite strategy, performance, creative, data, and MarTech to move brands forward across Africa and Europe.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">A decade of growth, creativity, data & AI</p>
                <p className="text-sm text-gray-400">Offices: London • Barcelona</p>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-dm-serif text-lg font-semibold mb-4">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>



          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-gray-400">
                © {currentYear} Intense Group. All rights Reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <Link href="#privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
