import { useEffect, useRef } from "react";
import styles from "./customCursor.module.scss";

export default function CustomCursor() {
    const mainCursor = useRef(null);
    const secondaryCursor = useRef(null);

    const parentCursor = useRef(null);
    const bgMainCursor = useRef(null);
    const bgSecondaryCursor = useRef(null);

    const hoverLinks = () => {
        bgMainCursor.current.style.transition = "all .4s ease 0s";
        bgSecondaryCursor.current.style.transition = "all .4s ease 0s";
        const links = document.getElementsByTagName("a");
        const buttons = document.getElementsByTagName("button");

        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener("mouseover", () => {
                bgMainCursor.current.style.transform = "scale(2)";
                bgSecondaryCursor.current.style.transform = "scale(2)";
                bgSecondaryCursor.current.style.opacity = "0";
                return;
            });
            links[i].addEventListener("mouseleave", () => {
                bgMainCursor.current.style.transform = "scale(1)";
                bgSecondaryCursor.current.style.transform = "scale(1)";
                bgSecondaryCursor.current.style.opacity = "1";
                return;
            });
        }
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("mouseover", () => {
                bgMainCursor.current.style.transform = "scale(2)";
                bgSecondaryCursor.current.style.transform = "scale(2)";
                bgSecondaryCursor.current.style.opacity = "0";
                return;
            });
            buttons[i].addEventListener("mouseleave", () => {
                bgMainCursor.current.style.transform = "scale(1)";
                bgSecondaryCursor.current.style.transform = "scale(1)";
                bgSecondaryCursor.current.style.opacity = "1";
                return;
            });
        }
    };
    //исчезание курсора
    useEffect(() => {
        hoverLinks();

        document.body.addEventListener("mouseout", () => {
            mainCursor.current.classList.add(`${styles.opacity}`);
            secondaryCursor.current.classList.add(`${styles.opacity}`);
        });
        document.body.addEventListener("mousemove", () => {
            mainCursor.current.classList.remove(`${styles.opacity}`);
            secondaryCursor.current.classList.remove(`${styles.opacity}`);
        });
        document.body.addEventListener("mouseenter", () => {
            mainCursor.current.classList.remove(`${styles.opacity}`);
            secondaryCursor.current.classList.remove(`${styles.opacity}`);
        });
    }, []);

    const positionRef = useRef({
        mouseX: 0,
        mouseY: 0,
        destX: 0,
        destY: 0,
        distX: 0,
        distY: 0,
        key: -1,
    });

    //position
    useEffect(() => {
        document.addEventListener("mousemove", (e) => {
            const { clientX, clientY } = e;
            const mouseX = clientX;
            const mouseY = clientY;

            //mainCurs
            mainCursor.current.style.transform = `translate3d(${
                mouseX - mainCursor.current.clientWidth / 2
            }px,${mouseY - mainCursor.current.clientHeight / 2}px,0)`;
            //secondCurs
            positionRef.current.mouseX =
                mouseX - secondaryCursor.current.clientWidth / 2;
            positionRef.current.mouseY =
                mouseY - secondaryCursor.current.clientHeight / 2;
        });
    }, []);

    //followSecondCursor
    useEffect(() => {
        const followMouse = () => {
            positionRef.current.key = requestAnimationFrame(followMouse);

            const { mouseX, mouseY, destX, destY, distX, distY } =
                positionRef.current;

            if (!destX || !destY) {
                positionRef.current.destX = mouseX;
                positionRef.current.destY = mouseY;
            } else {
                positionRef.current.distX = (mouseX - destX) * 0.06;
                positionRef.current.distY = (mouseY - destY) * 0.06;

                if (
                    Math.abs(positionRef.current.distX) +
                        Math.abs(positionRef.current.distY) <
                    0.01
                ) {
                    positionRef.current.destX = mouseX;
                    positionRef.current.destY = mouseY;
                } else {
                    positionRef.current.destX += distX;
                    positionRef.current.destY += distY;
                }
            }

            secondaryCursor.current.style.transform = `translate3d(${destX}px, ${destY}px, 0)`;
        };
        followMouse();
    }, []);

    return (
        <div className={styles.cursor_wrapper} ref={parentCursor}>
            <div className={styles.main_cursor} ref={mainCursor}>
                <div
                    className={styles.main_cursor_background}
                    ref={bgMainCursor}
                ></div>
            </div>
            <div
                className={`${styles.secondary_cursor} `}
                ref={secondaryCursor}
            >
                <div
                    className={styles.secondary_cursor_background}
                    ref={bgSecondaryCursor}
                ></div>
            </div>
        </div>
    );
}
