import HeroGroupLifeInsurance from "../HeroGroupLifeInsurrance"
import Header from "../Header"
import Footer from "../Footer"
import BenefitsOfGroupLifeInsurance from "../BenefitsOfGroupLife"
import GroupLifeInsuranceFeatures from "../GroupLifeFeatures"
import FamilyContractFormat from "../FamilyInsuranceContractFormat"
import GroupLifeQuotationCalculator from "../GroupLifeQuotation"
import GroupLifeContractFormat from "../GroupLifeContractFormat"
const GroupLifeInsurance=()=>{
    return(
        <>
        <Header/>
        <HeroGroupLifeInsurance/>
        <GroupLifeQuotationCalculator />
        <BenefitsOfGroupLifeInsurance/>
        <GroupLifeInsuranceFeatures/>
        <GroupLifeContractFormat/>


        <Footer/>
        </>
        
    )

}

export default GroupLifeInsurance