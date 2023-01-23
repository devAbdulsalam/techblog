import React from "react";
import { useState, useEffect } from "react";


const Footer = () => {
  const [currentYear, setCurrentYear] = useState("");
  useEffect(() => {
    currentFullYear()
  
  }, [])
  const currentFullYear = () => {
    const newYear = new Date().getFullYear().toString()
    setCurrentYear( newYear )
  }
  return (
    <footer className="bg-gray-800 text-sm absolute buttom-0 w-full p-4 text-center text-white py-3">
      <div className='container mx-auto lg:w-10/12'>
        <div className='flex flex-col lg:flex-row space-y-6 lg:space-y-0 items-center justify-between'>
          <div className="text-2xl">
            <a href="https://twitter.com/MMAbdulsalam001" target="_blank" rel='noreferrer' className="mx-2 text-2xl twitter">
              <i className="fas fa fa-twitter "></i>
            </a>
            <a href="https://github.com/devAbdulsalam" target="_blank" rel='noreferrer' className="mx-2 text-2xl github">
              <i className="fas fa fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/abdulsalammmuftua/" target="_blank" rel='noreferrer' className="mx-2 text-2xl text-white linkedin">
              <i className="fas fa fa-linkedin"></i>
            </a>
          </div>
          <h4 className="text-2xl font-bold my-3">techstuff.ng</h4>
          <p className="text-gray-500">Copyright © {currentYear} Blogger.All Rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
