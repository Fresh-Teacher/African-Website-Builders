"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { registrationData } from '@/utils/mockData';
import { 
  PersonCircle, 
  Building, 
  Laptop, 
  BarChartFill,
  EnvelopeFill,
  TelephoneFill,
  GeoAltFill,
  Calendar2Check,
  CheckCircleFill,
  HourglassSplit
} from 'react-bootstrap-icons';

const MotionDiv = motion.div;

// Helper function to determine progress bar color
const getProgressColor = (percentage) => {
  if (percentage < 40) return { bg: 'bg-red-100', fill: 'bg-red-600' };
  if (percentage < 70) return { bg: 'bg-orange-100', fill: 'bg-orange-600' };
  return { bg: 'bg-blue-100', fill: 'bg-blue-600' };
};

// Animated card component
const AnimatedCard = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
    >
      {children}
    </MotionDiv>
  );
};

// Enhanced animated progress bar component with color coding
const AnimatedProgress = ({ percentage }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const colors = getProgressColor(percentage);

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className={`text-sm font-medium ${
          percentage < 40 ? 'text-red-600' :
          percentage < 70 ? 'text-orange-600' :
          'text-blue-600'
        }`}>
          {percentage < 40 ? 'Low' :
           percentage < 70 ? 'Medium' :
           'Great Progress!'}
        </span>
        <span className="text-sm font-medium text-gray-600">{percentage}%</span>
      </div>
      <div ref={ref} className={`w-full ${colors.bg} rounded-full h-2.5`}>
        <MotionDiv
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`${colors.fill} h-full rounded-full transition-colors duration-300`}
        />
      </div>
    </div>
  );
};

export default function Dashboard() {
  const userData = registrationData["Form Responses 1"][0];
  const totalCourses = Object.keys(userData.courseProgress).length;
  const CompletedCourses = Object.values(userData.courseProgress).filter(status => status === "Completed").length;
  const progressPercentage = Math.round((CompletedCourses / totalCourses) * 100);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Welcome Header with fade-in animation */}
      <MotionDiv 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 flex items-center"
      >
        <PersonCircle className="text-blue-600 h-8 w-8 mr-3" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {userData["Full Name"]}</h1>
          <p className="text-gray-600">Track your progress in the African Website Builders course</p>
        </div>
      </MotionDiv>

      {/* Stats Grid with staggered animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnimatedCard delay={0}>
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <BarChartFill className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Course Progress</p>
              </div>
            </div>
            <AnimatedProgress percentage={progressPercentage} />
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.2}>
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <Building className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">School</p>
              <p className="text-lg font-bold text-gray-900">{userData["School Name"]}</p>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.4}>
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <PersonCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Role</p>
              <p className="text-lg font-bold text-gray-900">{userData["Role at School"]}</p>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.6}>
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-full">
              <Laptop className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Study Device</p>
              <p className="text-lg font-bold text-gray-900">{userData["Which device will you use for study during the course?"]}</p>
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Rest of the component remains the same */}
      {/* Course Progress Details */}
      <AnimatedCard>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Calendar2Check className="mr-2 text-blue-600" />
          Course Modules Progress
        </h2>
        <div className="space-y-4">
          {Object.entries(userData.courseProgress).map(([module, status], index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <p className="text-gray-800 flex-1 flex items-center">
                {status === "Completed" ? (
                  <CheckCircleFill className="text-green-600 mr-2" />
                ) : (
                  <HourglassSplit className="text-yellow-600 mr-2" />
                )}
                {module}
              </p>
              <span className={`px-3 py-1 rounded-full text-sm ${
                status === "Completed" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {status}
              </span>
            </MotionDiv>
          ))}
        </div>
      </AnimatedCard>

      {/* Contact Information */}
      <AnimatedCard>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: <EnvelopeFill className="mr-2 text-blue-600" />, label: "Email", value: userData["Email Address"] },
            { icon: <TelephoneFill className="mr-2 text-blue-600" />, label: "WhatsApp", value: userData["WhatsApp number"] },
            { icon: <GeoAltFill className="mr-2 text-blue-600" />, label: "District", value: userData["District of Residence"] },
            { icon: <Building className="mr-2 text-blue-600" />, label: "Physical Classes", value: userData["Can you attend physical classes if the training centre is around Kampala?"] }
          ].map((item, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <p className="text-sm text-gray-600 flex items-center">
                {item.icon}
                {item.label}
              </p>
              <p className="text-gray-800">{item.value}</p>
            </MotionDiv>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
}