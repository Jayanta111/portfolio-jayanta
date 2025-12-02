import { socialLinks } from "../constants/index.js";
import { Youtube, Github, Instagram, Linkedin } from "lucide-react";
import { LeetCode, BuyMeACoffee } from "../components/CustomIcons.jsx"; 

const ICONS = {
  youtube: Youtube,
  github: Github,
  instagram: Instagram,
  linkedin: Linkedin,
  leetcode: LeetCode,
  buymeacoffee: BuyMeACoffee,
};

const SocialLinks = ({ size = 24 }) => {
  return (
    <div className="flex space-x-4">
      {socialLinks.map((link) => {
        const Icon = ICONS[link.icon];
        if (!Icon) return null;

        // Determine if it's a custom image icon
        const isCustom = ["leetcode", "buymeacoffee"].includes(link.icon);

        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-all duration-200 ${
              isCustom
                ? "filter grayscale hover:grayscale-0 hover:brightness-110"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            <Icon size={size} className={isCustom ? "" : ""} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
