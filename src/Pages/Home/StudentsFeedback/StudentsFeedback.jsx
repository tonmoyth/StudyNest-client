import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import StarRatings from "react-star-ratings";

const StudentsFeedback = () => {
  const axiosSecure = useAxiosSecure();
  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feedbacks");
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  console.log(feedbacks);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl lg:text-4xl font-bold mb-2"> Students Feedback</h2>
        <p className="mb-8 max-w-xl mx-auto">
          See what our learners have to say about their classes and instructors.
        </p>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
        >
          {feedbacks.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="text-start bg-[var(--background)] space-y-4 shadow-lg flex flex-col justify-between rounded-xl p-6 h-[330px]">
                <p className="text-2xl font-semibold">{item.title}</p>
                <StarRatings
                  rating={item.rating}
                  starRatedColor="#5e4cc8"
                  numberOfStars={5}
                  starDimension="34px" 
                  starSpacing="4px"
                  name="rating"
                />
                <p>{item.description}</p>
                <div className="flex items-center gap-4">
                  <img
                    src={item.studentImage}
                    alt={item.studentName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold">{item.studentName}</h4>
                    <p className="text-sm">student</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default StudentsFeedback;
