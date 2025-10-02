'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true // only animate once on scroll
    });
  }, []);

  return null;
}
