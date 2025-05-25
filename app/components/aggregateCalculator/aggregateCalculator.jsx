"use client";
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { Calculator, Book, GraduationCap, FileCheck, Settings, ChevronRight, Loader2, Trophy, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const defaultWeights = {
  mdcat: { matric: 0.10, inter: 0.40, test: 0.50 },
  nums: { matric: 0.10, inter: 0.15, test: 0.75 },
  ecat: { matric: 0.10, inter: 0.30, test: 0.60 },
  net: { matric: 0.10, inter: 0.15, test: 0.75 },
};

const themeColors = {
  emerald: {
    primary: "emerald",
    gradient: "from-emerald-400 to-emerald-600",
    buttonGradient: "from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700",
    accent: "emerald-400",
    border: "emerald-500/30",
    shadow: "emerald-500/30",
    bg: "emerald-900/20",
    ring: "emerald-500",
    text: "emerald-400",
    progressGradient: "from-emerald-400 to-emerald-500"
  },
  blue: {
    primary: "blue",
    gradient: "from-blue-400 to-blue-600",
    buttonGradient: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    accent: "blue-400",
    border: "blue-500/30",
    shadow: "blue-500/30",
    bg: "blue-900/20",
    ring: "blue-500",
    text: "blue-400",
    progressGradient: "from-blue-400 to-blue-500"
  },
  red: {
    primary: "red",
    gradient: "from-red-400 to-red-600",
    buttonGradient: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
    accent: "red-400",
    border: "red-500/30",
    shadow: "red-500/30",
    bg: "red-900/20",
    ring: "red-500",
    text: "red-400",
    progressGradient: "from-red-400 to-red-500"
  }
};

export default function AggregateCalculator() {
  const [form, setForm] = useState({
    testType: "",
    matricObt: "",
    matricTotal: "",
    interObt: "",
    interTotal: "",
    testObt: "",
    testTotal: "",
    customMatric: "",
    customInter: "",
    customTest: "",
  });

  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const [activeSection, setActiveSection] = useState(null);
  const [theme, setTheme] = useState('emerald');
  const [showInfo, setShowInfo] = useState(false);

  // Get current theme colors
  const currentTheme = themeColors[theme];

  useEffect(() => {
    // Add animation class definition
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const {
        testType,
        matricObt,
        matricTotal,
        interObt,
        interTotal,
        testObt,
        testTotal,
        customMatric,
        customInter,
        customTest,
      } = form;

      let weights;
      if (testType === "custom") {
        const cm = parseFloat(customMatric) / 100 || 0;
        const ci = parseFloat(customInter) / 100 || 0;
        const ct = parseFloat(customTest) / 100 || 0;
        if (cm + ci + ct !== 1) {
          Swal.fire({
            title: 'Invalid Weights',
            text: 'Custom weights must add up to 100%.',
            icon: 'error',
            confirmButtonColor: '#10b981',
            background: '#1f2937',
            color: '#f3f4f6'
          });
          setIsCalculating(false);
          return;
        }
        weights = { matric: cm, inter: ci, test: ct };
      } else {
        if (!defaultWeights[testType]) {
          Swal.fire({
            title: 'Test Type Required',
            text: 'Please select a valid test type!',
            icon: 'warning',
            confirmButtonColor: '#10b981',
            background: '#1f2937',
            color: '#f3f4f6'
          });
          setIsCalculating(false);
          return;
        }
        weights = defaultWeights[testType];
      }

      const mObt = parseFloat(matricObt) || 0;
      const mTotal = parseFloat(matricTotal) || 1;
      const iObt = parseFloat(interObt) || 0;
      const iTotal = parseFloat(interTotal) || 1;
      const tObt = parseFloat(testObt) || 0;
      const tTotal = parseFloat(testTotal) || 1;

      if (mObt > mTotal || iObt > iTotal || tObt > tTotal) {
        Swal.fire({
          title: 'Invalid Marks',
          text: 'Obtained marks cannot exceed total marks.',
          icon: 'error',
          confirmButtonColor: '#10b981',
          background: '#1f2937',
          color: '#f3f4f6'
        });
        setIsCalculating(false);
        return;
      }

      const mPercent = (mObt / mTotal) * 100;
      const iPercent = (iObt / iTotal) * 100;
      const tPercent = (tObt / tTotal) * 100;

      const aggregate =
        mPercent * weights.matric +
        iPercent * weights.inter +
        tPercent * weights.test;

      setResult(aggregate.toFixed(2));
      
      if (aggregate >= 80) {
        Swal.fire({
          title: 'Excellent Result!',
          text: `Your aggregate is ${aggregate.toFixed(2)}%`,
          icon: 'success',
          confirmButtonColor: '#10b981',
          background: '#1f2937',
          color: '#f3f4f6'
        });
      }
      
      setIsCalculating(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-gray-100 flex flex-col items-center justify-center transition-all duration-300">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl text-center mb-10"
      >
        <h1 className={`text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.gradient} mb-2 flex items-center justify-center`}>
          <Calculator className={`w-8 h-8 mr-2 text-${currentTheme.accent}`} />
          Aggregate Calculator
        </h1>
        <p className="text-gray-400 text-lg">Calculate your academic aggregate score instantly</p>
        
        <div className="mt-4 flex justify-center space-x-2">
          <button 
            onClick={() => setTheme('emerald')}
            className={`px-3 py-1 rounded-md text-xs font-medium ${theme === 'emerald' 
              ? 'bg-emerald-500 text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            Emerald
          </button>
          <button 
            onClick={() => setTheme('blue')}
            className={`px-3 py-1 rounded-md text-xs font-medium ${theme === 'blue' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            Blue
          </button>
          <button 
            onClick={() => setTheme('red')}
            className={`px-3 py-1 rounded-md text-xs font-medium ${theme === 'red' 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            Red
          </button>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="ml-2 p-1 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
        
        {showInfo && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-gray-800 rounded-lg text-left text-sm"
          >
            <h3 className={`font-medium text-${currentTheme.text} mb-2`}>Test Type Weightages:</h3>
            <ul className="space-y-1 text-xs">
              <li className="flex items-center">
                <ChevronRight className={`w-3 h-3 mr-1 text-${currentTheme.text}`} />
                <span><b>MDCAT:</b> Matric 10%, Inter 40%, Test 50%</span>
              </li>
              <li className="flex items-center">
                <ChevronRight className={`w-3 h-3 mr-1 text-${currentTheme.text}`} />
                <span><b>NUMS:</b> Matric 10%, Inter 15%, Test 75%</span>
              </li>
              <li className="flex items-center">
                <ChevronRight className={`w-3 h-3 mr-1 text-${currentTheme.text}`} />
                <span><b>ECAT:</b> Matric 10%, Inter 30%, Test 60%</span>
              </li>
              <li className="flex items-center">
                <ChevronRight className={`w-3 h-3 mr-1 text-${currentTheme.text}`} />
                <span><b>NET:</b> Matric 10%, Inter 15%, Test 75%</span>
              </li>
            </ul>
          </motion.div>
        )}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl shadow-${currentTheme.shadow} overflow-hidden transform hover:scale-[1.01] transition-all duration-300 border border-${currentTheme.border}`}
      >
        {/* Test Type */}
        <div 
          onClick={() => handleSectionClick('test')}
          className={`p-6 border-b border-gray-700/50 cursor-pointer transition-all duration-300 ${activeSection === 'test' ? `bg-${currentTheme.bg}` : 'hover:bg-gray-700/20'}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FileCheck className={`w-5 h-5 mr-2 text-${currentTheme.text}`} />
              <h3 className={`text-lg font-medium text-${currentTheme.text}`}>Test Type</h3>
            </div>
            <ChevronRight className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${activeSection === 'test' ? 'rotate-90' : ''}`} />
          </div>
          
          <AnimatePresence>
            {(activeSection === 'test' || activeSection === null) && (
              <motion.div
                initial={activeSection !== null ? { height: 0, opacity: 0 } : false}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3"
              >
                <select
                  name="testType"
                  value={form.testType}
                  onChange={handleChange}
                  required
                  className={`w-full bg-gray-900 text-gray-100 px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-${currentTheme.ring} focus:border-transparent transition-all duration-300`}
                >
                  <option value="">Select Test</option>
                  <option value="mdcat">MDCAT</option>
                  <option value="nums">NUMS</option>
                  <option value="ecat">ECAT</option>
                  <option value="net">NET</option>
                  <option value="custom">Custom</option>
                </select>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Custom Weightage */}
        {form.testType === "custom" && (
          <div className="p-6 border-b border-gray-700/50 animate-fadeIn">
            <div className="flex items-center mb-3">
              <Settings className={`w-5 h-5 mr-2 text-${currentTheme.text}`} />
              <h3 className={`text-lg font-medium text-${currentTheme.text}`}>Custom Weightage (%)</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative">
                <input
                  type="number"
                  name="customMatric"
                  placeholder="Matric %"
                  value={form.customMatric}
                  onChange={handleChange}
                  className={`w-full bg-gray-900 text-gray-100 px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-${currentTheme.ring} focus:border-transparent transition-all duration-300`}
                />
                <span className="absolute right-3 top-3 text-gray-500">%</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="customInter"
                  placeholder="Inter %"
                  value={form.customInter}
                  onChange={handleChange}
                  className={`w-full bg-gray-900 text-gray-100 px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-${currentTheme.ring} focus:border-transparent transition-all duration-300`}
                />
                <span className="absolute right-3 top-3 text-gray-500">%</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="customTest"
                  placeholder="Test %"
                  value={form.customTest}
                  onChange={handleChange}
                  className={`w-full bg-gray-900 text-gray-100 px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-${currentTheme.ring} focus:border-transparent transition-all duration-300`}
                />
                <span className="absolute right-3 top-3 text-gray-500">%</span>
              </div>
            </div>
            <div className="mt-3 text-xs flex items-center text-gray-400">
              <AlertTriangle className="w-4 h-4 mr-1 text-yellow-500" />
              <span>The sum of all percentages must equal 100%</span>
            </div>
          </div>
        )}

        {/* Matric */}
        <div 
          onClick={() => handleSectionClick('matric')}
          className={`p-6 border-b border-gray-700/50 cursor-pointer transition-all duration-300 ${activeSection === 'matric' ? `bg-${currentTheme.bg}` : 'hover:bg-gray-700/20'}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Book className={`w-5 h-5 mr-2 text-${currentTheme.text}`} />
              <h3 className={`text-lg font-medium text-${currentTheme.text}`}>Matriculation</h3>
            </div>
            <ChevronRight className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${activeSection === 'matric' ? 'rotate-90' : ''}`} />
          </div>
          
          <AnimatePresence>
            {(activeSection === 'matric' || activeSection === null) && (
              <motion.div
                initial={activeSection !== null ? { height: 0, opacity: 0 } : false}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <input
                  type="number"
                  name="matricObt"
                  placeholder="Obtained Marks"
                  value={form.matricObt}
                  onChange={handleChange}
                  className={`bg-gray-900 text-gray-100 px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-${currentTheme.ring} focus:border-transparent transition-all duration-300`}
                  required
                />
                <input
                  type="number"
                  name="matricTotal"
                  placeholder="Total Marks"
                  value={form.matricTotal}
                  onChange={handleChange}
                  className={`bg-gray-900 text-gray-100 px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-${currentTheme.ring} focus:border-transparent transition-all duration-300`}
                  required
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Intermediate */}
        <div 
          onClick={() => handleSectionClick('inter')}
          className={`p-6 border-b border-gray-700/50 cursor-pointer transition-all duration-300 ${activeSection === 'inter' ? `bg-${currentTheme.bg}` : 'hover:bg-gray-700/20'}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <GraduationCap className={`w-5 h-5 mr-2 text-${currentTheme.text}`} />
              <h3 className={`text-lg font-medium text-${currentTheme.text}`}>Intermediate</h3>
            </div>
            <ChevronRight className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${activeSection === 'inter' ? 'rotate-90' : ''}`} />
          </div>
          
          <AnimatePresence>
            {(activeSection === 'inter' || activeSection === null) && (
              <motion.div
                initial={activeSection !== null ? { height: 0, opacity: 0 } : false}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <input
                  type="number"
                  name="interObt"
                  placeholder="Obtained Marks"
                  value={form.interObt}
                  onChange={handleChange}
                  className={`bg-gray-900 text-gray-100 px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-${currentTheme.ring} focus:border-transparent transition-all duration-300`}
                  required
                />
                <input
                  type="number"
                  name="interTotal"
                  placeholder="Total Marks"
                  value={form.interTotal}
                  onChange={handleChange}
                  className={`bg-gray-900 text-gray-100 px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-${currentTheme.ring} focus:border-transparent transition-all duration-300`}
                  required
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Test */}
        <div 
          onClick={() => handleSectionClick('testScore')}
          className={`p-6 border-b border-gray-700/50 cursor-pointer transition-all duration-300 ${activeSection === 'testScore' ? `bg-${currentTheme.bg}` : 'hover:bg-gray-700/20'}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FileCheck className={`w-5 h-5 mr-2 text-${currentTheme.text}`} />
              <h3 className={`text-lg font-medium text-${currentTheme.text}`}>Test Score</h3>
            </div>
            <ChevronRight className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${activeSection === 'testScore' ? 'rotate-90' : ''}`} />
          </div>
          
          <AnimatePresence>
            {(activeSection === 'testScore' || activeSection === null) && (
              <motion.div
                initial={activeSection !== null ? { height: 0, opacity: 0 } : false}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <input
                  type="number"
                  name="testObt"
                  placeholder="Obtained Score"
                  value={form.testObt}
                  onChange={handleChange}
                  className={`bg-gray-900 text-gray-100 px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-${currentTheme.ring} focus:border-transparent transition-all duration-300`}
                  required
                />
                <input
                  type="number"
                  name="testTotal"
                  placeholder="Total Score"
                  value={form.testTotal}
                  onChange={handleChange}
                  className={`bg-gray-900 text-gray-100 px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-${currentTheme.ring} focus:border-transparent transition-all duration-300`}
                  required
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCalculate} 
            disabled={isCalculating}
            className={`w-full bg-gradient-to-r ${currentTheme.buttonGradient} text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-${currentTheme.shadow} focus:outline-none focus:ring-2 focus:ring-${currentTheme.ring} focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isCalculating ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Processing...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Aggregate
              </span>
            )}
          </motion.button>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className={`mt-8 p-6 bg-gray-900 rounded-lg border border-${currentTheme.border} shadow-inner`}
              >
                <div className="flex items-center justify-center mb-3">
                  <Trophy className={`w-6 h-6 mr-2 text-${currentTheme.text}`} />
                  <h3 className={`text-lg font-medium text-center text-${currentTheme.text}`}>Your Aggregate Percentage</h3>
                </div>
                <div className={`text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.progressGradient}`}>
                  {result}%
                </div>
                <div className="mt-4 h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, parseFloat(result))}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${currentTheme.progressGradient} rounded-full`}
                  ></motion.div>
                </div>
                <div className="mt-4 text-center text-sm text-gray-400">
                  {parseFloat(result) >= 80 ? (
                    <span className="text-green-400">Excellent! You have a great aggregate score.</span>
                  ) : parseFloat(result) >= 70 ? (
                    <span className="text-blue-400">Good job! You have a competitive aggregate.</span>
                  ) : parseFloat(result) >= 60 ? (
                    <span className="text-yellow-400">Decent score. Keep working hard!</span>
                  ) : (
                    <span className="text-red-400">There's room for improvement.</span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-xs text-gray-500 mt-6 text-center"
      >
        Enter your academic scores above to calculate your aggregate percentage<br/>
        <span className="text-xs text-gray-600">© {new Date().getFullYear()} Academic Aggregate Calculator</span>
      </motion.div>
    </div>
  );
}