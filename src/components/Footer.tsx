const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Prime Life Insurance</h3>
          <p className="text-white/80 mb-4">
            Trusted partner in life insurance solutions for Rwandan families and businesses. Secure your future with confidence.
          </p>
          <p className="text-white/70">
            <strong>Head Office:</strong> KN 4 Ave, Kigali, Rwanda
          </p>
          <p className="text-white/70">
            <strong>Phone:</strong> <a href="tel:+250788123456" className="hover:text-secondary">+250 788 150 100</a>
          </p>
          <p className="text-white/70">
            <strong>Email:</strong> <a href="mailto:info@primelife.co.rw" className="hover:text-secondary">info@primelife.co.rw</a>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-white/80">
            <li><a href="#about" className="hover:text-secondary transition">About Us</a></li>
            <li><a href="#services" className="hover:text-secondary transition">Our Services</a></li>
            <li><a href="#contact" className="hover:text-secondary transition">Contact</a></li>
            <li><a href="#faq" className="hover:text-secondary transition">FAQs</a></li>
            <li><a href="#careers" className="hover:text-secondary transition">Careers</a></li>
          </ul>
        </div>

        {/* Newsletter / CTA */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Stay Informed</h4>
          <p className="text-white/80 mb-4">
            Subscribe to receive the latest updates and offers from Prime Life.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 rounded-md text-black"
            />
            <button
              type="submit"
              className="bg-secondary hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center text-white/60 text-sm">
        &copy; {new Date().getFullYear()} Prime Life Insurance Rwanda. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
