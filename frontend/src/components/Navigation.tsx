'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { AiFillHome, AiFillInfoCircle } from 'react-icons/ai';
import { BsBuilding, BsPersonLinesFill } from 'react-icons/bs';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { IoNewspaper } from 'react-icons/io5';
import { MdContactMail } from 'react-icons/md';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { 
      href: '/', 
      label: 'Accueil', 
      icon: <AiFillHome size={20} className="mr-1 text-blue-600" /> 
    },
    { 
      href: '/offres', 
      label: 'Offres', 
      icon: <BsBuilding size={20} className="mr-1 text-green-600" /> 
    },
    { 
      href: '/about', 
      label: 'À Propos', 
      icon: <AiFillInfoCircle size={20} className="mr-1 text-purple-600" /> 
    },
    { 
      href: '/services', 
      label: 'Services', 
      icon: <RiCustomerService2Fill size={20} className="mr-1 text-orange-500" /> 
    },
    { 
      href: '/portfolio', 
      label: 'Portfolio', 
      icon: <BsPersonLinesFill size={20} className="mr-1 text-red-500" /> 
    },
    { 
      href: '/blog', 
      label: 'Blog', 
      icon: <IoNewspaper size={20} className="mr-1 text-teal-600" /> 
    },
    { 
      href: '/contact', 
      label: 'Contact', 
      icon: <MdContactMail size={20} className="mr-1 text-indigo-600" /> 
    }
  ];

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/images/logo-white.png"
                alt="MVB Immobilier"
                width={150}
                height={50}
                className="h-12 w-auto"
                sizes="(max-width: 768px) 100vw, 150px"
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-500 transition-colors duration-200"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center flex p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
} 