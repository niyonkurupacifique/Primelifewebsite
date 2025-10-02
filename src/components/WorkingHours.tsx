'use client'


import { useRouter } from "next/navigation"

const WorkingHours = () => {

const router = useRouter()

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Left Column - Working Hours and Self Service */}
                    <div className="space-y-12 lg:border-r lg:border-gray-300 lg:pr-8">
                        {/* Working Hours */}
                        <div className="text-left">

                            <h3 className="text-3xl font-light text-gray-800 mb-4">
                                <span className="text-4xl font-medium text-gray-700">Working Hours</span>
                            </h3>
                            <div className="space-y-4 text-lg text-gray-600">
                                <div className="flex ">
                                    <span className="font-medium">Monday - Friday:</span>
                                    <span>8:00 AM - 5:00 PM</span>
                                </div>
                                <div className="flex ">
                                    <span className="font-medium">Saturday:</span>
                                    <span>Closed</span>
                                </div>
                                <div className="flex ">
                                    <span className="font-medium">Sunday:</span>
                                    <span>Closed</span>
                                </div>
                            </div>
                        </div>

                        {/* Self Service */}
                        <div className="">

                            <h3 className="text-3xl font-light text-gray-800 mb-4">
                                <span className="text-4xl font-medium text-gray-700">For Self-Service</span>
                            </h3>
                            <div className="space-y-4">
                                <p className="text-lg text-gray-600">
                                    Press <span className="text-yellow-500 font-bold text-2xl">*177#</span>
                                </p>
                                <p className="text-lg text-gray-600">or</p>
                                <button className="bg-white border-2 border-[#3b82f6] text-black px-6 py-3 rounded-lg hover:bg-[#3b82f6] hover:text-white transition-colors">
                                    Click here
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Meet the Team */}
                    <div className="text-left lg:pl-8">
                        <h3 className="text-3xl font-light text-gray-800 mb-4">
                            <span className="text-4xl font-medium text-gray-700">Meet the Prime Life Team.</span>
                        </h3>

                        <div className="space-y-4 mb-8">
                            <button onClick={()=>{router.push('/managementteam')}} className="w-full max-w-xs bg-[#00b0ef] border-2 border-[#3b82f6] text-white px-6 py-3 rounded-full hover:bg-[#00b0ef] hover:text-white transition-colors inline-flex items-center justify-center space-x-2">
                                <span>Meet the team</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            <button onClick={() => router.push('/salesagent')} className="w-full max-w-xs bg-[#00b0ef] border-2 border-[#3b82f6] text-white px-6 py-3 rounded-full hover:bg-[#00b0ef] hover:text-white transition-colors inline-flex items-center justify-center space-x-2">
                                <span>Meet prime life agents</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Prime Life Logo */}
                        {/* <div className="flex justify-start">
                            <a href="#" className="flex items-center">
                                <img
                                    src="https://prime.rw/public/themes/assets/img/Prime_Life_Insurance_Logo.PNG"
                                    alt="Prime Life Logo"
                                    className="h-10 w-auto"
                                />
                            </a>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WorkingHours
