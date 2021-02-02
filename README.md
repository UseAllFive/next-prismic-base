![](https://img.shields.io/badge/node-12.19.1-43853d?logo=node.js&labelColor=fff)
![](https://img.shields.io/badge/next-10.0.6-black?logo=next.js)
![](https://img.shields.io/badge/prismic-cms-fff?logo=prismic&labelColor=5163ba&logoColor=fff)
![](https://img.shields.io/badge/storybook-fff?logo=storybook&labelColor=ff4785&logoColor=fff)

# YOUR_PROJECTS_NAME_HERE

It's highly suggested that you read through the Next and Prismic documentation below before starting

- [Next.js](https://nextjs.org/)
- [Prismic](https://prismic.io/)

## Already connected to Prismic?

If you have not yet connected this codebase to Prismic [carefully read through the instructions here](https://github.com/UseAllFive/next-prismic-base/wiki). Otherwise, you can probably skip those instructions and simply read the following to get the project up and running locally:

## Configuration

### Set up environment variables

Get a copy of the `.env.local` file from a UA5 colleague and add the file to the project root. Make sure that file is sent and received securely since this document will contain sensitive information that needs to remain hidden.

### Install deps, run development server

You may run into issues if you're using a different node version than the one specified in the `.nvmrc` file. For this reason, it is recommended that you install that version with [nvm (node version manager)](https://github.com/nvm-sh/nvm).

```
nvm use
```

This project uses the [yarn package manager](https://yarnpkg.com/). To begin development, run the following commands, which will install dependencies and run the development server.

```bash
yarn
yarn dev
```

Your site should be up and running on [http://localhost:3000](http://localhost:3000)!

## Managing data

The CMS for this site is [hosted on Prismic](https://prismic.io).

## Storybook

This project has been configured w/ Storybook. While developing your components, run `yarn storybook` to start Storybook locally. Each of your components should come with a `stories.js` file, which will automatically add the component to Storybook. As part of the development process, developers should be creating stories in order to test your component in different viewports and edge-case scenarios having to do with different properties passed or not passeded to your component.

## Deploying

This site is [hosted on vercel](https://vercel.com/). The `master` branch is associated with production. When `master` is pushed, the latest code will deploy to production automatically. For this reason, do not work directly off of the `master` branch. Only merge your code into `master` when you are ready to take the changes live.
