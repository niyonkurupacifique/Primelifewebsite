
import ContactForm from "./GetInTouch";

const BenefitsOfIntego=()=>{
    const benefits = [
    "Enables individuals or groups to save for the future with short-term or long-term plans tailored to their goals.",
    "Helps build financial security and peace of mind for a better life during retirement.",
    "Available for both individuals and groups, making it easy for families, employees, or community members to invest in their future.",
    
  ]
 
    return(
        <section>

            <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 gap-5 mt-3">
          
             <div className="benefitsOfEducation  mt-3">
               <span className="font-bold text-xl bg-gradient-to-r from-[#003366] to-[#1E3A8A] bg-clip-text text-transparent  sm:text-2xl  lg:text-3xl leading-tight">
                Benefits of Intego Insurance
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

export default BenefitsOfIntego