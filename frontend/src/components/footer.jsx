import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-950 text-zinc-300 border-t border-zinc-800 px-8 py-10 mt-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* 🚀 Project Info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">FoodieHub</h2>
          <p className="text-sm leading-6">
            A full-stack food delivery platform built as a showcase project
            featuring user authentication, seller dashboard, restaurant
            management, cart flow, and secure JWT cookie-based sessions.
          </p>
        </div>

        {/* 🛠 Tech Stack */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">Tech Stack</h2>
          <p className="text-sm leading-6">
            React • Tailwind CSS • Node.js • Express • MongoDB • JWT • bcrypt •
            Render Deployment
          </p>
        </div>

        {/* 👨‍💻 Developer Links */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            Connect with Developer
          </h2>

          <div className="space-y-3">
            <a
              href="https://github.com/simha-sage"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <Github size={18} />
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/lnarsimha"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>

            <a
              href="mailto:lnarsimha.dev@gmail.com"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <Mail size={18} />
              Email
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-zinc-800 pt-4 text-center text-sm text-zinc-500">
        © 2026 FoodieHub • Built for portfolio showcase by Lakshmi Narasimha
      </div>
    </footer>
  );
};

export default Footer;
