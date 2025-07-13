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
    <section className="py-10 lg:py-12 ">
      <div className=" text-center">
        <h2 className="text-3xl font-bold mb-2">Our Partners</h2>
        <p className=" mb-4 max-w-2xl mx-auto">
          We are proud to work with leading organizations who support our
          mission to educate and empower.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 text-[var(--text)]">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="rounded-xl p-6 transition duration-300"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 w-auto  object-contain  filter 
             invert-0 brightness-0 
             dark:invert dark:brightness-100"
                />
              </div>
              <p className=" text-sm">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
