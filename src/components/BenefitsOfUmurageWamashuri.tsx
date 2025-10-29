const BenefitsOfUmurageWamashuri=()=>{
    const benefits = [
    "All deposited premiums generate a competitive annual compound interest and 100% school fees is paid by Prime Life Insurance for the insured level",
    "In case of policy holder's death or total permanent disability, Prime Life pays 50% of agreed tuition fees as INDEZO to help the child reaching selected level and still 100% school fees will be once he/she reaches the insured level",
    "Education insurance taken by parents, future parents or guardians to secure children's education in the future"
  ]
 
    return(
        <section>
            <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10">
                <div className="mb-6">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                        Benefits of Umurage Education Insurance
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

export default BenefitsOfUmurageWamashuri
