import React from 'react';
import HeroSection from '../Hero/HeroSection';
import PartnersSection from '../Partners/PartnersSection';
import PopularCourses from '../PopularCourses/PopularCourses';
import TeacherFeedbackCarousel from '../TeacherFeedback/TeacherFeedback';

const Home = () => {
    return (
        <div>
           <HeroSection></HeroSection>
           <PartnersSection></PartnersSection>
           <PopularCourses></PopularCourses>
           <TeacherFeedbackCarousel></TeacherFeedbackCarousel>
        </div>
    );
};

export default Home;