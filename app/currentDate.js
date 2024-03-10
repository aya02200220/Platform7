import React from "react";

function getCurrentDate() {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  const today = new Date();
  return today.toLocaleDateString("en-US", options);
}

function CurrentDate() {
  const currentDate = getCurrentDate();

  return (
    <div>
      <p>{currentDate}</p>
    </div>
  );
}

export default CurrentDate;
