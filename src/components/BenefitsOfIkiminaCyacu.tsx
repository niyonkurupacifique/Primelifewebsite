const BenefitsOfIkiminaCyacu=()=>{
    const benefits = [
    "Pure savings insurance product designed to help clients build emergency funds",
    "Generates 3% annual interest on all savings deposits",
    "Provides financial security with easy access to funds after 3 months"
  ]
 
    return(
        <section>
            <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10">
                <div className="mb-6">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                        Benefits of Ikimina Cyacu
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full bg-[#003366] flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-white text-sm font-bold">✓</span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                {benefit}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )

}

export default BenefitsOfIkiminaCyacu
