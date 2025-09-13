
import React from 'react';
import { Link } from 'react-router-dom';
import creekShoreLogo from '@/assets/creek-shore-logo.png';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="relative w-12 h-12 overflow-hidden rounded-full bg-white p-1">
        <img 
          src={creekShoreLogo} 
          alt="Creek Shore Logo" 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-display font-bold text-green-700 leading-tight group-hover:text-green-600 transition-colors duration-300">
          Creek Shore
        </span>
        <span className="text-sm font-medium text-blue-600 group-hover:text-blue-500 transition-colors duration-300">
          Homestay
        </span>
      </div>
    </Link>
  );
};

export default Logo;
