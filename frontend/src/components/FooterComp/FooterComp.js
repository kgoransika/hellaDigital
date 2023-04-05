import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function FooterComp() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex justify-between">
        <div>
          <p className="text-lg font-medium	 mb-2 tracking-wider">Support</p>
          <p className="text-sm text-gray-300">Help & Support</p>
          <p className="text-sm text-gray-300">Trust & Safety</p>
          <p className="text-sm text-gray-300">Selling on Hella Digital</p>
          <p className="text-sm text-gray-300">Buying on Hella Digital</p>
        </div>
        <div>
          <p className="text-lg font-medium	 mb-2 tracking-wider">Terms</p>
          <p className="text-sm text-gray-300">Privacy Policy</p>
          <p className="text-sm text-gray-300">Terms and Conditions</p>
          <p className="text-sm text-gray-300">Copyright Policy</p>
          <p className="text-sm text-gray-300">Fees and Charges</p>
        </div>

        <div className="flex justify-end">
          <div className="w-1/2">
            <h3 className="text-xl mb-4">Give us your Feedback!</h3>
            <form>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="w-full bg-gray-800 border-gray-700 rounded-lg py-2 px-3 mb-3 text-gray-300"
                required
              />

              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full bg-gray-800 border-gray-700 rounded-lg py-2 px-3 mb-3 mr-1 text-gray-300"
                required
              />

              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Message"
                className="w-full h-20 bg-gray-800 border-gray-700 rounded-lg py-2 px-3 mb-3 text-gray-300"
                required
              ></textarea>

              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Send Feedback!
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr className="mb-10" />
      <div className="ml-20 mr-20 flex container mx-auto flex justify-between">
        <div>
          <span>HELLA</span>
          <span id="digital"> DIGITAL</span>
        </div>
        <div>
          <span>© Hella Digital Ltd. 2023</span>
        </div>
        <div>
          <ul className="flex">
            <li className="mr-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook className="text-2xl" />
              </a>
            </li>
            <li className="mr-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter className="text-2xl" />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className="text-2xl" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
