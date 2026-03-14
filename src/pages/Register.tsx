import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Dumbbell, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { api } from "../lib/axios";

export const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/auth/register", {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 shadow-xl"
        >
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 group mb-6">
              <div className="p-2 bg-yellow-400 rounded-lg group-hover:scale-110 transition-transform">
                <Dumbbell className="h-6 w-6 text-zinc-950" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                YGN<span className="text-yellow-400">GYM</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">
              Start Your Journey
            </h1>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-hidden focus:border-yellow-400 text-white transition-colors"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-hidden focus:border-yellow-400 text-white transition-colors"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-hidden focus:border-yellow-400 text-white transition-colors"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-hidden focus:border-yellow-400 text-white transition-colors"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-400 text-zinc-900 hover:bg-yellow-500 font-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 hover:underline">
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
