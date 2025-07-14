import { useQuery } from "@tanstack/react-query";
import educationStateImage from "../../../assets/education-state.jpg";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const WebsiteStatsSection = () => {
  const axiosSecure = useAxiosSecure();
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  // get total users
  const { data: totalUser = [], isLoading } = useQuery({
    queryKey: ["totalUser"],
    queryFn: async () => {
      const res = await axiosSecure.get("/total-users");
      return res.data;
    },
  });

  // get total classes
  const { data: totalClasses = [] } = useQuery({
    queryKey: ["totalClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/total-classes");
      return res.data;
    },
  });

  // get total classes
  const { data: totalEnrollments = [] } = useQuery({
    queryKey: ["totalEnrollments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/total-enrollments");
      return res.data;
    },
  });


  return (
    <section className="py-10 lg:py-12 w-11/12 mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Left Side - Stats */}
        <div className="w-full md:w-1/2 grid gap-6">
          <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-center md:text-left">
            Platform Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Users */}
            <div className="card bg-[var(--secondary)] shadow-md">
              <div className="card-body">
                <h3 className="card-title text-xl font-semibold">
                  Total Users
                </h3>
                <p ref={ref} className="text-3xl text-primary font-bold">
                  {inView && (
                    <CountUp
                      start={0}
                      duration={2}
                      end={totalUser.totalUsers}
                    ></CountUp>
                  )}
                </p>
              </div>
            </div>

            {/* Total Classes */}
            <div className="card bg-[var(--secondary)] shadow-md">
              <div className="card-body">
                <h3 className="card-title text-xl font-semibold">
                  Total Classes
                </h3>
                <p ref={ref} className="text-3xl text-primary font-bold">
                  {inView && (
                    <CountUp
                      start={0}
                      duration={2}
                      end={totalClasses.totalClasses}
                    ></CountUp>
                  )}
                </p>
              </div>
            </div>

            {/* Total Enrollments */}
            <div className="card bg-[var(--secondary)] shadow-md">
              <div className="card-body">
                <h3 className="card-title text-xl font-semibold">
                  Total Enrollments
                </h3>
                <p ref={ref} className="text-3xl text-primary font-bold">
                  {inView && (
                    <CountUp
                      start={0}
                      duration={2}
                      end={totalEnrollments.totalEnrollments}
                    ></CountUp>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={educationStateImage} // Replace with your own image path
            alt="Education Stats Illustration"
            className="max-w-2xl w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default WebsiteStatsSection;
