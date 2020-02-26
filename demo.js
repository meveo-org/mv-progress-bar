import { LitElement, html, css } from "lit-element";
import "mv-container";
import "mv-font-awesome";
import "./mv-progress-bar.js";

const FILE = {
  "1" : "file name 01",
  "2" : "file name 02",
  "3" : "file name 03",
  "4" : "file name 04",
  "5" : "file name 05",
  "6" : "file name 06",
  "7" : "file name 07"
};

export class MvProgressbar extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean, attribute: true },
      theme: { type: String, attribute: true },
      count: { type: Number }
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, MuseoSans);
        font-size: var(--font-size-m, 10pt);
      }

      mv-container {
        --mv-container-min-width: 640px;
        --mv-container-min-height: 200px;
        --mv-container-margin: 20px auto;
        --mv-container-padding: 20px 30px; 
      }
      
      mv-fa[icon="lightbulb"] {
        font-size: 50px;
        cursor: pointer;
        margin: 20px;
      }
      
      .theme {
        display: flex;
        justify-content: flex-start;
      }
      
      .content {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        font-weight: 500;
      }
      
      .progress {
        color: #4FACFE;
      }
    `;
  }

  constructor() {
    super();
    this.theme = "light";
    this.open = true;
    this.count = 0;

    setInterval(() => {
      this.count = this.count < 100 ? this.count + 1 : 0;
    }, 100);
  }

  render() {
    const iconColor = `color: ${this.open ? "yellow" : ""}`;
    const textColor = `color: ${this.open ? "" : "#FFFFFF"}`;
    const progressValue = this.count;
    const maxValue = 52;
    const value = 52*progressValue/100;
    const downloadedValue = Number.isInteger(value) ? value : Math.round(value);
    const maxFile = 7;
    const fileValue = 7*progressValue/100;
    const downloadedFile = Number.isInteger(fileValue) ? fileValue : Math.floor(fileValue);
    return html`
      <div class="theme">
        <mv-fa icon="lightbulb" style="${iconColor}" @click=${this.toggleLightBulb}></mv-fa>
      </div>
      <mv-container .theme="${this.theme}" style="${textColor}">
        <h2>Default</h2>
        <div class="content">
           <div>${FILE[downloadedFile.toString()]} (${downloadedFile}/${maxFile})</div>
           <div>
             <div class="progress">${progressValue}% Completed</div>
             <div>${downloadedValue}MB / ${maxValue}MB</div>
           </div>
        </div>
        <mv-progressbar
          .value="${progressValue}"
        ></mv-progressbar>
        <h2>Stripes</h2>
        <mv-progressbar
          .value="${progressValue}"
          striped
        ></mv-progressbar>
        <h2>Stripes and animation</h2>
        <mv-progressbar
          .value="${progressValue}"
          striped
          animated
        ></mv-progressbar>
        <h2>Infinite</h2>
        <mv-progressbar
          value="100"
          striped
          animated
        ></mv-progressbar>
      </mv-container>
    `;
  }

  toggleLightBulb = () => {
    this.open = !this.open;
    if (this.open) {
      this.theme = "light";
    } else {
      this.theme = "dark";
    }
  };
}

customElements.define("mv-progressbar-demo", MvProgressbar);
