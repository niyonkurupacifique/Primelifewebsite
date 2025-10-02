import HeroLoanProtection from "./HeroLoanProtection"
import Header from "../Header"
import Footer from "../Footer"
import BenefitsOfLoanProtection from "../BenefitsOfLoanProtection"
import LoanInsuranceFeatures from "../LoanProtectionFeatures"
import LoanProtectionContractFormat from "../LoanProtectionContractFormat"
import LoanQuotationCalculator from "../LoanQuotation"
const LoanProtection=()=>{
    return(
        <>
        <Header/>
        <HeroLoanProtection/>
        <LoanQuotationCalculator/>
        <LoanInsuranceFeatures/>
        <LoanProtectionContractFormat/>


        <Footer/>
        </>
        
    )

}

export default LoanProtection