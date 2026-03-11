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

      <section className="bg-slate-100 min-h-screen py-16">

        <div className="max-w-7xl mx-auto px-6">

          {/* PAGE HEADER */}

          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-slate-900">
              Contact & Leadership
            </h1>
            <p className="text-slate-600 mt-3 max-w-xl mx-auto">
              Connect with the leadership team of Stinchar for partnerships,
              material supply inquiries, or technology collaboration.
            </p>
          </div>

          {/* MAIN GRID */}

          <div className="grid md:grid-cols-2 gap-10">

            {/* ================= LEFT PROFILE PANEL ================= */}

            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">

              <div className="flex flex-col items-center text-center">

                <img
                  src="https://i.ibb.co/ynzJtjbY/Whats-App-Image-2026-03-01-at-1-52-34-PM.jpg"
                  alt="NK Saini"
                  className="w-40 h-40 rounded-full object-cover border-4 border-emerald-500"
                />

                <h2 className="text-2xl font-bold text-slate-900 mt-4">
                  NK Saini
                </h2>

                <p className="text-emerald-600 font-medium flex items-center gap-2 mt-1">
                  <FaUserTie />
                  CEO & Founder
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Data Scientist • MCA Graduate
                </p>

              </div>

              <div className="mt-6 text-slate-600 text-sm leading-relaxed">

                <p>
                  NK Saini is the founder of Stinchar, a technology-driven
                  platform designed to modernize the construction supply
                  chain. His vision is to connect builders, suppliers,
                  and logistics systems through a digital ecosystem.
                </p>

                <p className="mt-3">
                  With expertise in data science and software systems,
                  he focuses on creating efficient, transparent,
                  and scalable solutions for the construction industry.
                </p>

              </div>

              <div className="mt-8 space-y-3">

                <div className="flex items-center gap-3 text-sm">
                  <FaPhoneAlt className="text-emerald-600" />
                  +91 6377011413
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <FaEnvelope className="text-emerald-600" />
                  officialwhitehk@gmail.com
                </div>

              </div>

            </div>

            {/* ================= CONTACT FORM ================= */}

            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">

              <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                Send a Message
              </h3>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />

                <select
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="">Select Inquiry Type</option>
                  <option>Supply Chain Partnership</option>
                  <option>Construction Materials</option>
                  <option>Project Consultation</option>
                  <option>Other</option>
                </select>

                <textarea
                  rows="4"
                  placeholder="Write your message"
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />

                {submitted ? (

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-emerald-600 text-sm font-medium"
                  >
                    ✔ Message sent successfully
                  </motion.p>

                ) : (

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
                  >
                    Send Message
                  </motion.button>

                )}

              </form>

            </div>

          </div>

          {/* FOOTER */}

          <div className="text-center mt-16">
            <p className="text-xs text-slate-500 uppercase tracking-widest">
              © {new Date().getFullYear()} Stinchar
            </p>
          </div>

        </div>

      </section>
    </>
  );
};

export default Contact;