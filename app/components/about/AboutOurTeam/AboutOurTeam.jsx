"use client";
import React from "react";
import Image from "next/image";

const AboutOurTeam = () => {
  const team = [
    {
      name: "Engr Aakash Kumar",
      role: "Biology Expert",
      degree: "Ph.D. in Molecular Biology",
      icon: "/Aakash.jpg",
    },
    {
      name: "Mr Hanzla Kalim",
      role: "Chemistry Expert",
      degree: "Ph.D. in Organic Chemistry",
      icon: "/panda.png",
    },
    {
      name: "Mr. Bakhat Nasar",
      role: "English Expert",
      degree: "Ph.D. in English Literature",
      icon: "/Bakhat.jpeg",
    },
    {
      name: "Mr. Muneeb Ur rehman",
      role: "Mathematics Expert",
      degree: "Ph.D. in Applied Mathematics",
      icon: "/Muneeb.jpeg",
    },
    {
      name: "Mr. Abdullah Waqar",
      role: "Expert in physics",
      degree: "Ph.D. in Physics",
      icon: "/Abdullah.jpeg",
    },
    {
      name: "Rana Jhanzaib Ali",
      role: "Ethics Expert",
      degree: "Ph.D. in Ethics",
      icon: "/Rana.jpeg",
    },
    {
      name: "Mr. Aqib Ali",
      role: "Principle",
      degree: "Everything Expert",
      icon: "/Aqib.jpeg",
    },
  ];

  return (
    <section className="bg-green-50 py-16 px-5 my-10">
      <h2 className="text-center mb-10 text-3xl text-green-800">
        <b>Our Team</b>
      </h2>
      <div className="overflow-x-auto pb-3">
        <div className="grid grid-flow-col auto-cols-min md:auto-cols-fr gap-8 min-w-full py-3">
          {team.map((member, index) => (
            <div 
              className="w-80 md:w-auto bg-white rounded-xl overflow-hidden text-center py-8 px-5 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-green-50 hover:to-white" 
              key={index}
            >
              <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-5 flex items-center justify-center">
                <Image
                  src={member.icon}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-medium">{member.name}</h3>
              <p className="mt-1">{member.role}</p>
              <p className="text-gray-600 text-sm mt-1">{member.degree}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutOurTeam;