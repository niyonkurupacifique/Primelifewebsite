
import ContactForm from "./GetInTouch";

const BenefitsOfLoanProtection=()=>{
    const benefits = [
    "Recover outstanding loan payments as a lender or creditor if a borrower dies or is disabled",
    "If you take out a loan, you have peace of mind that your outstanding payments will be settled if you die or are disabled",
    "The Prime Loan Protection policy prevents your properties from being auctioned off if you die prematurely",
    
  ]
 
    return(
        <section>

            <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 gap-5 mt-3">
          
             <div className="benefitsOfEducation  mt-3">
               <span className="font-bold text-xl bg-gradient-to-r from-[#003366] to-[#1E3A8A] bg-clip-text text-transparent  sm:text-2xl  lg:text-3xl leading-tight">
                Benefits of Loan Protection Insurance
               </span>
               <div className="benefitsOfEducationDiv1 flex">
                
                {/* <span style={{color:'#FFCC00'}} className="">
                <TiTick size={30} />
                </span> */}
                <span className=" mt-10">
                   {
                    benefits.map((item)=>{
                        return(<div className="flex space-x-3 items-center pr-5 Fundsaremade space-y-7 mt-5 pb-5">
                            <div className=" ">
                                         <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
                </div>
                          <div>  {item}  </div>
                        </div>)
                    })                   }
                </span>
                

               </div>
               <div className=" benefitsOfEducationDiv2">

               </div>

             </div>
             <div>
                <ContactForm/>
             </div>
           
            </div>
           
        </section>
    )

}

export default BenefitsOfLoanProtection