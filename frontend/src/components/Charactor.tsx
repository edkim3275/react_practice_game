import React, { useEffect } from 'react';

type CharacterProps = {
    x: number;
    y: number;
}

const Character: React.FC<CharacterProps> = ({ x = 0, y = 0 }) => {

    // const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasRef = React.createRef<HTMLCanvasElement>();

    useEffect(() => {

        const draw = () => {

            if (!canvasRef.current) {
                return;
            }
            const canvas: HTMLCanvasElement = canvasRef.current;
            const context = canvas.getContext('2d');

            const image = new Image();
            image.src = require("../assets/Basic Charakter Actions.png");
            image.onload = () => {
                if (!context) {
                    return;
                }
                context.clearRect(x - 1, y + 1, 2 * image.width, 2 * image.height / 5.5);
                context.drawImage(image, 0, 0, image.width / 2, image.height / 11, x, y, 2 * image.width, 2 * image.height / 5.5);
            };

            requestAnimationFrame(draw);

        }

        draw();


    }, [canvasRef, x, y])

    return <canvas ref={canvasRef} />
}

export default Character;
