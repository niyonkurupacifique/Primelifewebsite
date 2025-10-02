import HeroGroupLifeInsurance from "../HeroGroupLifeInsurrance"
import Header from "../Header"
import Footer from "../Footer"
import BenefitsOfGroupLifeInsurance from "../BenefitsOfGroupLife"
import GroupLifeInsuranceFeatures from "../GroupLifeFeatures"
import FamilyContractFormat from "../FamilyInsuranceContractFormat"
const GroupLifeInsurance=()=>{
    return(
        <>
        <Header/>
        <HeroGroupLifeInsurance/>
        <BenefitsOfGroupLifeInsurance/>
        <GroupLifeInsuranceFeatures/>
        {/* <FamilyContractFormat/> */}


        <Footer/>
        </>
        
    )

}

export default GroupLifeInsurance