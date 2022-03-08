import { LitElement, html, css } from "lit";
import "@meveo-org/mv-container";
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
      
      .content {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        font-weight: 500;
      }
      
      .progress {
        color: #4FACFE;
      }
      
      fieldset > label, label > input {
        cursor: pointer;
      }
      
      fieldset {
        width: 120px;
        margin-left: 10px;
        border:2px solid red;
        -moz-border-radius: 8px;
        -webkit-border-radius: 8px;	
        border-radius: 8px;
        color: #818181;
      }
      
      legend {
        font-weight: 500;
        color: red;
      }
      
      .progressbar {
        margin-top: 30px;
      }
      
      .progressbar  mv-progressbar, mv-progressbar[type=infinite] {
        --mv-progressbar-height: 20px;
      }
      
      .loading {
        display: block;
        text-align: center;
        font-weight: 500;
        color: #FFFFFF;
      }
      
      .dotdotdot:after {
        font-weight: 300;
        content: '...';
        display: inline-block;
        width: 20px;
        text-align: left;
        animation: dotdotdot 1.5s linear infinite;
      }
      
      @keyframes dotdotdot {
        0%   { content: '...'; }
        25% { content: ''; }
        50% { content: '.'; }
        75% { content: '..'; }
      }
    `;
  }

  constructor() {
    super();
    this.theme = "light";
    this.count = 0;

    setInterval(() => {
      this.count = this.count < 100 ? this.count + 1 : 0;
    }, 100);
  }

  render() {
    const progressValue = this.count;
    const maxValue = 52;
    const value = 52*progressValue/100;
    const downloadedValue = Number.isInteger(value) ? value : Math.round(value);
    const maxFile = 7;
    const fileValue = 7*progressValue/100;
    const downloadedFile = Number.isInteger(fileValue) ? fileValue : Math.floor(fileValue);
    const { theme } = this;

    return html`
      <fieldset>
        <legend>Theme</legend>
        <label><input type="radio" name="theme" value="light" checked @change="${this.changeTheme}" />Light</label>
        <label><input type="radio" name="theme" value="dark" @change="${this.changeTheme}" />Dark</label>
      </fieldset>
      <mv-container .theme="${theme}">
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
          .theme="${theme}"
        ></mv-progressbar>
        
        <h2>Stripes</h2>
        <mv-progressbar
          .value="${progressValue}"
          striped
          .theme="${theme}"
        ></mv-progressbar>
        
        <h2>Stripes and animation</h2>
        <mv-progressbar
          .value="${progressValue}"
          striped
          animated
          .theme="${theme}"
        ></mv-progressbar>
        <div class="progressbar">
          <mv-progressbar
            striped
            animated
            value=100
            .theme="${theme}"
          >
            <span class="loading">Please wait<span class="dotdotdot"></span></span>
          </mv-progressbar>
        </div>
        
        <h2>Infinite</h2>
        <mv-progressbar 
          type="infinite"
          .theme="${theme}"
        ></mv-progressbar>
      </mv-container>
    `;
  }

  changeTheme = originalEvent => {
    const { target: { value } } = originalEvent;
    this.theme = value;
  };
}

customElements.define("mv-progressbar-demo", MvProgressbar);
