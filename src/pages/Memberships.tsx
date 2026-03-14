import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "../components/ui/button";

export const Memberships = () => {
  const plans = [
    {
      name: "Basic",
      price: "$39",
      period: "/month",
      features: [
        "Access to gym facilities",
        "Locker usage",
        "Free Wi-Fi",
        "1 Guest pass per month",
      ],
      recommended: false,
    },
    {
      name: "Pro",
      price: "$69",
      period: "/month",
      features: [
        "All Basic features",
        "Unlimited group classes",
        "1 Personal training session",
        "Nutrition consultation",
        "Sauna access",
      ],
      recommended: true,
    },
    {
      name: "Elite",
      price: "$99",
      period: "/month",
      features: [
        "All Pro features",
        "Unlimited personal training",
        "Private locker",
        "Priority class booking",
        "Monthly massage therapy",
        "Free merchandise pack",
      ],
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 pt-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Membership <span className="text-yellow-400">Plans</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Choose the perfect plan that fits your fitness journey. No hidden
            fees, cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl bg-zinc-900 border ${
                plan.recommended
                  ? "border-yellow-400 transform scale-105 shadow-2xl shadow-yellow-400/10 z-10"
                  : "border-zinc-800 hover:border-yellow-400/30"
              } flex flex-col transition-all duration-300`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 left-0 -mt-4 flex justify-center">
                  <span className="bg-yellow-400 text-zinc-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-extrabold text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-zinc-400 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-yellow-400/10 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-yellow-400" />
                    </div>
                    <span className="text-zinc-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.recommended
                    ? "bg-yellow-400 text-zinc-900 hover:bg-yellow-500"
                    : ""
                }`}
                variant={plan.recommended ? "primary" : "outline"}
              >
                Choose {plan.name}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
