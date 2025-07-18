import { useQuery } from "@tanstack/react-query";
import { FaStar, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const BestTeachers = () => {
  const axiosSecure = useAxiosSecure();
  // get total classes
  const { data: topTeachers = [] } = useQuery({
    queryKey: ["top-teachers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-teachers");
      return res.data;
    },
  });

  return (
    <section className="py-14 lg:py-18">
      <div className=" px-4 text-[var(--text)] overflow-hidden">
        <div data-aos="fade-right" className="border-l-4 border-primary pl-4">
          <h2 className="text-2xl lg:text-4xl font-bold mb-2">Best Teachers</h2>
          <p className="mb-8">
            Learn from industry-leading instructors with years of experience and
            a passion for teaching. <br /> Our best teachers are here to guide
            you every step of the way.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {topTeachers.map((teacher) => (
            <div
            data-aos="fade-up"
              key={teacher.email}
              className="relative group bg-[var(--background)] hover:bg-[var(--secondary)] rounded-xl p-6 text-center hover:shadow-lg transition duration-300 overflow-hidden"
            >
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img
                  src={teacher.photo}
                  alt={teacher.name}
                  className="rounded-full object-cover w-full h-full"
                />
                {/* Hover Social Icons */}
                <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition duration-300">
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    className=" text-sm hover:text-white"
                  >
                    <FaFacebookF  className="text-white"/>
                  </a>
                  <a href="https://x.com/"    target="_blank" className=" text-sm hover:text-white">
                    <FaTwitter className="text-white"/>
                  </a>
                  <a
                    href="https://www.linkedin.com/feed/"
                       target="_blank"
                    className=" text-sm hover:text-white"
                  >
                    <FaLinkedinIn className="text-white"/>
                  </a>
                </div>
              </div>

              <h3 className="text-xl font-semibold ">
                {teacher.name}
              </h3>
              <p className="text-sm  mb-1 capitalize">
                {teacher.category}
              </p>
              {/* <p className="text-sm text-white/80 mb-1">
                Category: {teacher.category}
              </p> */}
              <p className="text-sm  mb-2 capitalize">
                {teacher.experience}
              </p>

             
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestTeachers;
