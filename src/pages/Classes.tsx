import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Users,
  ArrowRight,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { api } from "../lib/axios";
import type { Class, User } from "../types";
import { useNavigate } from "react-router-dom";

export const Classes = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    fetchClasses();
    const userJson = localStorage.getItem("user");
    if (userJson) {
      setCurrentUser(JSON.parse(userJson));
    }
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await api.get("/classes");
      setClasses(response.data);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookClass = async (classId: number) => {
    const userJson = localStorage.getItem("user");
    if (!userJson) {
      navigate("/login");
      return;
    }

    const user: User = JSON.parse(userJson);
    setIsBooking(true);
    setBookingStatus(null);

    try {
      await api.post("/bookings", {
        userId: user.id,
        classId: classId,
      });
      setBookingStatus({
        type: "success",
        message: "Successfully booked class!",
      });
      // Refresh classes to update booking count
      fetchClasses();
      setTimeout(() => {
        setSelectedClass(null);
        setBookingStatus(null);
      }, 2000);
    } catch (error: any) {
      setBookingStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to book class. Please try again.",
      });
    } finally {
      setIsBooking(false);
    }
  };

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
    <div className="min-h-screen pt-20 pb-12 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 pt-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-yellow-400">Classes</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Join our expert-led classes designed to push your limits and help
            you achieve your fitness goals.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {classes.map((cls) => (
              <motion.div
                key={cls.id}
                variants={itemVariants}
                onClick={() => setSelectedClass(cls)}
                className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-video overflow-hidden">
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
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                        {cls.name}
                      </h3>
                      <p className="text-sm text-yellow-400 font-medium">
                        {cls.trainer?.name || "Expert Trainer"}
                      </p>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-sm mb-6 line-clamp-2">
                    {cls.description ||
                      "Join this amazing class to improve your fitness."}
                  </p>

                  <div className="flex items-center justify-between text-sm text-zinc-500 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(cls.schedule)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {cls.bookings?.length || 0} / {cls.capacity}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full group/btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedClass(cls);
                    }}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Class Details Modal */}
      <AnimatePresence>
        {selectedClass && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedClass(null)}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedClass(null)}
                className="absolute top-4 right-4 p-2 bg-zinc-950/50 hover:bg-zinc-950 rounded-full text-zinc-400 hover:text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-full relative font-sans">
                  <img
                    src={
                      selectedClass.image ||
                      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
                    }
                    alt={selectedClass.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent md:bg-linear-to-r" />
                </div>

                <div className="p-8">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {selectedClass.name}
                    </h2>
                    <p className="text-yellow-400 font-medium">
                      With {selectedClass.trainer?.name || "Expert Trainer"}
                    </p>
                  </div>

                  <p className="text-zinc-400 mb-8 leading-relaxed">
                    {selectedClass.description ||
                      "Experience a professional workout environment designed to help you succeed. This class focuses on technique, consistency, and pushing your boundaries."}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-zinc-300">
                      <div className="p-2 bg-zinc-800 rounded-lg">
                        <Clock className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">
                          Schedule
                        </p>
                        <p>{formatTime(selectedClass.schedule)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-300">
                      <div className="p-2 bg-zinc-800 rounded-lg">
                        <Users className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">
                          Availability
                        </p>
                        <p>
                          {selectedClass.bookings?.length || 0} /{" "}
                          {selectedClass.capacity} spots filled
                        </p>
                      </div>
                    </div>
                  </div>

                  {bookingStatus && (
                    <div
                      className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm ${
                        bookingStatus.type === "success"
                          ? "bg-green-500/10 border border-green-500/50 text-green-500"
                          : "bg-red-500/10 border border-red-500/50 text-red-500"
                      }`}
                    >
                      {bookingStatus.type === "success" ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <AlertCircle className="w-5 h-5" />
                      )}
                      {bookingStatus.message}
                    </div>
                  )}

                  <Button
                    className="w-full h-12 text-lg font-bold"
                    onClick={() => handleBookClass(selectedClass.id)}
                    disabled={
                      isBooking ||
                      (selectedClass.bookings?.length || 0) >=
                        selectedClass.capacity ||
                      (currentUser?.role === "TRAINER" &&
                        selectedClass.trainerId === currentUser.id)
                    }
                  >
                    {isBooking ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : currentUser?.role === "TRAINER" &&
                      selectedClass.trainerId === currentUser.id ? (
                      "Your Assigned Class"
                    ) : (selectedClass.bookings?.length || 0) >=
                      selectedClass.capacity ? (
                      "Class Full"
                    ) : (
                      "Confirm Registration"
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
