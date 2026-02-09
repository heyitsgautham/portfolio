import type { TechStack } from "../types/tech-stack";

export const TECH_STACK: TechStack[] = [
  // Programming Languages
  {
    key: "python", // SiPython icon
    title: "Python",
    href: "https://www.python.org/",
    categories: ["Language"],
  },
  {
    key: "ts", // SiTypescript icon
    title: "TypeScript",
    href: "https://www.typescriptlang.org/",
    categories: ["Language"],
  },
  {
    key: "js", // SiJavascript icon
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    categories: ["Language"],
  },
  {
    key: "cpp",
    title: "C++",
    href: "https://cplusplus.com/",
    categories: ["Language"],
  },
  {
    key: "c",
    title: "C",
    href: "https://en.wikipedia.org/wiki/C_(programming_language)",
    categories: ["Language"],
  },
  {
    key: "java",
    title: "Java",
    href: "https://www.java.com/",
    categories: ["Language"],
  },
  {
    key: "r",
    title: "R",
    href: "https://www.r-project.org/",
    categories: ["Language"],
  },
  {
    key: "go",
    title: "Go",
    href: "https://go.dev/",
    categories: ["Language"],
  },
  {
    key: "lua",
    title: "Lua",
    href: "https://www.lua.org/",
    categories: ["Language"],
  },

  // AI & Machine Learning
  {
    key: "tensorflow",
    title: "TensorFlow",
    href: "https://www.tensorflow.org/",
    categories: ["AI", "Library"],
  },
  {
    key: "keras",
    title: "Keras",
    href: "https://keras.io/",
    categories: ["AI", "Library"],
  },
  {
    key: "scikit-learn",
    title: "Scikit-learn",
    href: "https://scikit-learn.org/",
    categories: ["AI", "Library"],
  },
  {
    key: "opencv",
    title: "OpenCV",
    href: "https://opencv.org/",
    categories: ["AI", "Library"],
  },
  {
    key: "pandas",
    title: "Pandas",
    href: "https://pandas.pydata.org/",
    categories: ["Library"],
  },
  {
    key: "numpy",
    title: "NumPy",
    href: "https://numpy.org/",
    categories: ["Library"],
  },
  {
    key: "pytorch",
    title: "PyTorch",
    href: "https://pytorch.org/",
    categories: ["AI", "Library"],
  },
  {
    key: "langchain-color",
    title: "LangChain",
    href: "https://www.langchain.com/",
    categories: ["AI", "Library"],
  },
  {
    key: "chromadb",
    title: "ChromaDB",
    href: "https://www.trychroma.com/",
    categories: ["AI", "Database"],
  },
  {
    key: "gemini",
    title: "Google Gemini",
    href: "https://ai.google.dev/",
    categories: ["AI", "Tools"],
  },
  {
    key: "terraform",
    title: "Terraform",
    href: "https://www.terraform.io/",
    categories: ["Cloud", "Tools"],
  },
  // {
  //   key: "langgraph-color",
  //   title: "LangGraph",
  //   href: "https://www.langchain.com/langgraph",
  //   categories: ["AI", "Library"],
  // },
  // {
  //   key: "langsmith-color",
  //   title: "LangSmith",
  //   href: "https://www.langchain.com/langsmith",
  //   categories: ["AI", "Tools"],
  // },
  {
    key: "bedrock-color",
    title: "AWS Bedrock",
    href: "https://aws.amazon.com/bedrock/",
    categories: ["AI", "Cloud"],
  },
  {
    key: "ollama",
    title: "Ollama",
    href: "https://ollama.ai/",
    categories: ["AI", "Tools"],
  },
  {
    key: "perplexity",
    title: "Perplexity",
    href: "https://www.perplexity.ai/",
    categories: ["AI", "Tools"],
  },
  {
    key: "notebooklm",
    title: "NotebookLM",
    href: "https://notebooklm.google/",
    categories: ["AI", "Tools"],
  },
  {
    key: "aistudio",
    title: "AI Studio",
    href: "https://ai.google.dev/",
    categories: ["AI", "Tools"],
  },
  {
    key: "mcp",
    title: "MCP",
    href: "https://modelcontextprotocol.io/",
    categories: ["AI", "Other"],
  },
  {
    key: "sora-color",
    title: "Sora",
    href: "https://openai.com/sora",
    categories: ["AI", "Tools"],
  },
  {
    key: "anaconda",
    title: "Anaconda",
    href: "https://www.anaconda.com/",
    categories: ["AI", "Tools"],
  },
  {
    key: "kaggle",
    title: "Kaggle",
    href: "https://www.kaggle.com/",
    categories: ["AI", "Tools"],
  },
  {
    key: "matlab",
    title: "MATLAB",
    href: "https://www.mathworks.com/products/matlab.html",
    categories: ["AI", "Tools"],
  },

  // Backend & API Frameworks
  {
    key: "flask",
    title: "Flask",
    href: "https://flask.palletsprojects.com/",
    categories: ["Framework"],
  },
  {
    key: "nodejs",
    title: "Node.js",
    href: "https://nodejs.org/",
    categories: ["Runtime Environment"],
  },
  {
    key: "fastapi",
    title: "FastAPI",
    href: "https://fastapi.tiangolo.com/",
    categories: ["Framework"],
  },
  {
    key: "express",
    title: "Express.js",
    href: "https://expressjs.com/",
    categories: ["Framework"],
  },
  {
    key: "graphql",
    title: "GraphQL",
    href: "https://graphql.org/",
    categories: ["Framework", "Other"],
  },
  {
    key: "ruby-on-rails",
    title: "Ruby on Rails",
    href: "https://rubyonrails.org/",
    categories: ["Framework"],
  },

  // Frontend Technologies (Supporting)
  {
    key: "react", // This matches Icons.react
    title: "React",
    href: "https://react.dev/",
    categories: ["Library", "UI Library"],
  },
  {
    key: "nextjs", // SiNextdotjs icon
    title: "Next.js",
    href: "https://nextjs.org/",
    categories: ["Framework"],
    theme: true,
  },
  {
    key: "html5",
    title: "HTML5",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    categories: ["Language"],
  },
  {
    key: "css3",
    title: "CSS3",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    categories: ["Language"],
  },
  {
    key: "tailwind",
    title: "Tailwind CSS",
    href: "https://tailwindcss.com/",
    categories: ["UI Library"],
  },
  {
    key: "reactnative",
    title: "React Native",
    href: "https://reactnative.dev/",
    categories: ["Framework", "UI Library"],
  },
  {
    key: "reactquery",
    title: "React Query",
    href: "https://tanstack.com/query/latest",
    categories: ["Library"],
  },
  {
    key: "redux",
    title: "Redux",
    href: "https://redux.js.org/",
    categories: ["Library"],
  },
  {
    key: "mui",
    title: "Material UI",
    href: "https://mui.com/",
    categories: ["UI Library"],
  },
  {
    key: "figma",
    title: "Figma",
    href: "https://www.figma.com/",
    categories: ["Tools"],
  },
  {
    key: "framer",
    title: "Framer",
    href: "https://www.framer.com/",
    categories: ["Tools"],
  },
  {
    key: "v0",
    title: "v0",
    href: "https://v0.dev/",
    categories: ["AI", "Tools"],
  },
  {
    key: "tauri",
    title: "Tauri",
    href: "https://tauri.app/",
    categories: ["Framework"],
  },

  // DevOps & Containerization
  {
    key: "docker",
    title: "Docker",
    href: "https://www.docker.com/",
    categories: ["Containerization"],
  },
  {
    key: "kubernetes",
    title: "Kubernetes",
    href: "https://kubernetes.io/",
    categories: ["Containerization"],
  },
  {
    key: "linux",
    title: "Linux",
    href: "https://www.linux.org/",
    categories: ["Tools"],
    theme: true,
  },
  {
    key: "arch-linux",
    title: "Arch Linux",
    href: "https://archlinux.org/",
    categories: ["Tools"],
    theme: true,
  },
  {
    key: "bash",
    title: "Bash",
    href: "https://www.gnu.org/software/bash/",
    categories: ["Language"],
  },

  // Cloud Platforms
  {
    key: "aws",
    title: "AWS",
    href: "https://aws.amazon.com/",
    categories: ["Cloud"],
  },
  {
    key: "google-cloud",
    title: "Google Cloud",
    href: "https://cloud.google.com/",
    categories: ["Cloud"],
  },
  {
    key: "firebase",
    title: "Firebase",
    href: "https://firebase.google.com/",
    categories: ["Cloud"],
  },
  {
    key: "lambda",
    title: "AWS Lambda",
    href: "https://aws.amazon.com/lambda/",
    categories: ["Cloud"],
  },

  // Databases
  {
    key: "postgresql",
    title: "PostgreSQL",
    href: "https://www.postgresql.org/",
    categories: ["Database"],
  },
  {
    key: "mysql",
    title: "MySQL",
    href: "https://www.mysql.com/",
    categories: ["Database"],
  },
  {
    key: "mongodb",
    title: "MongoDB",
    href: "https://www.mongodb.com/",
    categories: ["Database"],
  },
  {
    key: "redis",
    title: "Redis",
    href: "https://redis.io/",
    categories: ["Database"],
  },
  {
    key: "oracle",
    title: "Oracle",
    href: "https://www.oracle.com/database/",
    categories: ["Database"],
  },
  {
    key: "prisma",
    title: "Prisma",
    href: "https://www.prisma.io/",
    categories: ["Database", "Library"],
  },

  // Automation & Integration
  {
    key: "n8n",
    title: "n8n",
    href: "https://n8n.io/",
    categories: ["Tools", "Other"],
  },
  {
    key: "woocommerce",
    title: "WooCommerce",
    href: "https://woocommerce.com/",
    categories: ["Tools"],
  },

  // Version Control & Collaboration
  {
    key: "git",
    title: "Git",
    href: "https://git-scm.com/",
    categories: ["Version Control"],
  },
  {
    key: "github", // This matches Icons.github
    title: "GitHub",
    href: "https://github.com/",
    categories: ["Version Control"],
    theme: true,
  },

  // Development Tools
  {
    key: "vscode",
    title: "VS Code",
    href: "https://code.visualstudio.com/",
    categories: ["Tools"],
  },
  {
    key: "cursor",
    title: "Cursor",
    href: "https://cursor.sh/",
    categories: ["Tools", "AI"],
  },
  {
    key: "jupyter",
    title: "Jupyter",
    href: "https://jupyter.org/",
    categories: ["Tools"],
  },
  {
    key: "githubcopilot",
    title: "GitHub Copilot",
    href: "https://github.com/features/copilot",
    categories: ["Tools", "AI"],
  },
  {
    key: "notion",
    title: "Notion",
    href: "https://www.notion.so/",
    categories: ["Tools"],
  },
  {
    key: "swagger",
    title: "Swagger",
    href: "https://swagger.io/",
    categories: ["Tools"],
  },
  {
    key: "stripe",
    title: "Stripe",
    href: "https://stripe.com/",
    categories: ["Tools"],
  },

  // APIs & Integration
  {
    key: "rest-api",
    title: "REST API",
    href: "https://restfulapi.net/",
    categories: ["Other"],
  },

  {
    key: "slack",
    title: "Slack API",
    href: "https://api.slack.com/",
    categories: ["Tools"],
  },

  // Additional Tools
  {
    key: "cuda",
    title: "CUDA",
    href: "https://developer.nvidia.com/cuda-toolkit",
    categories: ["AI", "Other"],
  },
];
