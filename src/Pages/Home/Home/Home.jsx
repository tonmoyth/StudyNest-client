import React from 'react';
import HeroSection from '../Hero/HeroSection';
import PartnersSection from '../Partners/PartnersSection';
import PopularCourses from '../PopularCourses/PopularCourses';
import WebsiteStatsSection from '../WebsiteStatsSection/WebsiteStatsSection';
import BecomeTeacherSection from '../BecomeTeacherSection/BecomeTeacherSection';
import StudentsFeedback from '../StudentsFeedback/StudentsFeedback';

const Home = () => {
    return (
        <div>
           <HeroSection></HeroSection>
           <PartnersSection></PartnersSection>
           <PopularCourses></PopularCourses>
          <StudentsFeedback></StudentsFeedback>
           <WebsiteStatsSection></WebsiteStatsSection>
           <BecomeTeacherSection></BecomeTeacherSection>
        </div>
    );
};

export default Home;