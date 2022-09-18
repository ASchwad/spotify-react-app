import * as React from 'react';
import './App.css';

function Footer() {
  return (
    <footer className="bg-gray-100 text-center lg:text-left">
      <div className="container p-6">
        <div>
          <h5 className="uppercase font-bold mb-2.5 text-gray-800">Links</h5>

          <ul className="list-none mb-12">
            <li>
              <a href="#!" className="text-gray-800">Checkout the source code</a>
            </li>
            <li>
              <a href="#!" className="text-gray-800">My other projects</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;