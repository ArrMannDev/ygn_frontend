import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Calendar,
  BookOpen,
  TrendingUp,
  Trash2,
  Shield,
  UserPlus,
  Loader2,
  ChevronRight,
  Plus,
  Search,
  LayoutDashboard,
  Menu,
  X,
  LogOut,
  Bell,
  Settings,
  ArrowUpDown,
  ChevronLeft,
  Filter,
} from "lucide-react";
import { api } from "../lib/axios";
import type { User, Class, Booking, Role } from "../types";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";

type Tab = "overview" | "users" | "classes" | "bookings";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [users, setUsers] = useState<User[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [filterRole, setFilterRole] = useState<Role | "ALL">("ALL");

  const checkAdmin = () => {
    const userJson = localStorage.getItem("user");
    if (!userJson) {
      navigate("/login");
      return false;
    }
    const user = JSON.parse(userJson);
    if (user.role !== "ADMIN") {
      navigate("/");
      return false;
    }
    return true;
  };

  const fetchData = async () => {
    if (!checkAdmin()) return;

    setIsLoading(true);
    try {
      const [usersRes, classesRes, bookingsRes] = await Promise.all([
        api.get("/users"),
        api.get("/classes"),
        api.get("/bookings"),
      ]);
      setUsers(usersRes.data);
      setClasses(classesRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, filterRole]);

  const handleDeleteUser = async (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/users/${id}`);
        setUsers(users.filter((u) => u.id !== id));
      } catch (error) {
        alert("Failed to delete user");
      }
    }
  };

  const handleChangeRole = async (id: number, role: Role) => {
    try {
      await api.patch(`/users/${id}`, { role });
      setUsers(users.map((u) => (u.id === id ? { ...u, role } : u)));
    } catch (error) {
      alert("Failed to update role");
    }
  };

  const handleDeleteClass = async (id: number) => {
    if (confirm("Are you sure you want to delete this class?")) {
      try {
        await api.delete(`/classes/${id}`);
        setClasses(classes.filter((c) => c.id !== id));
      } catch (error) {
        alert("Failed to delete class");
      }
    }
  };

  const handleDeleteBooking = async (id: number) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      try {
        await api.delete(`/bookings/${id}`);
        setBookings(bookings.filter((b) => b.id !== id));
      } catch (error) {
        alert("Failed to delete booking");
      }
    }
  };

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (data: any[]) => {
    if (!sortConfig) return data;
    const sortedData = [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
      </div>
    );
  }

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "users", label: "Users List", icon: Users },
    { id: "classes", label: "Class Schedule", icon: Calendar },
    { id: "bookings", label: "Bookings", icon: BookOpen },
  ];

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      color: "text-blue-400",
    },
    {
      label: "Active Classes",
      value: classes.length,
      icon: Calendar,
      color: "text-yellow-400",
    },
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: BookOpen,
      color: "text-green-400",
    },
    {
      label: "Revenue",
      value: "$12.5k",
      icon: TrendingUp,
      color: "text-purple-400",
    },
  ];

  const SidebarContent = () => (
    <div className="h-full flex flex-col p-6">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="p-2 bg-yellow-400 rounded-xl">
          <TrendingUp className="w-6 h-6 text-zinc-950" />
        </div>
        <span className="text-xl font-black text-white tracking-tighter uppercase italic">
          Admin<span className="text-yellow-400">Panel</span>
        </span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id as Tab);
              setIsMobileMenuOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group relative",
              activeTab === item.id
                ? "bg-yellow-400 text-zinc-950 shadow-lg shadow-yellow-400/10"
                : "text-zinc-500 hover:text-white hover:bg-zinc-900",
            )}
          >
            <item.icon
              className={cn(
                "w-5 h-5",
                activeTab === item.id
                  ? "text-zinc-950"
                  : "group-hover:text-yellow-400 transition-colors",
              )}
            />
            <span className="font-bold text-sm tracking-wide uppercase">
              {item.label}
            </span>
            {activeTab === item.id && (
              <motion.div
                layoutId="sidebar-active"
                className="absolute left-0 w-1.5 h-6 bg-zinc-950 rounded-r-full"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="px-4 py-4 bg-zinc-900/50 rounded-3xl border border-zinc-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
              <Shield className="w-4 h-4 text-yellow-400" />
            </div>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              Admin Access
            </p>
          </div>
          <button className="text-xs font-bold text-white hover:text-yellow-400 transition-colors flex items-center gap-2">
            View System Logs <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-zinc-500 hover:text-red-400 hover:bg-red-400/5 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-bold text-sm uppercase tracking-wide">
            Exit Dashboard
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 flex text-zinc-400 font-sans selection:bg-yellow-400/30">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-zinc-950 border-r border-zinc-900 transition-all duration-500 ease-in-out hidden lg:block",
          isSidebarOpen ? "w-80" : "w-0 -translate-x-full overflow-hidden",
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-60 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 w-80 bg-zinc-950 z-70 border-r border-zinc-900 lg:hidden"
      >
        <SidebarContent />
      </motion.aside>

      {/* Main Content Area */}
      <main
        className={cn(
          "flex-1 transition-all duration-500 ease-in-out",
          isSidebarOpen ? "lg:ml-80" : "ml-0",
        )}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (window.innerWidth < 1024) setIsMobileMenuOpen(true);
                else setIsSidebarOpen(!isSidebarOpen);
              }}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-yellow-400/50 transition-colors"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
            <div>
              <h2 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-0.5 opacity-50">
                Main Menu
              </h2>
              <h1 className="text-white font-bold text-lg capitalize">
                {activeTab}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 mr-4">
              <button className="p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-yellow-400 transition-all">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-yellow-400 transition-all">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            <div className="h-10 w-px bg-zinc-800 mx-2 hidden md:block" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-white text-xs font-black uppercase tracking-wider">
                  Super Admin
                </p>
                <p className="text-[10px] text-zinc-500 font-bold">
                  session_active_01
                </p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-yellow-400 p-0.5 border border-yellow-400/20">
                <img
                  src="https://ui-avatars.com/api/?name=Admin&background=facc15&color=18181b"
                  className="w-full h-full rounded-[14px]"
                  alt=""
                />
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {/* Header / Search Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h3 className="text-3xl font-black text-white tracking-tight uppercase mb-2">
                  Dashboard{" "}
                  <span className="text-yellow-400">/{activeTab}</span>
                </h3>
                <p className="font-medium text-zinc-600">
                  Managing gym environment and operations.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {activeTab === "users" && (
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <select
                      value={filterRole}
                      onChange={(e) =>
                        setFilterRole(e.target.value as Role | "ALL")
                      }
                      className="bg-zinc-900/50 border border-zinc-800 rounded-2xl pl-10 pr-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-yellow-400/50 transition-all appearance-none cursor-pointer uppercase font-bold tracking-wider"
                    >
                      <option value="ALL">All Roles</option>
                      <option value="USER">Members</option>
                      <option value="TRAINER">Trainers</option>
                      <option value="ADMIN">Admins</option>
                    </select>
                  </div>
                )}
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-yellow-400/50 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button className="bg-white text-zinc-950 hover:bg-zinc-200 h-12 rounded-2xl px-6">
                  <Plus className="w-5 h-5 mr-2" />{" "}
                  <span className="hidden sm:inline">Create</span>
                </Button>
              </div>
            </div>

            {/* Stats - Grid for Overview, simple row for others? No, keep it clean */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-zinc-900 border border-zinc-900 p-6 rounded-4xl group hover:border-yellow-400/30 transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <stat.icon className="w-20 h-20" />
                    </div>
                    <div
                      className={`p-3 rounded-2xl bg-zinc-950 border border-zinc-800 ${stat.color} mb-6 inline-block`}
                    >
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <p className="text-3xl font-black text-white mb-1">
                      {stat.value}
                    </p>
                    <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="bg-zinc-900/30 border border-zinc-900 rounded-4xl overflow-hidden backdrop-blur-sm min-h-[600px]">
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-zinc-950 border border-zinc-900 rounded-4xl p-8">
                          <h3 className="text-xl font-bold text-white mb-8 flex items-center justify-between">
                            <span className="flex items-center gap-3">
                              <Users className="w-5 h-5 text-yellow-400" />
                              Recent Members
                            </span>
                            <button className="text-xs text-zinc-600 hover:text-yellow-400 transition-colors uppercase font-black tracking-widest">
                              View All
                            </button>
                          </h3>
                          <div className="space-y-5">
                            {users.slice(0, 5).map((user) => (
                              <div
                                key={user.id}
                                className="flex items-center justify-between p-5 bg-zinc-900/30 rounded-3xl border border-zinc-900 hover:border-zinc-800 transition-colors"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center border border-zinc-800">
                                    <img
                                      src={`https://ui-avatars.com/api/?name=${user.name}&background=facc15&color=18181b`}
                                      className="w-full h-full rounded-2xl p-0.5"
                                    />
                                  </div>
                                  <div>
                                    <p className="text-white font-bold text-sm tracking-tight">
                                      {user.name}
                                    </p>
                                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                                      {user.email}
                                    </p>
                                  </div>
                                </div>
                                <span className="px-3 py-1 bg-zinc-800 rounded-lg text-[9px] font-black uppercase text-zinc-400 tracking-tighter">
                                  {user.role}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-zinc-950 border border-zinc-900 rounded-4xl p-8">
                          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-yellow-400" />
                            System Actions
                          </h3>
                          <div className="grid grid-cols-2 gap-4 h-[400px]">
                            {[
                              {
                                label: "New Member",
                                icon: UserPlus,
                                color: "bg-blue-500/10 text-blue-400",
                              },
                              {
                                label: "Verify Staff",
                                icon: Shield,
                                color: "bg-purple-500/10 text-purple-400",
                              },
                              {
                                label: "Audit Logs",
                                icon: ChevronRight,
                                color: "bg-zinc-900 text-zinc-500",
                              },
                              {
                                label: "Financials",
                                icon: TrendingUp,
                                color: "bg-green-500/10 text-green-400",
                              },
                            ].map((action) => (
                              <button
                                key={action.label}
                                className="flex flex-col items-center justify-center p-6 bg-zinc-900/30 rounded-4xl border border-zinc-900 hover:border-yellow-400/20 hover:-translate-y-1 transition-all group"
                              >
                                <div
                                  className={`p-5 rounded-3xl mb-4 ${action.color} group-hover:scale-110 transition-transform`}
                                >
                                  <action.icon className="w-7 h-7" />
                                </div>
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">
                                  {action.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "users" && (
                    <motion.div
                      key="users"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 pt-6">
                        {[
                          {
                            label: "Total Community",
                            value: users.length,
                            icon: Users,
                            color: "text-yellow-400",
                            bg: "bg-yellow-400/5",
                          },
                          {
                            label: "Expert Trainers",
                            value: users.filter((u) => u.role === "TRAINER")
                              .length,
                            icon: Shield,
                            color: "text-blue-400",
                            bg: "bg-blue-400/5",
                          },
                          {
                            label: "System Admins",
                            value: users.filter((u) => u.role === "ADMIN")
                              .length,
                            icon: LayoutDashboard,
                            color: "text-purple-400",
                            bg: "bg-purple-400/5",
                          },
                          {
                            label: "Active Members",
                            value: users.filter((u) => u.role === "USER")
                              .length,
                            icon: Users,
                            color: "text-green-400",
                            bg: "bg-green-400/5",
                          },
                        ].map((stat) => (
                          <div
                            key={stat.label}
                            className="bg-zinc-950 border border-zinc-900/50 p-6 rounded-3xl hover:border-yellow-400/20 transition-all flex items-center gap-5 group"
                          >
                            <div
                              className={cn(
                                "p-4 rounded-2xl border border-zinc-900 group-hover:scale-110 transition-all duration-500",
                                stat.bg,
                                stat.color,
                              )}
                            >
                              <stat.icon className="w-5 h-5 transition-transform" />
                            </div>
                            <div>
                              <p className="text-2xl font-black text-white tracking-tighter leading-tight">
                                {stat.value}
                              </p>
                              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none mt-0.5">
                                {stat.label}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="overflow-x-auto px-8 pb-8">
                        <table className="w-full text-left border-separate border-spacing-y-4">
                          <thead>
                            <tr className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] px-4">
                              <th
                                className="pb-4 pl-6 cursor-pointer hover:text-yellow-400 transition-colors"
                                onClick={() => requestSort("name")}
                              >
                                <div className="flex items-center gap-2">
                                  Profile Info{" "}
                                  <ArrowUpDown className="w-3 h-3" />
                                </div>
                              </th>
                              <th
                                className="pb-4 cursor-pointer hover:text-yellow-400 transition-colors"
                                onClick={() => requestSort("role")}
                              >
                                <div className="flex items-center gap-2">
                                  System Role{" "}
                                  <ArrowUpDown className="w-3 h-3" />
                                </div>
                              </th>
                              <th
                                className="pb-4 cursor-pointer hover:text-yellow-400 transition-colors"
                                onClick={() => requestSort("createdAt")}
                              >
                                <div className="flex items-center gap-2">
                                  Join Date <ArrowUpDown className="w-3 h-3" />
                                </div>
                              </th>
                              <th className="pb-4 text-right pr-6">
                                Management
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {(() => {
                              const filtered = users.filter((u) => {
                                const matchesSearch =
                                  u.name
                                    ?.toLowerCase()
                                    .includes(searchQuery.toLowerCase()) ||
                                  u.email
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase());
                                const matchesRole =
                                  filterRole === "ALL" || u.role === filterRole;
                                return matchesSearch && matchesRole;
                              });
                              const sorted = getSortedData(filtered);
                              const totalPages = Math.ceil(
                                sorted.length / itemsPerPage,
                              );
                              const paginated = sorted.slice(
                                (currentPage - 1) * itemsPerPage,
                                currentPage * itemsPerPage,
                              );

                              return (
                                <>
                                  {paginated.map((user) => (
                                    <tr
                                      key={user.id}
                                      className="group hover:translate-x-1 transition-transform"
                                    >
                                      <td className="bg-zinc-950 border-y border-l border-zinc-900 rounded-l-4xl p-5 pl-6">
                                        <div className="flex items-center gap-4">
                                          <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 p-1 group-hover:border-yellow-400/30 transition-colors overflow-hidden shrink-0">
                                            <img
                                              src={
                                                user.image ||
                                                `https://ui-avatars.com/api/?name=${user.name}&background=facc15&color=18181b`
                                              }
                                              className="w-full h-full object-cover rounded-[12px]"
                                              alt=""
                                            />
                                          </div>
                                          <div className="min-w-0">
                                            <p className="text-white font-bold text-base truncate">
                                              {user.name}
                                            </p>
                                            <p className="text-zinc-500 text-xs truncate uppercase tracking-tighter">
                                              {user.email}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="bg-zinc-950 border-y border-zinc-900 p-5">
                                        <select
                                          value={user.role}
                                          onChange={(e) =>
                                            handleChangeRole(
                                              user.id,
                                              e.target.value as Role,
                                            )
                                          }
                                          className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-[10px] font-black text-yellow-500 focus:outline-none focus:border-yellow-400/50 appearance-none cursor-pointer hover:bg-zinc-800 transition-colors uppercase tracking-[0.2em]"
                                        >
                                          <option value="USER">Member</option>
                                          <option value="TRAINER">
                                            Trainer
                                          </option>
                                          <option value="ADMIN">
                                            Administrator
                                          </option>
                                        </select>
                                      </td>
                                      <td className="bg-zinc-950 border-y border-zinc-900 p-5 text-zinc-400 text-[11px] font-black uppercase tracking-widest">
                                        {new Date(
                                          user.createdAt,
                                        ).toLocaleDateString(undefined, {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                        })}
                                      </td>
                                      <td className="bg-zinc-950 border-y border-r border-zinc-900 rounded-r-4xl p-5 text-right pr-6">
                                        <div className="flex items-center justify-end gap-3">
                                          <button
                                            onClick={() =>
                                              handleDeleteUser(user.id)
                                            }
                                            className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-400 hover:border-red-400/30 transition-all shadow-sm"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                  {sorted.length > itemsPerPage && (
                                    <tr>
                                      <td colSpan={4} className="pt-8 px-4">
                                        <div className="flex items-center justify-between bg-zinc-950/50 p-4 rounded-3xl border border-zinc-900">
                                          <div className="flex items-center gap-2">
                                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                              Page{" "}
                                              <span className="text-white">
                                                {currentPage}
                                              </span>{" "}
                                              of{" "}
                                              <span className="text-white">
                                                {totalPages}
                                              </span>
                                            </p>
                                          </div>
                                          <div className="flex items-center gap-3">
                                            <button
                                              disabled={currentPage === 1}
                                              onClick={() =>
                                                handlePageChange(
                                                  currentPage - 1,
                                                )
                                              }
                                              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-yellow-400 hover:border-yellow-400/30 disabled:opacity-20 disabled:hover:text-zinc-500 transition-all shadow-lg"
                                            >
                                              <ChevronLeft className="w-4 h-4" />{" "}
                                              Previous
                                            </button>
                                            <div className="flex items-center gap-1.5 px-2">
                                              <button className="w-10 h-10 rounded-xl bg-yellow-400 text-zinc-950 text-[11px] font-black shadow-xl shadow-yellow-400/20 transition-all cursor-default">
                                                {currentPage}
                                              </button>
                                            </div>
                                            <button
                                              disabled={
                                                currentPage === totalPages
                                              }
                                              onClick={() =>
                                                handlePageChange(
                                                  currentPage + 1,
                                                )
                                              }
                                              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-yellow-400 hover:border-yellow-400/30 disabled:opacity-20 disabled:hover:text-zinc-500 transition-all shadow-lg"
                                            >
                                              Next{" "}
                                              <ChevronRight className="w-4 h-4" />
                                            </button>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </>
                              );
                            })()}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "classes" && (
                    <motion.div
                      key="classes"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      {(() => {
                        const filtered = classes.filter((c) =>
                          c.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()),
                        );
                        const totalPages = Math.ceil(
                          filtered.length / itemsPerPage,
                        );
                        const paginated = filtered.slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage,
                        );

                        return (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              {paginated.map((cls) => (
                                <div
                                  key={cls.id}
                                  className="bg-zinc-950 border border-zinc-900 rounded-4xl p-6 hover:border-yellow-400/20 transition-all flex flex-col group relative overflow-hidden"
                                >
                                  <div className="relative h-56 mb-8 rounded-3xl overflow-hidden border border-zinc-900">
                                    <img
                                      src={
                                        cls.image ||
                                        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600"
                                      }
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                      <span className="px-4 py-1.5 bg-yellow-400 text-zinc-950 text-[10px] font-black uppercase rounded-xl shadow-2xl tracking-widest ">
                                        {cls.capacity} Max Capacity
                                      </span>
                                    </div>
                                    <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60" />
                                  </div>

                                  <h3 className="text-2xl font-black text-white mb-3 uppercase group-hover:text-yellow-400 transition-colors tracking-tighter line-clamp-1">
                                    {cls.name}
                                  </h3>
                                  <p className="text-zinc-500 text-xs mb-8 line-clamp-2 h-10 font-bold uppercase tracking-wide leading-relaxed">
                                    {cls.description}
                                  </p>

                                  <div className="mt-auto pt-8 border-t border-zinc-900 flex items-center justify-between">
                                    <div className="flex flex-col">
                                      <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">
                                        Assigned Coach
                                      </span>
                                      <span className="text-white text-xs font-black uppercase tracking-widest">
                                        {cls.trainer?.name || "Open Slot"}
                                      </span>
                                    </div>
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() =>
                                          handleDeleteClass(cls.id)
                                        }
                                        className="p-4 rounded-3xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-400 hover:border-red-400/30 transition-all shadow-xl"
                                      >
                                        <Trash2 className="w-5 h-5" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {filtered.length > itemsPerPage && (
                              <div className="flex items-center justify-between bg-zinc-950/50 p-4 rounded-3xl border border-zinc-900">
                                <div className="flex items-center gap-2">
                                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                    Page{" "}
                                    <span className="text-white">
                                      {currentPage}
                                    </span>{" "}
                                    of{" "}
                                    <span className="text-white">
                                      {totalPages}
                                    </span>
                                  </p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                      handlePageChange(currentPage - 1)
                                    }
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-yellow-400 hover:border-yellow-400/30 disabled:opacity-20 disabled:hover:text-zinc-500 transition-all shadow-lg"
                                  >
                                    <ChevronLeft className="w-4 h-4" /> Previous
                                  </button>
                                  <div className="flex items-center gap-1.5 px-2">
                                    <button className="w-10 h-10 rounded-xl bg-yellow-400 text-zinc-950 text-[11px] font-black shadow-xl shadow-yellow-400/20 transition-all">
                                      {currentPage}
                                    </button>
                                  </div>
                                  <button
                                    disabled={currentPage === totalPages}
                                    onClick={() =>
                                      handlePageChange(currentPage + 1)
                                    }
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-yellow-400 hover:border-yellow-400/30 disabled:opacity-20 disabled:hover:text-zinc-500 transition-all shadow-lg"
                                  >
                                    Next <ChevronRight className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </motion.div>
                  )}

                  {activeTab === "bookings" && (
                    <motion.div
                      key="bookings"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead>
                          <tr className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] px-4">
                            <th
                              className="pb-4 pl-6 cursor-pointer hover:text-yellow-400 transition-colors"
                              onClick={() => requestSort("userId")}
                            >
                              <div className="flex items-center gap-2">
                                Member ID <ArrowUpDown className="w-3 h-3" />
                              </div>
                            </th>
                            <th
                              className="pb-4 cursor-pointer hover:text-yellow-400 transition-colors"
                              onClick={() => requestSort("classId")}
                            >
                              <div className="flex items-center gap-2">
                                Target Session{" "}
                                <ArrowUpDown className="w-3 h-3" />
                              </div>
                            </th>
                            <th
                              className="pb-4 cursor-pointer hover:text-yellow-400 transition-colors"
                              onClick={() => requestSort("createdAt")}
                            >
                              <div className="flex items-center gap-2">
                                Booking Date <ArrowUpDown className="w-3 h-3" />
                              </div>
                            </th>
                            <th className="pb-4 text-right pr-6">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                            const sorted = getSortedData(bookings);
                            const totalPages = Math.ceil(
                              sorted.length / itemsPerPage,
                            );
                            const paginated = sorted.slice(
                              (currentPage - 1) * itemsPerPage,
                              currentPage * itemsPerPage,
                            );

                            return (
                              <>
                                {paginated.map((booking) => (
                                  <tr key={booking.id} className="group">
                                    <td className="bg-zinc-950 border-y border-l border-zinc-900 rounded-l-4xl p-6 pl-8">
                                      <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-yellow-400 border border-zinc-800 group-hover:border-yellow-400/30 transition-colors">
                                          <Users className="w-5 h-5" />
                                        </div>
                                        <span className="text-white font-black text-xs uppercase tracking-widest">
                                          IDX-
                                          {booking.userId
                                            .toString()
                                            .padStart(4, "0")}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="bg-zinc-950 border-y border-zinc-900 p-6">
                                      <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-blue-400 border border-zinc-800 group-hover:border-blue-400/30 transition-colors">
                                          <Calendar className="w-5 h-5" />
                                        </div>
                                        <span className="text-white font-black text-xs uppercase tracking-widest">
                                          CLS-
                                          {booking.classId
                                            .toString()
                                            .padStart(4, "0")}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="bg-zinc-950 border-y border-zinc-900 p-6 text-zinc-500 text-[11px] font-black uppercase tracking-[0.2em]">
                                      {new Date(
                                        booking.createdAt,
                                      ).toLocaleDateString(undefined, {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                      })}
                                    </td>
                                    <td className="bg-zinc-950 border-y border-r border-zinc-900 rounded-r-4xl p-6 text-right pr-8">
                                      <button
                                        onClick={() =>
                                          handleDeleteBooking(booking.id)
                                        }
                                        className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-400 hover:border-red-400/30 transition-all shadow-sm"
                                      >
                                        <Trash2 className="w-5 h-5" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                                {sorted.length > itemsPerPage && (
                                  <tr>
                                    <td colSpan={4} className="pt-8 px-4">
                                      <div className="flex items-center justify-between bg-zinc-950/50 p-4 rounded-3xl border border-zinc-900">
                                        <div className="flex items-center gap-2">
                                          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                            Page{" "}
                                            <span className="text-white">
                                              {currentPage}
                                            </span>{" "}
                                            of{" "}
                                            <span className="text-white">
                                              {totalPages}
                                            </span>
                                          </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <button
                                            disabled={currentPage === 1}
                                            onClick={() =>
                                              handlePageChange(currentPage - 1)
                                            }
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-yellow-400 hover:border-yellow-400/30 disabled:opacity-20 disabled:hover:text-zinc-500 transition-all shadow-lg"
                                          >
                                            <ChevronLeft className="w-4 h-4" />{" "}
                                            Previous
                                          </button>
                                          <div className="flex items-center gap-1.5 px-2">
                                            <button className="w-10 h-10 rounded-xl bg-yellow-400 text-zinc-950 text-[11px] font-black shadow-xl shadow-yellow-400/20 transition-all cursor-default">
                                              {currentPage}
                                            </button>
                                          </div>
                                          <button
                                            disabled={
                                              currentPage === totalPages
                                            }
                                            onClick={() =>
                                              handlePageChange(currentPage + 1)
                                            }
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-yellow-400 hover:border-yellow-400/30 disabled:opacity-20 disabled:hover:text-zinc-500 transition-all shadow-lg"
                                          >
                                            Next{" "}
                                            <ChevronRight className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </>
                            );
                          })()}
                        </tbody>
                      </table>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
