import { useState, useEffect } from "react";
import classNames from "classnames";
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm";
import arrow from "../../assets/imgs/arrow.svg";
import styles from "./calculator.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const costData = {
    1: [1400, 4400, 6600],
    2: [2000, 5400, 7600],
    3: [2600, 7000, 8700],
    4: [3700, 8700, 10300],
    5: [9000, 14250, 15750],
};

const typeCleaning = ["Регулярная", "Генеральная", "После ремонта"];

const defaultSwiperState = 0;

export default function Calculator() {
    const [rooms, setRooms] = useState(1);
    console.log(rooms);
    const [cost, setCost] = useState(costData[1][0]);
    const [swiperState, setSwiper] = useState(defaultSwiperState);
    const [squareMeters, setSquareMeters] = useState(150);

    const handleRoomClick = (number) => {
        setRooms(parseInt(number));
        setCost(costData[number][swiperState]);
    };

    const updateCost = (sqm) => {
        if (rooms === 5) {
            const calculatedCost =
                costData[rooms][swiperState] +
                (sqm - 150) *
                    (swiperState === 1 ? 149 : swiperState === 2 ? 159 : 64);

            if (sqm >= 150) {
                setCost(calculatedCost);
            } else {
                setCost(costData[rooms][swiperState]);
            }
        } else if (!isNaN(sqm) && sqm >= 150) {
            setCost(costData[rooms][swiperState]);
        }
    };

    const handleSquareMetersChange = (e) => {
        const sqm = parseInt(e.target.value);
        setSquareMeters(sqm);
        updateCost(sqm);
    };

    useEffect(() => {
        if (squareMeters) updateCost(squareMeters);
    }, [swiperState, rooms, squareMeters]);

    return (
        <div className={classNames("main_wrapp", styles.wrapper)}>
            <div className={styles.left}>
                <div className={styles.top}>
                    <div className={styles.rooms}>
                        <p>количество комнат:</p>
                        <ul>
                            {Object.keys(costData).map((number) => (
                                <li
                                    key={number}
                                    onClick={() => handleRoomClick(number)}
                                    className={
                                        rooms === parseInt(number) &&
                                        styles.selected
                                    }
                                >
                                    <p>{number}</p>
                                    {number > 4 && <p>{"+"}</p>}
                                </li>
                            ))}
                        </ul>
                        {rooms === 5 && (
                            <div className={styles.input}>
                                <input
                                    type="number"
                                    id="squareMeters"
                                    min="150"
                                    placeholder="150"
                                    value={squareMeters}
                                    onChange={handleSquareMetersChange}
                                />
                                <p>M²</p>
                            </div>
                        )}
                    </div>
                    <div className={styles.changePlan}>
                        <p>тип уборки:</p>
                        <div className={styles.sliderWrapper}>
                            <Swiper
                                onSlideChange={(swiper) => {
                                    setSwiper(swiper?.activeIndex);
                                }}
                                spaceBetween={0}
                                slidesPerView={1}
                                draggable={false}
                                navigation={{
                                    nextEl: ".arrowRight",
                                    prevEl: ".arrowLeft",
                                    lockClass: "disabled",
                                }}
                                modules={[Navigation]}
                                className={styles.slider}
                            >
                                {typeCleaning.map((item) => (
                                    <SwiperSlide key={item}>
                                        <p>{item}</p>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className={styles.arrows}>
                                <div
                                    className={classNames(
                                        `arrowLeft`,
                                        styles.arrowLeft
                                    )}
                                >
                                    <img
                                        className={styles.arrow}
                                        src={arrow}
                                        alt="Left Arrow"
                                    />
                                </div>
                                <div
                                    className={classNames(
                                        `arrowRight`,
                                        styles.arrowRight
                                    )}
                                >
                                    <img
                                        className={styles.arrow}
                                        src={arrow}
                                        alt="Right Arrow"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <FeedbackForm cost={cost} />
            </div>
        </div>
    );
}
