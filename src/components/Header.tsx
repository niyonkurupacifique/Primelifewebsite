'use client'
import { useState } from 'react'
import { Menu, X, Phone, ChevronDown, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import SalesAgentComponents from './SalesAgents'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [nestedDropdown, setNestedDropdown] = useState<string | null>(null)

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen)
    if (isMenuOpen) {
      setActiveDropdown(null)
      setNestedDropdown(null)
    }
  }

  const toggleMobileDropdown = (menu: string): void => {
    if (activeDropdown === menu) {
      setActiveDropdown(null)
      setNestedDropdown(null)
    } else {
      setActiveDropdown(menu)
      setNestedDropdown(null)
    }
  }

  const toggleNestedDropdown = (menu: string): void => {
    setNestedDropdown(nestedDropdown === menu ? null : menu)
  }

  const router = useRouter()

  const handleNavigation = (path: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    router.push(path)
    setIsMenuOpen(false)
    setActiveDropdown(null)
    setNestedDropdown(null)
  }

  return (
    <>
      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#" onClick={(e) => handleNavigation('/', e)} className="flex items-center">
                <img
                  src="https://prime.rw/public/themes/assets/img/Prime_Life_Insurance_Logo.PNG"
                  alt="Prime Life Logo"
                  className=" h-12 w-auto"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-14">
              <div className="main-menu__item  cursor-pointer">
                <a
                 
                  onClick={(e) => handleNavigation('/Home', e)}
                  className="main-menu__link"
                >
                  Home
                </a>
              </div>

              {/* About Us Dropdown with Hover */}
              <div className="main-menu__item main-menu__dropdown">
                <a href="#" className="main-menu__link main-menu__link--dropdown">
                  About us
                  <ChevronDown className="w-4 h-4 ml-1 transition-transform" />
                </a>
                <ul className="main-menu__submenu">
                  <li>
                    <a  onClick={()=>{router.push('/whoweare')}} className="main-menu__submenu-link">Who we are</a>
                  </li>
                  <li>
                    <a   onClick={()=>{router.push('/shareholders')}} className="main-menu__submenu-link">Shareholders</a>
                  </li>
                  <li>
                    <a  onClick={()=>{router.push('/boardmembers')}} className="main-menu__submenu-link">Board Members</a>
                  </li>
                  <li>
                    <a   onClick={()=>{router.push('/managementteam')}} className="main-menu__submenu-link">Management Team</a>
                  </li>
                 
                  <li className="has-submenu">
                    <a  className="main-menu__submenu-link has-children">
                      Sales Intermediaries
                    </a>
                    <ul className="main-menu__submenu-nested">
                      <li><a   onClick={() => router.push('/salesagent')} className="main-menu__submenu-link cursor-pointer">Sales Agents</a></li>
                      <li><a onClick={() => router.push('/brokers')} className="main-menu__submenu-link cursor-pointer">Brokers</a></li>
                    </ul>
                  </li>
                 
                  
                  <li>
                    <a  className="main-menu__submenu-link">Fees Structure</a>
                  </li>
               
                  <li>
                    <a   onClick={()=>{router.push('/customercharter')}} className="main-menu__submenu-link">Customer Charter</a>
                  </li>
                </ul>
              </div>

              <div onClick={() => router.push('/#services')} className="main-menu__item">
                <a
                  href="#services"
                  className="main-menu__link"
                >
                  Our Products
                </a>
              </div>

              {/* Reports Dropdown with Hover */}
              <div className="main-menu__item main-menu__dropdown">
                <a href="#" className="main-menu__link main-menu__link--dropdown">
                  Reports
                  <ChevronDown className="w-4 h-4 ml-1 transition-transform" />
                </a>
                <ul className="main-menu__submenu">
                  <li className="has-submenu">
                    <a  className="main-menu__submenu-link has-children">
                      Financial Reports
                    </a>
                    <ul className="main-menu__submenu-nested">
                      <li><a   onClick={() => router.push('/Quartelyreports')} className="main-menu__submenu-link cursor-pointer">Quarter Reports</a></li>
                      <li><a onClick={() => router.push('/Yearlyreports')} className="main-menu__submenu-link cursor-pointer">Annual Reports</a></li>
                    </ul>
                  </li>
                 
                  <li>
                    <a   onClick={()=>{router.push('/consumerprotectionreport')}} className="main-menu__submenu-link  cursor-pointer">Consumer Protection Reports</a>
                  </li>
                  <li>
                    <a  className="main-menu__submenu-link">Fees Structure</a>
                  </li>
                </ul>
              </div>

              {/* Updates Dropdown with Hover */}
              <div className="main-menu__item main-menu__dropdown cursor-pointer">
                <a  className="main-menu__link main-menu__link--dropdown cursor-pointer">
                  Updates
                  <ChevronDown className="w-4 h-4 ml-1 transition-transform" />
                </a>
                <ul className="main-menu__submenu">
                  <li>
                    <a onClick={() => router.push('/faq')} className="main-menu__submenu-link cursor-pointer">Frequently Asked Questions</a>
                  </li>
                  <li>
                    <a onClick={()=>{router.push('/allnews')}} className="main-menu__submenu-link cursor-pointer">Blogs & News</a>
                  </li>
                  <li>
                    <a  onClick={()=>{router.push('/careers')}}  className="main-menu__submenu-link cursor-pointer">Careers & Jobs</a>
                  </li>
                  <li>
                    <a  className="main-menu__submenu-link">Tenders</a>
                  </li>
                </ul>
              </div>

              <div className="main-menu__item cursor-pointer">
                <a
                  
                  onClick={(e) => handleNavigation('/complaints', e)}
                  className="main-menu__link"
                >
                  Complaints
                </a>
              </div>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Phone Number */}
              <div className="hidden md:flex items-center space-x-2 text-blue-500">
                <Phone className="w-5 h-5" />
                <div>
                  <a href="tel:1320" className="font-semibold hover:text-blue-600">
                    1320
                  </a>
                  <p className="text-xs text-gray-600">Toll-free</p>
                </div>
              </div>

              {/* Get Quote Button */}
              <a
              onClick={() => router.push('/allproducts')}
                className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-colors hidden md:inline-block"
              >
                Get a Quote
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 text-gray-700 hover:text-blue-500 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden bg-white border-t transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="container mx-auto px-4">
            <nav className="py-4">
              <ul className="space-y-1">
                {/* Home */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleNavigation('/Home', e)}
                    className="block py-3 px-2 text-gray-700 hover:text-blue-500 hover:bg-blue-50 rounded-md font-medium transition-colors"
                  >
                    Home
                  </a>
                </li>

                {/* About Us Dropdown */}
                <li>
                  <button
                    className={`flex items-center justify-between w-full py-3 px-2 text-gray-700 hover:text-blue-500 hover:bg-blue-50 rounded-md font-medium transition-colors ${
                      activeDropdown === 'about' ? 'text-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => toggleMobileDropdown('about')}
                  >
                    About Us
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === 'about' ? 'rotate-180' : ''
                    }`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${
                    activeDropdown === 'about' ? 'max-h-96 mt-2' : 'max-h-0'
                  }`}>
                    <ul className="ml-4 space-y-1 border-l-2 border-blue-100 pl-4">
                      <li>
                        <a href=""  onClick={()=>{router.push('/whoweare')}} className="block py-2 px-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-md text-sm transition-colors">
                          Who we are
                        </a>
                      </li>
                      <li>
                        <a href=""  onClick={()=>{router.push('/shareholders')}} className="block py-2 px-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-md text-sm transition-colors">
                          Shareholders
                        </a>
                      </li>
                      <li>
                        <a href="" onClick={()=>{router.push('/boardmembers')}} className="block py-2 px-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-md text-sm transition-colors">
                          Board Members
                        </a>
                      </li>
                      <li>
                        <a href="" onClick={()=>{router.push('/managementteam')}} className="block py-2 px-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-md text-sm transition-colors">
                          Management Team
                        </a>
                      </li>
                      <li>
                        <button
                          className={`flex items-center justify-between w-full py-2 px-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-md text-sm transition-colors ${
                            nestedDropdown === 'financial' ? 'text-blue-500 bg-blue-50' : ''
                          }`}
                          onClick={() => toggleNestedDropdown('financial')}
                        >
                          Sales Intermediaries
                          <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${
                            nestedDropdown === 'financial' ? 'rotate-90' : ''
                          }`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${
                          nestedDropdown === 'financial' ? 'max-h-32 mt-1' : 'max-h-0'
                        }`}>
                          <ul className="ml-4 space-y-1 border-l border-gray-200 pl-2">
                            <li>
                              <a onClick={() => router.push('/salesagent')} className="block py-1 px-2 text-gray-500 cursor-pointer hover:text-blue-500 hover:bg-blue-50 rounded text-xs transition-colors">
                                Sales Agents
                              </a>
                            </li>
                            <li>
                              <a onClick={() => router.push('/brokers')} className="block py-1 px-2 text-gray-500 cursor-pointer hover:text-blue-500 hover:bg-blue-50 rounded text-xs transition-colors">
                                Brokers
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <a href=""   onClick={()=>{router.push('/customercharter')}} className="block py-2 px-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-md text-sm transition-colors">
                          Customer Charter
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* Our Products */}
                <li>
                  <a
                    href="#services"
                    onClick={(e) => handleNavigation('/#services', e)}
                    className="block py-3 px-2 text-gray-700 hover:text-blue-500 hover:bg-blue-50 rounded-md font-medium transition-colors"
                  >
                    Our Products
                  </a>
                </li>

                {/* Reports Dropdown */}
                <li>
                  <button
                    className={`flex items-center justify-between w-full py-3 px-2 text-gray-700 hover:text-blue-500 hover:bg-blue-50 rounded-md font-medium transition-colors ${
                      activeDropdown === 'reports' ? 'text-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => toggleMobileDropdown('reports')}
                  >
                    Reports
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === 'reports' ? 'rotate-180' : ''
                    }`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${
                    activeDropdown === 'reports' ? 'max-h-96 mt-2' : 'max-h-0'
                  }`}>
                    <ul className="ml-4 space-y-1 border-l-2 border-blue-100 pl-4">
                      {/* Financial Reports - Nested Dropdown */}
                      <li>
                        <button
                          className={`flex items-center justify-between w-full py-2 px-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-md text-sm transition-colors ${
                            nestedDropdown === 'financial' ? 'text-blue-500 bg-blue-50' : ''
                          }`}
                          onClick={() => toggleNestedDropdown('financial')}
                        >
                          Financial Reports
                          <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${
                            nestedDropdown === 'financial' ? 'rotate-90' : ''
                          }`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${
                          nestedDropdown === 'financial' ? 'max-h-32 mt-1' : 'max-h-0'
                        }`}>
                          <ul className="ml-4 space-y-1 border-l border-gray-200 pl-2">
                            <li>
                              <a onClick={() => router.push('/Quartelyreports')} className="block py-1 px-2 text-gray-500 cursor-pointer hover:text-blue-500 hover:bg-blue-50 rounded text-xs transition-colors">
                                Quarter Reports
                              </a>
                            </li>
                            <li>
                              <a onClick={() => router.push('/Yearlyreports')} className="block py-1 px-2 text-gray-500 cursor-pointer hover:text-blue-500 hover:bg-blue-50 rounded text-xs transition-colors">
                                Annual Reports
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                     
                      <li>
                        <a onClick={()=>{router.push('/consumerprotectionreport')}} className="block cursor-pointer py-2 px-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-md text-sm transition-colors">
                          Consumer Protection Reports
                        </a>
                      </li>
                      <li>
                        <a href="#fees-structure" className="block py-2 px-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-md text-sm transition-colors">
                          Fees Structure
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* Updates Dropdown */}
                <li>
                  <button
                    className={`flex items-center justify-between w-full py-3 px-2 text-gray-700 hover:text-blue-500 hover:bg-blue-50 rounded-md font-medium transition-colors ${
                      activeDropdown === 'updates' ? 'text-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => toggleMobileDropdown('updates')}
                  >
                    Updates
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === 'updates' ? 'rotate-180' : ''
                    }`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${
                    activeDropdown === 'updates' ? 'max-h-96 mt-2' : 'max-h-0'
                  }`}>
                    <ul className="ml-4 space-y-1 border-l-2 border-blue-100 pl-4">
                      <li>
                        <a onClick={() => router.push('/faq')} className="block py-2 px-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-md text-sm transition-colors cursor-pointer">
                          Frequently Asked Questions
                        </a>
                      </li>
                      <li>
                        <a onClick={()=>{router.push('/allnews')}} className="block py-2 px-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-md text-sm transition-colors cursor-pointer">
                          Blogs & News
                        </a>
                      </li>
                      <li>
                        <a onClick={()=>{router.push('/careers')}} className="block py-2 px-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-md text-sm transition-colors">
                          Careers & Jobs
                        </a>
                      </li>
                      <li>
                        <a href="#tenders" className="block py-2 px-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-md text-sm transition-colors">
                          Tenders
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* Complaints */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleNavigation('/complaints', e)}
                    className="block py-3 px-2 text-gray-700 hover:text-blue-500 hover:bg-blue-50 rounded-md font-medium transition-colors"
                  >
                    Complaints
                  </a>
                </li>
              </ul>

              {/* Mobile CTA Section */}
              <div className="pt-6 mt-6 border-t border-gray-200 space-y-4">
                {/* Phone Number */}
                <div className="flex items-center space-x-3 text-blue-500 px-2">
                  <Phone className="w-5 h-5" />
                  <div>
                    <a href="tel:1320" className="font-semibold hover:text-blue-600 transition-colors">
                      1320
                    </a>
                    <p className="text-xs text-gray-600">Toll-free</p>
                  </div>
                </div>
                
                {/* Get Quote Button */}
                <a 
                   onClick={() => router.push('/allproducts')}
                  className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-md font-medium w-full text-center block transition-colors"
                >
                  Get a Quote
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header