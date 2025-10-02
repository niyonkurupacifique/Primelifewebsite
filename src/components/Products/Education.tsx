import HeroEducation from "../HelloEducation"
import Header from "../Header"
import Footer from "../Footer"
import BenefitsOfEducation from "../BenefitsofEducation"
import MoreThanEducation from "../MoreThanEducation"
import EducationInsuranceFeatures from "../EducationInsuranceFeatures"
import EducationContractFormat from "../EducationContractFormat"
import EducationQuotationCalculator from "../EducationQuotation"
const Education=()=>{
    return(
        <>
        <Header/>
        <HeroEducation/>
        <EducationQuotationCalculator/>
        <MoreThanEducation/>
        <EducationInsuranceFeatures/>
        <EducationContractFormat/>


        <Footer/>
        </>
        
    )

}

export default Education