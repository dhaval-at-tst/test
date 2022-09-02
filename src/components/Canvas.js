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

    const handlerClick = (e) => {
        // context.clearRect(0, 0, canvas.width, canvas.height);
        // context.translate(x, y);
        // draw(context);
        // context.translate(-x, -y);
    }
    const handlerDoubleClick = (e) => {
        console.log()
        const target = e.target;

        // Get the bounding rectangle of target
        const rect = target.getBoundingClientRect();

        // Mouse position
        x = e.clientX - rect.width / 2;
        y = e.clientY - rect.height / 2;
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.strokeRect(0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, canvas.width, canvas.height);
        position.update(-x, -y);

        console.log('pos', position.x, position.y);
        context.translate(position.x, position.y);
        context.scale(scale, scale);
        draw(context);
    }
    const handlerMouseDown = (e) => {
        document.getElementsByTagName('canvas')[0].style.cursor = 'move'
        const target = e.target;

        // Get the bounding rectangle of target
        const rect = target.getBoundingClientRect();

        // Mouse position
        from.x = e.clientX - rect.left;
        from.y = e.clientY - rect.top;
    }
    const handlerMouseUp = (e) => {
        document.getElementsByTagName('canvas')[0].style.cursor = 'pointer'
        const target = e.target;

        // Get the bounding rectangle of target
        const rect = target.getBoundingClientRect();

        // Mouse position
        to.x = e.clientX - rect.left;
        to.y = e.clientY - rect.top;

        x = to.x - from.x;
        y = to.y - from.y;

        console.log(x, y);

        context.lineWidth = 2;
        context.lineWidth = "auto";
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.strokeRect(0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, canvas.width, canvas.height);
        position.update(x, y);

        console.log('pos', position.x, position.y);
        context.translate(position.x, position.y);
        context.scale(scale, scale);
        draw(context);
        // position.set(from.x,from.y);
    }

    const handlerWheel = (e) => {
        console.clear();
        console.log(e.deltaY > 0)
        scale = e.deltaY < 0 ? scale + 0.1 : scale - 0.1;
        console.log(scale);
        context.scale(scale, scale);
        draw(context);
        console.log(e.deltaX);
        console.log(e.deltaY);
        console.log(e.deltaZ);
        console.log(e.deltaMode);
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

    const draw = useCallback(ctx => {
        console.log('draw');
        context.clearRect(0, 0, canvas.width, canvas.height);
        let x = 0, y = 0;
        ctx.strokeStyle = 'transparent';

        //Our first draw
        ctx.fillStyle = "#F09819";
        // for (let i = 0; i < numBlocksInColumn; i++) {
        //     for (let j = 0; j < numBlocksInRow; j++) {

        //         ctx.fillStyle = colors[getRandomInt(colors.length)];

        //         ctx.fillRect(
        //             x,
        //             y,
        //             blockSize,
        //             blockSize
        //         );
        //         ctx.strokeRect(x, y, blockSize, blockSize);

        //     }
        //     x = 0;
        //     y += blockSize;
        // }
        // x = y = 0;

        // ctx.fillStyle = "#EDDE5D";
        // for (let i = 0; i < numBlocksInColumn; i++) {
        //     for (let j = 0; j < numBlocksInRow; j++) {
        //         if ((i + j) % 2 != 0) {
        //             ctx.fillRect(
        //                 x,
        //                 y,
        //                 blockSize,
        //                 blockSize
        //             );
        //             ctx.strokeRect(x, y, blockSize, blockSize);
        //         }
        //         x += blockSize;
        //     }
        //     x = 0;
        //     y += blockSize;
        // }
        let count = 1;
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
                x = 0;
                count = 0;
            } else {
                x += blockSize;
            }
            count++;

        });

    }, [])





    useEffect(() => {
        canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        context = canvas.getContext("2d");
        //Our draw come here
        context.scale(scale, scale);
        draw(context);
window.requestAnimationFrame(draw);

    }, [draw]);

    return <canvas ref={canvasRef}
        onClick={handlerClick}
        onMouseDown={handlerMouseDown}
        onMouseUp={handlerMouseUp}
        onDoubleClick={handlerDoubleClick}
        onWheel={handlerWheel}
        {...props} />;
};

export default Canvas;
