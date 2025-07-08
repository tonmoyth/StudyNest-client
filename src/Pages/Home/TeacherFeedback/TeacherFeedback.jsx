import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


const feedbacks = [
  {
    feedback: "The teacher explained every concept with clarity. Loved the energy!",
    name: "Fatima Ahmed",
    image: "/images/students/fatima.jpg",
    title: "Full Stack Web Development",
  },
  {
    feedback: "I had zero design background, but now I feel confident using Figma.",
    name: "Arif Chowdhury",
    image: "/images/students/arif.jpg",
    title: "UI/UX Design Essentials",
  },
  {
    feedback: "Assignments and quizzes kept me engaged throughout the course.",
    name: "Sneha Paul",
    image: "/images/students/sneha.jpg",
    title: "Digital Marketing Fundamentals",
  },
  {
    feedback: "The teacher explained every concept with clarity. Loved the energy!",
    name: "Fatima Ahmed",
    image: "/images/students/fatima.jpg",
    title: "Full Stack Web Development",
  },
  {
    feedback: "I had zero design background, but now I feel confident using Figma.",
    name: "Arif Chowdhury",
    image: "/images/students/arif.jpg",
    title: "UI/UX Design Essentials",
  },
  {
    feedback: "Assignments and quizzes kept me engaged throughout the course.",
    name: "Sneha Paul",
    image: "/images/students/sneha.jpg",
    title: "Digital Marketing Fundamentals",
  },
];


const TeacherFeedbackCarousel = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6"> Teacher Feedback</h2>
        <p className="text-gray-600 mb-10 max-w-xl mx-auto">
          See what our learners have to say about their classes and instructors.
        </p>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
        >
          {feedbacks.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
                <p className="text-gray-700 mb-4 italic">“{item.feedback}”</p>
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.title}</p>
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

export default TeacherFeedbackCarousel;
