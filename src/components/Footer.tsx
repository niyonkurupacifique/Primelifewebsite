'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

const Footer = () => {
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Get current location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Use OpenStreetMap Nominatim for reverse geocoding (free service)
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
            );
            const data = await response.json();

            if (data && data.display_name) {
              // Extract a more readable address
              const address = data.display_name;
              setLocation(address);
            } else {
              // Fallback to coordinates if address not found
              const locationString = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
              setLocation(locationString);
            }
          } catch (error) {
            console.error("Error getting address:", error);
            // Fallback to coordinates if geocoding fails
            const locationString = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            setLocation(locationString);
          } finally {
            setIsGettingLocation(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsGettingLocation(false);
          // Set default location if geolocation fails
          setLocation("Kigali, Rwanda");
        }
      );
    } else {
      // Set default location if geolocation not supported
      setLocation("Kigali, Rwanda");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: '' });

    // Validation
    if (!contact) {
      setSubmitStatus({ type: 'error', message: 'Please enter your phone number or email' });
      return;
    }

    // Validate phone number (Rwanda format)
    const phoneRegex = /^(\+?25)?(078|079|072|073)\d{7}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phoneRegex.test(contact) && !emailRegex.test(contact)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid phone number (078/079/072/073) or email address' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://apps.prime.rw/customerbackend/api/prime-life-subscriber/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: location || "Kigali, Rwanda",
          contact: contact,
          language: "en"
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Welcome to Prime Life! Your subscription has been confirmed. We will contact you shortly.'
        });
        // Reset form
        setContact("");
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Subscription failed. Please try again.'
        });
      }
    } catch (error: any) {
      console.error('Subscription error:', error);
      setSubmitStatus({ type: 'error', message: 'Unable to subscribe. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Company Info */}
        <div className=" space-y-2 ">
          <h3 className="text-2xl font-bold mb-4">Prime Life Insurance</h3>
          {/* <p className="text-white/80 mb-4">
            Trusted partner in life insurance solutions for Rwandan families and businesses. Secure your future with confidence.
          </p> */}
          <p className="text-white/70 flex">
            <div><svg fill="currentColor" width="20" height="20" viewBox="0 0 14 14" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M 7,13 C 7,13 11.2,7.519596 11.2,5.2 11.2,2.8804041 9.3195958,1 7,1 4.680404,1 2.8,2.8804041 2.8,5.2 2.8,7.519596 7,13 7,13 Z"/></svg></div> <div> <span className=" pr-3"> </span> KN 4 Ave, Kigali, Rwanda</div> 
          </p>
          <p className="text-white/70 flex">
           
             <div><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5.13641 12.764L8.15456 9.08664C8.46255 8.69065 8.61655 8.49264 8.69726 8.27058C8.76867 8.07409 8.79821 7.86484 8.784 7.65625C8.76793 7.42053 8.67477 7.18763 8.48846 6.72184L7.77776 4.9451C7.50204 4.25579 7.36417 3.91113 7.12635 3.68522C6.91678 3.48615 6.65417 3.35188 6.37009 3.29854C6.0477 3.238 5.68758 3.32804 4.96733 3.5081L3 4C3 14 9.99969 21 20 21L20.4916 19.0324C20.6717 18.3121 20.7617 17.952 20.7012 17.6296C20.6478 17.3456 20.5136 17.0829 20.3145 16.8734C20.0886 16.6355 19.7439 16.4977 19.0546 16.222L17.4691 15.5877C16.9377 15.3752 16.672 15.2689 16.4071 15.2608C16.1729 15.2536 15.9404 15.3013 15.728 15.4001C15.4877 15.512 15.2854 15.7143 14.8807 16.119L11.8274 19.1733M12.9997 7C13.9765 7.19057 14.8741 7.66826 15.5778 8.37194C16.2815 9.07561 16.7592 9.97326 16.9497 10.95M12.9997 3C15.029 3.22544 16.9213 4.13417 18.366 5.57701C19.8106 7.01984 20.7217 8.91101 20.9497 10.94" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></div> <div><span className=" pr-3"> </span>  0788150100,Toll-free 1320</div> 
          </p>
            <p className="text-white/70 flex">
           
             <div><svg fill="currentColor" width="20" height="20" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
    <path d="M1920 428.266v1189.54l-464.16-580.146-88.203 70.585 468.679 585.904H83.684l468.679-585.904-88.202-70.585L0 1617.805V428.265l959.944 832.441L1920 428.266ZM1919.932 226v52.627l-959.943 832.44L.045 278.628V226h1919.887Z" fill-rule="evenodd"/>
</svg></div> <div> <span className=" pr-3"></span> info@prime.rw</div> 
          </p>
         
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-white/80">
            <li><Link href="/whoweare" className="hover:text-secondary transition">About Us</Link></li>
            <li><Link href="/allproducts" className="hover:text-secondary transition">Our Services</Link></li>
            <li><Link href="/contactus" className="hover:text-secondary transition">Contact</Link></li>
            <li><Link href="/faq" className="hover:text-secondary transition">FAQs</Link></li>
            <li><Link href="/careers" className="hover:text-secondary transition">Careers</Link></li>
          </ul>
        </div>

        {/* Follow Us / Social Media */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
          <ul className="space-y-2 text-white/80">
            <li>
              <a
                href="https://www.linkedin.com/company/prime-insurance-limited"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-secondary transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 412 412" fill="currentColor">
                  <path d="M206 0C92.2 0 0 92.2 0 206s92.2 206 206 206 206-92.2 206-206S319.8 0 206 0zm-55 305.6h-45.2V159.5H151v146.1zm-22.8-165.3c-14.8 0-26.7-12.1-26.7-27s12-27 26.7-27c14.8 0 26.7 12.1 26.7 27 .1 15-11.9 27-26.7 27zm192.3 165.3h-45v-76.7c0-21-8-32.8-24.6-32.8-18.1 0-27.6 12.2-27.6 32.8v76.7H180V159.5h43.4v19.7s13-24.1 44-24.1 53.2 18.9 53.2 58.1c-.1 39-.1 92.4-.1 92.4z"></path>
                </svg>
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/prime.rwanda"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-secondary transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 412 412" fill="currentColor">
                  <path d="M206 0C92.2 0 0 92.2 0 206s92.2 206 206 206 206-92.2 206-206S319.8 0 206 0zm61 121.2h-28.8c-10.2 0-12.3 4.2-12.3 14.7v25.4H267l-4 44.6h-37.1v133.2h-53.2V206.4H145v-45.2h27.7v-35.6c0-33.4 17.8-50.8 57.4-50.8h36.8l.1 46.4z"></path>
                </svg>
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://x.com/primeins_ltd?s=11"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-secondary transition"
              >
                <svg className=" " xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50" fill="currentColor">
                  <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
                </svg>
                (Twitter)
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/prime_insuranceltd?igsh=bmhjMmVpbm1oajBh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-secondary transition"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor" />
                  <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="currentColor" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="currentColor" />
                </svg>
                Instagram
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter / CTA */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Stay Informed</h4>
          <p className="text-white/80 mb-4">
            Subscribe to receive the latest updates and offers from Prime Life.
          </p>

          {/* Success/Error Messages */}
          {submitStatus.type === 'success' && (
            <div className="mb-3 p-2 bg-green-500/20 border border-green-500 text-green-100 rounded-md text-sm">
              ✓ {submitStatus.message}
            </div>
          )}
          {submitStatus.type === 'error' && (
            <div className="mb-3 p-2 bg-red-500/20 border border-red-500 text-red-100 rounded-md text-sm">
              ✗ {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Phone (078...) or Email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-4 py-2 rounded-md text-black"
              disabled={isSubmitting}
            />
            {/* {isGettingLocation && (
              <p className="text-white/60 text-xs">📍 Getting your location...</p>
            )}
            {location && (
              <p className="text-white/60 text-xs">📍 Location: {location.substring(0, 50)}...</p>
            )} */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-secondary hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
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
