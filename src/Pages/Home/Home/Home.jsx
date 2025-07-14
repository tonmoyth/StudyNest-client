import React from 'react';
import HeroSection from '../Hero/HeroSection';
import PartnersSection from '../Partners/PartnersSection';
import PopularCourses from '../PopularCourses/PopularCourses';
import WebsiteStatsSection from '../WebsiteStatsSection/WebsiteStatsSection';
import BecomeTeacherSection from '../BecomeTeacherSection/BecomeTeacherSection';
import StudentsFeedback from '../StudentsFeedback/StudentsFeedback';
import BestTeachers from './BestTeachers/BestTeachers';

const Home = () => {
    return (
        <div>
           <HeroSection></HeroSection>
           <PartnersSection></PartnersSection>
           <PopularCourses></PopularCourses>
          <StudentsFeedback></StudentsFeedback>
           <WebsiteStatsSection></WebsiteStatsSection>
           <BecomeTeacherSection></BecomeTeacherSection>
           <BestTeachers></BestTeachers>
        </div>
    );
};

export default Home;