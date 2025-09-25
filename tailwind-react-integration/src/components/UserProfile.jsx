

import React from "react";

function UserProfile() {
  return (
    <div
      className="user-profile
                 bg-gray-100 p-4 md:p-8 max-w-xs md:max-w-sm mx-auto my-10 md:my-20
                 rounded-lg shadow-lg text-center
                 hover:shadow-xl hover:-translate-y-1
                 motion-safe:transition-shadow motion-safe:duration-300 transform"
    >
      <img
        src="https://via.placeholder.com/150"
        alt="User avatar of John Doe"
        className="rounded-full w-24 h-24 md:w-36 md:h-36 mx-auto object-cover
                   motion-safe:transform motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-in-out
                   hover:scale-110"
      />

      <h1
        tabIndex="0"
        className="text-lg md:text-xl text-blue-800 my-4
                   transition-colors duration-200 hover:text-blue-500 focus:text-blue-500
                   focus:outline-none focus:ring-2 focus:ring-blue-200 rounded"
      >
        John Doe
      </h1>

      <p className="text-sm md:text-base text-gray-600">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;
