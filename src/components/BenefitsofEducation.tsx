import { TiTick } from "react-icons/ti";
import ContactForm from "./GetInTouch";

const BenefitsOfEducation=()=>{
    const benefits = [
    "Funds are made available to your child or children, even in the event of your sudden death..",
    "We have redesigned our education insurance to meet the needs of the current education system. This makes it possible to guarantee either the nursery, primary, secondary or tertiary fees of your child or children",
    "We have redesigned our education insurance to meet the needs of the current education system. This makes it possible to guarantee either the nursery, primary, secondary or tertiary fees of your child or children",
    
  ]
 
    return(
        <section>

            <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 gap-5 mt-3">
          
             <div className="benefitsOfEducation  mt-3">
               <span className="font-bold text-xl bg-gradient-to-r from-[#003366] to-[#1E3A8A] bg-clip-text text-transparent  sm:text-2xl  lg:text-3xl leading-tight">
                Benefits of Education Insurance
               </span>
               <div className="benefitsOfEducationDiv1 flex">
                
                {/* <span style={{color:'#FFCC00'}} className="">
                <TiTick size={30} />
                </span> */}
                <span className=" mt-10">
                   {
                    benefits.map((item)=>{
                        return(<div className="flex Fundsaremade space-y-7 mt-5 pb-5">
                            <div className=" border rounded-full w-5 h-5 bg-[#FFCC00] border-[#FFCC00]">
                <span className=" text-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 4L5.99996 11.3333L2.66663 8" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                 </svg>

                </span>
                </div>
                            {item}
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

export default BenefitsOfEducation