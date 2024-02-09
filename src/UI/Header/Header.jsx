import styles from "./Header.module.scss";
import Vk from "../../assets/imgs/VK.svg";
import TG from "../../assets/imgs/TG.svg";
import WH from "../../assets/imgs/WHATS.svg";

export default function Header() {
    const menu = [
        {
            href: "https://vk.com/audios323686792?q=порно%20рассказы&section=all",
            img: Vk,
        },
        {
            href: "https://vk.com/audios323686792?q=порно%20рассказы&section=all",
            img: TG,
        },
        {
            href: "https://vk.com/audios323686792?q=порно%20рассказы&section=all",
            img: WH,
        },
        {
            href: "",
            phone: "+7 951 535-55-13",
        },
    ];
    return (
        <header className={styles.wrapper}>
            <div className="main_wrapp">
                <div className={styles.logo}>
                    <a href="#">CleanROOM</a>
                </div>
                <ul>
                    {menu?.map((item) => (
                        <>
                            {item?.img && (
                                <li>
                                    <a
                                        target="_blank"
                                        href={`${item?.href}`}
                                        rel="noreferrer"
                                    >
                                        <img src={`${item?.img}`} />
                                    </a>
                                </li>
                            )}
                        </>
                    ))}
                    <li className={styles.phone}>
                        <a>{menu[3]?.phone}</a>
                    </li>
                </ul>
            </div>
        </header>
    );
}
