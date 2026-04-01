"use client";
// For components that need React hooks and browser APIs,
// SSR (server side rendering) has to be disabled.
// Read more here: https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering

import React from "react";

const Profile: React.FC = () => {
  return (
    <div className="card-container">
      <p>
        <strong>SampleUser</strong>
      </p>
    </div>
  );
};

export default Profile;
