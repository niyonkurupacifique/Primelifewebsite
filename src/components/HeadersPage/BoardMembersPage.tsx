'use client';

import React from 'react'
import Header from "../Header"
import Footer from "../Footer"
import BoardMembers from "../BoardMembers"
import Team from '../Team'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import HeroBoardsOfDirectors from '../HeroBoardsOfDirectors'

const BoardMembersPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-in-out'
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="relative">
        {/* Board Members Section */}
         <section className="relative" data-aos="fade-up">
          <HeroBoardsOfDirectors />
        </section>
        <section className="relative" data-aos="fade-up">
          <Team />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default BoardMembersPage 