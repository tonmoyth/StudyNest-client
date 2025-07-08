import heroImage from '../../../assets/heroImage (1).jpg'


const HeroSection = () => {
  return (
    <div className="relative w-full h-[80vh]">
      {/* Background Image */}
      <img
        src={heroImage} 
        alt="EduManage Banner"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
       <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent flex items-center justify-center text-white">
        <div className="text-center max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Learn, Teach, and Grow with EduManage
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Join our collaborative platform where students gain skills and teachers share their expertise.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="btn btn-primary px-6">Browse Classes</button>
            <button className="btn btn-outline btn-accent px-6">Become a Teacher</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
