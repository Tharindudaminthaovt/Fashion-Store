import React from "react";

const Disclaimer = () => {
  return (
    <section className="bg-white text-gray-800 container mx-auto mt-8 p-8">
      <h2 className="md:text-4xl text-3xl font-medium text-center md:leading-tight pt-8 pb-5">
        Disclaimer
      </h2>

      <div className="space-y-6 md:px-24">
        <p>
          The information provided on Skye Boutique {/*edit this*/} is for
          general informational purposes only. While we strive to ensure the
          accuracy and reliability of the information presented, we make no
          guarantees or warranties of any kind, express or implied, regarding
          the completeness, accuracy, or availability of the content.
        </p>

        <p>
          Any reliance you place on the information provided on this website is
          strictly at your own risk. We are not responsible for any errors or
          omissions or for the results obtained from the use of this
          information.
        </p>

        <p>
          Skye Boutique {/*edit this*/} is not liable for any direct, indirect,
          incidental, or consequential damages arising out of or in connection
          with the use or inability to use our website, products, or services.
        </p>

        <p>
          Prices, availability, and product descriptions are subject to change
          without notice. While we endeavor to keep product images and
          descriptions accurate, there may be slight variations due to screen
          differences, photography, or manufacturing processes.
        </p>

        <p>
          For questions or concerns regarding this disclaimer, please contact us
          at{" "}
          <a
            href="mailto:support@skyeboutique.com" //edit this
            className="text-blue-500 underline"
          >
            support@yourstore.com {/*edit this*/}
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default Disclaimer;
