import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User as UserIcon,
  Calendar,
  BookOpen,
  Crown,
  Loader2,
  Clock,
  MapPin,
} from "lucide-react";
import { api } from "../lib/axios";
import type { User } from "../types";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    const userJson = localStorage.getItem("user");
    if (!userJson) {
      navigate("/login");
      return;
    }

    const storedUser = JSON.parse(userJson);
    try {
      const response = await api.get(`/users/${storedUser.id}`);
      setUserProfile(response.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [navigate]);

  const handleCancelBooking = async (bookingId: number) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      try {
        await api.delete(`/bookings/${bookingId}`);
        fetchProfile(); // Refetch profile to update bookings
      } catch (error) {
        console.error("Failed to cancel booking:", error);
        alert("Failed to cancel booking. Please try again.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 pt-20">
        <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
      </div>
    );
  }

  if (!userProfile) return null;

  const activeMembership = userProfile.memberships?.[0]; // For now just show the first/active one

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-yellow-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-yellow-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar / User Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full border-4 border-yellow-400 p-1 mb-6 relative group">
                <img
                  src={
                    userProfile.image ||
                    `https://ui-avatars.com/api/?name=${userProfile.name}&background=facc15&color=18181b&size=200`
                  }
                  alt={userProfile.name}
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="absolute inset-0 rounded-full bg-linear-to-t from-zinc-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors uppercase tracking-tight">
                {userProfile.name}
              </h2>
              <p className="text-zinc-500 text-sm mb-6 flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-yellow-400/50" />
                {userProfile.email}
              </p>

              <div className="w-full pt-6 border-t border-zinc-800/50 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Joined Since</span>
                  <span className="text-zinc-300 font-medium">
                    {new Date(userProfile.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Account Type</span>
                  <span className="px-2 py-0.5 bg-yellow-400/10 text-yellow-400 text-xs font-bold rounded-sm border border-yellow-400/20">
                    {userProfile.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Membership Status */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Crown className="w-20 h-20 text-yellow-400" />
              </div>

              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <Crown className="w-5 h-5 text-yellow-400" />
                Membership Details
              </h3>

              {activeMembership ? (
                <div className="space-y-4 relative z-10">
                  <div className="p-4 bg-zinc-950/50 border border-zinc-800/50 rounded-2xl">
                    <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1">
                      {activeMembership.type} PLAN
                    </p>
                    <p className="text-white text-xl font-bold capitalize">
                      {activeMembership.status}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-400 text-sm">
                    <Calendar className="w-4 h-4 text-yellow-400" />
                    <span>
                      Expires:{" "}
                      {new Date(activeMembership.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <p className="text-zinc-500 italic">No active membership</p>
                  <button
                    onClick={() => navigate("/memberships")}
                    className="w-full py-3 bg-yellow-400 text-zinc-950 font-bold rounded-xl hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-400/10"
                  >
                    View Plans
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Main Content - Joined Classes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="mb-8">
              <h3 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                {userProfile.role === "TRAINER" ? (
                  <>
                    Assigned <span className="text-yellow-400">Classes</span>
                  </>
                ) : (
                  <>
                    Your <span className="text-yellow-400">Classes</span>
                  </>
                )}
              </h3>
              <p className="text-zinc-500">
                {userProfile.role === "TRAINER"
                  ? "Track your assigned workout sessions and schedule."
                  : "Track your upcoming workout sessions and schedule."}
              </p>
            </div>

            <div className="space-y-4">
              {userProfile.role === "TRAINER" ? (
                userProfile.classes && userProfile.classes.length > 0 ? (
                  userProfile.classes.map((cls: any, index: number) => (
                    <motion.div
                      key={cls.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-zinc-900/40 border border-zinc-800/50 hover:border-yellow-400/30 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-zinc-800">
                          <img
                            src={
                              cls.image ||
                              "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200"
                            }
                            alt={cls.name}
                            className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                            {cls.name}
                          </h4>
                          <p className="text-zinc-500 text-sm mb-2 font-medium tracking-wide">
                            {cls.bookings?.length || 0} / {cls.capacity}{" "}
                            Enrolled
                          </p>
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-zinc-400 text-xs">
                              <Clock className="w-3.5 h-3.5 text-yellow-400" />
                              {new Date(cls.schedule).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                            <div className="flex items-center gap-2 text-zinc-400 text-xs">
                              <Calendar className="w-3.5 h-3.5 text-yellow-400" />
                              {new Date(cls.schedule).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2 text-zinc-400 text-xs">
                              <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                              Main Studio
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => navigate(`/classes`)}
                          className="px-6 py-2 rounded-lg border border-zinc-800 text-zinc-400 text-sm font-bold hover:border-yellow-400/50 hover:text-white transition-all"
                        >
                          View Class
                        </button>
                        <button
                          onClick={() =>
                            handleCancelBooking(cls.bookings?.[0]?.id)
                          }
                          className="px-6 py-2 rounded-lg border border-red-500/20 text-red-400 text-sm font-bold hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                        >
                          Cancel Booking
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-3xl">
                    <div className="p-4 bg-zinc-900 rounded-full mb-4">
                      <BookOpen className="w-8 h-8 text-zinc-700" />
                    </div>
                    <p className="text-zinc-500 mb-6">
                      You are not assigned to any classes yet.
                    </p>
                  </div>
                )
              ) : userProfile.bookings && userProfile.bookings.length > 0 ? (
                userProfile.bookings.map((booking: any, index: number) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-zinc-900/40 border border-zinc-800/50 hover:border-yellow-400/30 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-zinc-800">
                        <img
                          src={
                            booking.class?.image ||
                            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200"
                          }
                          alt={booking.class?.name}
                          className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                          {booking.class?.name}
                        </h4>
                        <p className="text-zinc-500 text-sm mb-2 font-medium tracking-wide">
                          {booking.class?.trainer?.name}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 text-zinc-400 text-xs">
                            <Clock className="w-3.5 h-3.5 text-yellow-400" />
                            {new Date(
                              booking.class?.schedule,
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                          <div className="flex items-center gap-2 text-zinc-400 text-xs">
                            <Calendar className="w-3.5 h-3.5 text-yellow-400" />
                            {new Date(
                              booking.class?.schedule,
                            ).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-zinc-400 text-xs">
                            <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                            Main Studio
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => navigate("/classes")}
                        className="px-6 py-2 rounded-lg border border-zinc-800 text-zinc-400 text-sm font-bold hover:border-yellow-400/50 hover:text-white transition-all"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="px-6 py-2 rounded-lg border border-red-500/20 text-red-400 text-sm font-bold hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-3xl">
                  <div className="p-4 bg-zinc-900 rounded-full mb-4">
                    <BookOpen className="w-8 h-8 text-zinc-700" />
                  </div>
                  <p className="text-zinc-500 mb-6">
                    You haven't joined any classes yet.
                  </p>
                  <button
                    onClick={() => navigate("/classes")}
                    className="px-8 py-3 bg-yellow-400 text-zinc-950 font-extrabold rounded-xl hover:bg-yellow-500 transition-all shadow-lg shadow-yellow-400/5"
                  >
                    Browse Classes
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
