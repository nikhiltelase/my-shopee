import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

function Contact() {
  const [query, setQuery] = useState("");

  const handleSendMessage = async () => {
    if (query.trim() === "") {
      alert("Please enter your query.");
      return;
    }

    // Replace with your API endpoint and necessary headers
    const response = await fetch("/api/send-query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (response.ok) {
      alert("We received your mail. We will contact you shortly.");
      setQuery(""); // Clear the input field
    } else {
      alert("Failed to send your query. Please try again later.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center sm:h-[580px] sm:mt-7 sm:py-10 px-2 sm:px-4 rounded-lg shadow-lg bg-white ">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 text-gray-700 mt-4">
        Contact Us
      </h2>
      <div className="flex flex-col sm:flex-row items-center w-full max-w-2xl mb-4 sm:mb-12">
        <textarea
          placeholder="What is your query?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className=" sm:w-3/4 px-2 pt-2 sm:py-1 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSendMessage}
          className="w-full sm:w-1/4 mt-2 sm:mt-0 sm:ml-4 p-2 sm:p-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Send Message
        </button>
      </div>

      <div className="flex flex-row justify-around w-full max-w-3xl mt-4 sm:mt-0 sm:mb-12">
        <a href="tel:+918305230871">
          <div className="flex flex-col items-center mb-8 sm:mb-0">
            <FaPhoneAlt className="text-xl sm:text-2xl cursor-pointer text-blue-600 " />
            <span className="text-sm sm:text-lg text-gray-600">Call Us</span>
          </div>
        </a>
        <a href="mailto:nikhiltelase@gmail.com">
          <div className="flex flex-col items-center mb-8 sm:mb-0">
            <FaEnvelope className="text-xl sm:text-2xl cursor-pointer text-blue-600 " />
            <span className="text-sm sm:text-lg text-gray-600">Email Us</span>
          </div>
        </a>
        <a href="https://wa.me/918305230871">
          <div className="flex flex-col items-center">
            <FaWhatsapp className="text-xl sm:text-2xl cursor-pointer text-blue-600 " />
            <span className="text-sm sm:text-lg text-gray-600">WhatsApp</span>
          </div>
        </a>
      </div>

      <div className="flex flex-col sm:flex-row w-full max-w-3xl pb-5">
        <div className="w-full sm:w-1/2 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Address</h3>
          <p className="text-gray-600">
            183, Near Shree Ram Mandir,
            <br />
            Garra, Waraseoni,
            <br />
            ZIP Code: 481335
          </p>
        </div>
        <div className="w-full sm:w-1/2 p-4 mt-4 sm:mt-0 sm:ml-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Location</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d551.1043757896747!2d80.04680535114076!3d21.68821342236753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2af904b5b6ad27%3A0xabe374e7fbc1355e!2sShree%20Ram%20Mandir%20Garra!5e0!3m2!1sen!2sin!4v1723387552016!5m2!1sen!2sin"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Map Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
