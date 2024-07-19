class IncludeIframe extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `<slot name="loading"></slot><slot></slot>`;
    shadow.appendChild(template.content.cloneNode(true));
    this.iframe = this.querySelector('iframe');
    this.loadingSlot = shadow.querySelector('slot[name="loading"]');
  }

  get contentChildren() {
    const contentDocument = this.iframe.contentDocument;
    if (contentDocument?.readyState !== 'complete') {
      return null
    }
    const content = this.iframe.contentDocument.body
      || this.iframe.contentDocument // SVGs;
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
        this.iframe.addEventListener('load', () => {
          this.replaceWithContent();
        });
      }
    }
  }

  showLoading() {
    if (this.loadingSlot) {
      const loadingElement = this.loadingSlot.assignedNodes()[0];
      if (loadingElement) {
        loadingElement.removeAttribute('hidden');
      }
    }
  }

  replaceWithContent() {
    if (this.contentChildren) {
      const children = [...this.contentChildren];
      children.forEach(child => this.before(child));
      this.remove();
    } else {
      console.error('Iframe content is empty or undefined');
    };
  }
}

customElements.define('include-iframe', IncludeIframe);
