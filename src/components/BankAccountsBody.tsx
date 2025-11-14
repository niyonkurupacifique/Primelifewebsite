'use client';

import React from "react";

type BankAccount = {
  id: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
};

const bankAccounts: BankAccount[] = [
  { id: 1, bankName: 'BK', accountNumber: '00040-00409747-52', accountName: 'PRIME LIFE INSURANCE' },
  { id: 2, bankName: 'BPR', accountNumber: '4410743392', accountName: 'PRIME LIFE INSURANCE' },
  { id: 3, bankName: 'EQUITY', accountNumber: '4002200202910', accountName: 'PRIME LIFE INSURANCE' },
  { id: 4, bankName: 'I&M', accountNumber: '25042928001', accountName: 'PRIME LIFE INSURANCE' },
  { id: 5, bankName: 'GT', accountNumber: '2150008008', accountName: 'PRIME LIFE INSURANCE' },
  { id: 6, bankName: 'ACCESS', accountNumber: '10021001026339 01', accountName: 'PRIME LIFE INSURANCE' },
  { id: 7, bankName: 'ECOBANK', accountNumber: '6775009741', accountName: 'PRIME LIFE INSURANCE' },
  { id: 8, bankName: 'ZIGAMA CSS', accountNumber: '7022881', accountName: 'PRIME LIFE INSURANCE' },
  { id: 9, bankName: 'COPEDU LTD', accountNumber: '1008020109292', accountName: 'PRIME LIFE INSURANCE' },
  { id: 10, bankName: 'UNGUKA BANK', accountNumber: '10100457480017', accountName: 'PRIME LIFE INSURANCE' },
  { id: 11, bankName: 'URWEGO BANK', accountNumber: '1117773180111', accountName: 'PRIME LIFE INSURANCE' },
  { id: 12, bankName: 'MWARIMU SACCO', accountNumber: '120238', accountName: 'PRIME LIFE INSURANCE' },
  { id: 13, bankName: 'BANK OF AFRICA', accountNumber: '01702900007', accountName: 'PRIME LIFE INSURANCE' },
  { id: 14, bankName: 'DUTERIMBERE', accountNumber: '406-1062685-00', accountName: 'PRIME LIFE INSURANCE' },
  { id: 15, bankName: 'GOSHEN', accountNumber: '000.201400.117803', accountName: 'PRIME LIFE INSURANCE' },
  { id: 16, bankName: 'JALI SAVINGS', accountNumber: '421-2000023-00', accountName: 'PRIME LIFE INSURANCE' },
  { id: 17, bankName: 'MUGANGA SACCO', accountNumber: '1001005011595', accountName: 'PRIME LIFE INSURANCE' },
  { id: 18, bankName: 'NCBA', accountNumber: '2001161020000300', accountName: 'PRIME LIFE INSURANCE' },
  { id: 19, bankName: 'UMUTANGUHA', accountNumber: '1010025024266', accountName: 'PRIME LIFE INSURANCE' },
  { id: 20, bankName: 'Mobile Money', accountNumber: '*182*8*1*002211#', accountName: 'PRIME LIFE INSURANCE' }
];

const BankAccountsBody: React.FC = () => {
  return (
    <section className="w-full bg-[#F7FAFC] py-10 sm:py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003366]">Prime Life Insurance Accounts</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Use the following bank details or Mobile Money to make payments.</p>
        </div> */}

        <div className=" border  border-[#00b0ef]  rounded-xl overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#e0e4e9] text-black">
                <tr>
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">ACCT No</th>
                  <th className="px-4 py-3 font-semibold">Account Name</th>
                </tr>
              </thead>
              <tbody>
                {bankAccounts.map(account => (
                  <tr key={account.id} className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap font-mono text-gray-800 font-medium">{account.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-mono text-gray-800 font-medium">{account.bankName}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-mono text-gray-800 font-medium">{account.accountNumber}</td>
                    <td className="px-4 py-3 whitespace-nowrap  font-mono text-gray-800 font-medium">{account.accountName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 sm:px-6 py-3 bg-gray-50 text-xs sm:text-sm text-gray-600">
            Mobile Money: dial <span className="font-mono font-semibold text-gray-900">*182*8*1*002211#</span> and follow prompts.
          </div>
        </div>
      </div>
    </section>
  );
};

export default BankAccountsBody;


