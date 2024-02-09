import cn from "classnames";
import Button from "../../UI/Button/Button";
// import Reviews from "../../UI/Reviews/Reviews";
import styles from "./main.module.scss";
import sofa from "../../assets/imgs/sofa.png";
import poofik from "../../assets/imgs/poofik.png";
import lamp from "../../assets/imgs/lamp.svg";

export default function Main() {
    return (
        <>
            <div>
                <div className={cn("main_wrapp", styles.wrapper)}>
                    <div className={styles.layout}>
                        <div className={styles.left}>
                            <p className={styles.left__title}>
                                Чистая квартира за 4 часа
                            </p>
                            <ul>
                                <li>
                                    <p>100% гарантия</p>
                                </li>
                                <li>
                                    <p>Оплата — после уборки</p>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.center}>
                            <h1>Дышите свободно</h1>
                            <h3>
                                оформите <span>заявку</span>
                                <br />и получите&nbsp;
                                <span>скидку 10%</span>
                            </h3>
                            <Button>
                                <p>Заказать</p>
                            </Button>
                        </div>
                        <div className={styles.right}>
                            <ul>
                                <li>
                                    <p>Выполним особые поручения</p>
                                </li>
                                <li>
                                    <p>Гарантируем качество уборки</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.bgg}>
                    <div className={cn(styles.bg, styles.leftLamp)}>
                        <img src={lamp} alt="lamp" />
                    </div>
                    <div className={cn(styles.bg)}></div>
                    <div className={cn(styles.bg)}></div>
                    <div className={cn(styles.bg, styles.sofa)}>
                        <img src={sofa} alt="sofa" />
                    </div>
                    <div className={cn(styles.bg, styles.poofik)}>
                        <img src={poofik} alt="poofik" />
                    </div>
                </div>
            </div>
        </>
    );
}
