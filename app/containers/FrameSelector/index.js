/*
 *
 * FrameSelector
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class FrameSelector extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cell_size: [50, 50],
      image_size: [500, 350],
      image: "../../images/squirrel.gif",
      animation_name: "test",
      frame_rate: 4,
      frames: []
    }
  }

  componentDidMount() {
    this.setCanvas();
  }

  setCanvas = () => {
    let canvas = document.querySelector(".sprite-sheet");

    let cell_width = this.state.cell_size[0];
    let cell_height = this.state.cell_size[1];
    let width = this.state.image_size[0];
    let height = this.state.image_size[1];
    let cell_cols = width / cell_width;
    let cell_rows = height / cell_height;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    let div_x = 0;
    let div_y = 0;

    for (let i = 0; i < cell_cols; i++) {
      div_x = i * cell_width;

      for (let j = 0; j < cell_rows; j++) {
        div_y = j * cell_height;

        let d = document.createElement("div");
        d.className = "frame-cell";
        d.style.left = div_x + "px";
        d.style.top = div_y + "px";

        d.onclick = this.addFrame;
        canvas.appendChild(d);
      }
    }
  };

  addFrame = (event) => {
    let frame = event.target;

    let width = frame.offsetWidth;
    let height = frame.offsetHeight;
    let x = frame.offsetLeft;
    let y = frame.offsetTop;

    let frame_data = {
      size: [width, height],
      position: [x, y]
    };

    let frames = this.state.frames;
    frames.push(frame_data);
    this.setState({frames: frames});
    this.forceUpdate();

    console.log(this.state.frames);
  };

  getAnimationJson = () => {
    return {
      frames: this.state.frames
    };
  };

  render() {
    let json = JSON.stringify(this.getAnimationJson(), null, 2);

    return (
      <div className="container">

        <div className="sprite-sheet">
        </div>

        <div className="json-box">
          <textarea value={json} />
          </div>
      </div>
    );
  }
}

FrameSelector.contextTypes = {
  router: React.PropTypes.object
};
