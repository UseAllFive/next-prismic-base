# A statically generated website starter kit using Next.js and Prismic CMS

It's highly suggested that you read through the Next and Prismic documentation below before starting a project if you are not familiar with these services:

- [Next.js](https://nextjs.org/)
- [Prismic](https://prismic.io/)

## Table of contents

- How to use
- UA5 conventions
  - Branch naming

## How to use

### Create a new GitHub repo based off this generator

[Use this Template](https://github.com/UseAllFive/next-prismic-base/generate)

## Configuration

### Prismic

#### Create an account and a repository

First, [create an account on Prismic](https://prismic.io/).

After creating an account, create a **repository** from the [dashboard](https://prismic.io/dashboard/) and assign to it any name of your liking.

#### Create a `page` and `header` type

From the repository page, create two new **custom types**:

- `page` (repeatable)
- `header` (single)

Copy the JSON in [`types/page.json`](types/page.json) and `types/header.json`](types/header.json), then click on **JSON editor** and paste it there.

Save the types and continue.

#### Populate Content

Go to the **Content** page, it's in the menu at the top left, then click on **Create new** and select the **page** type:

- You just need **1 page document**.
- Use dummy data for the metadata.
- Make sure to specify a slug. It should include a starting and trailing slash (e.g. `/example/post/`)

Do the same for the header content type

**Important:** For each document, you need to click **Publish** after saving. If not, the document will be in the draft state.

#### Set up Preview

On your repository page, go to **Settings**, click on **Previews** and then **Create a New Preview** for development, fill the form like so:

- **Site Name**: may be anything, like `development`
- **Domain of Your Application**: `http://localhost:3000`
- **Link Resolver**: `/api/preview`

Once saved, go to one of the posts you've created and:

- **Update the meta_title**. For example, you can add `[Draft]` in front of the meta_title.
- Click **Save**, but **DO NOT** click **Publish**. By doing this, the post will be in draft state.
- Right next to the **Publish** button you should see the **Preview** button, displayed with an eye icon. Click on it!

You should now be able to see the updated title. To exit preview mode, you can click on **Click here to exit preview mode** at the top of the page.

### Next

#### Set up environment variables

Follow the instructions in [this post](https://intercom.help/prismicio/en/articles/1036153-generating-an-access-token) to generate a new access token.

Next, copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

- `PRISMIC_API_TOKEN` should be the **Permanent access token** you just created
- `PRISMIC_REPOSITORY_NAME` is the name of your repository (the one in the URL)
- `PRISMIC_REPOSITORY_LOCALE` is the locale of your repository. Defaults to `en-us`
- `PRISMIC_HOME_ID` is the Prismic ID for the index page

Your `.env.local` file should look like this:

```bash
PRISMIC_API_TOKEN=...
PRISMIC_REPOSITORY_NAME=...
PRISMIC_REPOSITORY_LOCALE=...
PRISMIC_HOME_ID=...
```

Make sure the locale matches your settings in the Prismic dashboard.

#### Install deps, run development server

```bash
yarn install
yarn dev
```

Your site should be up and running on [http://localhost:3000](http://localhost:3000)!

#### Google Analytics

- Go into `/lib/analytics.js` and update the `GA_TRACKING_ID`
- Make sure the environment variable `NODE_ENV` is set to `production` on the production server (no tracking happening in development by default)
