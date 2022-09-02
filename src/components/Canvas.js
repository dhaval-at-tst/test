import React, { useRef, useEffect, useState, useCallback } from "react";
import lands from "./lands.json";


console.log(lands);

const Canvas = (props) => {
    const canvasRef = useRef(null);
    let canvas;
    let context;

    let x, y;
    x = y = 0;

    const from = {
        x: 0,
        y: 0,
        set(x_, y_) {
            this.x = x_;
            this.y = y_;
        }
    }

    const to = {
        x: 0,
        y: 0,
        set(x_, y_) {
            this.x = x_;
            this.y = y_;
        }
    }

    const test = {
        x: 0,
        y: 0,
        set(x_, y_) {
            this.x = x_;
            this.y = y_;
        }
    }

    const position = {
        x: 0,
        y: 0,
        set(x_, y_) {
            this.x = x_;
            this.y = y_;
        },
        update(x_, y_) {
            this.x += x_;
            this.y += y_;
        }
    }

    let numBlocksInRow = 100;
    let numBlocksInColumn = 100;
    let blockSize = 32;
    let scale = 1;

    const dragMap = e => {
        console.log(e.clientX);
        test.set(e.clientX,e.clientY);
        
    }

    const handlerMouseDown = (e) => {

        console.log(e);
        let canvas = document.getElementsByTagName('canvas')[0]
        canvas.style.cursor = 'move'
        canvas.addEventListener('mousemove', dragMap);

        
        
        // const target = e.target;

        // // Get the bounding rectangle of target
        // const rect = target.getBoundingClientRect();

        // // Mouse position
        // x = e.clientX;
        // y = e.clientY;

        

        // position.set(x,y);

    }
    const handlerMouseUp = () =>{
        let canvas = document.getElementsByTagName('canvas')[0]
        canvas.style.cursor = 'pointer'
        canvas.removeEventListener('mousemove', dragMap);
    }


    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

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
        // console.log('drawmap');
        let x = test.x, y = test.y,count = 1;
        lands.map(land => {
            ctx.fillStyle = getColor[land?.type];
            ctx.fillRect(
                x,
                y,
                blockSize,
                blockSize
            );
            ctx.strokeStyle = gerBorderColor[land?.type]
            ctx.strokeRect(x, y, blockSize - 1, blockSize - 1);
            if (count == 104) {
                y += blockSize;
                x = test.x;
                count = 0;
            } else {
                x += blockSize;
            }
            count++;
        });
    }

    const draw = useCallback(ctx => {
        console.log('draw');
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawMap(ctx);

    }, [])



    const drawBox = ctx => {
        ctx.fillStyle = "white";
        ctx.fillRect(test.x,test.y,100,100);
    }

    function animate(params) {
        requestAnimationFrame(animate);
        context.setTransform(1, 0, 0, 1, 0, 0);        
        context.clearRect(0, 0, canvas.width, canvas.height);   
        draw(context);
        // drawBox(context);
    }



    useEffect(() => {
        canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        context = canvas.getContext("2d");
        //Our draw come here
        context.scale(scale, scale);
        animate();
        // draw(context);

    }, [draw]);

    return <canvas ref={canvasRef}
        // onClick={handlerClick}
        onMouseDown={handlerMouseDown}
        onMouseUp={handlerMouseUp}
        // onDoubleClick={handlerDoubleClick}
        // onWheel={handlerWheel}
        // onMouseMove={handlerMouseMove}
        {...props} />;
};

export default Canvas;
