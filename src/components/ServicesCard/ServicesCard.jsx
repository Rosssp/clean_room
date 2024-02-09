import styles from "./servicesCard.module.scss";

export default function ServicesCard({ imgWidth, title, price, img }) {
    return (
        <div className={styles.wrapper}>
            <h3>{title}</h3>
            <div className={styles.image}>
                <h3 className={styles.imgTitle}>{title}</h3>
                <p className={styles.imgPrice}>
                    от <br /> {price} <br /> руб
                </p>
                <img src={`${img}`} alt="" />
            </div>
            <p>
                от <br /> {price} <br /> руб
            </p>
        </div>
    );
}
