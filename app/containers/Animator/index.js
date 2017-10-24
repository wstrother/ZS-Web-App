/*
 *
 * Animator
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class Animator extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      sprite_sheet: "",
      sprite_sheet_url: "",
      width: 50,
      height: 50
    }
  }

  handleWidth = (event) => {
    this.setState({
      width: event.target.value
    });
  };

  handleHeight = (event) => {
    this.setState({
      height: event.target.value
    });
  };

  handlePhoto = (event) => {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        sprite_sheet: file,
        sprite_sheet_url: reader.result
      });

      console.log(file);
    };

    reader.readAsDataURL(file);
  };

  drawImage = () => {
    let canvas = document.getElementById("animation-canvas");
    let context = canvas.getContext("2d");

    let imageObj = new Image();

    imageObj.onload = function() {
      // draw cropped image
      let sourceX = 0;
      let sourceY = 0;
      let sourceWidth = 400;
      let sourceHeight = 50;
      let destWidth = sourceWidth;
      let destHeight = sourceHeight;
      let destX = 0;
      let destY = 0;

      context.rect(0, 0, canvas.width, canvas.height);
      context.fill();

      context.drawImage(
        imageObj,
        sourceX, sourceY,
        sourceWidth, sourceHeight,
        destX, destY,
        destWidth, destHeight);
    };

    imageObj.src = this.state.sprite_sheet_url;

  };

  renderImageUpload = () => {
    return (
      <div className="imageInput panel">
        <label>
          <span className="imageInput button">Choose a Sprite Sheet</span>
          <input type="file" name="photo-upload" onChange={this.handlePhoto} className="imageInput"/>
        </label>

        <span className="inputLabel">W</span>

        <input value={this.state.width} className="formInput" onChange={this.handleWidth}/>

        <span className="inputLabel">H</span>

        <input value={this.state.height} className="formInput" onChange={this.handleHeight}/>
      </div>
    );
  };

  renderSpriteSheet = () => {
    return (
      <div className="SpriteSheet panel">
        <canvas id="sprite-canvas" className="sprite-canvas"
          width="100" height="100" />
      </div>
    );
  };

  renderCanvas = () => {
    return (
      <div className="AnimationPreview panel">
        <canvas id="animation-canvas" className="animation-canvas"
                width="100" height="100" />
      </div>
    );
  };

  render() {
    let sprite_sheet = "";

    if (this.state.sprite_sheet_url !== "") {
      sprite_sheet = this.renderSpriteSheet();

      this.drawImage();
    }

    return (
      <div className="animator">
        <Helmet title="Home" meta={[ { name: 'description', content: 'ZS Animation Tool' }]}/>

        <div className="uploadSection">
          {this.renderImageUpload()}
        </div>

        <div className="imageSection">
          {sprite_sheet}

          {this.renderCanvas()}
        </div>

      </div>
    );
  }
}

Animator.contextTypes = {
  router: React.PropTypes.object
};
