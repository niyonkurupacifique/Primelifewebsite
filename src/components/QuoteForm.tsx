'use client';

import { useState } from 'react'
import { Calculator } from 'lucide-react'

const QuoteForm = () => {
  const [activeTab, setActiveTab] = useState('home')
  const [formData, setFormData] = useState({
    limits: 70000,
    deductible: 1000,
    coverage: 1000,
    premium: 1000
  })

  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'vehicles', label: 'Vehicles', icon: '🚗' },
    { id: 'health', label: 'Health', icon: '🏥' },
    { id: 'life', label: 'Life', icon: '👥' }
  ]

  const handleSliderChange = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(25, 59, 100, 0.9), rgba(25, 59, 100, 0.9)), url(https://ext.same-assets.com/1717637306/662621228.png)`
        }}
      />

      {/* Decorative icon */}
      <div className="absolute top-8 right-8">
        <img
          src="https://ext.same-assets.com/1717637306/17900562.png"
          alt="Quote Icon"
          className="w-16 h-16 opacity-30"
        />
      </div>

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            {/* Section Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src="https://ext.same-assets.com/1717637306/2664458260.png"
                  alt="Shape"
                  className="w-6 h-6"
                />
                <span className="text-secondary font-medium uppercase tracking-wider">Free quote</span>
                <img
                  src="https://ext.same-assets.com/1717637306/4144863904.png"
                  alt="Shape"
                  className="w-6 h-6"
                />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Get an insurance quote to get started!
              </h2>
            </div>

            {/* Quote Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              {/* Tabs */}
              <div className="flex space-x-2 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-secondary text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Limits of Balance */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Limits of Balance:
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="10000"
                      max="100000"
                      step="1000"
                      value={formData.limits}
                      onChange={(e) => handleSliderChange('limits', parseInt(e.target.value))}
                      className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="bg-white/20 px-3 py-1 rounded text-white font-bold">
                      ${formData.limits.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Deductible */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Deductible:
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="500"
                      max="5000"
                      step="100"
                      value={formData.deductible}
                      onChange={(e) => handleSliderChange('deductible', parseInt(e.target.value))}
                      className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="bg-white/20 px-3 py-1 rounded text-white font-bold">
                      ${formData.deductible.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Coverage */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Coverage:
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="500"
                      max="10000"
                      step="100"
                      value={formData.coverage}
                      onChange={(e) => handleSliderChange('coverage', parseInt(e.target.value))}
                      className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="bg-white/20 px-3 py-1 rounded text-white font-bold">
                      ${formData.coverage.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Premium */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Premium:
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="100"
                      max="2000"
                      step="50"
                      value={formData.premium}
                      onChange={(e) => handleSliderChange('premium', parseInt(e.target.value))}
                      className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="bg-white/20 px-3 py-1 rounded text-white font-bold">
                      ${formData.premium.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Get Quote Button */}
                <button className="w-full bg-secondary hover:bg-secondary/90 text-white py-3 px-6 rounded-md font-semibold text-lg transition-colors flex items-center justify-center space-x-2">
                  <Calculator className="w-5 h-5" />
                  <span>Calculate Quote</span>
                </button>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="https://ext.same-assets.com/1717637306/2938017165.png"
              alt="Get Insurance Quote"
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuoteForm
