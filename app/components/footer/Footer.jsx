import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#151c28] text-white pt-4 relative overflow-hidden">
      <div className="h-1 bg-[#21c55d] absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-[#21c55d] rounded-full flex items-center justify-center font-bold mr-2">
                CI
              </div>
              <h2 className="text-2xl font-bold text-[#21c55d]">CrackIt</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Our immersive learning platform combines interactive content, expert instruction, and engaging exercises to make your educational journey exciting and effective.
            </p>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-[#21c55d] text-lg font-semibold mb-3 border-b-2 border-[#21c55d] pb-1 inline-block">Courses</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-[#21c55d]">&rarr; MDCAT</a></li>
              <li><a href="#" className="hover:text-[#21c55d]">&rarr; ECAT</a></li>
              <li><a href="#" className="hover:text-[#21c55d]">&rarr; FSC</a></li>
              <li><a href="#" className="hover:text-[#21c55d]">&rarr; IELTS</a></li>
              <li><a href="#" className="hover:text-[#21c55d]">&rarr; GAT</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[#21c55d] text-lg font-semibold mb-3 border-b-2 border-[#21c55d] pb-1 inline-block">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-[#21c55d]">&rarr; About Us</a></li>
              <li><a href="#" className="hover:text-[#21c55d]">&rarr; Our Team</a></li>
              <li><a href="#" className="hover:text-[#21c55d]">&rarr; Careers</a></li>
              <li><a href="#" className="hover:text-[#21c55d]">&rarr; Blog</a></li>
              <li><a href="#" className="hover:text-[#21c55d]">&rarr; Press</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[#21c55d] text-lg font-semibold mb-3 border-b-2 border-[#21c55d] pb-1 inline-block">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-[#21c55d]">&rarr; Help Center</a></li>
              <li><a href="#" className="hover:text-[#21c55d]">&rarr; Contact Us</a></li>
              <li><a href="#" className="hover:text-[#21c55d]">&rarr; FAQ</a></li>
              <li><a href="#" className="hover:text-[#21c55d]">&rarr; Community</a></li>
              <li><a href="#" className="hover:text-[#21c55d]">&rarr; Student Resources</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 mt-10 pt-6">
          <p className="text-gray-400 text-sm">
            © 2025 CrackIt. All rights reserved. Terms & Privacy Policy
          </p>

          <div className="flex space-x-4 mt-4 md:mt-0">
  {/* Facebook */}
  <a href="#" className="w-10 h-10 rounded-full bg-[#1a202c] flex items-center justify-center hover:bg-[#21c55d] transition-transform hover:-translate-y-1">
    <svg className="w-5 h-5 fill-gray-400 hover:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z"/>
    </svg>
  </a>

  {/* Instagram */}
  <a href="#" className="w-10 h-10 rounded-full bg-[#1a202c] flex items-center justify-center hover:bg-[#21c55d] transition-transform hover:-translate-y-1">
    <svg className="w-5 h-5 fill-gray-400 hover:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
    </svg>
  </a>

  {/* Twitter */}
  <a href="#" className="w-10 h-10 rounded-full bg-[#1a202c] flex items-center justify-center hover:bg-[#21c55d] transition-transform hover:-translate-y-1">
    <svg className="w-5 h-5 fill-gray-400 hover:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9 9 0 0 1-2.83 1.08A4.5 4.5 0 0 0 16.11 0c-2.5 0-4.5 2-4.5 4.5 0 .36.04.7.1 1.03A12.8 12.8 0 0 1 3.1.67a4.48 4.48 0 0 0-.6 2.27 4.5 4.5 0 0 0 2 3.74A4.48 4.48 0 0 1 2 6v.06c0 2.2 1.57 4 3.7 4.41a4.52 4.52 0 0 1-2 .08 4.5 4.5 0 0 0 4.2 3.13 9.06 9.06 0 0 1-5.6 1.94c-.36 0-.72-.02-1.07-.06a12.8 12.8 0 0 0 6.9 2.03c8.28 0 12.8-6.86 12.8-12.8 0-.2 0-.39-.02-.58A9.1 9.1 0 0 0 23 3z"/>
    </svg>
  </a>

  {/* YouTube */}
  <a href="#" className="w-10 h-10 rounded-full bg-[#1a202c] flex items-center justify-center hover:bg-[#21c55d] transition-transform hover:-translate-y-1">
    <svg className="w-5 h-5 fill-gray-400 hover:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 32.4 32.4 0 0 0 0 12c0 1.9.1 3.8.5 5.8a3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1c.4-2 .5-3.9.5-5.8 0-1.9-.1-3.8-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/>
    </svg>
  </a>
</div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
