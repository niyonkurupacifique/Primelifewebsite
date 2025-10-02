import HeroFamilyInsurance from "../HeroFamilyInsurance"
import Header from "../Header"
import Footer from "../Footer"
import BenefitsOfFamilyInsurance from "../BenefitsOfFamilyInsurance"
import FamilyInsuranceFeatures from "../FamilyInsuranceFeatures"
import FamilyContractFormat from "../FamilyInsuranceContractFormat"
import FamilyQuotationCalculator from "../FamilyQuotation"
const FamilyInsurance=()=>{
    return(
        <>
        <Header/>
        <HeroFamilyInsurance/>
        <FamilyQuotationCalculator/>
        <BenefitsOfFamilyInsurance/>
        <FamilyInsuranceFeatures/>
        <FamilyContractFormat/>


        <Footer/>
        </>
        
    )

}

export default FamilyInsurance