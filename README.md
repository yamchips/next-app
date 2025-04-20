# Overview

This is the first next app created by following Mosh's YouTube [video ](https://www.youtube.com/watch?v=ZVnjOPwW4ZA&ab_channel=ProgrammingwithMosh). It contains following parts:

1. Routing and navigation
2. Client and server components
3. Data fetching
4. Caching
5. Static and dynamic rendering
6. Styling using globals.css
7. Styling using CSS modules
8. Styling using Tailwind CSS
9. Styling using DaisyUI

## Tailwind Installation

The installation method in the video is outdated. Follow the instructions in [Tailwind website](https://tailwindcss.com/docs/installation/framework-guides/nextjs) instead.

## DaisyUI

New theme should be added in globals.css instead of tailwind.config.ts.

## Dynamic Routing

A dynamic route is a route with a parameter.

In the video, the parameter is used synchrounously, which triggers an Error in browser:

Server Error: Route "/users/[id]" used `params.id`. `params` should be awaited before using its properties.

To solve this problem, async and await are used, which is recommended in [Next.js website](https://nextjs.org/docs/messages/sync-dynamic-apis) since the warning occurred on a Server component.

## Catch All Segments

Create products/[[...slug]] path and page.tsx file.

[[]] means the parameters are optional, ... means it can accept varying number of parameters.

Renaming [...slug] causes an error, so deleting and recreating is a better way.

## Accessing Query String Parameters

Modify UserTable.tsx, /users/page.tsx.
