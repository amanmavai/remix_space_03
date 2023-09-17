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
```
