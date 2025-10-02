'use client';

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink, Award, Users, Building2 } from 'lucide-react'

interface BoardMember {
  id: number
  name: string
  position: string
  image?: string
  bio: string
  qualifications: string[]
  experience: string[]
  achievements: string[]
}

const BoardMembers: React.FC = () => {
  const [expandedMember, setExpandedMember] = useState<number | null>(null)

  const boardMembers: BoardMember[] = [
    {
      id: 1,
      name: "Joseph BAHENDA",
      position: "Chairman of the Board of Directors",
      bio: "Joseph is a holder of Master's Degree in Business Administration of «Maastricht School of Management» since March 2008 with specialization in Projects Management. He is also a holder of a Bachelor's Degree in Economics since 2000 as well as a Bachelor's Degree in Management since 1985 with specialization respectively in finance and accounting.",
      qualifications: [
        "Master's Degree in Business Administration - Maastricht School of Management (2008)",
        "Bachelor's Degree in Economics (2000)",
        "Bachelor's Degree in Management (1985)"
      ],
      experience: [
        "Director General of CORAG AG Ltd",
        "Director General of SAHAM ASSURANCE VIE LTD",
        "Director General of ASSETIP",
        "Director of Finance and Economic Planning of the City of Kigali"
      ],
      achievements: [
        "Formulated economic development strategy of the City of Kigali",
        "Participated in various reform processes for effective decentralization",
        "Extensive experience in gender mainstreaming and gender equality",
        "Expert in projects management and financial services"
      ]
    },
    {
      id: 2,
      name: "Amb. Prof. Joseph NSENGIMANA",
      position: "Vice Chairperson",
      bio: "Distinguished academic and diplomat with extensive experience in international relations and policy development.",
      qualifications: [
        "Ambassador and Professor",
        "International Relations and Policy Development"
      ],
      experience: [
        "Diplomatic Service",
        "Academic Leadership",
        "Policy Development"
      ],
      achievements: [
        "International Diplomatic Experience",
        "Academic Excellence",
        "Policy Innovation"
      ]
    },
    {
      id: 3,
      name: "KYAMATARE Adam Christian",
      position: "Member",
      bio: "Experienced professional with expertise in corporate governance and strategic planning.",
      qualifications: [
        "Business Administration",
        "Corporate Governance"
      ],
      experience: [
        "Strategic Planning",
        "Corporate Development",
        "Business Operations"
      ],
      achievements: [
        "Strategic Business Growth",
        "Operational Excellence",
        "Corporate Governance"
      ]
    },
    {
      id: 4,
      name: "Me. Marie Grace KAYIRANGWA",
      position: "Member",
      bio: "Advocate and Private Notary, active member of Rwanda Bar Association and Lawyers of Hope. She has previously been a career judge in the Rwandan Judiciary where she has served in various capacities as a judge at Nyanza High Court, Kibuye, Gasabo and Ntarugenge Intermediate Courts respectively.",
      qualifications: [
        "LLB, LLM, DLP",
        "Member of Rwanda Bar Association",
        "Private Notary"
      ],
      experience: [
        "Career Judge in Rwandan Judiciary",
        "Judge at Nyanza High Court",
        "Judge at Kibuye, Gasabo and Ntarugenge Intermediate Courts",
        "Managing Director of Esperanza Humura"
      ],
      achievements: [
        "Seasoned and committed lawyer with sound experience in Insurance Law",
        "Renowned activist for human rights, women and girls' rights",
        "Member of Soroptimist International leadership",
        "Cofounder of Esperanza Humura NGO"
      ]
    },
    {
      id: 5,
      name: "Mr. Francis BAZATSINDA",
      position: "Member",
      bio: "Certified Public Accountant and a member of the Institute of Certified Public Accountants of Rwanda (ICPAR) with over 8 years of experience in Finance.",
      qualifications: [
        "Certified Public Accountant (ICPAR)",
        "Certification in Financial Modelling and Analysis",
        "Certificate in Business Analytics - University of Cape Town",
        "Bachelor's degree in Finance - University of Rwanda"
      ],
      experience: [
        "Head of Finance at Volkswagen Mobility Solutions",
        "External Auditor at PricewaterhouseCoopers (PwC)",
        "Chief Accountant at Africa Improved Foods",
        "Internal Audit at Access Bank"
      ],
      achievements: [
        "Over 8 years of experience in Finance",
        "Expertise in financial controlling and strategic business planning",
        "Experience in internal audit, accounting, tax and treasury management",
        "Cross-sector financial experience"
      ]
    },
    {
      id: 6,
      name: "Yacine GUEYE",
      position: "Member",
      bio: "Insurance Director at FINAFRICA HOLDING/ Groupe DUVAL with extensive experience in the insurance sector.",
      qualifications: [
        "Insurance Management",
        "Financial Services"
      ],
      experience: [
        "Insurance Director at FINAFRICA HOLDING",
        "Groupe DUVAL Leadership",
        "Insurance Sector Management"
      ],
      achievements: [
        "Insurance Industry Leadership",
        "Strategic Insurance Development",
        "Financial Services Excellence"
      ]
    },
    {
      id: 7,
      name: "FALQUERHO Richard",
      position: "Member",
      bio: "Deputy Chief Executive with extensive experience in insurance management and corporate leadership.",
      qualifications: [
        "Executive Management",
        "Insurance Leadership"
      ],
      experience: [
        "Deputy Chief Executive",
        "Insurance Management",
        "Corporate Leadership"
      ],
      achievements: [
        "Executive Leadership Excellence",
        "Insurance Industry Innovation",
        "Corporate Growth and Development"
      ]
    }
  ]

  const toggleMember = (id: number) => {
    setExpandedMember(expandedMember === id ? null : id)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Board of Directors
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Prime Insurance is led by a skilled management team and board of directors whose combined experience and track record maintains the financial stability and innovative thinking that sets Prime apart from its competitors.
          </p>
          <div className="mt-8 flex items-center justify-center space-x-2 text-primary">
            <Building2 className="w-5 h-5" />
            <span className="font-semibold">Join our quest and drive for excellence through innovation</span>
          </div>
        </div>

        {/* Board Members Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {boardMembers.map((member, index) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Member Header */}
              <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleMember(member.id)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    {expandedMember === member.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-white/90 font-medium">{member.position}</p>
              </div>

              {/* Member Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {member.bio}
                </p>

                {/* Expandable Content */}
                {expandedMember === member.id && (
                  <div className="space-y-6 pt-4 border-t border-gray-200">
                    {/* Qualifications */}
                    <div>
                      <h4 className="flex items-center text-sm font-semibold text-primary mb-3">
                        <Award className="w-4 h-4 mr-2" />
                        Qualifications
                      </h4>
                      <ul className="space-y-2">
                        {member.qualifications.map((qual, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {qual}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Experience */}
                    <div>
                      <h4 className="flex items-center text-sm font-semibold text-primary mb-3">
                        <Building2 className="w-4 h-4 mr-2" />
                        Experience
                      </h4>
                      <ul className="space-y-2">
                        {member.experience.map((exp, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {exp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="flex items-center text-sm font-semibold text-primary mb-3">
                        <Award className="w-4 h-4 mr-2" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {member.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Expand/Collapse Button */}
                <button
                  onClick={() => toggleMember(member.id)}
                  className="w-full mt-4 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {expandedMember === member.id ? 'Show Less' : 'Learn More'}
                  {expandedMember === member.id ? (
                    <ChevronUp className="w-4 h-4 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-2" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-white max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6">
              Leadership That Drives Innovation
            </h3>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Our board of directors brings together decades of combined experience in insurance, finance, law, and business management. Each member is committed to establishing Prime as Rwanda's premier insurer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://prime.rw/life-insurance/about-life-insurance/board-of-directors"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                Visit Official Website
                <ExternalLink className="w-5 h-5 ml-2" />
              </a>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary transition-colors duration-200">
                Contact Board
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BoardMembers 