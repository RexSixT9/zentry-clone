// import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

// const socialLinks = [
//   { href: "https://discord.com", icon: <FaDiscord /> },
//   { href: "https://twitter.com", icon: <FaTwitter /> },
//   { href: "https://youtube.com", icon: <FaYoutube /> },
//   { href: "https://medium.com", icon: <FaMedium /> },
// ];

const Footer = () => {
  return (
    <footer className="w-screen bg-blue-50 py-2 text-black mb-3">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 md:flex-row">
        {/* <div className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-300 ease-in-out hover:text-violet-500"
            >
              {link.icon}
            </a>
          ))}
        </div> */}
        <p className="text-center text-xs md:text-sm font-light">
          © Rex 2025. All rights reserved
        </p>
        {/* <a
          href="#privacy-policy"
          className="text-center text-xs font-light hover:underline"
        >
          Privacy Policy
        </a> */}
      </div>
    </footer>
  );
};

export default Footer;
