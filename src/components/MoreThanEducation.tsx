import React from "react";

const MoreThanEducation: React.FC = () => {
  return (
    <section className=" py-12 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#003366] mb-4">
            More than just Education Insurance...
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Planning for your child’s education is a critical part of their success in later life.
            Prime Life Education policies help you to set aside the funds needed to guarantee their
            education. The policy enables you to save money and to provide for your children even if
            you or another parent passes away or is permanently disabled. It is insurance that is
            taken by a parent or guardian to paying for children’s education in the future. Whether
            parents are alive or not, children study in the school of parent dreams.
          </p>
          
        </div>

        {/* Image */}
        <div>
          <img style={{width:'580px',height:'460px'}}   
            src="/educationInsuranceImageEdited.png"
            alt="Education Insurance"
            className="rounded-xl w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default MoreThanEducation;
