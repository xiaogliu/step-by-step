基本使用规范看官方文档 [Usage](https://yarnpkg.com/en/docs/usage) 就好，常用命令：   

1. Starting a new project

```bash
yarn init
```

2. Adding a dependency

```bash
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

3. Adding a dependency to different categories of dependencies

Add to `devDependencies`, `peerDependencies`, and `optionalDependencies` respectively:   

```bash
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional
```

4. Upgrading a dependency

```bash
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

5. Removing a dependency

```bash
yarn remove [package]
```

6. Installing all the dependencies of project

```bash
yarn
```

or

```
yarn install
```
