import React from "react";

const Proposals = () => {
  // Example dummy data for proposals
  const proposals = [
    {
      id: 1,
      title: "Fund Community Hackathon",
      description: "Allocate 500 ICP to sponsor a local hackathon event.",
      status: "Active",
    },
    {
      id: 2,
      title: "Update Governance Rules",
      description: "Change quorum from 50% to 60%.",
      status: "Passed",
    },
    {
      id: 3,
      title: "Partnership with EcoDAO",
      description: "Collaborate on sustainability projects.",
      status: "Rejected",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">DAO Proposals</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          + Create Proposal
        </button>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {proposals.map((proposal) => (
          <div
            key={proposal.id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{proposal.title}</h2>
            <p className="text-sm text-gray-600">{proposal.description}</p>
            <span
              className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${
                proposal.status === "Active"
                  ? "bg-yellow-100 text-yellow-800"
                  : proposal.status === "Passed"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {proposal.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Proposals;
