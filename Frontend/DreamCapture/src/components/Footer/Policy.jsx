import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-cyan-500 dark:bg-gradient-to-br dark:from-sky-600 dark:to-teal-900 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text p-6 sm:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
        <p className="text-lg leading-relaxed mb-4">
          At Dream Capture, your privacy is a top priority. We are committed to protecting your personal data and ensuring transparency in how we use it.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>We collect and store only the necessary data to provide our services.</li>
          <li>Your data will never be shared with third parties without your explicit consent.</li>
          <li>We use encryption and secure storage to safeguard your information.</li>
        </ul>
        <p className="text-lg mt-6">
          For any questions about our privacy practices, feel free to contact us.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
