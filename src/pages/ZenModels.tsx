import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  Eye,
  Zap,
  ExternalLink,
  Check,
  Github,
  ChevronDown,
  Brain,
  Layers,
  Database,
  Shield,
  Globe,
  BookOpen,
  Terminal,
  Download,
} from "lucide-react";

// Complete Zen model lineup — 14 models across Zen4 and Zen3 generations
// Pricing is per 1M tokens (input/output)

// Zen4 models (9 models) — flagship generation
const ZEN4_MODELS = [
  {
    name: "zen4",
    size: "~400B",
    base: "GLM-5",
    context: "202K",
    pricing: "$3.00 / $9.60",
    status: "Released",
    flagship: true,
  },
  {
    name: "zen4-ultra",
    size: "~400B",
    base: "GLM-5 (thinking)",
    context: "202K",
    pricing: "$3.00 / $9.60",
    status: "Released",
  },
  {
    name: "zen4-pro",
    size: "80B/3B MoE",
    base: "Qwen3-Next-80B-A3B",
    context: "131K",
    pricing: "$2.70 / $2.70",
    status: "Released",
  },
  {
    name: "zen4-max",
    size: "235B/22B MoE",
    base: "Qwen3-235B-A22B",
    context: "131K",
    pricing: "$3.60 / $3.60",
    status: "Released",
  },
  {
    name: "zen4-mini",
    size: "8B",
    base: "Qwen3-8B",
    context: "40K",
    pricing: "$0.60 / $0.60",
    status: "Released",
  },
  {
    name: "zen4-thinking",
    size: "80B/3B MoE+CoT",
    base: "Qwen3-Next-80B-A3B (thinking)",
    context: "131K",
    pricing: "$2.70 / $2.70",
    status: "Released",
  },
  {
    name: "zen4-coder",
    size: "480B/35B MoE",
    base: "Qwen3-Coder-480B-A35B",
    context: "262K",
    pricing: "$3.60 / $3.60",
    status: "Released",
  },
  {
    name: "zen4-coder-pro",
    size: "480B BF16",
    base: "Qwen3-Coder-480B BF16",
    context: "262K",
    pricing: "$4.50 / $4.50",
    status: "Released",
    frontier: true,
  },
  {
    name: "zen4-coder-flash",
    size: "30B/3B MoE",
    base: "Qwen3-Coder-30B-A3B",
    context: "262K",
    pricing: "$1.50 / $1.50",
    status: "Released",
  },
];

// Zen3 models (5 models) — previous generation + specialized
const ZEN3_MODELS = [
  {
    name: "zen3-omni",
    size: "~200B",
    base: "GLM-4.7 (multimodal)",
    context: "202K",
    pricing: "$1.80 / $6.60",
    status: "Released",
  },
  {
    name: "zen3-vl",
    size: "30B/3B MoE VL",
    base: "Qwen3-VL-30B-A3B",
    context: "131K",
    pricing: "$0.45 / $1.80",
    status: "Released",
  },
  {
    name: "zen3-nano",
    size: "4B",
    base: "Qwen3-4B",
    context: "40K",
    pricing: "$0.30 / $0.30",
    status: "Released",
  },
  {
    name: "zen3-guard",
    size: "4B",
    base: "Qwen3-4B (safety)",
    context: "40K",
    pricing: "$0.30 / $0.30",
    status: "Released",
  },
  {
    name: "zen3-embedding",
    size: "text-embedding-3-large",
    base: "text-embedding-3-large",
    context: "8K",
    pricing: "$0.39 / $0.39",
    status: "Released",
  },
];

// Combined for the overview table
const ALL_ZEN_MODELS = [...ZEN4_MODELS, ...ZEN3_MODELS];

// Quick stats
const QUICK_STATS = [
  { value: "14", label: "Models", description: "Zen4 + Zen3 model lineup" },
  { value: "4B-480B", label: "Params", description: "From edge to frontier scale" },
  { value: "262K", label: "Max Context", description: "Tokens in a single request" },
  { value: "$0.30", label: "Starting at", description: "Per 1M tokens (input)" },
];

