import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';


const popularCourses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    image: "/images/webdev.jpg",
    description: "Learn to build modern web applications with React, Node.js, and MongoDB.",
    enrollment: 1200,
  },
  {
    id: 2,
    title: "Digital Marketing Mastery",
    image: "/images/marketing.jpg",
    description: "Master SEO, social media, and paid campaigns in this comprehensive course.",
    enrollment: 950,
  },
  {
    id: 3,
    title: "Graphic Design for Beginners",
    image: "/images/design.jpg",
    description: "Start your journey in design with tools like Photoshop and Illustrator.",
    enrollment: 780,
  },
  {
    id: 4,
    title: "Full Stack Web Development",
    image: "/images/webdev.jpg",
    description: "Learn to build modern web applications with React, Node.js, and MongoDB.",
    enrollment: 1200,
  },
  {
    id: 5,
    title: "Digital Marketing Mastery",
    image: "/images/marketing.jpg",
    description: "Master SEO, social media, and paid campaigns in this comprehensive course.",
    enrollment: 950,
  },
  {
    id: 6,
    title: "Graphic Design for Beginners",
    image: "/images/design.jpg",
    description: "Start your journey in design with tools like Photoshop and Illustrator.",
    enrollment: 780,
  },
  // Add 3 more if you want
];

const PopularCourses = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6"> Popular Courses</h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
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
          {popularCourses.map((course) => (
            <SwiperSlide key={course.id}>
              <div className="bg-white border rounded-xl p-6 shadow hover:shadow-md transition text-left h-full">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-40 w-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{course.description.slice(0, 100)}...</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="badge badge-info text-white">
                    Enrolled: {course.enrollment}
                  </span>
                  <span className="text-primary font-semibold">View Details →</span>
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
