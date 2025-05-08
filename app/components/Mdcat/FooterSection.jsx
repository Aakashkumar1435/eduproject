import React from "react";

const FooterSection = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Logo and About */}
            <div className="space-y-4">
              <div className="flex-shrink-0 font-bold text-xl text-gray-800 flex items-center mb-2">
                <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                  مقصد
                </span>
              </div>
              <p className="text-sm text-gray-500">
                © Copyright 2021 Maqsad (Pvt.) Ltd. All Rights Reserved
              </p>
              <p className="text-sm text-gray-500">
                Maqsad utilizes top-tier educators, media resources, and
                cutting-edge technology to develop education that is both high
                in quality and accessible, all while remaining affordable for
                students.
              </p>
              <div className="flex space-x-4 mt-4">
                <a
                  href="#"
                  className="flex items-center space-x-2 text-sm text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="24px"
                    height="24px"
                  >
                    <path
                      fill="#4db6ac"
                      d="M7.705,4.043C7.292,4.15,7,4.507,7,5.121c0,1.802,0,18.795,0,18.795S7,42.28,7,43.091c0,0.446,0.197,0.745,0.5,0.856l20.181-20.064L7.705,4.043z"
                    />
                    <path
                      fill="#dce775"
                      d="M33.237,18.36l-8.307-4.796c0,0-15.245-8.803-16.141-9.32C8.401,4.02,8.019,3.961,7.705,4.043l19.977,19.84L33.237,18.36z"
                    />
                    <path
                      fill="#d32f2f"
                      d="M8.417,43.802c0.532-0.308,15.284-8.825,24.865-14.357l-5.601-5.562L7.5,43.947C7.748,44.038,8.066,44.004,8.417,43.802z"
                    />
                    <path
                      fill="#fbc02d"
                      d="M41.398,23.071c-0.796-0.429-8.1-4.676-8.1-4.676l-0.061-0.035l-5.556,5.523l5.601,5.562c4.432-2.559,7.761-4.48,8.059-4.653C42.285,24.248,42.194,23.5,41.398,23.071z"
                    />
                  </svg>
                  <span>Download on Google Play</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-sm text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="4"></circle>
                    <line x1="21.17" y1="8" x2="12" y2="8"></line>
                    <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
                    <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
                  </svg>
                  <span>Sign up Chrome</span>
                </a>
              </div>
            </div>

            {/* Column 2: Maqsad */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Maqsad
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    MDCAT
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    ECAT
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    BCAT
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Class 9 Notes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Socials */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Socials
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Tools */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Tools
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Medical University Predictor
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    MDCAT Aggregate Calculator
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    O Level Equivalence Calculator
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    A Level Equivalence Calculator
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterSection;
