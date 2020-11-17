# YOUR_PROJECTS_NAME_HERE

It's highly suggested that you read through the Next and Prismic documentation below before starting

- [Next.js](https://nextjs.org/)
- [Prismic](https://prismic.io/)

## Already connected to Prismic?

If you have not yet connected this codebase to Prismic [carefully read through the instructions here](https://github.com/UseAllFive/next-prismic-base/wiki). Otherwise, you can probably skip those instructions and simply read the following to get the project up and running locally:

## Configuration

### Set up environment variables

Follow the instructions in [this post](https://intercom.help/prismicio/en/articles/1036153-generating-an-access-token) to generate a new access token.

Next, copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

- `PRISMIC_API_TOKEN` should be the **Permanent access token** you just created
- `PRISMIC_REPOSITORY_NAME` is the name of your repository (the one in the URL)
- `PRISMIC_REPOSITORY_LOCALE` is the locale of your repository. Defaults to `en-us`
- `PRISMIC_HEADER_ID` is the Prismic ID for the header content type that you create

Your `.env.local` file should look something like this:

```bash
PRISMIC_API_TOKEN=...
PRISMIC_REPOSITORY_NAME=...
PRISMIC_REPOSITORY_LOCALE=...
PRISMIC_HEADER_ID=...
```

Make sure the locale matches your settings in the Prismic dashboard.

### Install deps, run development server

```bash
yarn install
yarn dev
```

Your site should be up and running on [http://localhost:3000](http://localhost:3000)!
