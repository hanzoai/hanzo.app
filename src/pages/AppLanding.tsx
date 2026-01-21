import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Star, Zap, Layers, Sparkles, Terminal, Bot, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

const apps = [
  {
    icon: Terminal,
    name: "Hanzo Dev",
    description: "AI-powered coding workspace",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Bot,
    name: "Hanzo Chat",
    description: "Conversational AI assistant",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    name: "Hanzo Design",
    description: "AI creative tools",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Layers,
    name: "Hanzo Flow",
    description: "Visual workflow builder",
    color: "from-green-500 to-teal-500",
  },
];

const AppLanding = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-purple-900/20" />
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-8">
              <Sparkles className="w-4 h-4" />
              Hanzo Applications
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent">
              AI-Native Apps
              <br />
              For Everyone
            </h1>

            <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              Desktop and mobile applications powered by Hanzo AI.
              Beautiful, fast, and intelligent.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold px-8">
                <Download className="mr-2 w-4 h-4" />
                Download for Mac
              </Button>
              <Button size="lg" variant="outline" className="border-neutral-700 hover:bg-neutral-800">
                Download for Windows
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-center gap-2 text-neutral-500">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <span className="text-sm">Loved by 50,000+ users</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="py-24 bg-neutral-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Hanzo Suite</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              A complete toolkit for the AI era. One subscription, all apps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {apps.map((app, index) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-4`}>
                  <app.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{app.name}</h3>
                <p className="text-neutral-400 mb-4">{app.description}</p>
                <span className="text-sm text-neutral-500 group-hover:text-white transition-colors flex items-center gap-1">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-neutral-400">Native performance with Rust core. No Electron bloat.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Everywhere</h3>
              <p className="text-neutral-400">100+ AI models at your fingertips. Local and cloud.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                <Layers className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Works Offline</h3>
              <p className="text-neutral-400">Full functionality without internet. Your data stays local.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-neutral-950 to-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-neutral-400 max-w-xl mx-auto mb-8">
            Download Hanzo App and experience the future of AI-native applications.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold px-8">
            <Download className="mr-2 w-4 h-4" />
            Download Free
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AppLanding;
