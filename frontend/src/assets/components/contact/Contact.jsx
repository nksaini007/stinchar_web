// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
// import Nev from "../Nev";

// /**
//  * Compact & Professional Contact Component
//  * Responsive for laptop & mobile
//  * Suitable for Home Solution / Service Platform
//  */

// const Contact = () => {
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmitted(true);
//     setTimeout(() => setSubmitted(false), 3000);
//   };

//   return (
//     <>
//       <Nev />
//       <section className="bg-slate-50 text-slate-800 min-h-screen flex items-center">

//         <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

//           {/* Header */}
//           <div className="mb-10">
//             <h2 className="text-2xl md:text-3xl font-semibold">
//               Contact Support
//             </h2>
//             <p className="text-slate-600 text-sm mt-2 max-w-xl">
//               Need help with construction, interiors, renovation, or repairs?
//               Share your details and our team will contact you.
//             </p>
//           </div>

//           {/* Card */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-xl border border-slate-200 p-4 sm:p-6">

//             {/* Left Info */}
//             <div className="space-y-4">
//               <p className="text-sm font-medium">Quick Support</p>

//               <p className="flex items-center gap-2 text-sm text-slate-600">
//                 <FaPhoneAlt className="text-emerald-600" />
//                 +91 6377011413
//               </p>

//               <p className="flex items-center gap-2 text-sm text-slate-600">
//                 <FaEnvelope className="text-emerald-600" />
//                 officialwhitehk@gmail.com
//               </p>

//               <p className="text-xs text-slate-500 pt-4">
//                 Average response time: under 24 hours
//               </p>
//             </div>

//             {/* Form */}
//             <div className="md:col-span-2">
//               <form
//                 onSubmit={handleSubmit}
//                 className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
//               >
//                 <input
//                   type="text"
//                   placeholder="Full name"
//                   required
//                   className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
//                 />

//                 <input
//                   type="email"
//                   placeholder="Email address"
//                   required
//                   className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
//                 />

//                 <select
//                   required
//                   className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none sm:col-span-2"
//                 >
//                   <option value="">Select service</option>
//                   <option>Construction</option>
//                   <option>Interior Design</option>
//                   <option>Renovation</option>
//                   <option>Repair & Maintenance</option>
//                 </select>

//                 <textarea
//                   rows="3"
//                   placeholder="Short description of your requirement"
//                   required
//                   className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none sm:col-span-2"
//                 />

//                 {submitted ? (
//                   <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="text-emerald-600 text-sm font-medium sm:col-span-2"
//                   >
//                     ✔ Request sent successfully
//                   </motion.p>
//                 ) : (
//                   <motion.button
//                     whileTap={{ scale: 0.97 }}
//                     type="submit"
//                     className="bg-emerald-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-emerald-700 transition sm:col-span-2 w-full sm:w-fit"
//                   >
//                     Submit
//                   </motion.button>
//                 )}
//               </form>
//             </div>
//           </div>

//           {/* Footer */}
//           <p className="text-xs text-slate-500 mt-8">
//             © {new Date().getFullYear()} Start 2 Pvt. Ltd.
//           </p>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Contact;
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaUserTie } from "react-icons/fa";
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
      <section className="bg-slate-50 text-slate-800 min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* --- About Me / CEO Section --- */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 items-center bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200">
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-emerald-500 shadow-lg">
                {/* Replace src with your actual image path */}
                <img 
                  src="/your-profile-pic.jpg" 
                  alt="NK Saini - CEO Stinchar" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 bg-emerald-600 w-full text-center py-1 text-white text-xs font-bold uppercase tracking-wider">
                  CEO & Founder
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">NK Saini</h1>
              <p className="text-emerald-600 font-semibold text-lg flex items-center gap-2">
                <FaUserTie /> CEO of Stinchar | Data Scientist
              </p>
              <div className="text-slate-600 leading-relaxed space-y-3">
                <p>
                  As an <strong>MCA graduate</strong> and a seasoned <strong>Data Scientist</strong>, I bridge the gap between advanced technology and the core construction industry. I am the son of Mr. KK Saini, driven by a vision to modernize how building materials move.
                </p>
                <p>
                  At <strong>Stinchar</strong>, we are building a complete construction supply chain solution. We don't just supply materials; we optimize the entire ecosystem—from procurement to delivery—ensuring transparency, efficiency, and quality for every project.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm border border-slate-200">Age: 24</span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm border border-slate-200">MCA Graduate</span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm border border-slate-200">Supply Chain Expert</span>
              </div>
            </div>
          </div>

          <hr className="border-slate-200 mb-16" />

          {/* --- Contact Section --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold">Get in Touch</h2>
            <p className="text-slate-600 text-sm mt-2 max-w-xl">
              Have questions about Stinchar or a construction project? Let's connect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
            {/* Left Info */}
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Direct Contact</p>
              
              <div className="space-y-3">
                <a href="tel:+916377011413" className="flex items-center gap-3 text-sm text-slate-600 hover:text-emerald-600 transition">
                  <FaPhoneAlt className="text-emerald-600" />
                  +91 6377011413
                </a>
                <a href="mailto:officialwhitehk@gmail.com" className="flex items-center gap-3 text-sm text-slate-600 hover:text-emerald-600 transition">
                  <FaEnvelope className="text-emerald-600" />
                  officialwhitehk@gmail.com
                </a>
              </div>

              <p className="text-xs text-slate-500 pt-6">
                Based in Alwar, Rajasthan. <br />
                Available for consultations and strategic partnerships.
              </p>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50"
                />
                <select
                  required
                  className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none sm:col-span-2 bg-slate-50"
                >
                  <option value="">Nature of Inquiry</option>
                  <option>Supply Chain Partnership</option>
                  <option>Construction Materials</option>
                  <option>Project Consultation</option>
                  <option>Other</option>
                </select>
                <textarea
                  rows="4"
                  placeholder="How can Stinchar help you today?"
                  required
                  className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none sm:col-span-2 bg-slate-50"
                />

                {submitted ? (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-600 text-sm font-semibold sm:col-span-2 flex items-center gap-2"
                  >
                    ✔ Message received! I will get back to you personally.
                  </motion.p>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="bg-emerald-600 text-white rounded-lg px-8 py-3 text-sm font-bold hover:bg-emerald-700 shadow-md transition sm:col-span-2 w-full sm:w-fit"
                  >
                    Send Message
                  </motion.button>
                )}
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center border-t border-slate-200 pt-8">
            <p className="text-xs text-slate-500 uppercase tracking-widest">
              © {new Date().getFullYear()} Stinchar | Built by NK Saini
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;