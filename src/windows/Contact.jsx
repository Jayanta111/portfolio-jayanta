import React, { useState } from "react";
import WindowWrapper from "../hoc/WindowWrapper.jsx";
import { Mail, Phone, MapPin } from "lucide-react";
import SocialLinks from "../components/SocialLinks.jsx";

function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "cb73a6b3-347d-4e01-bc17-37ac15bbbfd9",
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("Message sent successfully!");
        e.target.reset();
      } else {
        setStatus("Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error sending message.");
    }
  };

  return (
    <div className="flex flex-col border border-gray-700 shadow-2xl bg-[#1c1c1e] text-white w-full h-full rounded-xl overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-center bg-gray-800 border-b border-gray-700 p-4">
        <h1 className="text-2xl font-semibold">Contact Me</h1>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-6 gap-6 overflow-auto items-center">
        {/* PROFILE IMAGE */}
        <img
          src="/Profile.jpg" // replace with your profile image path
          alt="Profile"
          className="w-32 h-32 rounded-full border-2 border-gray-700 object-cover"
        />

        {/* CONTACT INFO */}
        <div className="flex flex-col gap-3 text-gray-300 w-full max-w-md">
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-blue-400" />
            <span>jayantachungkrang3@email.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={18} className="text-green-400" />
            <span>+91 6001450863</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-red-400" />
            <span>Punjab Jaladhar, India</span>
          </div>
        </div>
        <div className="mt-4">
          <SocialLinks size={28} />
        </div>
        {/* CONTACT FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-gray-900 p-6 rounded-lg border border-gray-700 w-full max-w-md"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="p-2 rounded border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="p-2 rounded border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            className="p-2 rounded border border-gray-600 bg-gray-800 text-white h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Send Message
          </button>

          {status && <p className="text-sm text-gray-300 mt-2">{status}</p>}
        </form>
      </div>
    </div>
  );
}

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;
