import styles from "./reviews.module.scss";
// import room from "../../assets/imgs/room.png";

export default function Reviews() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.block1}>
                <p>комнаты</p>
            </div>
            <div className={styles.block2}>
                <p>кухни</p>
            </div>
            <div className={styles.block3}>
                <p>ванные</p>
            </div>
            <div className={styles.block4}>
                <p>балконы </p>
            </div>
        </div>
    );
}
