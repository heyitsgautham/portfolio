import { describe, expect, it } from "vitest";

import type { UnistNode, UnistTree } from "@/types/unist";

import { rehypeNpmCommand } from "./rehype-npm-command";

const commandsFor = (raw: string) => {
  const pre: UnistNode = {
    type: "element",
    tagName: "pre",
    properties: { __rawString__: raw },
  };
  const tree: UnistTree = { type: "root", children: [pre] };

  rehypeNpmCommand()(tree);

  const { __npm__, __pnpm__, __yarn__, __bun__ } = pre.properties ?? {};
  return { npm: __npm__, pnpm: __pnpm__, yarn: __yarn__, bun: __bun__ };
};

describe("rehypeNpmCommand", () => {
  it("translates npm install for every package manager", () => {
    expect(commandsFor("npm install motion")).toEqual({
      npm: "npm install motion",
      pnpm: "pnpm add motion",
      yarn: "yarn add motion",
      bun: "bun add motion",
    });
  });

  it("translates npx create- into each create command", () => {
    expect(commandsFor("npx create-next-app@latest")).toEqual({
      npm: "npx create-next-app@latest",
      pnpm: "pnpm create next-app@latest",
      yarn: "yarn create next-app@latest",
      bun: "bunx --bun create-next-app@latest",
    });
  });

  it("translates npm create", () => {
    expect(commandsFor("npm create vite@latest")).toEqual({
      npm: "npm create vite@latest",
      pnpm: "pnpm create vite@latest",
      yarn: "yarn create vite@latest",
      bun: "bun create vite@latest",
    });
  });

  it("translates a plain npx call to dlx and bunx", () => {
    expect(commandsFor("npx shadcn@latest add button")).toEqual({
      npm: "npx shadcn@latest add button",
      pnpm: "pnpm dlx shadcn@latest add button",
      yarn: "npx shadcn@latest add button",
      bun: "bunx --bun shadcn@latest add button",
    });
  });

  it("translates npm run scripts", () => {
    expect(commandsFor("npm run dev")).toEqual({
      npm: "npm run dev",
      pnpm: "pnpm dev",
      yarn: "yarn dev",
      bun: "bun dev",
    });
  });

  it("leaves other code blocks alone", () => {
    expect(commandsFor("echo hello")).toEqual({
      npm: undefined,
      pnpm: undefined,
      yarn: undefined,
      bun: undefined,
    });
  });

  it("ignores elements that are not pre blocks", () => {
    const code: UnistNode = {
      type: "element",
      tagName: "code",
      properties: { __rawString__: "npm install motion" },
    };

    rehypeNpmCommand()({ type: "root", children: [code] });

    expect(code.properties?.__pnpm__).toBeUndefined();
  });
});
