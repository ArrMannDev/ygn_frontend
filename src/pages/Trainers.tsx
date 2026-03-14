import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Twitter, Linkedin, Loader2 } from "lucide-react";
import { api } from "../lib/axios";
import type { User } from "../types";

export const Trainers = () => {
  const [trainers, setTrainers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await api.get("/users?role=TRAINER");
        setTrainers(response.data);
      } catch (error) {
        console.error("Failed to fetch trainers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-12 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 pt-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our <span className="text-yellow-400">Team</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg pt-4">
            Our certified trainers are here to guide, motivate, and help you
            unlock your full potential.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainers.map((trainer, index) => (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer bg-zinc-900"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={
                      trainer.image ||
                      "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800"
                    }
                    alt={trainer.name}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0 grayscale-[0.3]"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Decoration Line */}
                  <div className="w-12 h-1 bg-yellow-400 mb-4 transform origin-left transition-all duration-500 group-hover:w-full" />

                  <h3 className="text-3xl font-bold text-white mb-1 transform transition-transform duration-500 group-hover:-translate-y-2">
                    {trainer.name?.split(" ")[0]}
                    <span className="block text-yellow-400">
                      {trainer.name?.split(" ")[1]}
                    </span>
                  </h3>

                  <p className="text-zinc-300 font-medium tracking-wide uppercase text-sm mb-4 transform transition-all duration-500 group-hover:text-white">
                    Trainer
                  </p>

                  {/* Additional Info Reveal on Hover */}
                  <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500 ease-in-out">
                    <p className="text-zinc-400 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 line-clamp-3">
                      {trainer.bio ||
                        "Certified professional dedicated to your fitness journey."}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                      {(trainer.specialties || ["HIIT", "Strength"]).map(
                        (specialty, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-yellow-400/20 text-yellow-400 rounded text-xs border border-yellow-400/30"
                          >
                            {specialty}
                          </span>
                        ),
                      )}
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300 transform translate-y-4 group-hover:translate-y-0">
                      {trainer.socialLinks?.instagram && (
                        <a
                          href={trainer.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-zinc-800/50 backdrop-blur-sm rounded-full text-white hover:bg-yellow-400 hover:text-zinc-900 transition-all duration-300 hover:scale-110"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {trainer.socialLinks?.twitter && (
                        <a
                          href={trainer.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-zinc-800/50 backdrop-blur-sm rounded-full text-white hover:bg-yellow-400 hover:text-zinc-900 transition-all duration-300 hover:scale-110"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                      {trainer.socialLinks?.linkedin && (
                        <a
                          href={trainer.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-zinc-800/50 backdrop-blur-sm rounded-full text-white hover:bg-yellow-400 hover:text-zinc-900 transition-all duration-300 hover:scale-110"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-yellow-400/0 rounded-3xl transition-all duration-500 group-hover:border-yellow-400/50 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
