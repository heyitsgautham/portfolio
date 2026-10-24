# Contributing

This is my personal site, so most changes come from me.
Bug reports and small fixes are welcome as issues or pull requests.

## Set up

```bash
corepack enable
pnpm install
pnpm registry:build
pnpm dev
```

The README lists every command and env var.

## Before you open a pull request

Run the same checks CI runs.

```bash
pnpm lint
pnpm format:check
pnpm check-types
pnpm test:coverage
pnpm build
```

`pnpm format:write` and `pnpm lint:fix` fix most formatting and import-order failures.

## What a good change looks like

Keep each commit to one change.
A commit that changes behavior carries the tests that prove it.
Put tests next to the code as `name.test.ts` or `name.test.tsx`.

Content changes, such as a new project or job, go in `src/features/profile/data/`.
The types in `src/features/profile/types/` say which fields each entry needs.

Every push to `main` deploys to the live site.
Check a visual change in `pnpm dev` at desktop and phone widths before you push it.

## Commit messages

Commits follow Conventional Commits with a scope.

```
<type>(<scope>): <what the commit does>
```

The types in use are `feat`, `fix`, `refactor`, `test`, `docs`, `style`, `build`, `ci` and `chore`.
Examples from the history are `fix(delivery-risk): list everything the jira app stores in its privacy policy` and `test(contact): cover form validation and every submit outcome`.

## Dependencies

Dependabot opens update PRs every Monday.
CI fails on critical advisories in runtime dependencies.
Upgrade majors by hand and compare the built pages before merging.
