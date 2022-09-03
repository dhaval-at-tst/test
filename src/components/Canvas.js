import React, { useCallback, useRef, useEffect } from "react";
// import "./style.css";
import lands from "./lands.json";

let canvas;
let context;
const canvasSize = 2000;

const createShadow = (size) => `${size}px ${size}px 10px #ccc inset`;
let blockSize = 32;
const shadowSize = 8;

const dragInertia = 20;

const zoomBy = 0.1;

const Canvas = () => {
  const containerRef = React.useRef(null);
  const canvasRef = useRef(null);

  React.useEffect(() => {
    const { innerHeight, innerWidth } = window;

    const scrollDown = (canvasSize - innerHeight) / 2;
    const scrollLeft = (canvasSize - innerWidth) / 2;

    containerRef.current.scroll(scrollLeft, scrollDown);
  }, []);

  const [scale, setScale] = React.useState(1);

  const [{ clientX, clientY }, setClient] = React.useState({
    clientX: 0,
    clientY: 0,
  });

  const [overflow, setOverflow] = React.useState("scroll");

  const [{ translateX, translateY }, setTranslate] = React.useState({
    translateX: 0,
    translateY: 0,
  });

  const getColor = {
    0: "#FFFFFF",
    1: "#F24607",
    2: "#D907A1",
    3: "#AAAAAA",
    4: "#666666",
    5: "#C4F27E",
    6: "#49D3F2",
  };
  const gerBorderColor = {
    0: "#000000",
    1: "#000000",
    2: "#000000",
    3: "#AAAAAA",
    4: "#000000",
    5: "#C4F27E",
    6: "#49D3F2",
  };
  const drawMap = (ctx) => {
    let x = 0,
      y = 0,
      count = 1;
    lands.map((land) => {
      ctx.fillStyle = getColor[land?.type];
      ctx.fillRect(x, y, blockSize, blockSize);
      ctx.strokeStyle = gerBorderColor[land?.type];
      ctx.strokeRect(x, y, blockSize - 1, blockSize - 1);
      if (count == 104) {
        y += blockSize;
        x = 0;
        count = 0;
      } else {
        x += blockSize;
      }
      count++;
    });
  };

  const draw = useCallback((ctx) => {
    console.log("draw");
    context.clearRect(0, 0, canvas.width, canvas.height);
    // context.translate(position.x,position.y);
    drawMap(ctx);
  }, []);

  useEffect(() => {
    canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
    context.scale(scale, scale);
    draw(context);
  }, [draw, scale]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "60vh",
        overflow,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          border: "2px solid tomato",
          cursor: "grab",
          //   height: canvasSize,
          //   width: canvasSize,
          boxShadow: `${createShadow(shadowSize)}, ${createShadow(
            -shadowSize
          )}`,
          backgroundImage: `
            linear-gradient(45deg, #ccc 25%, transparent 25%),
            linear-gradient(-45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%),
            linear-gradient(-45deg, #eee 75%, #ccc 75%)`,
          backgroundSize: `20px 20px`,
          backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
          transform: `scale(${scale}, ${scale}) translate(${translateX}px, ${translateY}px)`,
          transformOrigin: "0 0",
        }}
        onDragStart={(e) => {
          const preview = document.createElement("div");
          preview.style.display = "none";
          e.dataTransfer.setDragImage(preview, 0, 0);

          setClient({ clientX: e.clientX, clientY: e.clientY });
        }}
        onDrag={(e) => {
          if (e.clientX && e.clientY) {
            const deltaX = (clientX - e.clientX) / dragInertia;
            const deltaY = (clientY - e.clientY) / dragInertia;

            containerRef.current.scrollBy(deltaX, deltaY);
          }
        }}
        draggable
        onWheel={(e) => {
          if (e.deltaY > 0) {
            if (scale === 1) {
              setOverflow("hidden");
            }
            if (scale > 1) {
              setScale(scale - zoomBy);
            }
          } else {
            setScale(scale + zoomBy);
          }
        }}
      />
    </div>
  );
};

export default Canvas;
