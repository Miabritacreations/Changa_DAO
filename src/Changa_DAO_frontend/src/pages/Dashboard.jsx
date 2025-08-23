import React from "react";

const Dashboard = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-800">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-10">🌍 Changa DAO</h1>

      {/* About Us */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">About Us</h2>
        <p>
          Changa DAO is a blockchain-powered crowdfunding platform that helps
          communities bring real-world social projects to life. From schools and
          boreholes to health clinics, we enable communities to raise funds
          transparently, track progress with geo-tagged proof, and release funds
          milestone by milestone.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p>
            To empower communities to build sustainable social projects by
            creating a trusted, transparent, and decentralized funding
            ecosystem.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
          <p>
            A world where every community has the resources to create lasting
            change—powered by transparency, collaboration, and blockchain
            innovation.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Transparency</strong> – Every transaction and milestone is
            verifiable on-chain.
          </li>
          <li>
            <strong>Community Ownership</strong> – Local stakeholders govern
            their own projects through DAO voting.
          </li>
          <li>
            <strong>Accountability</strong> – Funds are released only when
            milestones are verified.
          </li>
          <li>
            <strong>Impact First</strong> – Every project must create tangible
            benefits for people on the ground.
          </li>
          <li>
            <strong>Sustainability</strong> – We focus on solutions that last
            for generations, not just quick fixes.
          </li>
        </ul>
      </section>

      {/* How it works */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Communities propose projects (schools, boreholes, clinics…)</li>
          <li>Fundraising via NFTs (donors & investors get proof tokens)</li>
          <li>
            Milestone-based funding (funds released only after verification)
          </li>
          <li>
            Impact tracking with geo-tagged media + transparent dashboards
          </li>
        </ol>
      </section>

      {/* Why Changa DAO */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why Changa DAO</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Tokenized real-world projects</li>
          <li>Fraud-proof milestone funding</li>
          <li>Geo-tagged impact proof</li>
          <li>Local DAO governance</li>
          <li>Dual ROI – financial + social impact</li>
        </ul>
      </section>

      {/* Team */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <p>
          We are a collective of innovators, technologists, and community
          leaders passionate about using blockchain to drive real-world change.
          (👉 Add founder names, roles, and photos here later for credibility).
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
        <div className="space-y-4">
          <p>
            <strong>Q:</strong> What is Changa DAO?
            <br />
            <strong>A:</strong> A platform that combines crowdfunding,
            blockchain, and DAO governance to fund real-world community
            projects.
          </p>
          <p>
            <strong>Q:</strong> How do I fund a project?
            <br />
            <strong>A:</strong> Choose a project, connect your wallet (or use
            mobile money/fiat), and purchase NFTs to contribute.
          </p>
          <p>
            <strong>Q:</strong> Can I invest without crypto knowledge?
            <br />
            <strong>A:</strong> Yes! We support mobile-friendly wallets, fiat
            payments, and easy onboarding for non-crypto users.
          </p>
          <p>
            <strong>Q:</strong> How are projects verified?
            <br />
            <strong>A:</strong> Through geo-tagged photos/videos, DAO votes, and
            milestone-based smart contracts.
          </p>
          <p>
            <strong>Q:</strong> What returns can I expect?
            <br />
            <strong>A:</strong> Donors receive proof-of-impact NFTs. Investors
            in revenue-generating projects receive revenue shares or tokenized
            returns.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-gray-100 p-6 rounded-2xl shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>📧 Email: hello@changadao.org</p>
        <p>🌍 Social: Twitter | LinkedIn | Telegram | Instagram</p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Submit a Project
        </button>
      </section>
    </div>
  );
};

export default Dashboard;
