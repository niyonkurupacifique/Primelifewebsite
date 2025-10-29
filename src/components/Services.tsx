'use client';

import React from 'react';
import { useRouter } from "next/navigation";

const Services = () => {
  
const router=useRouter()
const HandleNavigate=(productName:string)=>{
  console.log("product name is",productName)
  switch(productName){
    case 'Education':
      router.push('/education')
      window.scrollTo(0, 0);
      break;

       case 'Loan Protection':
      router.push('/loanprotection')
      window.scrollTo(0, 0);
      break;

      case 'Intego':
      router.push('/intego')
      window.scrollTo(0, 0);
      break;

      case 'Family':
      router.push('/family')
      window.scrollTo(0, 0);
      break;

      case 'Group Life':
      router.push('/grouplife')
      window.scrollTo(0, 0);
      break;

      case 'Employee Protection':
      router.push('/employeeprotection')
      window.scrollTo(0, 0);
      break;

      case 'Nkunganire Shoferi':
      router.push('/nkunganire')
      window.scrollTo(0, 0);
      break;

      case 'Umurage w\'Amashuri':
      router.push('/umurage')
      window.scrollTo(0, 0);
      break;

      case 'Ikimina Cyacu':
      router.push('/ikimina')
      window.scrollTo(0, 0);
      break;
      
      default:
      window.alert('Invalid Product')
    
  }

}

  const products = [
    {
      id: 1,
      title: "Education",
      image: "https://apps.prime.rw/customerportal/images/education.png",
    },
    {
      id: 2,
      title: "Employee Protection",
      image: "https://apps.prime.rw/customerportal/images/employee.png",
    },
    {
      id: 3,
      title: "Intego",
      image: "https://apps.prime.rw/customerportal/images/groupLife.png",
    },
    {
      id: 4,
      title: "Nkunganire Shoferi",
      image: "https://apps.prime.rw/customerportal/images/Nkunganire.png",
    },
    {
      id: 5,
      title: "Family",
      image: "https://apps.prime.rw/customerportal/images/family.png",
    },
    {
      id: 6,
      title: "Umurage w'Amashuri",
      image: "https://apps.prime.rw/customerportal/images/education.png",
    },
    {
      id: 7,
      title: "Ikimina Cyacu",
      image: "https://apps.prime.rw/customerportal/images/loan.png",
    },
    {
      id: 8,
      title: "Group Life",
      image: "https://apps.prime.rw/customerportal/images/groupLife.png",
    },
    {
      id: 9,
      title: "Loan Protection",
      image: "https://apps.prime.rw/customerportal/images/loan.png",
    },
  ];

  return (
    <section className="py-16 " id="services">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">
            Our Insurance Products
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Prime Life Insurance offers a wide range of solutions tailored to the needs of individuals, families, employees, and communities in Rwanda.
          </p>
        </div>

        {/* Compact Grid Layout - 4 columns on large screens, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {products.map((product) => (
            <div 
              onClick={() => {HandleNavigate(product.title)}}
              key={product.id}
              className="  bg-white rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105 group"
            >
              {/* Image Container - Reduced height */}
              <div className="h-32 overflow-hidden flex items-center justify-center bg-gray-50">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-24 max-w-24 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content - Only title and learn more link */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-primary mb-3 min-h-[3rem] flex items-center justify-center">
                  {product.title}
                </h3>
                <button
                  onClick={() => {HandleNavigate(product.title)}}
                  className="inline-flex items-center text-secondary font-semibold hover:text-primary transition-colors duration-200"
                >
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;