# marker.js 3 Work-in-Progress Demo

This is a quick-and-simple demo of the functionality of [marker.js 3](https://www.npmjs.com/package/@markerjs/markerjs3).

Unlike [its predecessor](https://www.npmjs.com/package/markerjs2), marker.js 3 is a "headless" web component with an API surface you can use to fully integrate it into the design of your web application. This gives you full flexibility but also means that you'll need to implement the toolbars and property panels yourself. This demo shows you how.

## Navigating this demo

This demo was created with React+TypeScript+Vite, but it's purposefully lite on React concepts or "best practices". React was only used to avoid extra code dealing with layout and showing/hiding parts of it. You don't really need to be deeply familiar with React do understand what's going on with marker.js specifically.

There are 3 main parts (components) in this demo:

1. **marker.js 3 Editor** in [`src/mjs3-editor.tsx`](src/mjs3-editor.tsx). It has the marker.js 3 Editor component itself in the middle, a simplistic toolbar on the left, and a property panel on the right.

2. **marker.js 3 Viewer** in [`src/mjs3-viewer.tsx`](src/mjs3-viewer.tsx) uses the Viewer web component to dynamically render annotation on top of an image.

3. **marker.js 3 Renderer** in [`src/mjs3-renderer.tsx`](src/mjs3-renderer.tsx) takes the annotations created with the Editor and renders them on top of the source image as a static image.

## Running on your machine

Clone the repo to a local folder, run `yarn` to install dependencies, run `yarn dev` to launch a dev server. That's about it.
