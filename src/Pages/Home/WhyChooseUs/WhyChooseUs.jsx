import { FaAward, FaChalkboardTeacher, FaLock, FaHeadset } from "react-icons/fa";
import ButtonTwo from "../../../Components/ButtonTwo/ButtonTwo";
import { Link } from "react-router";

const features = [
  {
    icon: <FaAward size={32} className="text-primary" />,
    title: "High Quality Courses",
    description:
      "Expert-curated content with real-world applications to boost your career and skills.",
  },
  {
    icon: <FaChalkboardTeacher size={32} className="text-primary" />,
    title: "Expert Instructors",
    description:
      "Learn from experienced educators and industry professionals who care about your success.",
  },
  {
    icon: <FaLock size={32} className="text-primary" />,
    title: "Lifetime Access",
    description:
      "Get unlimited access to your enrolled courses and revisit lessons anytime you want.",
  },
  {
    icon: <FaHeadset size={32} className="text-primary" />,
    title: "Dedicated Support",
    description:
      "We’re here to help — our support team is available 24/7 for your learning needs.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16  bg-[var(--background)] text-[var(--text)] transition-colors duration-300">
      <div className="px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 data-aos="zoom-in" className="text-4xl font-bold mb-4 text-[var(--text)]">
            Why Choose Us?
          </h2>
          <p data-aos="zoom-in" className="text-[var(--text)/80] mb-4">
            At StudyNest, we empower learners and educators to achieve more through quality education and seamless tools.
          </p>
          <p data-aos="zoom-in" className="text-[var(--text)/70] mb-6">
            From industry-standard courses to 24/7 support, we are dedicated to creating the best learning experience for you.
          </p>
          <Link data-aos="zoom-in" to='/classes'>
            <ButtonTwo level='Learn More'></ButtonTwo>
          </Link>
        </div>

        {/* Right Feature List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div data-aos="zoom-in" key={index} className="flex gap-4 items-start">
              <div>{feature.icon}</div>
              <div>
                <h4 className="text-lg font-semibold text-[var(--text)]">
                  {feature.title}
                </h4>
                <p className="text-sm text-[var(--text)/70]">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
