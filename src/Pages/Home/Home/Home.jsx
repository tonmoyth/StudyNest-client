import React from "react";
import HeroSection from "../Hero/HeroSection";
import PartnersSection from "../Partners/PartnersSection";
import PopularCourses from "../PopularCourses/PopularCourses";
import WebsiteStatsSection from "../WebsiteStatsSection/WebsiteStatsSection";
import BecomeTeacherSection from "../BecomeTeacherSection/BecomeTeacherSection";
import StudentsFeedback from "../StudentsFeedback/StudentsFeedback";
import BestTeachers from "./BestTeachers/BestTeachers";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <HeroSection></HeroSection>
      <PartnersSection></PartnersSection>
      <PopularCourses></PopularCourses>
      <StudentsFeedback></StudentsFeedback>
      <BecomeTeacherSection></BecomeTeacherSection>
      <BestTeachers></BestTeachers>
      <WhyChooseUs></WhyChooseUs>
      <WebsiteStatsSection></WebsiteStatsSection>
    </div>
  );
};

export default Home;
