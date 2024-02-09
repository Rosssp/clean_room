import styles from "./services.module.scss";
import ServicesCard from "../../components/ServicesCard/ServicesCard";

import him from "../../assets/imgs/him.png";
import afterRemont from "../../assets/imgs/afterRemont.png";
import general from "../../assets/imgs/general1.png";
import regular from "../../assets/imgs/regular.png";
import eco from "../../assets/imgs/eco.png";
import cottage from "../../assets/imgs/cottage.png";
import { useEffect, useRef, useState } from "react";

export default function Services() {
    const [isHover, setIsHover] = useState(false);
    const card = useRef(null);
    useEffect(() => {}, []);

    return (
        <div className={styles.wrapper}>
            {/* <h2>услуги —</h2> */}
            <div className={styles.cards}>
                <ServicesCard
                    img={regular}
                    title={"Регулярная уборка квартиры"}
                    price={"1.600"}
                />
                <ServicesCard
                    img={general}
                    title={"Генеральная уборка квартиры"}
                    price={"5.000"}
                />
                <ServicesCard
                    img={afterRemont}
                    title={"Уборка после ремонта"}
                    price={"7.200"}
                />
                <ServicesCard
                    img={cottage}
                    title={"Уборка частного дома или коттеджа"}
                    price={"9.600"}
                />
                <ServicesCard
                    img={him}
                    title={"Химчистка мягкой мебели"}
                    price={"3.000"}
                />
                <ServicesCard img={eco} title={"Эко-уборка"} price={"2.200"} />
            </div>
        </div>
    );
}
