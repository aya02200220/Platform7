import React from "react";

export const Note = () => {
  return (
    <>
      <div className="mt-3 w-full text-[13px]">
        <div className="mx-10">
          <h3>Example </h3>
          <hr />
          <ul className="ml-5 list-disc mt-2">
            <li>6:30am ~ 1:00pm → 6:30</li>
            <li>8:00am ~ 1:30pm → 5:30</li>
            <li>8:00am ~ 3:00pm → 7:00</li>
            <li>1:00pm ~ 8:00pm → 7:00</li>
          </ul>
        </div>
      </div>
    </>
  );
};
