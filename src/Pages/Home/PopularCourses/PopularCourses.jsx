import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import './style.css'
import { Link } from "react-router";

const PopularCourses = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: topClasses = [],
    isLoading,
  } = useQuery({
    queryKey: ["top-enrolled-classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-enrolled-classes");
      return res.data;
    },
  });
  if(isLoading){
    return <Loading></Loading>
  }

 
  return (
    <section className="py-10 lg:py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-2"> Popular Courses</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          These courses are trending right now based on highest enrollment.
        </p>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          className="!px-2"
        >
          {topClasses.map((course) => (
            <SwiperSlide key={course.id}>
              <div className="bg-[var(--secondary)] rounded-xl flex flex-col justify-between p-6 shadow hover:shadow-md transition text-left h-[350px]">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-40 w-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-sm mb-3">
                  {course.description.slice(0, 100)}...
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="bg-primary px-3 py-1.5 rounded-2xl text-white">
                    Enrolled: {course.enrollments}
                  </span>
                 <Link to={`/class/${course._id}`} className="text-primary font-semibold">
                    View Details →
                 </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularCourses;
