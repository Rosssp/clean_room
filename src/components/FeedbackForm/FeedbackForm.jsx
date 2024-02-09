import { useState } from "react";
import Input from "../../UI/Input/Input";
import styles from "./feedbackForm.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// eslint-disable-next-line react/prop-types
export default function FeedbackForm({ cost }) {
    // const modifiedCost = cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const modifiedCost = cost.toLocaleString();

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <p>к оплате:</p>
                <p className={styles.cost}>{modifiedCost} р</p>
            </div>
            <form className={styles.form}>
                <Input
                    placeholder={"Укажие имя"}
                    name={"name"}
                    type={"text"}
                    autoComplete="off"
                />
                <Input
                    placeholder={"+7 951 535 55 13"}
                    name={"phone"}
                    type={"phone"}
                    phone={true}
                />
                <div>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Дата уборки"
                    />
                </div>
            </form>
        </div>
    );
}
