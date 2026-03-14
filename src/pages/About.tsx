import { motion } from "framer-motion";
import { Users, Target, Heart, Award, Dumbbell, Clock } from "lucide-react";

export const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000"
            alt="Gym Atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            More Than Just a <span className="text-yellow-400">Gym</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-300 max-w-2xl mx-auto"
          >
            We are a community dedicated to strength, resilience, and personal
            growth. Forging greatness in Yangon since 2018.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our <span className="text-yellow-400">Story</span>
            </h2>
            <div className="space-y-4 text-zinc-400 text-lg leading-relaxed">
              <p>
                YGN Gym started with a simple idea: to create a space where
                fitness isn't just a chore, but a lifestyle. What began as a
                small garage gym has grown into Yangon's premier fitness
                destination.
              </p>
              <p>
                We believed that the city needed a facility that combined
                top-tier equipment with a supportive, non-judgmental community.
                We wanted to build a place where beginners feel welcome and
                athletes feel challenged.
              </p>
              <p>
                Today, we are proud to be the home of over 1,000 members who are
                rewriting their stories, one rep at a time.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-3xl overflow-hidden border border-zinc-800"
          >
            <img
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=1000"
              alt="Gym Interior"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-yellow-500/10 mix-blend-overlay" />
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Core <span className="text-yellow-400">Values</span>
            </h2>
            <p className="text-zinc-400">
              The principles that drive everything we do.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Users,
                title: "Community",
                desc: "We rise by lifting others. Our gym is a family where everyone supports each other's journey.",
              },
              {
                icon: Target,
                title: "Excellence",
                desc: "We don't settle for average. From our equipment to our training programs, we strive for the best.",
              },
              {
                icon: Heart,
                title: "Inclusivity",
                desc: "Fitness is for everyone. No matter your starting point, age, or background, you belong here.",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 hover:border-yellow-400/50 transition-colors group"
              >
                <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-zinc-400">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "1000+", label: "Active Members", icon: Users },
              { number: "50+", label: "Expert Trainers", icon: Dumbbell },
              { number: "5", label: "Years Strong", icon: Award },
              { number: "24/7", label: "Access", icon: Clock },
            ].map((stat, i) => (
              <div key={i} className="text-center text-zinc-900">
                <stat.icon className="w-8 h-8 mx-auto mb-4 opacity-75" />
                <div className="text-4xl md:text-5xl font-black mb-2">
                  {stat.number}
                </div>
                <div className="font-bold uppercase tracking-wider opacity-80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            World-Class <span className="text-yellow-400">Facilities</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1517963879466-e1b54ebd512d?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1574680096141-9877b4765e74?auto=format&fit=crop&q=80&w=800",
          ].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl overflow-hidden h-64 ${i === 0 || i === 3 ? "col-span-2" : "col-span-1"}`}
            >
              <img
                src={src}
                alt="Facility"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
