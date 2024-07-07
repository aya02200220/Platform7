"use client";

import React, { useState, useEffect } from "react";

function CurrentDate() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    const today = new Date();
    setCurrentDate(today.toLocaleDateString("en-US", options));
  }, []);

  return (
    <div>
      <p className="text-lg">{currentDate}</p>
    </div>
  );
}

export default CurrentDate;
