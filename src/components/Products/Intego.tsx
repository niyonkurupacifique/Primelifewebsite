import HeroIntego from "../HeroIntego"
import Header from "../Header"
import Footer from "../Footer"
import BenefitsOfIntego from "../BenefitsOfIntego"
import IntegoInsuranceFeatures from "../IntegoFeatures"
import IntegoContractFormat from "../IntegoContractFormat"
import SavingQuotationCalculator from "../SavingQuotation"

const Intego=()=>{
    return(
        <>
        <Header/>
        <HeroIntego/>
        <SavingQuotationCalculator/>
        {/* <BenefitsOfIntego/> */}
        <IntegoInsuranceFeatures/>
        <IntegoContractFormat/>


        <Footer/>
        </>
        
    )

}

export default Intego