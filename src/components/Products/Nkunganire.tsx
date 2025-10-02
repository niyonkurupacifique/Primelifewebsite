
import HeroNkunganireInsurance from "../HeroNkunganire"
import Header from "../Header"
import Footer from "../Footer"
import NkunganireInsuranceFeatures from "../NkunganireProductFeatures"
import FamilyContractFormat from "../FamilyInsuranceContractFormat"
import NkunganireQuotationCalculator from "../NkunganireQuotation"
const NkunganireInsurance=()=>{
    return(
        <>
        <Header/>
        <HeroNkunganireInsurance/>
        <NkunganireQuotationCalculator/>
        <NkunganireInsuranceFeatures/>
        <FamilyContractFormat/>


        <Footer/>
        </>
        
    )

}

export default NkunganireInsurance