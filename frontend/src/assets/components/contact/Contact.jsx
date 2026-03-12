import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaUserTie } from "react-icons/fa";
import Nev from "../Nev";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <Nev />

      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}

          <div className="text-center mb-16">

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Contact <span className="text-cyan-400">Leadership</span>
            </h1>

            <p className="text-slate-400 mt-4 max-w-xl mx-auto">
              Connect with the leadership team of Stinchar for partnerships,
              construction supply collaboration, and digital innovation in the
              construction ecosystem.
            </p>

          </div>

          {/* GRID */}

          <div className="grid md:grid-cols-2 gap-10">

            {/* PROFILE CARD */}

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-10 shadow-xl">

              <div className="flex flex-col items-center text-center">

                <img
                  src="https://i.ibb.co/ynzJtjbY/Whats-App-Image-2026-03-01-at-1-52-34-PM.jpg"
                  alt="NK Saini"
                  className="w-40 h-40 rounded-full object-cover border-4 border-cyan-400 shadow-lg"
                />

                <h2 className="text-2xl font-bold mt-5">
                  NK Saini
                </h2>

                <p className="text-cyan-400 flex items-center gap-2 mt-1">
                  <FaUserTie />
                  CEO & Founder
                </p>

                <p className="text-slate-400 text-sm mt-1">
                  Data Scientist • MCA Graduate
                </p>

              </div>

              <div className="mt-6 text-slate-300 text-sm leading-relaxed">

                <p>
                  NK Saini founded Stinchar to bring technology innovation into
                  the construction supply ecosystem. The goal is to connect
                  builders, architects, suppliers, and logistics through one
                  intelligent digital platform.
                </p>

                <p className="mt-3">
                  His work focuses on building scalable systems that improve
                  transparency, reduce supply delays, and optimize project
                  management through data and software.
                </p>

              </div>

              <div className="mt-8 space-y-3 text-sm">

                <div className="flex items-center gap-3 text-slate-300">
                  <FaPhoneAlt className="text-cyan-400" />
                  +91 6377011413
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <FaEnvelope className="text-cyan-400" />
                  officialwhitehk@gmail.com
                </div>

              </div>

            </div>

            {/* CONTACT FORM */}

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-10 shadow-xl">

              <h3 className="text-2xl font-semibold mb-6">
                Send Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">

                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400 outline-none"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400 outline-none"
                />

                <select
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400 outline-none"
                >
                  <option value="">Select Inquiry</option>
                  <option>Supply Partnership</option>
                  <option>Construction Materials</option>
                  <option>Project Consultation</option>
                  <option>Other</option>
                </select>

                <textarea
                  rows="4"
                  placeholder="Write your message"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400 outline-none"
                />

                {submitted ? (

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-400 text-sm"
                  >
                    ✔ Message sent successfully
                  </motion.p>

                ) : (

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition"
                  >
                    Send Message
                  </motion.button>

                )}

              </form>

            </div>

          </div>

          {/* FOOTER */}

          <div className="text-center mt-16 text-xs text-slate-500 tracking-widest">
            © {new Date().getFullYear()} STINCHAR
          </div>

        </div>

      </section>
    </>
  );
};

export default Contact;