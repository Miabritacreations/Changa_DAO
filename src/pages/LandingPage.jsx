import { motion } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  Rocket,
  Shield,
  Zap
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400">
              Empowering Change with Changa DAO
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-xl">
              Join a decentralized community committed to driving impact and
              innovation across Africa. Govern, fund, and grow together.
            </p>
            <div className="mt-8 flex gap-4 justify-center lg:justify-start">
              <button className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition shadow-lg">
                Get Started
              </button>
              <button className="px-6 py-3 rounded-xl border border-gray-400 hover:bg-gray-800 transition flex items-center gap-2">
                <PlayCircle size={18} />
                Watch Video
              </button>
            </div>
          </motion.div>

          {/* Video Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center"
          >
            <div className="w-full max-w-md h-64 rounded-2xl bg-gray-700 flex items-center justify-center shadow-xl">
              <span className="text-gray-400">[ Video Placeholder ]</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black/40">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { value: "10K+", label: "Community Members" },
            { value: "$5M+", label: "Funds Raised" },
            { value: "200+", label: "Projects Supported" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-md shadow-lg"
            >
              <h3 className="text-4xl font-bold text-indigo-400">
                {stat.value}
              </h3>
              <p className="mt-2 text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">
            Why Choose <span className="text-indigo-400">Changa DAO?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Rocket,
                title: "Decentralized Governance",
                desc: "Every voice counts. Members propose, vote, and shape the DAO's future.",
              },
              {
                icon: Shield,
                title: "Secure & Transparent",
                desc: "Blockchain-powered security ensures all transactions are open and tamper-proof.",
              },
              {
                icon: Zap,
                title: "Fast & Scalable",
                desc: "Built to grow with the community, enabling rapid impact and innovation.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gray-800/60 backdrop-blur-lg shadow-lg hover:shadow-2xl hover:scale-105 transition transform"
              >
                <feature.icon className="mx-auto h-12 w-12 text-indigo-400" />
                <h3 className="mt-6 text-2xl font-semibold">{feature.title}</h3>
                <p className="mt-4 text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-6"
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to be part of the future?
          </h2>
          <p className="text-lg mb-8">
            Join Changa DAO today and shape the next generation of community
            governance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition">
              Join Now
            </button>
            <button className="px-6 py-3 rounded-xl border border-white hover:bg-white/10 transition flex items-center gap-2">
              Learn More <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
