```sh
$ pnpm create remix remix_space

# add prettier
$ touch .prettierrc .prettierignore
$ pnpm add -D prettier prettier-plugin-tailwindcss eslint-config-prettier

# add tailwindcss
# enable tailwind and postcss in remix.config.js
$ pnpm add -D tailwindcss
$ pnpm add -D autoprefixer postcss-import
$ npx tailwindcss init -p --ts

# add clean command
$ pnpm add -D rimraf

# add playwright
$ pnpm create playwright
$ pnpm install -D cross-env
# run playwright test in ui
$ pnpm exec playwright test --ui

# add prisma
$ pnpm add -D prisma

# this command added 2 files
#  1. prisma/schema.prisma
#  2. .env
$ pnpm exec prisma init --datasource-provider

# This command did two things:
  # 1. It creates a new SQL migration file for this migration in the prisma/migrations directory.
  # 2. It runs the SQL migration file against the database.
  # 3. Also added @prisma/client
$ pnpm exec prisma migrate dev --name init

# Whenever you make changes to your database that are reflected in the Prisma schema,
# you need to manually re-generate Prisma Client to update the generated code in the node_modules/.prisma/client directory:
$ prisma generate

# run prisma studio
$ pnpm exec prisma studio

$ pnpm add bcryptjs
$ pnpm add -D @types/bcryptjs

$ pnpm add -D tsx

$ pnpm add tiny-invariant

$ pnpm dlx husky-init && pnpm install
# It will:
    # Add prepare script to package.json
    # Create a sample pre-commit hook that you can edit (by default, npm test will run when you commit)
    # Configure Git hooks path

# To add another hook use husky add. For example:
$ npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'

$ pnpm add -D @commitlint/{cli,config-conventional}
```
