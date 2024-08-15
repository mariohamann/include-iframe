class IncludeIframe extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `<slot name="loading"></slot><slot></slot>`;
    shadow.appendChild(template.content.cloneNode(true));
    this.iframe = this.querySelector("iframe");
    this.loadingSlot = shadow.querySelector('slot[name="loading"]');
  }

  get contentChildren() {
    const contentDocument = this.iframe.contentDocument;
    if (contentDocument?.readyState !== "complete") {
      return null;
    }
    const content = contentDocument.body || contentDocument; // SVGs
    if (content?.children.length === 0) {
      return null;
    }
    return content.children;
  }

  connectedCallback() {
    if (this.iframe) {
      if (this.contentChildren) {
        this.replaceWithContent();
      } else {
        this.showLoading();
        this.iframe.addEventListener("load", () => {
          this.replaceWithContent();
        });
      }
    }
  }

  showLoading() {
    if (this.loadingSlot) {
      const loadingElement = this.loadingSlot.assignedNodes()[0];
      if (loadingElement) {
        loadingElement.removeAttribute("hidden");
      }
    }
  }

  replaceWithContent() {
    const contentDocument = this.iframe.contentDocument;

    if (!contentDocument) {
      console.error("Unable to access iframe content document");
      return;
    }

    // Get query selectors from attributes
    const headQuery = this.getAttribute("query-head") || "";
    const bodyQuery = this.getAttribute("query-body") || "body > *";

    // Select and append head elements
    if (headQuery) {
      const headElements =
        contentDocument.head.querySelectorAll(headQuery);
      headElements.forEach((element) => {
        document.head.appendChild(element.cloneNode(true));
      });
    }

    // Select and append body elements
    const content = contentDocument.body || contentDocument;
    const bodyElements = content.querySelectorAll(bodyQuery);

    if (bodyElements.length > 0) {
      bodyElements.forEach((child) => this.before(child.cloneNode(true)));
      this.remove();
    } else {
      console.error(
        "No matching body elements found or iframe content is empty"
      );
    }
  }
}

customElements.define("include-iframe", IncludeIframe);
customElements.define("server-island", IncludeIframe);
