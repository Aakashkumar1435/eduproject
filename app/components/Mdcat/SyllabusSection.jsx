import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, FlaskConical , Atom, BookText, Brain } from 'lucide-react';

export default function MDCATSyllabus() {
  const [expandedSections, setExpandedSections] = useState({
    biology: true,
    chemistry: false,
    physics: false,
    english: false,
    logicalReasoning: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Define new color scheme based on green tones
  const sections = [
    {
      id: 'biology',
      title: 'Biology',
      icon: <BookOpen />,
      primaryColor: 'emerald-600',
      secondaryColor: 'emerald-50',
      highlightColor: 'emerald-500',
      borderColor: 'emerald-500',
      hoverColor: 'emerald-600',
      content: [
        {
          title: 'Accelular Life',
          items: [
            'Discovery of Viruses',
            'Introduction to Viruses',
            'Structure of Viruses',
            'Classification of Viruses',
            'Viral Diseases'
          ]
        },
        {
          title: 'Biological Molecules',
          items: [
            'Introduction to Biological Molecules',
            'Water',
            'Carbohydrates',
            'Proteins',
            'Conjugated Molecules (Glycolipids, Glycoproteins)'
          ]
        },
        { title: 'Enzymes', items: [] },
        { title: 'Bioenergetics', items: [] },
        { title: 'Nutrition', items: [] },
        { title: 'Gaseous Exchange', items: [], isNew: true }
      ]
    },
    {
      id: 'chemistry',
      title: 'Chemistry',
      icon: <FlaskConical />,
      primaryColor: 'teal-600',
      secondaryColor: 'teal-50',
      highlightColor: 'teal-500',
      borderColor: 'teal-500',
      hoverColor: 'teal-600',
      content: [
        {
          title: 'Physical Chemistry',
          items: [
            'Atomic Structure',
            'Chemical Bonding',
            'Thermodynamics',
            'Solutions'
          ]
        },
        {
          title: 'Organic Chemistry',
          items: [
            'Functional Groups',
            'Reactions of Hydrocarbons',
            'Biochemical Molecules'
          ]
        },
        {
          title: 'Inorganic Chemistry',
          items: [
            'Periodic Table',
            'Chemical Equilibrium',
            'Electrochemistry'
          ]
        }
      ]
    },
    {
      id: 'physics',
      title: 'Physics',
      icon: <Atom />,
      primaryColor: 'green-600',
      secondaryColor: 'green-50',
      highlightColor: 'green-500',
      borderColor: 'green-500',
      hoverColor: 'green-600',
      content: [
        {
          title: 'Mechanics',
          items: [
            'Vectors and Equilibrium',
            'Motion and Force',
            'Work and Energy',
            'Circular Motion'
          ]
        },
        {
          title: 'Waves and Optics',
          items: [
            'Wave Properties',
            'Sound Waves',
            'Geometrical Optics',
            'Wave Optics'
          ]
        },
        {
          title: 'Modern Physics',
          items: [
            'Quantum Physics',
            'Nuclear Physics',
            'Electronics'
          ]
        }
      ]
    },
    {
      id: 'english',
      title: 'English',
      icon: <BookText />,
      primaryColor: 'lime-600',
      secondaryColor: 'lime-50',
      highlightColor: 'lime-500',
      borderColor: 'lime-500',
      hoverColor: 'lime-600',
      content: [
        {
          title: 'Vocabulary',
          items: [
            'Synonyms and Antonyms',
            'Contextual Meanings',
            'Medical Terminology'
          ]
        },
        {
          title: 'Grammar',
          items: [
            'Parts of Speech',
            'Sentence Structure',
            'Error Identification'
          ]
        },
        {
          title: 'Comprehension',
          items: [
            'Reading Passages',
            'Critical Analysis',
            'Scientific Text Interpretation'
          ]
        }
      ]
    },
    {
      id: 'logicalReasoning',
      title: 'Logical Reasoning',
      icon: <Brain />,
      primaryColor: 'green-700',
      secondaryColor: 'green-50',
      highlightColor: 'green-600',
      borderColor: 'green-600',
      hoverColor: 'green-700',
      isWide: true,
      content: [
        {
          title: 'Critical Thinking',
          subheading: true,
          items: []
        },
        {
          title: 'Analytical Reasoning',
          items: [
            'Pattern Recognition',
            'Logical Sequences',
            'Deductive Reasoning'
          ]
        },
        {
          title: 'Problem Solving',
          subheading: true,
          items: []
        },
        {
          title: 'Decision Making',
          items: [
            'Case Studies',
            'Situational Analysis',
            'Ethical Reasoning'
          ]
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
          PMDC MDCAT Syllabus 2025
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-600 mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sections.map((section) => (
          <div 
            key={section.id}
            className={`bg-white rounded-xl shadow-md overflow-hidden border-b-4 border-${section.borderColor} hover:shadow-xl transition-all duration-300 ${section.isWide ? 'md:col-span-2' : ''}`}
          >
            <div 
              className={`flex justify-between items-center p-4 cursor-pointer bg-gradient-to-r from-${section.secondaryColor} to-white`}
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full bg-${section.secondaryColor} text-${section.primaryColor} flex items-center justify-center shadow`}>
                  {section.icon}
                </div>
                <h2 className={`text-xl font-bold text-${section.primaryColor}`}>{section.title}</h2>
              </div>
              <div className={`w-8 h-8 rounded-full bg-${section.secondaryColor} flex items-center justify-center text-${section.primaryColor}`}>
                {expandedSections[section.id] ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </div>
            
            {expandedSections[section.id] && (
              <div className="p-5 bg-white">
                {section.isWide ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.content.map((category, idx) => (
                      <div key={idx} className={category.subheading ? "md:col-span-1" : ""}>
                        {category.subheading ? (
                          <h3 className={`font-semibold text-${section.primaryColor} mb-3 pb-1 border-b border-${section.secondaryColor}`}>{category.title}</h3>
                        ) : (
                          <div className="mb-4">
                            <h4 className={`font-medium text-${section.primaryColor} mb-2`}>• {category.title}</h4>
                            {category.items.length > 0 && (
                              <ul className="pl-6 space-y-1.5">
                                {category.items.map((item, i) => (
                                  <li 
                                    key={i} 
                                    className={`text-gray-700 hover:text-${section.hoverColor} transition-colors flex items-center gap-1.5`}
                                  >
                                    <span className={`w-1.5 h-1.5 rounded-full bg-${section.highlightColor} inline-block`}></span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {section.content.map((category, idx) => (
                      <div key={idx} className="mb-4">
                        <h4 className={`font-medium text-${section.primaryColor} mb-2 ${category.isNew ? 'flex items-center' : ''}`}>
                          • {category.title}
                          {category.isNew && (
                            <span className={`ml-2 text-xs font-bold py-0.5 px-2 bg-${section.highlightColor} text-white rounded-full`}>NEW</span>
                          )}
                        </h4>
                        {category.items.length > 0 && (
                          <ul className="pl-6 space-y-1.5">
                            {category.items.map((item, i) => (
                              <li 
                                key={i} 
                                className={`text-gray-700 hover:text-${section.hoverColor} transition-colors flex items-center gap-1.5`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full bg-${section.highlightColor} inline-block`}></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md text-sm text-green-700">
          <span className="mr-2">Last updated: March 2025</span>
          <span className="w-1 h-1 rounded-full bg-green-300"></span>
          <span className="ml-2">For more information visit <span className="text-green-600 font-medium cursor-pointer hover:underline">pmdc.gov.pk</span></span>
        </div>
      </div>
    </div>
  );
}