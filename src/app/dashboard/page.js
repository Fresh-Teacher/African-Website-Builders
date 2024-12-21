"use client";

import React from 'react';
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

export default function Dashboard() {
  const userData = registrationData["Form Responses 1"][0];
  const totalCourses = Object.keys(userData.courseProgress).length;
  const CompletedCourses = Object.values(userData.courseProgress).filter(status => status === "Completed").length;
  const progressPercentage = Math.round((CompletedCourses / totalCourses) * 100);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Welcome Header */}
      <div className="mb-8 flex items-center">
        <PersonCircle className="text-blue-600 h-8 w-8 mr-3" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {userData["Full Name"]}</h1>
          <p className="text-gray-600">Track your progress in the African Website Builders course</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Course Progress Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <BarChartFill className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Course Progress</p>
              <p className="text-2xl font-bold text-gray-900">{progressPercentage}%</p>
            </div>
          </div>
        </div>

        {/* School Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <Building className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">School</p>
              <p className="text-lg font-bold text-gray-900">{userData["School Name"]}</p>
            </div>
          </div>
        </div>

        {/* Role Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <PersonCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Role</p>
              <p className="text-lg font-bold text-gray-900">{userData["Role at School"]}</p>
            </div>
          </div>
        </div>

        {/* Device Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-full">
              <Laptop className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Study Device</p>
              <p className="text-lg font-bold text-gray-900">{userData["Which device will you use for study during the course?"]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Progress Details */}
      <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Calendar2Check className="mr-2 text-blue-600" />
          Course Modules Progress
        </h2>
        <div className="space-y-4">
          {Object.entries(userData.courseProgress).map(([module, status], index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <p className="text-sm text-gray-600 flex items-center">
              <EnvelopeFill className="mr-2 text-blue-600" />
              Email
            </p>
            <p className="text-gray-800">{userData["Email Address"]}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <p className="text-sm text-gray-600 flex items-center">
              <TelephoneFill className="mr-2 text-blue-600" />
              WhatsApp
            </p>
            <p className="text-gray-800">{userData["WhatsApp number"]}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <p className="text-sm text-gray-600 flex items-center">
              <GeoAltFill className="mr-2 text-blue-600" />
              District
            </p>
            <p className="text-gray-800">{userData["District of Residence"]}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <p className="text-sm text-gray-600 flex items-center">
              <Building className="mr-2 text-blue-600" />
              Physical Classes
            </p>
            <p className="text-gray-800">{userData["Can you attend physical classes if the training centre is around Kampala?"]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}