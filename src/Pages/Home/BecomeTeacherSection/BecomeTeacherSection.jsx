import { Link } from "react-router";
import teacherInspiringImage from "../../../assets/teacher-inspiring.jpg";
import ButtonTwo from "../../../Components/ButtonTwo/ButtonTwo";
import { FaChalkboardTeacher, FaMoneyCheckAlt, FaTools } from "react-icons/fa";

const BecomeTeacherSection = () => {
  return (
    <section className=" bg-[var(--background)] text-[var(--text)]">
      <div className=" p-4 flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left: Content */}
        <div className="w-full lg:w-1/2">
          <h2 data-aos="zoom-in" className="text-2xl lg:text-4xl font-bold mb-4">
            Inspire. Teach. Impact.
          </h2>
          <p data-aos="zoom-in" className="mb-6 leading-relaxed">
            Join a growing community of passionate educators! Share your
            knowledge, connect with thousands of learners, and earn by doing
            what you love. Whether you're a professional teacher or a subject
            expert — our platform is the perfect place to grow your teaching
            career.
          </p>

          <ul data-aos="zoom-in" className="mb-6 space-y-2">
            <li className="flex items-center gap-2">
              <FaChalkboardTeacher className="text-primary" />
              Create & manage your own courses
            </li>
            <li className="flex items-center gap-2">
              <FaMoneyCheckAlt className="text-primary" />
              Get paid for every enrollment
            </li>
            <li className="flex items-center gap-2">
              <FaTools className="text-primary" />
              Access powerful teaching tools
            </li>
          </ul>

          <Link to='/teach' data-aos="zoom-in">
            <ButtonTwo level="Become a Teacher"></ButtonTwo>
          </Link>
        </div>

        {/* Right: Image */}
        <div data-aos="zoom-in" className="w-full lg:w-1/2 flex justify-center">
          <img
            src={teacherInspiringImage}
            alt="Become a Teacher"
            className="max-w-2xl w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default BecomeTeacherSection;
