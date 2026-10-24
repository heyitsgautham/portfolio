import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { remarkCodeImport } from "./remark-code-import";

type CodeNode = { type: "code"; meta?: string; value: string };

let rootDir: string;

beforeAll(() => {
  rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-code-import-"));
  fs.mkdirSync(path.join(rootDir, "registry"));
  fs.writeFileSync(
    path.join(rootDir, "registry", "demo.tsx"),
    ["line 1", "line 2", "line 3", "line 4", ""].join(os.EOL)
  );
  fs.writeFileSync(
    path.join(rootDir, "registry", "indented.ts"),
    ["function a() {", "    return 1;", "  }", ""].join(os.EOL)
  );
});

afterAll(() => {
  fs.rmSync(rootDir, { recursive: true, force: true });
});

const transform = (
  meta: string,
  options: Parameters<typeof remarkCodeImport>[0] = {}
) => {
  const node: CodeNode = { type: "code", meta, value: "" };
  const tree = { type: "root", children: [node] };

  remarkCodeImport({ rootDir, ...options })(tree, { dirname: rootDir });

  return node.value;
};

describe("remarkCodeImport", () => {
  it("imports a whole file and drops the trailing newline", () => {
    expect(transform("file=@/registry/demo.tsx")).toBe(
      "line 1\nline 2\nline 3\nline 4"
    );
  });

  it("keeps the trailing newline when asked to", () => {
    expect(
      transform("file=@/registry/demo.tsx", { preserveTrailingNewline: true })
    ).toBe("line 1\nline 2\nline 3\nline 4\n");
  });

  it("imports a single line", () => {
    expect(transform("file=@/registry/demo.tsx#L2")).toBe("line 2");
  });

  it("imports a closed line range", () => {
    expect(transform("file=@/registry/demo.tsx#L2-L3")).toBe("line 2\nline 3");
  });

  it("imports from a line to the end of the file", () => {
    expect(transform("file=@/registry/demo.tsx#L3-")).toBe("line 3\nline 4");
  });

  it("resolves a path relative to the MDX file", () => {
    expect(transform("file=./registry/demo.tsx#L1")).toBe("line 1");
  });

  it("finds file= among other meta words", () => {
    expect(transform('title="demo" file=@/registry/demo.tsx#L4')).toBe(
      "line 4"
    );
  });

  it("strips shared indentation when removeRedundantIndentations is set", () => {
    expect(
      transform("file=@/registry/indented.ts#L2-L3", {
        removeRedundantIndentations: true,
      })
    ).toBe("  return 1;\n}");
  });

  it("leaves code blocks without file= untouched", () => {
    const node: CodeNode = { type: "code", meta: "title=x", value: "keep" };

    remarkCodeImport({ rootDir })(
      { type: "root", children: [node] },
      { dirname: rootDir }
    );

    expect(node.value).toBe("keep");
  });

  it("refuses to read a file outside rootDir", () => {
    expect(() => transform("file=@/../etc/passwd")).toThrow(
      /outside from the rootDir/
    );
  });

  it("requires an absolute rootDir", () => {
    expect(() => remarkCodeImport({ rootDir: "src" })).toThrow(
      '"rootDir" has to be an absolute path'
    );
  });
});
