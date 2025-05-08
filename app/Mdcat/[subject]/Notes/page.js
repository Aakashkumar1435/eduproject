"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  FileText, 
  Book, 
  Download, 
  Search, 
  Filter, 
  AlertCircle, 
  FileType, 
  Clock, 
  ChevronDown,
  Loader,
  BookOpen
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// File type icons and colors
const fileTypeIcons = {
  pdf: { icon: <FileText size={20} />, color: "text-red-500", bgColor: "bg-red-100" },
  image: { icon: <FileType size={20} />, color: "text-blue-500", bgColor: "bg-blue-100" },
  doc: { icon: <FileText size={20} />, color: "text-blue-600", bgColor: "bg-blue-100" },
  ppt: { icon: <FileText size={20} />, color: "text-orange-500", bgColor: "bg-orange-100" },
  other: { icon: <FileText size={20} />, color: "text-gray-500", bgColor: "bg-gray-100" }
};

function Notes() {
  const router = useRouter();

  const { subject } = useParams(); // Get subject from URL params
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [selectedFileType, setSelectedFileType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [chapters, setChapters] = useState([]);
  
  // Fetch notes for the specific subject
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      // Save the intended path
      router.push("/User-Sign-In");
      localStorage.setItem("redirectAfterLogin", `/Mdcat/${subjectName}/Notes`);
    }
    const fetchNotes = async () => {
      setLoading(true);
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`http://localhost:5000/api/notes/getNotes?subject=${subject}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        
        const data = await response.json();
        setNotes(data);
        
        // Extract unique chapters for filter
        const uniqueChapters = [...new Set(data.map(note => note.chapterID))];
        const chaptersData = uniqueChapters.map(chapterId => {
          const noteWithChapter = data.find(note => note.chapterID === chapterId);
          return {
            id: chapterId,
            name: noteWithChapter ? noteWithChapter.chapterName : 'Unknown Chapter'
          };
        });
        
        setChapters(chaptersData);
        setError(null);
      } catch (err) {
        console.error('Error fetching notes:', err);
        setError('Failed to load notes. Showing demo content instead.');
        
        // Use dummy data if API fails
        setNotes(dummyNotes);
        
        // Extract unique chapters from dummy data
        const uniqueChapters = [...new Set(dummyNotes.map(note => note.chapterID))];
        const chaptersData = uniqueChapters.map(chapterId => {
          const noteWithChapter = dummyNotes.find(note => note.chapterID === chapterId);
          return {
            id: chapterId,
            name: noteWithChapter ? noteWithChapter.chapterName : 'Unknown Chapter'
          };
        });
        
        setChapters(chaptersData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotes();
  }, [subject]);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Filter and sort notes
  const filteredAndSortedNotes = notes
    .filter(note => {
      const matchesSearch = note.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.chapterName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesChapter = selectedChapter === 'all' || note.chapterID === selectedChapter;
      const matchesFileType = selectedFileType === 'all' || note.fileType === selectedFileType;
      
      return matchesSearch && matchesChapter && matchesFileType;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.uploadedAt) - new Date(a.uploadedAt);
      } else if (sortBy === 'oldest') {
        return new Date(a.uploadedAt) - new Date(b.uploadedAt);
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a.chapterName.localeCompare(b.chapterName);
      }
    });

  // Handle download
  const handleDownload = (fileUrl, fileName) => {
    // TODO: Implement download functionality
  };
  
  // Get subject name from the first note
  const subjectName = notes.length > 0 ? notes[0].subjectName : subject;
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-emerald-700 text-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Book size={28} className="mr-3" />
              <div>
                <h1 className="text-2xl font-bold">{subjectName} Notes</h1>
                <p className="text-emerald-100 text-sm mt-1">
                  Study materials and resources for {subjectName}
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="text-sm text-emerald-100">
                <span className="font-medium text-white">{filteredAndSortedNotes.length}</span> notes available
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters and search */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Chapter filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen size={18} className="text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
              >
                <option value="all">All Chapters</option>
                {chapters.map(chapter => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
            
            {/* File type filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileType size={18} className="text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value)}
              >
                <option value="all">All File Types</option>
                <option value="pdf">PDF</option>
                <option value="image">Image</option>
                <option value="doc">Document</option>
                <option value="ppt">Presentation</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
            
            {/* Sort options */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name (A-Z)</option>
                <option value="chapter">Chapter</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Notes grid */}
        <div className="bg-white rounded-lg shadow-md">
          {loading ? (
            <div className="flex justify-center items-center p-12">
              <Loader size={30} className="text-emerald-600 animate-spin" />
              <span className="ml-3 text-lg text-gray-600">Loading notes...</span>
            </div>
          ) : filteredAndSortedNotes.length > 0 ? (
            <div>
              {error && (
                <div className="p-4 mb-4 flex items-center bg-yellow-50 text-yellow-800 border-l-4 border-yellow-400">
                  <AlertCircle size={20} className="mr-2" />
                  {error}
                </div>
              )}
              
              <div className="overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {filteredAndSortedNotes.map((note) => (
                    <li key={note._id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                        <div className="flex items-start space-x-3 mb-3 sm:mb-0 flex-1">
                          <div className={`p-3 rounded-lg ${fileTypeIcons[note.fileType].bgColor}`}>
                            <span className={fileTypeIcons[note.fileType].color}>
                              {fileTypeIcons[note.fileType].icon}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{note.name}</h3>
                            <div className="mt-1 flex items-center flex-wrap gap-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                {note.chapterName}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 uppercase">
                                {note.fileType}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center">
                                <Clock size={12} className="mr-1" />
                                {formatDate(note.uploadedAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownload(note.fileUrl, note.name)}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        >
                          <Download size={16} className="mr-2" />
                          Download
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <FileText size={48} className="text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-900">No notes found</h3>
              <p className="mt-1 text-gray-500">
                Try changing your search criteria or check back later for updates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notes;