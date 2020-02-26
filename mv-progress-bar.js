import { LitElement, html, css } from "lit-element";

export class MvProgressbar extends LitElement {
  static get properties() {
    return {
      value: { type: Number, attribute: true },
      type: { type: String, attribute: true },
      striped: { type: Boolean, attribute: true },
      animated: { type: Boolean, attribute: true }
    };
  }

  static get styles() {
    return css`
			:host {
				--font-family: var(--mv-textarea-font-family, MuseoSans);
				--font-size: var(--font-size-m, 16px);
        --color: var(--mv-textarea-color, #818181);
      }
      
      .progress-bar { 
        position: relative;
        -moz-border-radius: 25px;
        -webkit-border-radius: 25px;
        border-radius: 25px;
        height: 10px;
        background: #E4E3E3;
      }
      
      .progress-bar > span {
        display: block;
        position: relative;
        overflow: hidden;
        -moz-border-radius: 25px;
        -webkit-border-radius: 25px;
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
      
      .progress-bar[striped] > span:after {
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
        -webkit-background-size: 20px 20px;
        -moz-background-size: 20px 20px;
        overflow: hidden;
      }
      
      .progress-bar[striped][animated] > span:after {
        -webkit-animation: move 2s linear infinite;
      }
      
      .download > span {
        background-color: #f0a3a3;
        background-image: -webkit-linear-gradient(right, rgba(79, 172, 254, 1) 0%, rgba(0, 242, 254, 1) 100%);
        background-image: -moz-linear-gradient(right, rgba(79, 172, 254, 1) 0%, rgba(0, 242, 254, 1) 100%); 
      }
		`;
  }

  constructor() {
    super();
    this.striped = false;
    this.animated = false;
    this.type = "download";
    this.value = 50;
  }

  render() {
    return html`
      <div class="progress-bar ${this.type}" ?striped="${this.striped}" ?animated="${this.animated}">
			  <span style="width: ${this.value}%"></span>
		  </div>
    `;
  }
}

customElements.define("mv-progressbar", MvProgressbar);
