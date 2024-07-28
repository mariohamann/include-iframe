# include-iframe

-   [include-iframe](#include-iframe)
    -   [Main Features](#main-features)
    -   [Installation](#installation)
        -   [CDN](#cdn)
        -   [NPM](#npm)
    -   [Usage](#usage)
        -   [Basic Usage](#basic-usage)
        -   [Custom Loading State](#custom-loading-state)
    -   [Limitations](#limitations)
    -   [Inspiration](#inspiration)

The `<include-iframe>` custom element is a simple way to load content from external HTML files via slotted `<iframe>` elements. It supports showing a loading state while the iframe content is being loaded. Besides being a way for "Client Side Includes", this can be used as a primitive way to offload performance heavy or dynamic content, as e. g. [Astro](https://astro.build/) does it with [Server Islands](https://astro.build/blog/future-of-astro-server-islands/).

-   [GitHub](#)
-   [NPM](#)
-   [Demo](#)
-   [Blog post](#)

## Main Features

-   🚀 Easy content loading from external HTML files
-   🏎️ Utilizes LightDOM for best performance
-   ⏳ Customizable loading state
-   🌐 Optimized for Progressive Enhancement

## Installation

### CDN

```html
<script
	type="module"
	src="https://cdn.jsdelivr.net/npm/@mariohamann/include-iframe/dist/include-iframe.min.js"
></script>
```

```html
<include-iframe>
	<iframe src="path/to/your-include"></iframe>
	<div slot="loading" hidden>Loading...</div>
</include-iframe>
```

### NPM

```bash
npm install @mariohamann/include-iframe
```

```javascript
import "@mariohamann/include-iframe";
```

```html
<include-iframe>
	<iframe src="path/to/your-include"></iframe>
	<div slot="loading" hidden>Loading...</div>
</include-iframe>
```

## Usage

### Basic Usage

Use the default slot to include an iframe with the content you want to load. The component will extract the content from the iframe, remove itself and append the content to the parent element.

```html
<include-iframe>
	<iframe src="path/to/your-include"></iframe>
</include-iframe>
```

Using the native iframe element in the LightDOM allows the browser to start loading the content immediately, even before JavaScript is executed. This ensures optimal performance and in addition enables features like [Lazy Loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading) by setting `loading="lazy"` on the iframe.

> [!TIP]
> For improved Progressive Enhancement, include the following CSS, which will hide the iframe when JavaScript is enabled.

```css
@media (scripting: enabled) {
	include-iframe iframe {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}
}
```

### Custom Loading State

Use the `loading` slot to display a custom loading state while the iframe content is being loaded.

```html
<include-iframe>
	<iframe src="path/to/your-include"></iframe>
	<div slot="loading" hidden>Loading...</div>
</include-iframe>
```

> [!TIP]
> For improved Progressive Enhancement, set the `hidden` attribute on the loading slot element. It will be removed by the web component, when JavaScript is enabled.

## Limitations

-   The included content must be served from the same origin as the parent document. This is a security feature of the web platform.
-   You can nest iframes with `<include-iframe>` into each other. Be aware, that this could lead to performance issues, as each iframe will load its content separately. Especially be aware of recursive includes.
-   It could lead to problems if you include scripts and DOM manipulations in the included content. The include works best with static content. Check out the examples in `/public` to see best practices.

## Inspiration

-   [Mastodon post](https://front-end.social/@SaraSoueidan/112769147677219641) by [Sara Soueidan](https://front-end.social/@SaraSoueidan)
-   [HTML Includes That Work Today](https://www.filamentgroup.com/lab/html-includes/#another-demo%3A-including-another-html-file) by [Scott Jehl](https://mstdn.social/@scottjehl)
-   [Iframe inlining trick as a Web Component](https://codepen.io/andybelldesign/project/full/DyVyPG) by [Andy Bell](https://mastodon.social/@andy@bell.bz)
-   [The use-html custom element](https://www.mayank.co/notes/use-html) by [Mayank](https://front-end.social/@mayank)
