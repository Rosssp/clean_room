import { useState } from "react";
import styles from "./input.module.scss";
import classNames from "classnames";
import ReactInputMask from "react-input-mask";

export default function Input({ phone, ...props }) {
    const [isFocused, setIsFocused] = useState(false);
    const handleInputFocus = () => {
        setIsFocused(true);
    };
    const handleInputBlur = () => {
        setIsFocused(false);
    };

    return (
        <div
            className={classNames(styles.input, styles[isFocused && "focused"])}
        >
            {phone ? (
                <ReactInputMask
                    mask="+7 (999) 999-99-99"
                    maskChar=" "
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    {...props}
                >
                    {(inputProps) => (
                        <input
                            placeholder="+7 (999) 999-99-99"
                            autoComplete="off"
                            {...inputProps}
                        />
                    )}
                </ReactInputMask>
            ) : (
                <input
                    {...props}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                />
            )}
        </div>
    );
}