// Model family categories
const ECOSYSTEM_CATEGORIES = [
  {
    icon: Brain,
    title: "Zen4 Flagship",
    description: "zen4 and zen4-ultra powered by GLM-5 (~400B). zen4-pro and zen4-max via Qwen3 MoE. zen4-mini for fast inference at 8B.",
  },
  {
    icon: Code2,
    title: "Zen4 Coder",
    description: "zen4-coder (480B/35B MoE), zen4-coder-pro (480B BF16 full), and zen4-coder-flash (30B/3B MoE). Up to 262K context.",
  },
  {
    icon: Zap,
    title: "Zen4 Thinking",
    description: "zen4-thinking with chain-of-thought via Qwen3-Next MoE. zen4-ultra with GLM-5 deep reasoning. Built for complex multi-step tasks.",
  },
  {
    icon: Eye,
    title: "Zen3 Vision & Multimodal",
    description: "zen3-omni (GLM-4.7 multimodal, ~200B). zen3-vl (Qwen3-VL-30B-A3B) for vision-language understanding.",
  },
  {
    icon: Shield,
    title: "Zen3 Safety & Edge",
    description: "zen3-nano (Qwen3-4B) for edge. zen3-guard (Qwen3-4B safety) for content filtering and guardrails.",
  },
  {
    icon: Database,
    title: "Zen3 Embeddings",
    description: "zen3-embedding (text-embedding-3-large) for vector search, RAG, and semantic similarity. 8K context.",
  },
];

