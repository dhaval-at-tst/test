import React, { useRef, useEffect, useState } from "react";

const Canvas = (props) => {
    const canvasRef = useRef(null);

    let numBlocksInRow = 100;
    let numBlocksInColumn = 100;
    let blockSize = 32;

    const [ctx, setCtx] = useState();

    const zoomIn = () => {
        console.log(ctx);
        
        setCtx(prev => {
            const newCtx = {...prev}
            newCtx.scale(2, 2);
            return newCtx;
        });
    }
    if(ctx){
        ctx.strokeStyle = 'green';

        let x = 0, y = 0;

        //Our first draw
        ctx.fillStyle = "#F09819";
        for (let i = 0; i < numBlocksInColumn; i++) {
            for (let j = 0; j < numBlocksInRow; j++) {
                if ((i + j) % 2 == 0) {
                    ctx.fillRect(
                        x,
                        y,
                        blockSize,
                        blockSize
                    );
                    ctx.strokeRect(x, y, blockSize, blockSize);
                }
                x += blockSize;
            }
            x = 0;
            y += blockSize;
        }
        x = y = 0;

        ctx.fillStyle = "#EDDE5D";
        for (let i = 0; i < numBlocksInColumn; i++) {
            for (let j = 0; j < numBlocksInRow; j++) {
                if ((i + j) % 2 != 0) {
                    ctx.fillRect(
                        x,
                        y,
                        blockSize,
                        blockSize
                    );
                    ctx.strokeRect(x, y, blockSize, blockSize);
                }
                x += blockSize;
            }
            x = 0;
            y += blockSize;
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setCtx(canvas.getContext("2d"));

        

    }, []);

    return <canvas ref={canvasRef} onClick={zoomIn} {...props} />;
};

export default Canvas;
