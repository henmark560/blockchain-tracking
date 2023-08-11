import React from "react";

const Button = ({ styles }) => {
  
  return (
    <div className="mt-6 max-w-lg w-full shadow-md">
      <form>
        <input placeholder="Enter your tracking id: " className="p-2 w-full border rounded-md focus:ring focus:ring-blue-900 focus:border-blue-900"  ></input>
      </form>
      <button type="button" className={`py-3 px-6 font-poppins mt-2 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
        Track Item
      </button>
    </div>
  )
};

export default Button;
