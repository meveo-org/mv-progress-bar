import { LitElement, html, css } from "lit-element";

export class MvProgressbar extends LitElement {
  static get properties() {
    return {
      value: { type: Number, attribute: true },
      striped: { type: Boolean, attribute: true },
      animated: { type: Boolean, attribute: true },

      //  valid type values are: "default", "infinite"
      //    default: "default"
      type: { type: String, attribute: true },

      //  valid theme values are: "light", "dark"
      //    default: "light"
      theme: { type: String, attribute: true }
    };
  }

  static get styles() {
    return css`
      :host {
        --font-family: var(--mv-progressbar-font-family, MuseoSans);
        --font-size: var(--font-size-m, 16px);
        --color: var(--mv-progressbar-color, #818181);
        --height: var(--mv-progressbar-height, 10px);
        --progress-background: var(--mv-progressbar-progress-background, #E4E3E3);
        --border-radius: var(--mv-progressbar-border-radius, 25px);
        --light-background: var(--mv-progressbar-light-background, linear-gradient(to left, rgba(79, 172, 254, 1) 0%, rgba(0, 242, 254, 1) 100%));
        --dark-background: var(--mv-progressbar-dark-background, linear-gradient(to right, #4E686D 0%, #0C14FE 180%));
      }
      
      .progress { 
        position: relative;
        -moz-border-radius: var(--border-radius);
        -webkit-border-radius: var(--border-radius);
        border-radius: var(--border-radius);
        height: var(--height);
        background: var(--progress-background);
        overflow: hidden;
      }
      
      .progress > span {
        display: block;
        position: relative;
        overflow: hidden;
        -moz-border-radius: var(--border-radius);
        -webkit-border-radius: var(--border-radius);
        border-radius: var(--border-radius);
        height: 100%;
      }
      
      @-webkit-keyframes move {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 50px 50px;
        }
      }
      
      .progress[striped] > span:after, .infinite[striped] > span:after {
        content: "";
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0;
        background-image: 
           -webkit-gradient(linear, 0 0, 100% 100%, 
              color-stop(.25, rgba(255, 255, 255, .2)), 
              color-stop(.25, transparent), color-stop(.5, transparent), 
              color-stop(.5, rgba(255, 255, 255, .2)), 
              color-stop(.75, rgba(255, 255, 255, .2)), 
              color-stop(.75, transparent), to(transparent)
           );
        background-image: 
          -moz-linear-gradient(
              -45deg, 
              rgba(255, 255, 255, .2) 25%, 
              transparent 25%, 
              transparent 50%, 
              rgba(255, 255, 255, .2) 50%, 
              rgba(255, 255, 255, .2) 75%, 
              transparent 75%, 
              transparent
           );
        z-index: 1;
        -webkit-background-size: 40px 40px;
        -moz-background-size: 40px 40px;
        overflow: hidden;
      }
      
      .progress[striped][animated] > span:after, .infinite[striped][animated] > span:after {
        -webkit-animation: move 2s linear infinite;
      }
      
      .default > span, .infinite > span {
        background: var(--background);
      }
      
      .infinite > span {
        position: relative;
        animation: progress-infinite 6s linear infinite;
      }
      
      @keyframes progress-infinite {
        from { left: -25%; width: 25%; }
        to { left: 100%; width: 25%;}
      }
      
      .light {
        --background: var(--light-background);
      }
      
      .dark {
        --background: var(--dark-background);
      }
    `;
  }

  constructor() {
    super();
    this.striped = false;
    this.animated = false;
    this.type = "default";
    this.value = null;
    this.theme = "light";
  }

  render() {
    return html`
      <div 
        class="progress ${this.type} ${this.theme}" 
        ?striped="${this.striped}"
        ?animated="${this.animated}"
      >
        <span style="width: ${this.value}%">
          <slot></slot>
        </span>
      </div>
    `;
  }
}

customElements.define("mv-progressbar", MvProgressbar);