// Model families with full details — organized as Zen4 and Zen3 generations
const MODEL_FAMILIES = {
  zen4_flagship: {
    title: "Zen4 Flagship",
    description: "Core language models powered by GLM-5 and Qwen3 MoE architectures",
    icon: Brain,
    models: [
      {
        name: "zen4",
        badge: "FLAGSHIP",
        params: "~400B",
        context: "202K tokens",
        base: "GLM-5",
        pricing: { input: "$3.00", output: "$9.60" },
        features: [
          "Frontier-class reasoning",
          "202K context window",
          "OpenAI-compatible API",
          "Production-grade reliability",
        ],
        status: "Released",
      },
      {
        name: "zen4-ultra",
        params: "~400B",
        context: "202K tokens",
        base: "GLM-5 (thinking)",
        pricing: { input: "$3.00", output: "$9.60" },
        features: [
          "Deep chain-of-thought reasoning",
          "Complex problem decomposition",
          "Multi-step analysis",
          "Extended deliberation",
        ],
        status: "Released",
      },
      {
        name: "zen4-pro",
        params: "80B/3B active MoE",
        context: "131K tokens",
        base: "Qwen3-Next-80B-A3B",
        pricing: { input: "$2.70", output: "$2.70" },
        features: [
          "Efficient MoE architecture",
          "3B active parameters per token",
          "Balanced cost/performance",
          "General-purpose reasoning",
        ],
        status: "Released",
      },
      {
        name: "zen4-max",
        params: "235B/22B active MoE",
        context: "131K tokens",
        base: "Qwen3-235B-A22B",
        pricing: { input: "$3.60", output: "$3.60" },
        features: [
          "Large-scale MoE reasoning",
          "22B active parameters per token",
          "Complex task performance",
          "Enterprise workloads",
        ],
        status: "Released",
      },
      {
        name: "zen4-mini",
        params: "8B",
        context: "40K tokens",
        base: "Qwen3-8B",
        pricing: { input: "$0.60", output: "$0.60" },
        features: [
          "Fast inference",
          "Low cost per token",
          "Edge-deployable",
          "Instruction following",
        ],
        status: "Released",
      },
      {
        name: "zen4-thinking",
        params: "80B/3B active MoE+CoT",
        context: "131K tokens",
        base: "Qwen3-Next-80B-A3B (thinking)",
        pricing: { input: "$2.70", output: "$2.70" },
        features: [
          "Chain-of-thought reasoning",
          "MoE efficiency with deep thought",
          "Step-by-step problem solving",
          "Math and logic tasks",
        ],
        status: "Released",
      },
    ],
  },
  zen4_coder: {
    title: "Zen4 Coder",
    description: "Agentic coding models with up to 262K context for large codebases",
    icon: Code2,
    models: [
      {
        name: "zen4-coder",
        badge: "FLAGSHIP",
        params: "480B/35B active MoE",
        context: "262K tokens",
        base: "Qwen3-Coder-480B-A35B",
        pricing: { input: "$3.60", output: "$3.60" },
        features: [
          "State-of-the-art agentic coding",
          "262K context for full repos",
          "35B active params for efficiency",
          "Multi-file refactoring",
        ],
        status: "Released",
      },
      {
        name: "zen4-coder-pro",
        badge: "FRONTIER",
        params: "480B BF16",
        context: "262K tokens",
        base: "Qwen3-Coder-480B BF16",
        pricing: { input: "$4.50", output: "$4.50" },
        features: [
          "Full precision BF16 inference",
          "Maximum coding capability",
          "Complex architecture design",
          "Enterprise-grade output",
        ],
        status: "Released",
      },
      {
        name: "zen4-coder-flash",
        params: "30B/3B active MoE",
        context: "262K tokens",
        base: "Qwen3-Coder-30B-A3B",
        pricing: { input: "$1.50", output: "$1.50" },
        features: [
          "Fast code generation",
          "Low-cost coding assistant",
          "262K context maintained",
          "Ideal for autocomplete and edits",
        ],
        status: "Released",
      },
    ],
  },
  zen3_multimodal: {
    title: "Zen3 Multimodal",
    description: "Vision, multimodal understanding, and content moderation",
    icon: Eye,
    models: [
      {
        name: "zen3-omni",
        badge: "MULTIMODAL",
        params: "~200B",
        context: "202K tokens",
        base: "GLM-4.7 (multimodal)",
        pricing: { input: "$1.80", output: "$6.60" },
        features: [
          "Text + Vision + Audio",
          "Unified multimodal understanding",
          "Cross-modal reasoning",
          "202K context window",
        ],
        status: "Released",
      },
      {
        name: "zen3-vl",
        params: "30B/3B active MoE VL",
        context: "131K tokens",
        base: "Qwen3-VL-30B-A3B",
        pricing: { input: "$0.45", output: "$1.80" },
        features: [
          "Vision-language understanding",
          "Image and document analysis",
          "OCR and visual QA",
          "Efficient MoE inference",
        ],
        status: "Released",
      },
    ],
  },
  zen3_specialized: {
    title: "Zen3 Edge, Safety & Embeddings",
    description: "Lightweight models for edge deployment, safety, and vector search",
    icon: Shield,
    models: [
      {
        name: "zen3-nano",
        params: "4B",
        context: "40K tokens",
        base: "Qwen3-4B",
        pricing: { input: "$0.30", output: "$0.30" },
        features: [
          "Edge deployment",
          "Mobile and embedded devices",
          "Ultra-low cost",
          "Fast inference",
        ],
        status: "Released",
      },
      {
        name: "zen3-guard",
        params: "4B",
        context: "40K tokens",
        base: "Qwen3-4B (safety)",
        pricing: { input: "$0.30", output: "$0.30" },
        features: [
          "Content safety classification",
          "Prompt injection detection",
          "PII filtering",
          "Guardrail enforcement",
        ],
        status: "Released",
      },
      {
        name: "zen3-embedding",
        params: "text-embedding-3-large",
        context: "8K tokens",
        base: "text-embedding-3-large",
        pricing: { input: "$0.39", output: "$0.39" },
        features: [
          "High-quality text embeddings",
          "Semantic similarity search",
          "RAG retrieval",
          "Clustering and classification",
        ],
        status: "Released",
      },
    ],
  },
};

