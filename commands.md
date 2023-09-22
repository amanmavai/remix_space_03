```sh
$ npx create-remix@latest remix_space

# add prettier
$ touch .prettierrc .prettierignore
$ npm install -D prettier prettier-plugin-tailwindcss eslint-config-prettier

# add tailwindcss
# enable tailwind and postcss in remix.config.js
$ npm install -D tailwindcss
$ npm install -D autoprefixer postcss-import
$ npx tailwindcss init -p --ts

# add clean command
$ npm install -D rimraf

# add playwright
$ npm init playwright@latest
$ npm install -D cross-env
# run playwright test in ui
$ npx playwright test --ui

# add prisma
$ npm install -D prisma

# this command added 2 files
#  1. prisma/schema.prisma
#  2. .env
$ npx prisma init --datasource-provider sqlite

# This command did two things:
  # 1. It creates a new SQL migration file for this migration in the prisma/migrations directory.
  # 2. It runs the SQL migration file against the database.
  # 3. Also added @prisma/client
$ npx prisma migrate dev --name init

# Whenever you make changes to your database that are reflected in the Prisma schema,
# you need to manually re-generate Prisma Client to update the generated code in the node_modules/.prisma/client directory:
$ prisma generate

# run prisma studio
$ npx prisma studio

$ npm install bcryptjs
$ npm install -D @types/bcryptjs

$ npm install -D tsx

$ npm install tiny-invariant

$ npx husky-init && npm install
# It will:
    # Add prepare script to package.json
    # Create a sample pre-commit hook that you can edit (by default, npm test will run when you commit)
    # Configure Git hooks path

# To add another hook use husky add. For example:
$ npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'

$ npm install -D @commitlint/{cli,config-conventional}

$ npx husky add .husky/pre-push "npm test"

$ npm install -D daisyui@latest

$ npx shadcn-ui@latest init
$ npx shadcn-ui@latest add button

```
