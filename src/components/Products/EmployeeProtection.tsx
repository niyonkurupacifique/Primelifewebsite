import HeroEmployeeProtection from "../HeroEmployeeProtection"
import Header from "../Header"
import Footer from "../Footer"
import BenefitsOfEmployee from "../BenefitsOfEmployee"
import EmployeeInsuranceFeatures from "../EmployeeProtectionFeatures"
import EmployeeContractFormat from "../EmployeeProtectionContractFormat"
import EmployeeQuotationCalculator from "../EmployeeProtectionQuatationCalculator"


const EmployeeProtection=()=>{
    return(
        <>
        <Header/>
        <HeroEmployeeProtection/>
        <EmployeeQuotationCalculator/>
        <EmployeeInsuranceFeatures/>
        <EmployeeContractFormat/>


        <Footer/>
        </>
        
    )

}

export default EmployeeProtection