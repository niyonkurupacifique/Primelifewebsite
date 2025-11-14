'use client';

import React, { useState } from 'react';
import { FaMobileAlt } from 'react-icons/fa';
import { useAppSelector } from '../hooks';
import { useRouter } from 'next/navigation';

const Kwishyura = () => {
  const userInfo = useAppSelector((state) => state.authentication.userData);
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState(userInfo?.userName);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'loading' | 'warning' | null; text: string }>({ type: null, text: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [proposalNumber, setProposalNumber] = useState<string>('');

  // Get savings form data from Redux store
  const savingsFormData = useAppSelector((state) => state.SavingQuotationformdata);
  const savingsResults = useAppSelector((state) => state.SavingQuotationResults);


  const educationFormData = useAppSelector((state) => state.EducationQuotationformdata);
  const umusigireData = useAppSelector((state) => state.umusigireForm.beneficiaries[0]);
  const childrenData = useAppSelector((state) => state.childrenForm.child);
  const educationResults = useAppSelector((state) => state.EducationQuotationResult);
  const beneficiariesData = useAppSelector((state) => state.beneficiariesForm.beneficiaries);
  const employeeFormData = useAppSelector((state) => state.EmployeeQuotationFormData);
  const employeeResults = useAppSelector((state) => state.EmployeeQuotationResult);

  const nkunganireFormData = useAppSelector((state) => state.NkunganireForm);
  const nkunganireResults = useAppSelector((state) => state.NkunganireQuotationResult);

  const familyResults = useAppSelector((state) => state.FamilyQuotationResult);

  // Get premiums from Redux store
  const riskPremium = familyResults.RiskPremium;
  const totalPremium = familyResults.TotalPremium;

  // Get parent beneficiaries data from Redux store
  const parentBeneficiariesData = useAppSelector((state) => state.beneficiariesForm.beneficiaries);

  // Get real insurance details from Redux store
  const familyFormData = useAppSelector((state) => state.familyForm);


  const numericPart = userInfo?.userName.replace(/\D/g, ''); // Extract numeric part
  const fromValue = '25' + numericPart;
  let insuranceName = useAppSelector((state) => state.insuranceName.InsuranceName);

  const amount = insuranceName === 'Education Insurance' ? educationFormData.Premium : insuranceName === 'Nkunganire Insurance' ? nkunganireFormData.totalPremium : insuranceName === 'Family Insurance' ? totalPremium : insuranceName === 'Intego' ? savingsFormData.Premium: employeeResults.EmployeeTotalPremium
  const currency = "Rwf"

  const generateExternalId = () => {
    const timestamp = new Date().getTime();
    const randomDigits = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return `W${timestamp}${randomDigits}`;
  };

  const externalId = generateExternalId();




  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };


  const PaymentUsingMomo = async (EducationproposalNumber: string) => {
    setMessage({ type: 'loading', text: 'Processing MoMo payment... Please wait...' });
    setIsLoading(true);

    try {

      const response = await fetch('/api/momorequestlife', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromValue,
          amount: insuranceName === 'Education Insurance' ? educationFormData.Premium : insuranceName === 'Employee Protection Insurance' ? employeeResults.EmployeeTotalPremium : insuranceName === 'Nkunganire Insurance' ? nkunganireFormData.totalPremium : insuranceName === 'Family Insurance' ? totalPremium: insuranceName === 'Intego' ? savingsFormData.Premium : 0,
          externalId: insuranceName === 'Education Insurance' ? EducationproposalNumber : insuranceName === 'Employee Protection Insurance' ? EducationproposalNumber : insuranceName === 'Nkunganire Insurance' ? EducationproposalNumber : insuranceName === 'Family Insurance' ? EducationproposalNumber: insuranceName === 'Intego' ? EducationproposalNumber : null,
          fromMsg: userInfo?.userName,
          ToMsg: 'Prime life Insurance',
          referenceId: insuranceName === 'Education Insurance' ? EducationproposalNumber : insuranceName === 'Employee Protection Insurance' ? EducationproposalNumber : insuranceName === 'Nkunganire Insurance' ? EducationproposalNumber : insuranceName === 'Family Insurance' ? EducationproposalNumber : insuranceName === 'Intego' ? EducationproposalNumber: null,
          product: insuranceName === 'Education Insurance' ? 'Education New' : insuranceName === 'Employee Protection Insurance' ? 'Employee Protection New' : insuranceName === 'Nkunganire Insurance' ? 'Akabando': insuranceName === 'Intego' ? 'Savings New' : 'Akabando',
          PolicyNumber: insuranceName === 'Education Insurance' ? EducationproposalNumber : insuranceName === 'Employee Protection Insurance' ? EducationproposalNumber : insuranceName === 'Nkunganire Insurance' ? EducationproposalNumber : insuranceName === 'Family Insurance' ? EducationproposalNumber : insuranceName === 'Intego' ? EducationproposalNumber: null,
        }),
      });

      if (response.ok) {
        const response2 = await response.json();
        setMessage({ type: 'success', text: `${response2.status} - Please check your phone and process payment` });


        setTimeout(() => {
          router.push("/Home");
        }, 2000);

      } else {
        const result2 = await response.json();
        setMessage({ type: 'error', text: `${result2.status} - Failed to process payment. Please contact Prime Life for support.` });
      }
    } catch (error) {
      //console.error('payment error:', error);
      setMessage({ type: 'error', text: 'Failed to process payment. There was an error during payment processing. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  }

  const HandleRequestEducationPayment = async () => {

    if (umusigireData.firstName === '') {
      setMessage({ type: 'error', text: 'Next of Kin First Name is required' });
      return;
    }
    else if (umusigireData.lastName === '') {
      setMessage({ type: 'error', text: 'Next of Kin Last Name is required' });
      return;
    }
    else if (umusigireData.gender === '') {
      setMessage({ type: 'error', text: 'Next of Kin Gender is required' });
      return;
    }
    else if (umusigireData.relationship === '') {
      setMessage({ type: 'error', text: 'Relationship with Next of Kin is required' });
      return;
    }
    else if (umusigireData.phoneNumber === '') {
      setMessage({ type: 'error', text: 'Next of Kin Phone Number is required' });
      return;
    }
    else if (umusigireData.dateOfBirth === "") {
      setMessage({ type: 'error', text: 'Next of Kin Date Of Birth is required' });
      return;
    }

    else {

      setMessage({ type: 'loading', text: 'Registering proposal... Please wait...' });
      setIsLoading(true);

      try {

        const response = await fetch('https://apps.prime.rw/customerbackend/api/proposal/education', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {

              "premiumFrequency": educationFormData.PremiumFrequency,
              "BenefitsInYears": educationFormData.BenefitYears,
              "PolicyTermYears": educationFormData.ContributionYears,
              "premium": educationFormData.Premium,
              "customerCode": userInfo?.customerCode,
              "paymentMode": "MoMo",
              "Institutions": "MTN Mobile Money",
              "isSingle": true,
              "SumInsured": educationResults.Endowmentamountduringdeferredperiod,
              "TotalSumInsured": educationResults.Endowmentamountafterdeferredperiod,
              "numberOfInLaws": 0,
              "numberOfKids": 0,
              "payerPhone": phoneNumber,
              "UserName": userInfo?.userName,
              "CycleAssured": educationFormData.Cycle,
              "SavingsPremium": 0,
              "Nextofkinfullname": umusigireData.firstName + " " + umusigireData.lastName,
              "NextofkinFirstname": umusigireData.firstName,
              "NextofkinMiddlename": umusigireData.middleName,
              "NextofkinLastname": umusigireData.lastName,
              "NextofkinGender": umusigireData.gender,
              "NextofkinRelationship": umusigireData.relationship,
              "NextofkinMobileNumber": umusigireData.phoneNumber,
              "NextofkinIdDocumentNumber": umusigireData.nationalId,
              "NextofkinDateOfBirth": umusigireData.dateOfBirth || null,
              "BeneficiallyFirstname": childrenData?.firstName,
              "BeneficiallyMiddlename": childrenData?.middleName,
              "BeneficiallyLastname": childrenData?.lastName,
              "BeneficiallyGender": childrenData?.gender,
              "BeneficiallyRelationship": "Child",
              "BeneficiallyMobileNumber": null,
              "BeneficiallyDateOfBirth": childrenData?.dateOfBirth || null,
              "BeneficiallyIdDocumentNumber": null,
              "Beneficiallyfullname": childrenData?.firstName + " " + childrenData?.lastName,
              "BeneficiallySumAssured": 0,




            }
          ),
        });

        if (response.ok) {


          const textResponse = await response.text();
          setProposalNumber(textResponse);
          //console.log("Proposal Number:", textResponse);

          // Call MoMo payment after successful proposal registration
          setMessage({ type: 'success', text: 'Proposal registered successfully! Now processing MoMo payment...' });

          // Call PaymentUsingMomo with the proposal number
          await PaymentUsingMomo(textResponse);

        } else {

          const result2 = await response.text();

          setMessage({ type: 'error', text: 'Failed to register proposal. Please contact Prime Life Insurance for support.' });
        }
      } catch (error) {
        console.error('payment error:', error);
        setMessage({ type: 'error', text: 'Failed to register proposal. There was an error during registering proposal. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }

  }






  ///////   EMPLOYEE PROTECTION ////////////////////////


  const HandleRequestEmployeePayment = async () => {
    if (umusigireData.nationalId === '') {
      setMessage({ type: 'error', text: 'Next of Kin National Id is required' });
      return;
    }
    if (umusigireData.firstName === '') {
      setMessage({ type: 'error', text: 'Next of Kin First Name is required' });
      return;
    }
    else if (umusigireData.lastName === '') {
      setMessage({ type: 'error', text: 'Next of Kin Last Name is required' });
      return;
    }
    else if (umusigireData.gender === '') {
      setMessage({ type: 'error', text: 'Next of Kin Gender is required' });
      return;
    }
    else if (umusigireData.relationship === '') {
      setMessage({ type: 'error', text: 'Relationship with Next of Kin is required' });
      return;
    }
    else if (umusigireData.phoneNumber === '') {
      setMessage({ type: 'error', text: 'Next of Kin Phone Number is required' });
      return;
    }
    else if (umusigireData.dateOfBirth === "") {
      setMessage({ type: 'error', text: 'Next of Kin Date Of Birth is required' });
      return;
    }

    else {

      setMessage({ type: 'loading', text: 'Registering proposal... Please wait...' });
      setIsLoading(true);

      try {

        const response = await fetch('https://apps.prime.rw/customerbackend/api/proposal/employee', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {

              "PremiumFrequency": employeeFormData.EmployeePremiumFrequency,
              "Premium": employeeResults.EmployeeTotalPremium,
              "RiskPremium": employeeResults.EmployeeRiskPremium,
              "SavingsPremium": employeeResults.EmployeeSavingPremium,
              "CustomerCode": userInfo?.customerCode,
              "PolicyTermYears": employeeFormData.EmployeeContributionYears,
              "isSingle": true,
              "SumInsured": employeeFormData.EmployeeMonthlySalary,
              "Funeral": employeeResults.EmployeeSpouseFuneralFees,
              "LossOfRevenue": employeeResults.EmployeePolicyHolderLossOfRevenue,
              "TotalSumInsured": employeeResults.EmployeePolicyHolderDeath,
              "numberOfInLaws": employeeFormData.EmployeeNumberOfDirectParentInLaw,
              "numberOfKids": employeeFormData.EmployeeNumberOfChildren,
              "paymentMode": "MoMo",
              "Institutions": "MTN Mobile Money",
              "NumberDirectParent": employeeFormData.EmployeeNumberOfDirectParent,
              "DeathTpd": employeeResults.EmployeePolicyHolderDeath,
              "Ppd": employeeResults.EmployeePolicyHolderPermanentDisability,
              "SpouceCover": employeeResults.EmployeeSpouseDeath,
              "payerPhone": phoneNumber,
              "UserName": userInfo?.userName,
              "UserName2": userInfo?.userName,
              "Nextofkinfullname": umusigireData.firstName + " " + umusigireData.lastName,
              "NextofkinFirstname": umusigireData.firstName,
              "NextofkinMiddlename": umusigireData.middleName,
              "NextofkinLastname": umusigireData.lastName,
              "NextofkinGender": umusigireData.gender,
              "NextofkinRelationship": umusigireData.relationship,
              "NextofkinMobileNumber": umusigireData.phoneNumber,
              "NextofkinIdDocumentNumber": umusigireData.nationalId,
              "NextofkinDateOfBirth": umusigireData.dateOfBirth || null,
              Beneficiaries: beneficiariesData.map(beneficiary => ({
                FirstName: beneficiary.firstName,
                MiddleName: beneficiary.middleName,
                LastName: beneficiary.lastName,
                Gender: beneficiary.gender,
                Relationship: beneficiary.relationship,
                MobileNumber: beneficiary.phoneNumber,
                NationalId: beneficiary.nationalId,
                DateOfBirth: beneficiary.dateOfBirth || null
              })),

            }
          ),
        });

        if (response.ok) {


          const textResponse = await response.text();
          setProposalNumber(textResponse);
          //console.log("Proposal Number:", textResponse);

          // Call MoMo payment after successful proposal registration
          setMessage({ type: 'success', text: 'Proposal registered successfully! Now processing MoMo payment...' });

          // Call PaymentUsingMomo with the proposal number
          await PaymentUsingMomo(textResponse);

        } else {

          const result2 = await response.text();

          setMessage({ type: 'error', text: 'Failed to register proposal. Please contact Prime Life Insurance for support.' });
        }
      } catch (error) {
        console.error('payment error:', error);
        setMessage({ type: 'error', text: 'Failed to register proposal. There was an error during registering proposal. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }

  }


  ///////   NKUNGANIRE ////////////////////////


  const HandleRequestNkunganirePayment = async () => {
    if (umusigireData.nationalId === '') {
      setMessage({ type: 'error', text: 'Next of Kin National Id is required' });
      return;
    }
    if (umusigireData.firstName === '') {
      setMessage({ type: 'error', text: 'Next of Kin First Name is required' });
      return;
    }
    else if (umusigireData.lastName === '') {
      setMessage({ type: 'error', text: 'Next of Kin Last Name is required' });
      return;
    }
    else if (umusigireData.gender === '') {
      setMessage({ type: 'error', text: 'Next of Kin Gender is required' });
      return;
    }
    else if (umusigireData.relationship === '') {
      setMessage({ type: 'error', text: 'Relationship with Next of Kin is required' });
      return;
    }
    else if (umusigireData.phoneNumber === '') {
      setMessage({ type: 'error', text: 'Next of Kin Phone Number is required' });
      return;
    }
    else if (umusigireData.dateOfBirth === "") {
      setMessage({ type: 'error', text: 'Next of Kin Date Of Birth is required' });
      return;
    }

    else {
      setMessage({ type: 'loading', text: 'Registering proposal... Please wait...' });
      setIsLoading(true);

      try {
        const response = await fetch('https://apps.prime.rw/customerbackend/api/proposal/family', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              "proposalNumber": null,
              "productCategory": nkunganireFormData.category,
              "customerCode": userInfo?.customerCode,
              "frequency": nkunganireFormData.premiumFrequency,
              "paymentMode": "MoMo",
              "Institutions": "MTN Mobile Money",
              "UserName": userInfo?.userName,
              "isSingle": true,
              "numberOfParents": nkunganireFormData.directParent,
              "numberOfInLaws": nkunganireFormData.directParentInLaw,
              "numberOfKids": nkunganireFormData.numberOfChildren,
              "payerPhone": phoneNumber,
              "PolicyTermYears": nkunganireFormData.contributionYears,
              "SavingsPremium": nkunganireFormData.savingPremium,
              "Nextofkinfullname": umusigireData.firstName + " " + umusigireData.lastName,
              "NextofkinFirstname": umusigireData.firstName,
              "NextofkinMiddlename": umusigireData.middleName,
              "NextofkinLastname": umusigireData.lastName,
              "NextofkinGender": umusigireData.gender,
              "NextofkinRelationship": umusigireData.relationship,
              "NextofkinMobileNumber": umusigireData.phoneNumber,
              "NextofkinIdDocumentNumber": umusigireData.nationalId,
              "NextofkinDateOfBirth": umusigireData.dateOfBirth || null,
            }
          ),
        });

        if (response.ok) {


          const textResponse = await response.text();
          const jsonResponse = JSON.parse(textResponse);
          setProposalNumber(jsonResponse.proposalNumber);
          //console.log("Proposal Number:", jsonResponse.proposalNumber);

          // Call MoMo payment after successful proposal registration
          setMessage({ type: 'success', text: 'Proposal registered successfully! Now processing MoMo payment...' });

          // Call PaymentUsingMomo with the proposal number
          await PaymentUsingMomo(jsonResponse.proposalNumber);

        } else {

          const result2 = await response.text();

          setMessage({ type: 'error', text: 'Failed to register proposal. Please contact Prime Life Insurance for support.' });
        }

      }
      catch (error) {
        console.error('payment error:', error);
        setMessage({ type: 'error', text: 'Failed to register proposal. There was an error during registering proposal. Please try again.' });
      } finally {
        setIsLoading(false);
      }

    }
  }



  //////   NKUNGANIRE ////////////////////////


  const HandleRequestFamilyPayment = async () => {
    if (umusigireData.nationalId === '') {
      setMessage({ type: 'error', text: 'Next of Kin National Id is required' });
      return;
    }
    if (umusigireData.firstName === '') {
      setMessage({ type: 'error', text: 'Next of Kin First Name is required' });
      return;
    }
    else if (umusigireData.lastName === '') {
      setMessage({ type: 'error', text: 'Next of Kin Last Name is required' });
      return;
    }
    else if (umusigireData.gender === '') {
      setMessage({ type: 'error', text: 'Next of Kin Gender is required' });
      return;
    }
    else if (umusigireData.relationship === '') {
      setMessage({ type: 'error', text: 'Relationship with Next of Kin is required' });
      return;
    }
    else if (umusigireData.phoneNumber === '') {
      setMessage({ type: 'error', text: 'Next of Kin Phone Number is required' });
      return;
    }
    else if (umusigireData.dateOfBirth === "") {
      setMessage({ type: 'error', text: 'Next of Kin Date Of Birth is required' });
      return;
    }

    else {
      setMessage({ type: 'loading', text: 'Registering proposal... Please wait...' });
      setIsLoading(true);

      try {
        const response = await fetch('https://apps.prime.rw/customerbackend/api/proposal/family', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              "proposalNumber": null,
              "productCategory": familyFormData.category,
              "customerCode": userInfo?.customerCode,
              "frequency": familyFormData.premiumFrequency,
              "paymentMode": "MoMo",
              "Institutions": "MTN Mobile Money",
              "UserName": userInfo?.userName,
              "isSingle": true,
              "numberOfParents": familyFormData.directParent,
              "numberOfInLaws": familyFormData.directParentInLaw,
              "numberOfKids": familyFormData.numberOfChildren,
              "payerPhone": phoneNumber,
              "PolicyTermYears": familyFormData.contributionYears,
              "SavingsPremium": familyFormData.savingPremium,
              "Nextofkinfullname": umusigireData.firstName + " " + umusigireData.lastName,
              "NextofkinFirstname": umusigireData.firstName,
              "NextofkinMiddlename": umusigireData.middleName,
              "NextofkinLastname": umusigireData.lastName,
              "NextofkinGender": umusigireData.gender,
              "NextofkinRelationship": umusigireData.relationship,
              "NextofkinMobileNumber": umusigireData.phoneNumber,
              "NextofkinIdDocumentNumber": umusigireData.nationalId,
              "NextofkinDateOfBirth": umusigireData.dateOfBirth || null,
              "FamilyBeneficiaries": parentBeneficiariesData.map(beneficiary => ({
                "FirstName": beneficiary.firstName,
                "MiddleName": beneficiary.middleName,
                "LastName": beneficiary.lastName,
                "Gender": beneficiary.gender,
                "Relationship": beneficiary.relationship,
                "MobileNumber": beneficiary.phoneNumber,
                "NationalId": beneficiary.nationalId,
                "DateOfBirth": beneficiary.dateOfBirth || null
              })),
            }
          ),
        });

        if (response.ok) {


          const textResponse = await response.text();
          const jsonResponse = JSON.parse(textResponse);
          setProposalNumber(jsonResponse.proposalNumber);
          //console.log("Proposal Number:", jsonResponse.proposalNumber);

          // Call MoMo payment after successful proposal registration
          setMessage({ type: 'success', text: 'Proposal registered successfully! Now processing MoMo payment...' });

          // Call PaymentUsingMomo with the proposal number
          await PaymentUsingMomo(jsonResponse.proposalNumber);

        } else {

          const result2 = await response.text();

          setMessage({ type: 'error', text: 'Failed to register proposal. Please contact Prime Life Insurance for support.' });
        }

      }
      catch (error) {
        console.error('payment error:', error);
        setMessage({ type: 'error', text: 'Failed to register proposal. There was an error during registering proposal. Please try again.' });
      } finally {
        setIsLoading(false);
      }

    }
  }


  ////// INTEGO ////////

  const HandleRequestIntegoPayment = async () => {
    if (umusigireData.nationalId === '') {
      setMessage({ type: 'error', text: 'Next of Kin National Id is required' });
      return;
    }
    if (umusigireData.firstName === '') {
      setMessage({ type: 'error', text: 'Next of Kin First Name is required' });
      return;
    }
    else if (umusigireData.lastName === '') {
      setMessage({ type: 'error', text: 'Next of Kin Last Name is required' });
      return;
    }
    else if (umusigireData.gender === '') {
      setMessage({ type: 'error', text: 'Next of Kin Gender is required' });
      return;
    }
    else if (umusigireData.relationship === '') {
      setMessage({ type: 'error', text: 'Relationship with Next of Kin is required' });
      return;
    }
    else if (umusigireData.phoneNumber === '') {
      setMessage({ type: 'error', text: 'Next of Kin Phone Number is required' });
      return;
    }
    else if (umusigireData.dateOfBirth === "") {
      setMessage({ type: 'error', text: 'Next of Kin Date Of Birth is required' });
      return;
    }

    else {
      setMessage({ type: 'loading', text: 'Registering proposal... Please wait...' });
      setIsLoading(true);

      try {
        const response = await fetch('https://apps.prime.rw/customerbackend/api/proposal/saving', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {

              "PremiumFrequency": savingsFormData.PremiumFrequency,
              "PolicyTermYears": savingsFormData.ContributionYears,
              "BenefitsInYears":1,
              "Premium": savingsFormData.Premium,
              "SumInsured": savingsResults.SumAssured,
              "CustomerCode": userInfo?.customerCode,
              "paymentMode": "MoMo",
              "Institutions": "MTN Mobile Money",
              "UserName2": userInfo?.userName,
              "UserName": userInfo?.userName,
              "isSingle": true,
              "payerPhone": phoneNumber,
              "Nextofkinfullname": umusigireData.firstName + " " + umusigireData.lastName,
              "NextofkinFirstname": umusigireData.firstName,
              "NextofkinMiddlename": umusigireData.middleName,
              "NextofkinLastname": umusigireData.lastName,
              "NextofkinGender": umusigireData.gender,
              "NextofkinRelationship": umusigireData.relationship,
              "NextofkinMobileNumber": umusigireData.phoneNumber,
              "NextofkinIdDocumentNumber": umusigireData.nationalId,
              "NextofkinDateOfBirth": umusigireData.dateOfBirth || null,
            }
          ),
        });

        if (response.ok) {


          const textResponse = await response.text();
          const jsonResponse = JSON.parse(textResponse);
          setProposalNumber(jsonResponse.proposalNumber);
          //console.log("Proposal Number:", jsonResponse.proposalNumber);

          // Call MoMo payment after successful proposal registration
          setMessage({ type: 'success', text: 'Proposal registered successfully! Now processing MoMo payment...' });

          // Call PaymentUsingMomo with the proposal number
          await PaymentUsingMomo(jsonResponse.proposalNumber);

        } else {

          try {
            const errorResponse = await response.text();
            //console.log("Error response:", errorResponse);
            const errorData = JSON.parse(errorResponse);
            
            // Check if there's an errorMessage in the response
            if (errorData.errorMessage) {
              // Display the specific error message from the API
              let displayMessage = errorData.errorMessage;
              
              // If there's a proposal number in the error, include it
              if (errorData.proposalNumber) {
                displayMessage = `Proposal Number: ${errorData.proposalNumber}\n\n${errorData.errorMessage}`;
              }
              
              setMessage({ type: 'warning', text: displayMessage });
            } else {
              // Fallback to generic error message
          setMessage({ type: 'error', text: 'Failed to register proposal. Please contact Prime Life Insurance for support.' });
            }
          } catch (parseError) {
            // If parsing fails, show generic error
           // console.error('Error parsing response:', parseError);
            setMessage({ type: 'error', text: 'Failed to register proposal. Please contact Prime Life Insurance for support.' });
          }
        }

      }
      catch (error) {
       // console.error('payment error:', error);
        setMessage({ type: 'error', text: 'Failed to register proposal. There was an error during registering proposal. Please try again.' });
      } finally {
        setIsLoading(false);
      }

    }
  }

  /////////////////////////////



  const HandleMakaPayMentButton = () => {
    switch (insuranceName) {
      case 'Education Insurance':
        HandleRequestEducationPayment()
        break;
      case 'Employee Protection Insurance':
        HandleRequestEmployeePayment()
        break;
      case 'Nkunganire Insurance':
        HandleRequestNkunganirePayment()
        break;
      case 'Family Insurance':
        HandleRequestFamilyPayment()
        break;
         case 'Intego':
        HandleRequestIntegoPayment()
        break;
      default:
        //console.log("invalid product")

    }
  }










  return (
    <div className="min-h-screen  flex  justify-center px-4 py-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Pay subscription
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            You're one the last step, pay with MTN Mobile Mobile to activate your{' '}
            <span className="font-bold">{insuranceName}</span>, starting from today!
          </p>
        </div>

        {/* Message Display */}
        {message.type && (
          <div className={`p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' :
            message.type === 'error' ? 'bg-red-100 border border-red-400 text-red-700' :
            message.type === 'warning' ? 'bg-yellow-100 border border-yellow-400 text-yellow-800' :
              'bg-blue-100 border border-blue-400 text-blue-700'
            }`}>
            <div className="flex items-start">
              {message.type === 'loading' && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-700 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {message.type === 'success' && (
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {message.type === 'error' && (
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              {message.type === 'warning' && (
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              <span className="font-medium whitespace-pre-line">{message.text}</span>
            </div>
          </div>
        )}

        {/* Amount Due Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="text-blue-500 text-sm font-medium mb-3">
            Total amount due
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-500 text-sm"></div>
              <div className="text-gray-900 font-medium">{insuranceName}</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {amount} {currency}
            </div>
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="space-y-4">
          <div className="text-gray-500 text-sm">
            Pay with Momo.
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Your MoMo number
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="+250 780 000 000"
              />

              {/* MTN MoMo Logo */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div
                  className="flex items-center space-x-2 px-3 py-1 rounded-full"
                  style={{ backgroundColor: '#ffcb05' }}
                >
                  <FaMobileAlt className="text-blue-600 text-sm" />
                  <span className="text-blue-600 text-xs font-semibold">MTN MoMo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Make Payment Button */}
        <button
          onClick={HandleMakaPayMentButton}
          disabled={isLoading}
          className={`w-full font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 ${isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Make payment</span>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Kwishyura;
