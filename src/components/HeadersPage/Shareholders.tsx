import React from 'react'

const Shareholders: React.FC = () => {
  const shareholdersData = [
    {
      name: "FINAFRICA",
      totalShares: "11,769.3159",
      percentage: "51%"
    },
    {
      name: "SP",
      totalShares: "10,563.30718",
      percentage: "45.7740%"
    },
    {
      name: "ASSINAPOL",
      totalShares: "600.000",
      percentage: "2.600%"
    },
    {
      name: "Amb. Joseph Nsengimana",
      totalShares: "144.4625834",
      percentage: "0.626%"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
       

        {/* Shareholders Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-primary">
              Shareholding Structure of Prime Life Insurance Ltd
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Name of Shareholder
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                    Total Shares
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {shareholdersData.map((shareholder, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {shareholder.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-center">
                      {shareholder.totalShares}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-center font-semibold">
                      {shareholder.percentage}
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-secondary/10 border-t-2 border-secondary">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    Grand Total
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 text-center">
                    23,077.09
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 text-center">
                    100.0%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        

       
       
      </div>
    </section>
  )
}

export default Shareholders 