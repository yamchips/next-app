# Overview

Mosh's video was recorded in 2023 and Next.js and Tailwind have updated since then. Some features and configurations have already changed. This file records my learning notes.

## Intro video

The intro video (1h long, free version) contains following parts:

1. Routing and navigation
2. Client and server components
3. Data fetching
4. Caching
5. Static and dynamic rendering
6. Styling using globals.css
7. Styling using CSS modules
8. Styling using Tailwind CSS
9. Styling using DaisyUI

### Tailwind Installation

The installation method in the video is outdated. Follow the instructions in [Tailwind website](https://tailwindcss.com/docs/installation/framework-guides/nextjs) instead.

### DaisyUI

New theme should be added in globals.css instead of tailwind.config.ts.

### Comparison common frameworks

So far, we have met Bootstrap, Chakra UI, Tailwind and DaisyUI. These libraries's features can be concluded in following table.

| Name         | Type                                | Purpose                                                                            |
| ------------ | ----------------------------------- | ---------------------------------------------------------------------------------- |
| Bootstrap    | CSS framework                       | Prebuilt components (buttons, navbars, etc.) with a focus on traditional websites. |
| Tailwind CSS | Utility-first CSS framework         | You build your own designs quickly using utility classes. No ready components.     |
| DaisyUI      | Tailwind-based UI component library | Adds prebuilt components on top of Tailwind, like buttons, cards, modals.          |
| Chakra UI    | React UI component library          | Prebuilt accessible React components with easy styling via props (no manual CSS).  |

## Routing and navigation

### Dynamic Routing

A dynamic route is a route with a parameter.

In the video, the parameter is used synchrounously, which triggers an Error in browser:

Server Error: Route "/users/[id]" used `params.id`. `params` should be awaited before using its properties.

To solve this problem, async and await are used, which is recommended in [Next.js website](https://nextjs.org/docs/messages/sync-dynamic-apis#possible-ways-to-fix-it) since the warning occurred on a Server component.

After adding async and await, a hint shows on await keyword saying "await has no effect on this type of expression". This doesn't affect dev mode but causes an error in production.

To solve this problem, follow [Next.js website's](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#typescript) instruction to add a Promise type in the Props.

### Catch All Segments

Create products/[[...slug]] path and page.tsx file.

[[]] means the parameters are optional, ... means it can accept varying number of parameters.

Renaming [...slug] causes an error, so deleting and recreating is a better way.

### Accessing Query String Parameters

Modify UserTable.tsx, /users/page.tsx. Here, Server Side Rendering (SSR) is used, not Client Side Rendering (CSR) in game-hub project.

#### Traditional SSR, CSR and modern SSR

1. Traditional SSR

   Frontend: Receives a full HTML page from backend

   No need for JavaScript (though it can be added)

   Rendering is handled by the browser

   Backend: Generates and sends full HTML pages

   Features:
   <ul>
    <li>Good SEO</li>
    <li>Full page reloads, slow perceived performance</li>
    <li>Simple, no hydration issues</li>
   </ul>

2. Client-Side Rendering

   Frontend: Receives minimal HTML + JS bundle, builds UI in browser

   Backend: Sends JSON data only via APIs, Decoupled backend using REST or GraphQL

   Features:
    <ul>
    <li>Poor SEO</li>
    <li>No full page reloads, good perceived performance</li>
    <li>Fast but stale risk, UI may show old data if you don't revalidate or re-fetch at right time</li>
   </ul>

3. Modern SSR

   Frontend: Receives a full HTML page initially (pre-rendered or server-rendered)

   On navigation, only the changed parts of the page are sent (thanks to React Server Components)

   Runs a small JS runtime for client-side navigation and hydration

   Backend: Sends HTML (full or partial) generated on the server, fetch fresh data server-side

   Feature:

   <ul>
    <li>Good SEO</li>
    <li>No full page reloads, good perceived performance</li>
    <li>Fast and no stale risk</li>
    <li>Fresh data because rendering happens on every request </li>
   </ul>

#### Framework summary by architecture

| Architecture        | Frontend Frameworks                       | Backend Frameworks                                                          |
| ------------------- | ----------------------------------------- | --------------------------------------------------------------------------- |
| Traditional SSR     | (Browser renders HTML)                    | Ruby on Rails, Django, Laravel, ASP.NET, Spring Boot (with templates)       |
| CSR                 | React, Vue, Angular, Svelte, React Router | Spring Boot, Micronaut, Express.js, NestJS, Django REST, Flask, public APIs |
| Modern SSR (Hybrid) | Next.js 13+, Nuxt 3, Remix                | Next.js (backend built-in), Nuxt (backend built-in)                         |

#### Summary picture

<img src='./public/BackendFrontend.png' width='400' height='400'>

This picture was generated by ChatGPT.

#### Summary table

| Concept                     | My Project (App Router)      | Traditional SSR      | CSR (SPA style)             |
| --------------------------- | ---------------------------- | -------------------- | --------------------------- |
| Who intercepts link clicks? | Next.js client runtime       | Browser              | Client-side router          |
| Where is rendering done?    | Server via Server Components | Server (entire page) | Browser (React)             |
| Does it reload whole page?  | ❌ No                        | ✅ Yes               | ❌ No                       |
| Data fetching               | Server                       | Server               | Client                      |
| SEO                         | ✅ Great                     | ✅ Great             | ❌ Poor (unless hydrated)   |
| Speed & UX                  | 🚀 Fast & smooth             | 🐢 Slow & janky      | ⚡️ Fast but freshness risk |

### Layout

Create admin folder which contains layout and page. A Layout component should have a parameter called children of type ReactNode. This prop represents the nested content that will be rendered. More specifically, in a layout.tsx, children refers to:

1. page.tsx at the same level
2. page.tsx at a lower level (in a subfolder) without its own layout.tsx
3. layout.tsx at a lower level

For example, in app/layout.tsx, children means:

1. app/page.tsx
2. app/users/pages.tsx
3. app/admin/layout.tsx

While in app/admin/layout.tsx, children means: app/admin/pages.tsx. And when visiting /admin, the render tree is:

1. app/layout.tsx (root)
2. app/admin/layout.tsx (nested layout)
3. app/admin/page.tsx (nested page → becomes children of admin layout)

### Navigation

Link element in Next.js 13+:

only downloads the content of the target page, not the navigation bar or global css that applies to every page

pre-fetches links that are in the viewport

As we navigate in our app, Next.js stores the payload of our pages in a cache on the client. This cache only exists in one session and clears when we do a full page reload.

### Programmatic navigation

Take user to a new page as a result of clicking a button or submitting a form. Here we turn /users/new/page.tsx into a client componet because we want to make a form on this page, and we cannot handle browser events in a server component.

When importing router, import it from next/navigation instead of next/router. The latter is the old version (page router).

### Showing loading UIs

Add Suspense element around the target element, edit fallback attribute to define what users see when loading.

If we want to set loading UIs between different pages, we can:

1. in root layout.tsx, wrap children with Suspense
2. create loading.tsx under app folder

Loading file in child folder overrides loading file in parent folder.

| Navigation Target              | Which loading.tsx?               |
| ------------------------------ | -------------------------------- |
| /                              | app/loading.tsx                  |
| /users                         | app/users/loading.tsx            |
| /users/abc                     | app/users/loading.tsx            |
| no matching nested loading.tsx | Inherits from parent loading.tsx |

### Handling not found

If a not-found.tsx is put under app/ folder, it is responsible for handling localhost:3000/unknown.

If it is put under a subfolder, such as app/users, we need a [] or [[...slug]] subfolder and a page.tsx inside that folder to call notFound function. It is for handling localhost:3000/users/39.

### Handling errors

Creating an error.tsx in app/ folder can catch all errors. We can also create an error.tsx in a subfolder to handle all the errors happen in any of the routes under this subfolder.

The errors happen in layout.tsx cannot be detected by error.tsx. A global-error.tsx needs to be created under app folder.

To log error in real world, a tool called [Sentry](https://sentry.io/welcome/) is recommended.

We can pass a reset function to this error.tsx file to retry loading current page. If so, we need to set the component client side because we need to deal with onClick event.

## Build APIs

### Get a collection of objects

Create a subfolder api/users and a route.tsx. Use static data for now.

If the parameter request: NextRequest is deleted, Next.js caches the result of this response. So, even it's not used, we should keep it.

### Get a single object

Create a subfolder api/users/[id] and a route.tsx. Use static data for now.

### Create an object

In app/users/route.tsx, add a new POST function. Use Postman to test creating an object.

### Update an object

In app/users/[id]/route.tsx, add a new function. We can use PUT or PATCH. PUT replaces the entire object and PATCH only updates one or more properties.

First we check the validity of the request, then we check the validity of the id. If no error, we fetch and update the user object.

### Delete an object

In app/users/[id]/route.tsx, add a DELETE function.

### Validate requests with Zod

Introduce a validation library called [Zod](https://zod.dev), which used in React course too.

Create a schema.ts and define the structure of request.

schema.safeParse won't throw an error, only return an object, schema.parse will throw an error.

### HTTP status code

| Status | Name                  | Meaning / When to Use                                                                                                    |
| ------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 200    | OK                    | ✅ Successful GET, PUT, or DELETE request. The request was processed correctly.                                          |
| 201    | Created               | ✅ Resource was successfully created (used after POST).                                                                  |
| 204    | No Content            | ✅ Request was successful but no content to return (commonly used after DELETE).                                         |
| 400    | Bad Request           | ❌ Client sent invalid data (e.g. missing required fields, wrong data type).                                             |
| 401    | Unauthorized          | ❌ Authentication required — the user is not logged in.                                                                  |
| 403    | Forbidden             | ❌ User is logged in but does not have permission to perform the action.                                                 |
| 404    | Not Found             | ❌ Requested resource doesn’t exist (e.g. user with ID doesn't exist).                                                   |
| 409    | Conflict              | ❌ There’s a conflict — e.g. trying to create a user with an email that already exists.                                  |
| 422    | Unprocessable Entity  | ❌ Data is semantically incorrect (e.g. valid JSON structure, but invalid values). Often used in form validation errors. |
| 429    | Too Many Requests     | ❌ Rate limit exceeded — you're sending too many requests in a short time.                                               |
| 500    | Internal Server Error | ❌ Something went wrong on the server side — not the client's fault.                                                     |
| 503    | Service Unavailable   | ❌ Server is down or temporarily unable to handle the request (e.g. under maintenance).                                  |

Common CRUD usage example

| Action | Method | Response Code            | Notes                        |
| ------ | ------ | ------------------------ | ---------------------------- |
| Create | POST   | 201 Created              | New resource added           |
| Read   | GET    | 200 OK                   | Data retrieved successfully  |
| Update | PUT    | 200 OK or 204 No Content | Resource updated             |
| Delete | DELETE | 204 No Content           | Resource deleted, no content |

## Database integration

### Set up Prisma

| Tool                   | Purpose                                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| MySQL Community Server | The actual database (your data lives here).                                                                      |
| DataGrip               | A UI/database client — like a fancy version of MySQL Workbench, can connect to many kinds of databases.          |
| Prisma                 | An ORM (Object Relational Mapper) — helps you interact with the database using TypeScript/JS instead of raw SQL. |

### Define models

Define a User model in schema.prisma file. Refer to [Prisma model](https://www.prisma.io/docs/orm/prisma-schema/data-model/models).

Run "npx prisma format" to format this file.

### Create migration

Every time we update the table or database, we run above command to keep database schema in sync with Prisma schema.

Command: npx prisma migrate dev

This code creates a migration folder under prisma folder. Inside this folder we can see the SQL commands.

Use DataGrip to connect, view and change table in the database.

### Create a Prisma client

In prisma folder, create a client.ts file. To avoid creating multiple clients in develop mode, refer to [the best practice](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help#best-practices-for-using-prisma-client-in-development).

The PrismaClient is automatically imported from "@/app/generated/prisma", the import in the video and official doc are outdated.

### Get data

Go to users/route.tsx file, change the static data to the data in database. Use findMany function to get all users.

Go to users/[id]/route.tsx file, use findUnique to get user with given id.

### Create data

Go to users/route.tsx file, first we check whether the input email exists, if not, we create a new user object and return it.

### Update data

Go to users/[id]/route.tsx file, first we fetch the user with given id. If it exists, we update the email and name. I think here the real world case is more complex because we don't know which field(s) we have and we need to check and update given fields.

### Delete data

Similar to update. Here Mosh returns an empty object, while chatGPT recommends return the deleted user.

## Upload files

### Choose cloud platforms

Amazon S3, Google Cloud Platform, Microsoft Azure, Cloudinary. Here, Cloudinary is chosen because it integrates with Next.js and React better.

### Set up cloudinary

Command: npm install next-cloudinary. Then add my cloud name to .env file.

### Upload files

Use unsigned upload [widget](https://next.cloudinary.dev/clduploadwidget/basic-usage#unsigned) to create an upload button.

Create an upload folder and page.tsx.

### Show uploaded image

Add a state hook to store public_id from result. Define the result info as CloudinaryUploadWidgetInfo type so we can access the public_id field.

### Customize the upload widget

Refer to Cloudinary widget [website](https://demo.cloudinary.com/uw/), adjust UI and copy the js code.

## Authentication

### Set up NextAuth

First install NextAuth.js using 'npm i next-auth'. Then, since we are using Next.js 13+, we refer to this page and create a app/api/auth/[...nextauth] folder and paste the code inside a route.ts file.

Then, we add NEXTAUTH_URL and NEXTAUTH_SECRET in dot env file.

### Configure Google provider

Refer to this [page](https://next-auth.js.org/providers/google).

Create a new Google Cloud project and configure the Branding, Audience, Clients and Data access.

### Understand authentication session

Go to Application-Cookies to view the session token under cookies. Cookies are small pieces of infomation that are exchanged between the client and server with each request.

View the JSON web token:

Create a token folder under auth and a route.ts file. Use getToken to get the token and go to /api/auth/token to view the token.

name, email, picture: the log in user's account info

sub: like the user ID

iat, exp: issued at and expires at what time, by defaut the period is 30 days

A JSON web token is like an identification card that the client sends to the server with each request.

When the user logs in, NextAuth creates an authentication session for that user. By default, it represents that session using a JSON web token.

### Access sessions on the client

Add a folder app/auth and a Provider.tsx file. The Provider returns a SessionProvider wrapping its children. It has to be a client component. Then in layout file, wrap all body using this Provider.

In NavBar, change it to client component and add useSession hook to get the status and session data.

### Access session on the server

Modify route.ts in api/auth/[..nextauth], export the provider as an object.

In home page, use getServerSession function and get a session const. Access session properties using this variable.

### Sign out users

Add a link component with url '/api/auth/signout'. This route is automatically created by NextAuth so no manually configuration needed, just like sign in route.

### Protect routes

In real world, when a user wants to visit some private route, log in is required.

Create a middleware.ts in the root folder, import middleware. Define config variable to include all private paths that require user log in.

### Database adapters

In real app, we need to store our users in a database. These users can have related data like pictures, posts and so on. We need to use adapters, so NextAuth will automatically do this for us.

Follow the instructions in video, not the website.

Modify route.ts file in [..nextauth] folder, specify an adapter as part of initializing NextAuth.

Remove previous User and Product model in schema.prisma and create other models from this [website](https://authjs.dev/getting-started/adapters/prisma#naming-conventions). We have User, Session, Account and VerificationToken model. Session is used for storing sessions in database, by default, the strategy we have is JWT(JSON web token).

But now we cannot log in using google account. Because by default, the strategy is JWT, but when we use an adapter, NextAuth changes the strategy to database. Till now, we cannot use database sessions with social login or OAuth providers.

So, go to [..nextauth] route.ts file, change session strategy to jwt then restart the server. Now we can see the user info in the database after we log in.

### Configure credentials provider

Refer to this [page](https://next-auth.js.org/providers/credentials).

Go to route.ts in [..nextauth], import CredentialsProvider and add a CredentialProvider in provider array. It has three parameters:

1. a name string for display purpose, "Sign in with..."
2. a credentials object that includes `<input>` tags and their attributes
3. an authorize function that check the validity of input fields

To check whether a user and password matches, a bcrypt library is used. Use 'npm i bcrypt' and 'npm i -D @types/bcrypt' to install.

We need to add a password field to User model and update the database with a new prisma migration.

### Register users

Create a register folder under /api folder and a route.ts file containing a POST function. In this function, we do following things:

1. Get the request body and validate it using zod
2. Check whether there is a user with same email
3. Use bcrypt to hash password
4. Return the email as response

If postman post request has internal server error, restart the service.

#### Create register page

Create a register folder in app and add a page.tsx. In this page, add a form that can submit user inputs.

Here, fetch function contains an object besides the URL. The object has three fields: method, body and headers.

GET: only URL

DELETE: URL and method name

POST, PUT/PATCH: URL and these three fields

#### Router

Since we are using Next.js 13+, we need to import router from 'next/navigation'. Then we use `const router = useRouter()` to create a router instance.

Common methods:

1. router.push(url): navigates to a new route, client-side navigation
2. router.replace(url): works like push() but replaces the current history entry, so pressing back won't work
3. router.back(): goes back to previous page
4. router.refresh(): refreshes current route, similar to full reload but preserves state when possible

#### Client-side navigation and server-side navigation

Client-side navigation is handled entirely in the browser, without reloading the whole page.

Server-side navigation = Full page reload. The browser sends a full HTTP request to the server, which returns a brand-new HTML page.

## Send emails

### Set up react email

Introduce a library called react email. It is used to build and send emails using React and TypeScript.

In the video, we don't use default installation commands, instead we manually install it using: `npm i react-email @react-email/components`. After that, we go to package.json and add "preview-email": "email dev -p 3030" in scripts. Finally we create an emails folder in the root folder.

### Create an email template

Create a WelcomeTemplate.tsx in /emails and add some basic content.

### Preview email

Add a .react-email/ in .gitignore file, which means ignore a folder at root folder called react-email.

Then we run `npm run preview-email` and then we can open the portal set in package.json and send an email to ourself.

### Style email

We can use CSS properties or Tailwind.

1. CSS properties: create CSSProperties object and use inline style
2. Tailwind: import and wrap Body with Tailwind and apply className to target elements

### Send emails

React email integrates with different email service providers to send emails using React. Here we use Resend.

Go to resend.com and create an account. Generate an API key. Add the key to .env file and install resend using npm.

Finally we create an API endpoint for sending emails. This is just for demonstration. In real application, sending emails should be part of my business operations. For example, if someone submits an order, I need to send a confirmation email.

Go to api folder, create a new folder called send-email and add a route.ts file. We create a POST function here. In the post method, we create a payload object and specify fields like from, to, subject and react.

To send an email, we need a domain of our own. Then go to resend website to add our domain.

#### Domain

A domain name is the address to my website. If I own a website, it has an IP, like 23.545.23.567. I need to create a simple, easy to remember name like fanwu.com to allow public to visit it.

DNS: domain name system

## Optimize

### Optimize images

Create a public/images folder and put images like logo, icon here.

### Use third-party scripts

Use Script element from next/script. It has a strategy property which can be assigned to one of the four choices:

1. beforeInteractive: the script is loaded before Next.js injects any client side code to our pages, which is called hydration. Use this strategy only for scripts that are critical and should be loaded early on, such as bot detectors or cookie consent managers.

2. afterInteractive: default value. After hydration. Examples are tag managers and analytics.

3. lazyOnload: the scripts are loaded after all resources on the page have been fetched. For background or low priority scripts, such as chat plugins, social media widgets.

To clean up the code, add a GoogleAnalyticsScript.tsx on the root folder and import it in layout.

#### Hydration

1. Next.js on the server side renders your page into plain HTML. This is fast and great for SEO because the user and search engines get content immediately.

2. The browser receives this HTML and shows it quickly (called the first paint).

3. Then, Next.js sends JavaScript to the browser — the React code for your components.

4. **Hydration** happens: React uses this JavaScript to attach interactivity (event handlers, dynamic state, etc.) to the static HTML.

E.g., your `<button onClick={...}> `doesn’t work right after HTML is loaded.

After hydration, the onClick gets activated and works as expected.

### Use fonts

1. Use online fonts
   Add Roboto in `import { Inter, Roboto } from "next/font/google"` to import Roboto font, and create a variable called roboto. Use roboto.className in body element to set all font to Roboto.

2. Use local fonts
   Add a public/fonts folder and put our own fonts inside, create another variable called geist and use geist.className to set all body elements' font.

3. Use custom fonts
   In localFont function, we add a field called variable and set the customed name of this font, such as '--font-roboto'.

   In the html attribute, we can use `className={${roboto.variable} ${geist.variable}}` to allow these two variables to be used inside body. In page.tsx, we can set body's children element font size. Here, we need to refer to the latest [instruction](https://tailwindcss.com/docs/font-family#using-a-custom-value).

   We also need go to tailwind.config.ts to register our custom fonts.

   We can go to global.css to set default font for any html element.

### Search engine optimization

Metadata object in each page.tsx or layout.tsx is added to the head of the html by Next.js.

In some pages, like pages have route or query string parameters, we need to generate metadata dynamically.

```
export async function generateMetadata():Promise<Metadata> {
   const product = await fetch('www.url.com/products/1')
   return {
      title: product.title
      description: product.description
   }
}
```

### Lazy loading

#### Client components

To demonstrate lazy loading, we create following client side components:

1. LazyLoadingContainer: contains a button and a heavy component
2. Button: a button handles onclick event
3. HeavyComponent: an example heavy component

Instead of importing statically `import HeavyComponent from "./HeavyComponent"`, we use dynamic in Next.js to dynamic import it. So, in origin page.js, we cannot find HeavyComponent, after clicking button, we can see a separate request is sent to the server to fetch this component.

We can add a loading indicator when the heavy component is downloading. We can set ssr to false to disable it.

#### External javascript libraries

Use a library called lodash. Here we use two commands to install it because it's written in javascript. The second command is for TypeScript to know lodash functions at compile time.

Create another button and add a onclick function. This function sorts an array using lodash. If we import lodash statically, we are including this library in our page bundle, so the browser has to download it to render this page.

We can import this library in the click function so it will be downloaded only when click event happens.

We can go to page.js to search for 'orderBy' and see how many results we find. In lazy loading, we can only find one instance, but after clicking the button, in the new request, we can find 11 results.

## Deployment

### Preparation

Build locally first.

1. Add an id attribute to the second script in GoogleAnalyticsScript. It is an inline script so Next.js needs an id, the first script is an external script, it's unique by nature of the URL so it doesn't need an id.
2. "authOptions" is not a valid Route export field. In route.ts file, we can only export HTTP method handlers like GET, POST and so on. So, we create another file and separate most code.

### Deploy to Vercel

In dot env file we have a couple of environment variables, we need to configure them on vercel. For database, we use a local database in development and need a cloud database in production. Other environment variables in production should be different from those used in development due to security reasons.
