import { Link } from 'react-router';
import heroImage from '../../../assets/heroImage (1).jpg'
import ButtonThree from '../../../Components/ButtonThree/ButtonThree';
import ButtonTwo from '../../../Components/ButtonTwo/ButtonTwo';


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
       <div className="absolute inset-0 bg-black/55 to-transparent flex items-center justify-center text-white">
        <div className="text-center max-w-2xl px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Learn, Teach, and Grow with Study Nest
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Join our collaborative platform where students gain skills and teachers share their expertise.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {/* <ButtonThree level="Browse Classes"></ButtonThree> */}
          
           <Link to='/classes'>
            <ButtonTwo level="Browse Classes"></ButtonTwo>
            </Link>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
