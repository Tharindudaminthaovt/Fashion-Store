import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="bg-white text-gray-800 container mx-auto mt-8 md:px-24 p-8">
      <h2 className="md:text-4xl text-3xl font-medium md:leading-tight pt-8 pb-5">
        Privacy Policy
      </h2>

      <div className="space-y-6">
        <p>
          At Skye BOutique {/*edit this -done*/}, accessible from{" "}
          <a href="/" className="text-blue-500 underline">
            https://skyeboutique.com/ {/*edit this -done*/}
          </a>
          , protecting your privacy is one of our top priorities. This Privacy
          Policy outlines the information we collect, how we use it, and the
          measures we take to safeguard your data.
        </p>
        <p>
          If you have any questions about this Privacy Policy or need further
          details, please feel free to contact us.
        </p>
        <p>
          This Privacy Policy applies only to information collected through our
          website and does not cover data collected offline or via other
          channels.
        </p>
      </div>

      <div className="space-y-6 pt-5">
        <h3 className="text-2xl font-medium">Consent</h3>
        <p>
          By using our website, you agree to the terms outlined in this Privacy
          Policy.
        </p>

        <h3 className="text-2xl font-medium">Information We Collect</h3>
        <p>
          The personal details we collect include your name, email address,
          phone number, shipping address, and payment details. We gather this
          information to fulfill your orders and provide a seamless shopping
          experience.
        </p>
        <p>
          If you contact us directly, we may also collect details like the
          content of your messages or additional information you provide.
        </p>
        <p>
          When creating an account, you may be asked for your contact
          information, including name, email, and password.
        </p>
      </div>

      <div className="space-y-6 pt-5">
        <h3 className="text-2xl font-medium">How We Use Your Information</h3>
        <p>We use the collected information to:</p>
        <ul className="list-disc pl-8">
          <li>Process and deliver your orders</li>
          <li>Improve our website and services</li>
          <li>Understand your preferences and tailor our offerings</li>
          <li>
            Communicate with you about your orders, promotions, and updates
          </li>
          <li>Ensure website security and prevent fraud</li>
          <li>Send newsletters or promotional emails (with your consent)</li>
        </ul>
      </div>

      <div className="space-y-6 pt-5">
        <h3 className="text-2xl font-medium">Cookies and Tracking</h3>
        <p>
          We use cookies to personalize your experience and analyze website
          performance. Cookies help us remember your preferences, maintain your
          shopping cart, and provide tailored product recommendations.
        </p>

        <h3 className="text-2xl font-medium">Third-Party Services</h3>
        <p>
          We may use third-party services for payment processing, analytics, or
          advertising. These services have their own privacy policies governing
          the use of your data.
        </p>

        <h3 className="text-2xl font-medium">Data Security</h3>
        <p>
          We implement advanced security measures to protect your information
          from unauthorized access, alteration, or disclosure.
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
