import teacherInspiringImage from '../../../assets/teacher-inspiring.jpg'

const BecomeTeacherSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-white to-base-100">
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-12">
        
        {/* Left: Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl font-bold mb-4">
            👩‍🏫 Inspire. Teach. Impact.
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Join a growing community of passionate educators! Share your knowledge, connect with thousands of learners, and earn by doing what you love.
            Whether you're a professional teacher or a subject expert — our platform is the perfect place to grow your teaching career.
          </p>

          <ul className="mb-6 space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✔</span> Create & manage your own courses
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✔</span> Get paid for every enrollment
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✔</span> Access powerful teaching tools
            </li>
          </ul>

          <button className="btn btn-primary px-8 text-white rounded-full shadow">
            Become a Teacher
          </button>
        </div>

        {/* Right: Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={teacherInspiringImage} 
            alt="Become a Teacher"
            className="max-w-md w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default BecomeTeacherSection;
