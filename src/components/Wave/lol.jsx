import { useEffect, useRef } from "react";

const config = {
    waveSpeed: 0.02,
    wavesToBlend: 4,
    curvesNum: 25,
};

function generateRandomAngle() {
    return Math.random() * 360;
}

function generateRandomWaveSet(requiredWaves) {
    return Array.from({ length: requiredWaves }, generateRandomAngle);
}

function getBlendedWave(waveSet) {
    const blendedWave = waveSet.reduce((acc, angle) => {
        return acc + Math.sin((angle / 180) * Math.PI);
    }, 0);
    return (blendedWave / waveSet.length + 1) / 2;
}

export default function Wave() {
    const canvasRef = useRef(null);
    const size = useRef({
        w: 0,
        h: 0,
    });
    const controls = useRef([]);
    const controlsNum = useRef(3);

    useEffect(() => {
        const cnv = canvasRef.current;
        const ctx = cnv.getContext("2d");

        const setCanvasSize = () => {
            size.current.w = cnv.width = window.innerWidth;
            size.current.h = cnv.height = window.innerHeight;
        };

        setCanvasSize();
        const handleResize = () => {
            setCanvasSize();
        };
        window.addEventListener("resize", handleResize);

        const createControls = () => {
            for (let i = 0; i < controlsNum.current + config.curvesNum; ++i) {
                controls.current.push({
                    waveSet: generateRandomWaveSet(config.wavesToBlend),
                });
            }
        };
        createControls();

        const updateCurves = () => {
            let c = controls.current;
            const controlX1 = getBlendedWave(c[0].waveSet) * size.current.w;
            const controlY1 = getBlendedWave(c[1].waveSet) * size.current.h;
            const controlX2 = getBlendedWave(c[2].waveSet) * size.current.w;

            for (let i = 0; i < config.curvesNum; ++i) {
                const controlY2 = getBlendedWave(c[3 + i].waveSet);

                let curveParam = {
                    startX: (((size.current.w * 2) / config.curvesNum) * i) / 4,
                    // startY: (size.current.h / config.curvesNum) * i * 64,
                    startY: (size.current.h / 25) * config.curvesNum,
                    controlX1: controlX1,
                    controlY1: controlY1,
                    controlX2: controlX2,
                    controlY2: controlY2 * size.current.h,
                    endX: size.current.w,
                    endY: ((size.current.h / config.curvesNum) * i) / 2,
                    alpha: controlY2,
                };
                drawCurve(curveParam);
            }
        };

        const drawCurve = ({
            startX,
            startY,
            controlX1,
            controlY1,
            controlX2,
            controlY2,
            endX,
            endY,
            alpha,
        }) => {
            ctx.strokeStyle = `rgba(0,0,0,${alpha / 1.5})`;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.bezierCurveTo(
                controlX1,
                controlY1,
                controlX2,
                controlY2,
                endX,
                endY
            );
            ctx.lineWidth = 3;
            ctx.stroke();
        };

        const updateCanvas = () => {
            ctx.fillStyle = `white`;
            ctx.fillRect(0, 0, size.current.w, size.current.h);
        };
        const updateControls = () => {
            controls.current.forEach((e) => {
                e.waveSet.forEach((angle, i) => {
                    let r = Math.random() * (i + 1) * config.waveSpeed;
                    e.waveSet[i] = (angle + r) % 360;
                });
            });
        };
        const updateAnimation = () => {
            updateCanvas();
            updateCurves();
            updateControls();
            requestAnimationFrame(updateAnimation);
        };
        updateAnimation();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} />;
}

// import { useEffect, useRef } from "react";

// const config = {
//     waveSpeed: 0.02,
//     wavesToBlend: 4,
//     curvesNum: 25,
// };

// function generateRandomAngle() {
//     return Math.random() * 360;
// }

// function generateRandomWaveSet(requiredWaves) {
//     return Array.from({ length: requiredWaves }, generateRandomAngle);
// }

// function getBlendedWave(waveSet) {
//     const blendedWave = waveSet.reduce((acc, angle) => {
//         return acc + Math.sin((angle / 180) * Math.PI);
//     }, 0);
//     return (blendedWave / waveSet.length + 1) / 2;
// }

// export default function Wave() {
//     const canvasRef = useRef(null);
//     const size = useRef({
//         w: 0,
//         h: 0,
//     });
//     const controls = useRef([]);
//     const controlsNum = useRef(3);

//     useEffect(() => {
//         const cnv = canvasRef.current;
//         const ctx = cnv.getContext("2d");

//         const setCanvasSize = () => {
//             size.current.w = cnv.width = window.innerWidth;
//             size.current.h = cnv.height = window.innerHeight;
//         };

//         setCanvasSize();
//         const handleResize = () => {
//             setCanvasSize();
//         };
//         window.addEventListener("resize", handleResize);

//         const createControls = () => {
//             for (let i = 0; i < controlsNum.current + config.curvesNum; ++i) {
//                 controls.current.push({
//                     waveSet: generateRandomWaveSet(config.wavesToBlend),
//                 });
//             }
//         };
//         createControls();

//         const updateCurves = () => {
//             let c = controls.current;
//             const controlX1 = getBlendedWave(c[0].waveSet) * size.current.w;
//             const controlY1 = getBlendedWave(c[1].waveSet) * size.current.h;
//             const controlX2 = getBlendedWave(c[2].waveSet) * size.current.w;

//             for (let i = 0; i < config.curvesNum; ++i) {
//                 const controlY2 = getBlendedWave(c[3 + i].waveSet);

//                 let curveParam = {
//                     startX: (((size.current.w * 2) / config.curvesNum) * i) / 4,
//                     // startY: (size.current.h / config.curvesNum) * i * 64,
//                     startY: (size.current.h / 25) * config.curvesNum,
//                     controlX1: controlX1,
//                     controlY1: controlY1,
//                     controlX2: controlX2,
//                     controlY2: controlY2 * size.current.h,
//                     endX: size.current.w,
//                     endY: ((size.current.h / config.curvesNum) * i) / 2,
//                     alpha: controlY2,


//  let curveParam = {
//                     startX: (size.current.w * i) / 60,
//                     // startY: (size.current.h / config.curvesNum) * i * 64,
//                     startY: (size.current.h * 5) / 5,
//                     controlX1: controlX1,
//                     controlY1: controlY1,
//                     controlX2: controlX2,
//                     controlY2: controlY2 * size.current.h,
//                     endX: size.current.w,
//                     endY: (size.current.h * i) / 50,
//                     alpha: controlY2,
//                 };
//                 drawCurve(curveParam);
//                 };
//                 drawCurve(curveParam);
//             }
//         };

//         const drawCurve = ({
//             startX,
//             startY,
//             controlX1,
//             controlY1,
//             controlX2,
//             controlY2,
//             endX,
//             endY,
//             alpha,
//         }) => {
//             ctx.strokeStyle = `rgba(0,0,0,${alpha / 1.5})`;
//             ctx.beginPath();
//             ctx.moveTo(startX, startY);
//             ctx.bezierCurveTo(
//                 controlX1,
//                 controlY1,
//                 controlX2,
//                 controlY2,
//                 endX,
//                 endY
//             );
//             ctx.lineWidth = 3;
//             ctx.stroke();
//         };

//         const updateCanvas = () => {
//             ctx.fillStyle = `white`;
//             ctx.fillRect(0, 0, size.current.w, size.current.h);
//         };
//         const updateControls = () => {
//             controls.current.forEach((e) => {
//                 e.waveSet.forEach((angle, i) => {
//                     let r = Math.random() * (i + 1) * config.waveSpeed;
//                     e.waveSet[i] = (angle + r) % 360;
//                 });
//             });
//         };
//         const updateAnimation = () => {
//             updateCanvas();
//             updateCurves();
//             updateControls();
//             requestAnimationFrame(updateAnimation);
//         };
//         updateAnimation();

//         return () => {
//             window.removeEventListener("resize", handleResize);
//         };
//     }, []);

//     return <canvas ref={canvasRef} />;
// }










import { useEffect, useRef } from "react";

const config = {
    waveSpeed: 0.05,
    wavesToBlend: 4,
    curvesNum: 25,
};

function generateRandomAngle() {
    return Math.random() * 360;
}

function generateRandomWaveSet(requiredWaves) {
    return Array.from({ length: requiredWaves }, generateRandomAngle);
}

function getBlendedWave(waveSet) {
    const blendedWave = waveSet.reduce((acc, angle) => {
        return acc + Math.sin((angle / 180) * Math.PI);
    }, 0);
    return (blendedWave / waveSet.length + 1) / 2;
}

export default function Wave() {
    const canvasRef = useRef(null);
    const size = useRef({
        w: 0,
        h: 0,
    });
    const controls = useRef([]);
    const controlsNum = useRef(3);

    useEffect(() => {
        const cnv = canvasRef.current;
        const ctx = cnv.getContext("2d");

        const setCanvasSize = () => {
            size.current.w = cnv.width = window.innerWidth;
            size.current.h = cnv.height = window.innerHeight;
        };

        setCanvasSize();
        const handleResize = () => {
            setCanvasSize();
        };
        window.addEventListener("resize", handleResize);

        const createControls = () => {
            for (let i = 0; i < controlsNum.current + config.curvesNum; ++i) {
                controls.current.push({
                    waveSet: generateRandomWaveSet(config.wavesToBlend),
                });
            }
        };
        createControls();

        const updateCurves = () => {
            let c = controls.current;
            const controlX1 = getBlendedWave(c[0].waveSet) * size.current.w;
            const controlY1 = getBlendedWave(c[1].waveSet) * size.current.h;
            const controlX2 = getBlendedWave(c[2].waveSet) * size.current.w;

            for (let i = 0; i < config.curvesNum; ++i) {
                const controlY2 = getBlendedWave(c[3 + i].waveSet);

                let curveParam = {
                    startX: (((size.current.w * 2) / config.curvesNum) * i) / 4,
                    // startY: (size.current.h / config.curvesNum) * i * 64,
                    startY: (size.current.h / 25) * config.curvesNum,
                    controlX1: controlX1,
                    controlY1: controlY1,
                    controlX2: controlX2,
                    controlY2: controlY2 * size.current.h,
                    endX: size.current.w,
                    endY: ((size.current.h / config.curvesNum) * i) / 2,
                    alpha: controlY2,
                };
                drawCurve(curveParam);
            }
        };

        const drawCurve = ({
            startX,
            startY,
            controlX1,
            controlY1,
            controlX2,
            controlY2,
            endX,
            endY,
            alpha,
        }) => {
            ctx.strokeStyle = `rgba(0,0,0,${alpha / 1.5})`;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.bezierCurveTo(
                controlX1,
                controlY1,
                controlX2,
                controlY2,
                endX,
                endY
            );
            ctx.lineWidth = 3;
            ctx.stroke();
        };

        const updateCanvas = () => {
            ctx.fillStyle = `white`;
            ctx.fillRect(0, 0, size.current.w, size.current.h);
        };
        const updateControls = () => {
            controls.current.forEach((e) => {
                e.waveSet.forEach((angle, i) => {
                    let r = Math.random() * (i + 1) * config.waveSpeed;
                    e.waveSet[i] = (angle + r) % 360;
                });
            });
        };
        const updateAnimation = () => {
            updateCanvas();
            updateCurves();
            updateControls();
            requestAnimationFrame(updateAnimation);
        };
        updateAnimation();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} />;
}








let curveParam = {
                    startX: (size.current.w * i) / 60,
                    startY: (size.current.h * 5) / 5,
                    controlX1: controlX1,
                    controlY1: controlY1,
                    controlX2: controlX2,
                    controlY2: controlY2 * size.current.h,
                    endX: size.current.w,
                    endY: (size.current.h * i) / config.curvesNum / 4,
                    alpha: controlY2,
                };