# include-iframe

- [include-iframe](#include-iframe)
  - [Main Features](#main-features)
  - [Installation](#installation)
    - [CDN](#cdn)
    - [NPM](#npm)
  - [Usage](#usage)
    - [Basic Usage](#basic-usage)
    - [Attributes: `query-head` and `query-body`](#attributes-query-head-and-query-body)
    - [Slot: `loading`](#slot-loading)
  - [Limitations](#limitations)
  - [Inspiration](#inspiration)

The `<include-iframe>` custom element is a simple way to load content from external HTML files. It injects the content of a slotted `<iframe>` element and replaces itself and the `iframe` afterwards. It supports showing a loading state while the `iframe` content is being loaded. Besides being a way for "Client Side Includes", this can be used as a primitive way to offload performance heavy or dynamic content, as e. g. [Astro](https://astro.build/) does it with [Server Islands](https://astro.build/blog/future-of-astro-server-islands/).

-   [GitHub](https://github.com/mariohamann/include-iframe)
-   [NPM](https://www.npmjs.com/package/@mariohamann/include-iframe)
-   [Demo](https://include-iframe.mariohamann.com)

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

Use the default slot to include an `iframe` with the content you want to load. The component will extract the content from the `iframe`, remove itself and append the content to the parent element.

```html
<include-iframe>
	<iframe src="path/to/your-include"></iframe>
</include-iframe>
```

Using the native `iframe` element in the LightDOM allows the browser to start loading the content immediately, even before JavaScript is executed. This ensures optimal performance and in addition enables features like [Lazy Loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading) by setting `loading="lazy"` on the iframe. And even when JavaScript is disabled, the content of your `iframe` will be shown.

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

### Attributes: `query-head` and `query-body`

**Defaults**:

-   `query-head`: `''`
-   query-body: `'body > *'`.

Use `query-head` and `query-body` to include specific elements from the source. Elements from `query-head` are appended to the document's `'<head>'`, while elements from `query-body` replace the web component itself.

This allows, for example, to include `<style>` to your main document or to omit certain elements. The following example would add the `<style>`to the main `<head>` and replace the web component with`<p id="include">This will be included.</p>`.

```html
<include-iframe query-body="body > #include" query-head="style">
	<iframe src="/query/demo.html"></iframe>
</include-iframe>
```

```html
<head>
	<style>
		#include {
			border-left: 4px solid #333;
			padding-left: 1em;
		}
	</style>
</head>
<body>
	<p id="avoid">This won't be included</p>
	<p id="include">This will be included.</p>
</body>
```

### Slot: `loading`

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
