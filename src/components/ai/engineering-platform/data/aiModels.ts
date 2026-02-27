
export interface AIModel {
  id: string;
  name: string;
  type: string;
  provider: string;
  accuracy: number;
  latency: number;
}

export const aiModels: AIModel[] = [
  { id: "gpt5", name: "GPT-5", type: "LLM", provider: "OpenAI", accuracy: 97, latency: 120 },
  { id: "claude", name: "Claude", type: "LLM", provider: "Anthropic", accuracy: 96, latency: 140 },
  { id: "gemini", name: "Gemini 2.5", type: "LLM", provider: "Google", accuracy: 95, latency: 110 },
  { id: "llama4", name: "Llama 4", type: "LLM", provider: "Meta", accuracy: 94, latency: 90 },
  { id: "mixtral", name: "Mixtral", type: "LLM", provider: "Mistral", accuracy: 93, latency: 85 },
  { id: "stability", name: "Stable Diffusion", type: "Image", provider: "Stability AI", accuracy: 92, latency: 200 },
  { id: "cohere", name: "Cohere Command", type: "LLM", provider: "Cohere", accuracy: 91, latency: 95 },
];
