import * as PIXI from 'pixi.js'
import React, {useEffect, useRef} from 'react';

import { Stage, Sprite } from '@inlet/react-pixi';

import './App.css';

import img from './megusta.png'

const app = new PIXI.Application({
    width: 800,
    height: 500,
    backgroundColor: 0x282c34,
    resolution: window.devicePixelRatio || 1,
});


function App() {
  const ref = useRef(null);

  function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
  }

  function onWheelMove(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    console.log(event);
    // this.data = event.data;
    // this.alpha = 0.5;
    // this.dragging = true;
  }

  function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
  }

  function onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.x = newPosition.x;
      this.y = newPosition.y;
    }
  }

  useEffect(() => {
      document.getElementById("app").appendChild(app.view);

    // document.body.addEventListener("wheel", function(event){
    //   event.preventDefault()
    // });

  }, []);
  //
  //
  // let texture = app.utils.TextureCache["megusta.png"];
  // let sprite = new app.Sprite(texture);
  //
  //
  //
  // const setup = () =>{
  //   let sprite = new app.Sprite(
  //       app.loader.resources["megusta.png"].texture
  //   );
  // }



  // app.loader.add("megusta.png").load(setup);

  // // load the texture we need
  // app.loader.add('img', img).load((loader, resources) => {
  //
  //   // This creates a texture from a 'bunny.png' image.
  //   const imgSprite = new PIXI.Sprite(resources.img.texture);
  //
  //   // Setup the position of the bunny
  //     imgSprite.x = app.renderer.width / 2;
  //     imgSprite.y = app.renderer.height / 2;
  //
  //   // Rotate around the center
  //     imgSprite.anchor.x = 0.5;
  //     imgSprite.anchor.y = 0.5;
  //
  //   // Add the bunny to the scene we are building.
  //   app.stage.addChild(imgSprite);
  //
  //   // Listen for frame updates
  //   app.ticker.add(() => {
  //     // each frame we spin the bunny around a bit
  //       imgSprite.rotation += 0.01;
  //   });
  // });

  const graphics = new PIXI.Graphics();

// Rectangle
    graphics.beginFill(0xDE3249);
    graphics.drawRect(50, 50, 100, 100);
    graphics.endFill();


// draw polygon
    const path = [600, 370, 700, 460, 780, 420, 730, 570, 590, 520];

    graphics.lineStyle(0);
    graphics.beginFill(0x3500FA, 1);
    graphics.drawPolygon(path);
    graphics.endFill();

    app.stage.addChild(graphics);

    const texture = PIXI.Texture.from(img);
    // Scale mode for pixelation
    texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    let sprite = new PIXI.Sprite(texture);

    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.anchor.set(0.5);
    sprite.scale.set(.3);
    sprite.x = 300;
    sprite.y = 300;

    sprite.on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);
    app.stage.addChild(sprite);

    app.view.addEventListener('wheel', (e) => {
      console.log("MOVEMENT!:", e.deltaY);
      if(Math.sign(e.deltaY) > 0){
        sprite.rotation += 0.1;
      }else {
        sprite.rotation -= 0.1;
      }

    })

  return (
    <div className="App" id="app" ref={ref}>
      {/*<Stage>*/}
      {/*  <Sprite image={img} x={100} y={100} />*/}
      {/*</Stage>*/}
    </div>

  );
}

export default App;