const ModelCard = ({ model }: { model: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-neutral-950 border rounded-xl p-6 ${
        model.badge === "FLAGSHIP"
          ? "border-white/30 ring-1 ring-white/10"
          : "border-neutral-800"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-white">{model.name}</h3>
            {model.badge && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-white/10 text-white border border-white/20">
                {model.badge}
              </span>
            )}
          </div>
          {model.base && (
            <p className="text-xs text-neutral-500">Based on {model.base}</p>
          )}
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            model.status === "Released" || model.status === "Latest" || model.status === "Trained"
              ? "bg-white/10 text-white border border-white/20"
              : model.status === "Training"
              ? "bg-neutral-800 text-neutral-300 border border-neutral-700"
              : "bg-neutral-900 text-neutral-400 border border-neutral-800"
          }`}
        >
          {model.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {model.params && (
          <div>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
              Parameters
            </p>
            <p className="text-sm font-medium text-white">{model.params}</p>
          </div>
        )}
        {model.context && (
          <div>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
              Context
            </p>
            <p className="text-sm font-medium text-white">{model.context}</p>
          </div>
        )}
        {model.pricing && (
          <div>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
              Pricing (per 1M tokens)
            </p>
            <p className="text-sm font-medium text-white">
              In: {model.pricing.input} / Out: {model.pricing.output}
            </p>
          </div>
        )}
        {model.base && (
          <div>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
              Base Model
            </p>
            <p className="text-sm font-medium text-white">{model.base}</p>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4">
        {model.features.slice(0, isExpanded ? undefined : 3).map((feature: string, idx: number) => (
          <div key={idx} className="flex items-center gap-2">
            <Check className="w-3 h-3 text-neutral-400" />
            <span className="text-sm text-neutral-300">{feature}</span>
          </div>
        ))}
        {model.features.length > 3 && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-xs text-neutral-500 hover:text-white flex items-center gap-1"
          >
            +{model.features.length - 3} more
            <ChevronDown className="w-3 h-3" />
          </button>
        )}
      </div>

      {model.huggingface && (
        <a
          href={model.huggingface}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
        >
          <span>View on HuggingFace</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </motion.div>
  );
};

const FamilySection = ({
  familyKey,
  family,
}: {
  familyKey: string;
  family: (typeof MODEL_FAMILIES)[keyof typeof MODEL_FAMILIES];
}) => {
  const Icon = family.icon;

  return (
    <section id={familyKey} className="py-16 border-t border-neutral-800 first:border-t-0">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{family.title}</h2>
          <p className="text-neutral-400">{family.description}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {family.models.map((model) => (
          <ModelCard key={model.name} model={model} />
        ))}
      </div>
    </section>
  );
};

const BRAND_COLOR = "#8b5cf6"; // Purple for Zen

const ZenModels = () => {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      <Helmet>
        <title>Zen Models - 14 AI Models from Edge to Frontier | Hanzo AI</title>
        <meta
          name="description"
          content="14 Zen models across Zen4 and Zen3 generations. GLM-5 flagship, Qwen3 MoE coding, multimodal vision, safety, and embeddings. OpenAI-compatible API at api.hanzo.ai."
        />
      </Helmet>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-4 md:px-8 lg:px-12 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-15"
              style={{
                background: `radial-gradient(circle, ${BRAND_COLOR} 0%, transparent 70%)`,
                filter: "blur(100px)",
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 text-center"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Code2 className="w-3 h-3" />
                14 Models -- Zen4 + Zen3
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight leading-[1.1] mb-6 text-center"
            >
              <span className="text-white">Zen Model Lineup</span>
              <br />
              <span className="text-neutral-400">Edge to Frontier AI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base lg:text-lg text-neutral-400 leading-relaxed mb-8 max-w-3xl mx-auto text-center"
            >
              14 production-ready models across two generations. Zen4 brings GLM-5 flagship reasoning
              and Qwen3 MoE coding with 262K context. Zen3 covers multimodal, vision, safety, and
              embeddings. OpenAI-compatible API at api.hanzo.ai and api.zen.hanzo.ai.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-wrap justify-center items-center gap-4 mb-8"
            >
              <a
                href="#models"
                className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-all hover:opacity-90 text-sm"
                style={{ backgroundColor: BRAND_COLOR, color: "#ffffff" }}
              >
                Explore Models
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#dataset"
                className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-colors border border-neutral-700 bg-transparent hover:bg-neutral-900 text-sm text-white"
              >
                <Database className="mr-2 h-4 w-4" />
                Training Data
              </a>
              <a
                href="https://zenlm.org/research"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-colors border border-neutral-700 bg-transparent hover:bg-neutral-900 text-sm text-white"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Research Papers
              </a>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <a
                href="https://huggingface.co/zenlm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all"
              >
                🤗 HuggingFace
              </a>
              <a
                href="https://github.com/zenlm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://zenlm.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all"
              >
                <Globe className="w-4 h-4" />
                zenlm.org
              </a>
            </motion.div>
          </div>
        </section>

        {/* All Models Pricing Table */}
        <section id="pricing-table" className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto py-12 px-8 rounded-2xl bg-neutral-950 border border-neutral-800">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Complete Model Lineup & Pricing
              </h2>
              <p className="text-neutral-400 text-lg">
                OpenAI-compatible API at api.hanzo.ai and api.zen.hanzo.ai
              </p>
            </motion.div>

            {/* Zen4 Table */}
            <h3 className="text-xl font-bold text-white mb-4">Zen4 (9 models)</h3>
            <div className="overflow-x-auto mb-10">
              <table className="w-full border-collapse bg-black border border-neutral-800 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-neutral-900/80">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">Model</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">Base</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">Context</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">Pricing (In/Out per 1M)</th>
                  </tr>
                </thead>
                <tbody>
                  {ZEN4_MODELS.map((model) => (
                    <tr
                      key={model.name}
                      className={`border-t border-neutral-800 hover:bg-neutral-900/50 transition-colors ${model.flagship ? "bg-white/5" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{model.name}</span>
                          {model.flagship && (
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-white/10 text-white border border-white/20">
                              FLAGSHIP
                            </span>
                          )}
                          {model.frontier && (
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              FRONTIER
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-neutral-300 font-mono text-sm">{model.size}</td>
                      <td className="px-6 py-4 text-neutral-300 text-sm">{model.base}</td>
                      <td className="px-6 py-4 text-neutral-300 font-mono text-sm">{model.context}</td>
                      <td className="px-6 py-4 text-neutral-300 font-mono text-sm">{model.pricing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Zen3 Table */}
            <h3 className="text-xl font-bold text-white mb-4">Zen3 (5 models)</h3>
            <div className="overflow-x-auto mb-10">
              <table className="w-full border-collapse bg-black border border-neutral-800 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-neutral-900/80">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">Model</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">Base</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">Context</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">Pricing (In/Out per 1M)</th>
                  </tr>
                </thead>
                <tbody>
                  {ZEN3_MODELS.map((model) => (
                    <tr
                      key={model.name}
                      className="border-t border-neutral-800 hover:bg-neutral-900/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-semibold text-white">{model.name}</span>
                      </td>
                      <td className="px-6 py-4 text-neutral-300 font-mono text-sm">{model.size}</td>
                      <td className="px-6 py-4 text-neutral-300 text-sm">{model.base}</td>
                      <td className="px-6 py-4 text-neutral-300 font-mono text-sm">{model.context}</td>
                      <td className="px-6 py-4 text-neutral-300 font-mono text-sm">{model.pricing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tier info */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-black border border-neutral-800 rounded-xl hover:border-neutral-600 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">API Access</h3>
                <p className="text-neutral-400 text-sm">
                  OpenAI-compatible endpoints at api.hanzo.ai and api.zen.hanzo.ai.
                  Drop-in replacement for any OpenAI SDK.
                </p>
              </div>
              <div className="p-6 bg-black border border-neutral-800 rounded-xl hover:border-neutral-600 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">Subscription Tiers</h3>
                <p className="text-neutral-400 text-sm">
                  Pro, Pro Max, Ultra, and Ultra Max tiers with increasing rate limits
                  and priority access. Pay-as-you-go also available.
                </p>
              </div>
              <div className="p-6 bg-black border border-neutral-800 rounded-xl hover:border-neutral-600 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">qwen3+ Architecture</h3>
                <p className="text-neutral-400 text-sm">
                  All Zen models are built exclusively on qwen3+ architectures (Qwen3, GLM-5).
                  No qwen2 models in the lineup.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Complete AI Model Ecosystem */}
        <section id="overview" className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Complete AI Model Ecosystem
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ECOSYSTEM_CATEGORIES.map((category, idx) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl text-center hover:border-purple-500/30 transition-all hover:-translate-y-1"
                  >
                    <div className="text-4xl mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20">
                      <Icon className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                    <p className="text-neutral-400 text-sm">{category.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section id="stats" className="py-20 px-4 md:px-8 bg-neutral-950/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {QUICK_STATS.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 bg-black border border-neutral-800 rounded-xl text-center hover:border-neutral-600 transition-all"
                >
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-300 mb-1">{stat.label}</h3>
                  <p className="text-neutral-500 text-sm">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Model Families Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Quick Nav */}
            <div id="models" className="mb-12 flex flex-wrap gap-3 justify-center">
              {Object.entries(MODEL_FAMILIES).map(([key, family]) => {
                const Icon = family.icon;
                return (
                  <a
                    key={key}
                    href={`#${key}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 hover:border-purple-500/30 transition-colors text-sm text-neutral-400 hover:text-white"
                  >
                    <Icon className="w-4 h-4" />
                    {family.title}
                  </a>
                );
              })}
            </div>

            {/* Model Families */}
            {Object.entries(MODEL_FAMILIES).map(([key, family]) => (
              <FamilySection key={key} familyKey={key} family={family} />
            ))}
          </div>
        </section>

        {/* Get Started Section */}
        <section id="downloads" className="py-20 px-4 md:px-8 border-t border-neutral-800">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Get Started
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl text-center hover:border-purple-500/30 transition-all hover:-translate-y-1"
              >
                <Download className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold text-white mb-2">HuggingFace</h3>
                <p className="text-neutral-400 text-sm mb-4">Access Zen models via HuggingFace Hub</p>
                <a
                  href="https://huggingface.co/zenlm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-full font-medium transition-all hover:opacity-90 text-sm"
                  style={{ backgroundColor: BRAND_COLOR, color: "#ffffff" }}
                >
                  Visit HuggingFace
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl text-center hover:border-purple-500/30 transition-all hover:-translate-y-1"
              >
                <Github className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold text-white mb-2">GitHub</h3>
                <p className="text-neutral-400 text-sm mb-4">Training code, documentation, and source</p>
                <a
                  href="https://github.com/zenlm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-full font-medium transition-all hover:opacity-90 text-sm"
                  style={{ backgroundColor: BRAND_COLOR, color: "#ffffff" }}
                >
                  View on GitHub
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl text-center hover:border-purple-500/30 transition-all hover:-translate-y-1"
              >
                <Terminal className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold text-white mb-2">zen-trainer</h3>
                <p className="text-neutral-400 text-sm mb-4">Fine-tune models on your own data</p>
                <div className="bg-black border border-neutral-800 rounded-lg p-3">
                  <code className="text-sm text-white">pip install zen-trainer</code>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl text-center hover:border-purple-500/30 transition-all hover:-translate-y-1"
              >
                <BookOpen className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold text-white mb-2">Research</h3>
                <p className="text-neutral-400 text-sm mb-4">Technical papers and whitepapers</p>
                <a
                  href="https://zenlm.org/research"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-full font-medium transition-all hover:opacity-90 text-sm"
                  style={{ backgroundColor: BRAND_COLOR, color: "#ffffff" }}
                >
                  Read Papers
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Infrastructure Section */}
        <section className="py-20 px-4 md:px-8 bg-neutral-950/50 border-t border-neutral-800">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Infrastructure
              </h2>
              <p className="text-neutral-400">
                Train and deploy Zen models with our optimized platforms
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-black border border-neutral-800 rounded-xl p-8 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">Zen Gym</h3>
                </div>
                <p className="text-neutral-400 mb-4">
                  Unified training platform for all Zen models with 2-5x
                  speedup.
                </p>
                <div className="space-y-2 mb-6">
                  {[
                    "LoRA, QLoRA, GRPO, GSPO, DPO, PPO",
                    "Unsloth acceleration",
                    "FlashAttention-2",
                    "Liger Kernel optimization",
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-purple-400" />
                      <span className="text-sm text-neutral-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="https://github.com/zenlm/zen-gym"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  View on GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-black border border-neutral-800 rounded-xl p-8 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">Zen Engine</h3>
                </div>
                <p className="text-neutral-400 mb-4">
                  High-performance inference for all Zen models with
                  OpenAI-compatible API.
                </p>
                <div className="space-y-2 mb-6">
                  {[
                    "44K tokens/sec (M3 Max)",
                    "OpenAI-compatible REST API",
                    "PyTorch, MLX, GGUF formats",
                    "MCP integration",
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-purple-400" />
                      <span className="text-sm text-neutral-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="https://github.com/zenlm/zen-engine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  View on GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8 border-t border-neutral-800">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to build with Zen?
              </h2>
              <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
                All models are open source under Apache 2.0 or MIT license. Start
                building today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://huggingface.co/zenlm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-all hover:opacity-90 text-sm"
                  style={{ backgroundColor: BRAND_COLOR, color: "#ffffff" }}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <Link
                  to="/dev"
                  className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-colors border border-neutral-700 bg-transparent hover:bg-neutral-900 text-sm text-white"
                >
                  Try Hanzo Dev
                </Link>
                <a
                  href="https://zenlm.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-colors border border-neutral-700 bg-transparent hover:bg-neutral-900 text-sm text-white"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Visit zenlm.org
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Add pulse animation for training status */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default ZenModels;
