'use client';
import { useState, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { registrationData } from '../utils/mockData';

const AccountRecoveryForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState({
    level: '',
    district: '',
    role: '',
    school: ''
  });
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Extract unique values from mockData
  const options = useMemo(() => {
    const allUsers = registrationData["Form Responses 1"];
    return {
      levels: ["Nursery", "Primary", "Secondary"],
      districts: [...new Set(allUsers.map(user => user["District of Residence"]))],
      roles: ["Teacher", "Administrator"],
      schools: [...new Set(allUsers.map(user => user["School Name"]))]
    };
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const userIndex = registrationData["Form Responses 1"].findIndex(
      entry => entry["Email Address"].toLowerCase() === email.toLowerCase()
    );

    if (userIndex === -1) {
      setError('No account found with this email address');
      setIsLoading(false);
      return;
    }

    setUserData(registrationData["Form Responses 1"][userIndex]);
    setStep(2);
    setIsLoading(false);
  };

  const handleSecurityQuestions = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const isCorrect = 
      userData["Level of Institution"] === answers.level &&
      userData["District of Residence"] === answers.district &&
      userData["Role at School"].toLowerCase() === answers.role.toLowerCase() &&
      userData["School Name"] === answers.school;

    if (!isCorrect) {
      setError('One or more answers are incorrect. Please try again.');
      setIsLoading(false);
      return;
    }

    setStep(3);
    setIsLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg w-full max-w-md transition-colors">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-400 mb-2">
          Account Recovery
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {step === 1 && "Enter your email to start the recovery process"}
          {step === 2 && "Please answer the security questions"}
          {step === 3 && "Your account details"}
        </p>
      </div>

      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-blue-200 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-3 focus:ring-blue-600/10 dark:focus:ring-blue-500/10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>
          
          {error && (
            <p className="text-red-600 dark:text-red-400 text-sm mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-blue-900 to-blue-600 dark:from-blue-800 dark:to-blue-600 text-white rounded-md font-medium hover:from-blue-800 hover:to-blue-900 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Checking...
              </>
            ) : (
              'Continue'
            )}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSecurityQuestions}>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Which level of institution do you teach?
              </label>
              <select
                value={answers.level}
                onChange={(e) => setAnswers({...answers, level: e.target.value})}
                className="w-full px-4 py-3 border border-blue-200 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-3 focus:ring-blue-600/10 dark:focus:ring-blue-500/10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
                disabled={isLoading}
              >
                <option value="">Select level</option>
                {options.levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                From which district are you from?
              </label>
              <select
                value={answers.district}
                onChange={(e) => setAnswers({...answers, district: e.target.value})}
                className="w-full px-4 py-3 border border-blue-200 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-3 focus:ring-blue-600/10 dark:focus:ring-blue-500/10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
                disabled={isLoading}
              >
                <option value="">Select district</option>
                {options.districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                What is your role at school?
              </label>
              <select
                value={answers.role}
                onChange={(e) => setAnswers({...answers, role: e.target.value})}
                className="w-full px-4 py-3 border border-blue-200 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-3 focus:ring-blue-600/10 dark:focus:ring-blue-500/10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
                disabled={isLoading}
              >
                <option value="">Select role</option>
                {options.roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                What is the name of your school?
              </label>
              <select
                value={answers.school}
                onChange={(e) => setAnswers({...answers, school: e.target.value})}
                className="w-full px-4 py-3 border border-blue-200 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-3 focus:ring-blue-600/10 dark:focus:ring-blue-500/10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
                disabled={isLoading}
              >
                <option value="">Select school</option>
                {options.schools.map(school => (
                  <option key={school} value={school}>{school}</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p className="text-red-600 dark:text-red-400 text-sm my-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 py-3 bg-gradient-to-r from-blue-900 to-blue-600 dark:from-blue-800 dark:to-blue-600 text-white rounded-md font-medium hover:from-blue-800 hover:to-blue-900 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Verifying...
              </>
            ) : (
              'Verify Answers'
            )}
          </button>
        </form>
      )}

      {step === 3 && userData && (
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-400 mb-4">
              Your Account Information
            </h2>
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Email:</span> {userData["Email Address"]}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Password:</span> {userData["Telephone contact"]}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Please keep this information secure. We recommend changing your password after logging in.
              </p>
            </div>
          </div>

          <a
            href="/login"
            className="block w-full py-3 bg-gradient-to-r from-blue-900 to-blue-600 dark:from-blue-800 dark:to-blue-600 text-white rounded-md font-medium hover:from-blue-800 hover:to-blue-900 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all text-center"
          >
            Return to Login
          </a>
        </div>
      )}
    </div>
  );
};

export default AccountRecoveryForm;