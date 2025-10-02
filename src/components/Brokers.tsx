'use client';

import HeroBrokers from "./HeroBrokers";
import Header from "./Header"
import Footer from "./Footer"

import { useEffect, useMemo, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import AOS from 'aos'
import 'aos/dist/aos.css'

const BrokersComponents = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-in-out'
    })
  }, [])

  const [query, setQuery] = useState('')
  const [agents, setAgents] = useState<{ id: number; name: string; phone: string; email: string; year: string; quarter: string }[]>([])

  const API_BASE_URL = 'http://10.10.1.17:1338'

  const fetchAgents = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/brokers`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      const items = Array.isArray(json?.data) ? json.data : []
      const mapped = items.map((item: any) => ({
        id: item.id,
        name: item.BrokerName,
        phone: item.Phone,
        email: item.Email,
        year: item.Year,
        quarter: (item.Quarter || '').toUpperCase().trim()
      }))
      setAgents(mapped)
      const first = items[0]
      console.log(first)
    } catch (e) {
      console.error('Failed to load sales agents', e)
      setAgents([])
    }
  }

  useEffect(() => {
    fetchAgents()
  }, [])

  useEffect(() => {
    let socket: Socket | null = null
    try {
      socket = io(API_BASE_URL, { transports: ['websocket'] })
      const onChange = () => fetchAgents()
      socket.on('connect', () => {
        // connected
      })
      socket.on('Broker_created', onChange)
      socket.on('Broker_updated', onChange)
      socket.on('Broker_deleted', onChange)
    } catch (e) {
      console.error('Socket connection failed', e)
    }
    return () => {
      if (socket) {
        socket.off('Broker_created')
        socket.off('Broker_updated')
        socket.off('Broker_deleted')
        socket.disconnect()
      }
    }
  }, [])

  const normalized = (value: string) => value.toLowerCase().trim()

  const filteredAgents = useMemo(() => {
    const q = normalized(query)
    if (!q) return agents
    return agents.filter(a =>
      normalized(a.name).includes(q) ||
      normalized(a.phone).includes(q) ||
      normalized(a.email).includes(q)
    )
  }, [agents, query])

  const quarterLabel = (q: string | undefined) => {
    switch (q) {
      case 'Q1':
        return 'QUARTER ONE (Q I)'
      case 'Q2':
        return 'QUARTER TWO (Q II)'
      case 'Q3':
        return 'QUARTER THREE (Q III)'
      case 'Q4':
        return 'QUARTER FOUR (Q IV)'
      default:
        return ''
    }
  }

  const headerText = useMemo(() => {
    const now = new Date()
    const yearStr = String(now.getFullYear())
    const monthIndex = now.getMonth() // 0..11
    const quarterCode = ['Q1','Q2','Q3','Q4'][Math.floor(monthIndex / 3)]
    return `PRIME LIFE QUALIFIED BROKERS ${quarterLabel(quarterCode)} / ${yearStr}.`
  }, [])

  

  return (
    <div className="min-h-screen">
      <Header />
      <main className="relative">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary via-primary to-primary">
          <HeroBrokers/>
        </section>

        {/* Sales Agents Section */}
        <section className="relative py-12 sm:py-16 lg:py-20" data-aos="fade-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Find a Brokers</h2>
              <p className="mt-1 text-gray-600 text-sm sm:text-base">{headerText}</p>
            </div>

            <div className="mb-6 flex items-center gap-3">
              <div className="relative w-full sm:w-96">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, region, phone, or email"
                  className="w-full rounded-lg border border-gray-300  px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400  focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label="Search sales agents"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.1-5.4a6.75 6.75 0 11-13.5 0 6.75 6.75 0 0113.5 0z" />
                </svg>
              </div>
            </div>

            {/* Desktop/tablet view */}
            <div className="relative overflow-x-auto rounded-xl shadow-sm   ring-1 ring-[#16a0db]  hidden md:block">
              <table className="w-full border-separate border-spacing-0 text-sm">
                <thead className="bg-[#16a0db] sticky top-0 z-10">
                  <tr>
                    <th scope="col" className="py-3.5 px-6 text-left text-xs font-semibold tracking-wide uppercase text-gray-700">Agent Name</th>
                    <th scope="col" className="py-3.5 px-6 text-left text-xs font-semibold tracking-wide uppercase text-gray-700">Phone</th>
                    <th scope="col" className="py-3.5 px-6 text-left text-xs font-semibold tracking-wide uppercase text-gray-700">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAgents.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-sm">No agents match your search.</td>
                    </tr>
                  ) : (
                    filteredAgents.map((agent) => (
                      <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-gray-900 font-medium">{agent.name}</td>
                        <td className="px-6 py-4 text-gray-700">
                          <a href={`tel:${agent.phone.replace(/\s+/g,'')}`} className="text-gray-700 hover:text-gray-900">{agent.phone}</a>
                        </td>
                        <td className="px-6 py-4">
                          <a href={`mailto:${agent.email}`} className="text-primary hover:underline">{agent.email}</a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile view: cards */}
            <div className="md:hidden space-y-3">
              {filteredAgents.length === 0 ? (
                <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-500 text-center">No agents match your search.</div>
              ) : (
                filteredAgents.map((agent) => (
                  <div key={agent.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-base font-semibold text-gray-900">{agent.name}</div>
                        
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-2">
                      <a href={`tel:${agent.phone.replace(/\s+/g,'')}`} className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a1.5 1.5 0 001.5-1.5v-2.1a1.5 1.5 0 00-1.3-1.49l-3.18-.53a1.5 1.5 0 00-1.23.36l-.9.75a12.03 12.03 0 01-5.32-5.32l.75-.9a1.5 1.5 0 00.36-1.23l-.53-3.18A1.5 1.5 0 006.6 3.75H4.5A1.5 1.5 0 003 5.25v1.5z"/></svg>
                        {agent.phone}
                      </a>
                      <a href={`mailto:${agent.email}`} className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        {agent.email}
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}

export default BrokersComponents