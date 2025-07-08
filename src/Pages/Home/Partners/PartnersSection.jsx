import { useEffect, useState } from "react";

const PartnersSection = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetch("/partners.json")
      .then((res) => res.json())
      .then((data) => setPartners(data))
      .catch((err) => console.error("Failed to load partners data:", err));
  }, []);

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Trusted Partners</h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          We collaborate with world-class brands to drive innovation in online
          education.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="rounded-xl p-6 transition duration-300"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="text-gray-600 text-sm">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
