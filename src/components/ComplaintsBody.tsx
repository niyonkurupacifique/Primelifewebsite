import { TiTick } from "react-icons/ti";
import ComplaintsForm from "./ComplaintsForm";
import { PhoneCall, Mail } from "lucide-react";

const ComplaintsBody = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
        
        {/* Left section - contact info */}
        <div className="flex flex-col">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center sm:text-left bg-gradient-to-r from-[#003366] to-[#1E3A8A] bg-clip-text text-transparent leading-tight">
            Have an issue? We're here to listen and respond.
          </h2>

          <div className=" mt-16 space-y-6">
            <div>
              <h3 className="text-xl font-semibold underline underline-offset-4 decoration-[#003366] text-[#003366] mb-4">
                Contact Information
              </h3>

              <div className="flex items-center space-x-3 text-gray-700">
                <Mail className="w-5 h-5 text-[#003366]" />
                <a href="mailto:complaints@prime.rw" className="hover:underline">complaints@prime.rw</a>
              </div>

              <div className="flex items-center space-x-3 mt-4 text-gray-700">
                <PhoneCall className="w-5 h-5 text-[#003366]" />
                <a href="tel:0783990335" className="hover:underline">0783 990 335, Toll-free 1320</a>
              </div>

              <div className="flex items-center space-x-3 mt-4 text-gray-700">
                <PhoneCall className="w-5 h-5 text-[#003366]" />
                <a href="https://www.prime.rw" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  www.prime.rw
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right section - complaints form */}
        <div>
          <ComplaintsForm />
        </div>
      </div>
    </section>
  );
};

export default ComplaintsBody;
