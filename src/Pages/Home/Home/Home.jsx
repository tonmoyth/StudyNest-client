import React from 'react';
import HeroSection from '../Hero/HeroSection';
import PartnersSection from '../Partners/PartnersSection';
import PopularCourses from '../PopularCourses/PopularCourses';
import TeacherFeedbackCarousel from '../TeacherFeedback/TeacherFeedback';
import WebsiteStatsSection from '../WebsiteStatsSection/WebsiteStatsSection';
import BecomeTeacherSection from '../BecomeTeacherSection/BecomeTeacherSection';

const Home = () => {
    return (
        <div>
           <HeroSection></HeroSection>
           <PartnersSection></PartnersSection>
           <PopularCourses></PopularCourses>
           <TeacherFeedbackCarousel></TeacherFeedbackCarousel>
           <WebsiteStatsSection></WebsiteStatsSection>
           <BecomeTeacherSection></BecomeTeacherSection>
        </div>
    );
};

export default Home;