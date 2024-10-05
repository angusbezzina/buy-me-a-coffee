# `@repo/ui`

Collection of shared ui code and components for the monorepo.

## Adding components

#### Using ShadCN

Run the command `npx shadcn@latest add <component-name>` to add a component.

#### Writing manually

Please add components to the `src/components` directory, hooks to the `src/hooks` directory, and utils to the `src/lib` directory.

**NOTE:** Remember to add the component to the `exports` field in the `package.json` file.
