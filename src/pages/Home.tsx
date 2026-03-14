import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Users, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { api } from "../lib/axios";
import type { Class } from "../types";

export const Home = () => {
  const [popularClasses, setPopularClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get("/classes");
        // Take the first 3 classes as "popular" for now
        setPopularClasses(response.data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920')",
              filter: "brightness(0.3) grayscale(0.8)",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-br from-zinc-900/90 via-zinc-950/80 to-zinc-950/90" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-500/10 blur-[100px] rounded-full transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-yellow-500/5 blur-[80px] rounded-full transform -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div
              variants={itemVariants}
              className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 text-sm font-medium border border-yellow-400/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              Now Open for New Members
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
            >
              Forging{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">
                Greatness
              </span>
              , <br />
              Building Stronger <span className="text-zinc-500">Lives.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-zinc-400 mb-8 max-w-2xl leading-relaxed"
            >
              Experience the best gym facilities in Yangon. Expert trainers,
              modern equipment, and a supportive community dedicated to your
              fitness journey.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/classes">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-lg px-8"
                >
                  View Classes
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Popular Classes Section */}
      <section className="py-24 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Popular <span className="text-yellow-400">Classes</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Check out our most trending sessions and join the community.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {popularClasses.map((cls, i) => (
                <motion.div
                  key={cls.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-yellow-400/50 transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={
                        cls.image ||
                        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
                      }
                      alt={cls.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {cls.name}
                    </h3>
                    <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                      {cls.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-zinc-500">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span>{formatTime(cls.schedule)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-yellow-400" />
                        <span>{cls.capacity} Spots</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="/classes">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                View All Classes <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose YGN Gym?
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We provide everything you need to push your limits and achieve
              your fitness goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Trainers",
                desc: "Certified professionals to guide your every step.",
                icon: "🏆",
              },
              {
                title: "Modern Equipment",
                desc: "Top-tier machinery for every muscle group.",
                icon: "⚡",
              },
              {
                title: "Clean & Spacious",
                desc: "A hygienic environment designed for comfort.",
                icon: "✨",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-yellow-400/50 transition-colors group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stories of <span className="text-yellow-400">Success</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Real results from real people who decided to make a change.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex M.",
                role: "Member since 2023",
                quote:
                  "The trainers here pushed me beyond what I thought was possible. I've lost 20lbs and gained so much confidence.",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
              },
              {
                name: "Sarah L.",
                role: "Member since 2022",
                quote:
                  "Clean facilities, great community, and the yoga classes are creating a perfect balance in my life.",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
              },
              {
                name: "James K.",
                role: "Member since 2024",
                quote:
                  "I was intimidated at first, but the staff made me feel right at home. Best decision I've made for my health.",
                image:
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 relative"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
                  />
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-zinc-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-zinc-300 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-zinc-900/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked{" "}
              <span className="text-yellow-400">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "What are your opening hours?",
                a: "We are open 24/7 for members with keycard access. Staffed hours are 6am - 10pm daily.",
              },
              {
                q: "Do you offer personal training?",
                a: "Yes! We have a team of certified personal trainers available for 1-on-1 sessions. You can book them through our app or at the front desk.",
              },
              {
                q: "Can I freeze my membership?",
                a: "Absolutely. You can freeze your membership for up to 3 months per year for medical or travel reasons.",
              },
              {
                q: "Is there a parking area?",
                a: "Yes, we have a dedicated parking lot for our members, free of charge for the first 2 hours.",
              },
            ].map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-white font-medium hover:text-yellow-400 transition-colors">
                  {faq.q}
                  <span className="transform group-open:rotate-180 transition-transform duration-300">
                    ▼
                  </span>
                </summary>
                <div className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-yellow-500/10" />
        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to transform your life?
          </h2>
          <Link to="/register">
            <Button size="lg" className="rounded-full px-12 text-lg">
              Join Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
