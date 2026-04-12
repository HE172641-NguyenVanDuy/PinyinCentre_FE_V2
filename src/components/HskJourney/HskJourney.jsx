import React from 'react';

function HskJourney({ roadmapData }) {
  return (
    <div className="relative max-w-5xl mx-auto px-4 py-16">
      {/* Timeline vertical line */}
      <div className="absolute w-1 bg-gradient-to-b from-red-500 to-orange-400 top-0 bottom-0 left-1/2 transform -translate-x-1/2 z-0 rounded-full shadow-lg"></div>

      {roadmapData.map((milestone, index) => (
        <div
          key={index}
          className={`flex items-center relative mb-16 ${
            index % 2 === 0 ? 'justify-start' : 'justify-end'
          }`}
        >
          {/* Content Box */}
          <div
            className={`w-[90%] sm:w-5/12 z-10 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-500 ${
              index % 2 === 0 ? 'mr-[7%] sm:mr-[55%]' : 'ml-[7%] sm:ml-[55%]'
            }`}
          >
            <h2 className="text-red-500 dark:text-yellow-300 text-xl mb-2 font-extrabold">
              {milestone.level}
            </h2>
            {milestone.title && (
              <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
            )}
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              {milestone.description.map((desc, i) => (
                <li key={i} className="mb-1">{desc}</li>
              ))}
            </ul>
            <p className="mt-4 font-bold text-blue-700 dark:text-blue-300">{milestone.duration}</p>
          </div>

          {/* Timeline Marker */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-8 bg-orange-500 rounded-full border-4 border-white dark:border-gray-800 shadow-md animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HskJourney;
