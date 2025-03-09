import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-4 text-white">
            <footer className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12">
                <div className="text-center md:text-left">
                    <p className="text-sm md:text-base">Copyright © {new Date().getFullYear()} studyMEDIC. All rights reserved.</p>
                </div>
                <nav className="flex gap-4 mt-2 md:mt-0">
                    <Link to="/terms" className="hover:underline">Terms & Conditions</Link>
                    <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
                    <Link to="/refund" className="hover:underline">Refund Policy</Link>
                </nav>
            </footer>
        </div>
    );
}

export default Footer;
