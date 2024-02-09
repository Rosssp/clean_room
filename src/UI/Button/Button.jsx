import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./button.module.scss";

export default function Button({ children }) {
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);

    const btn = useRef(null);

    useEffect(() => {
        btn.current.addEventListener("mouseenter", (e) => {
            let divRect = btn.current.getBoundingClientRect();
            let relX = e.clientX - divRect.left;
            let relY = e.clientY - divRect.top;
            setTop(relY);
            setLeft(relX);
        });
    }, []);
    return (
        <button ref={btn} className={styles.wrapper}>
            {children}
            <span
                style={{ top: `${top}px`, left: `${left}px` }}
                className={styles.hover}
            ></span>
        </button>
    );
}
