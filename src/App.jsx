import Spacer from "./components/Spacer/Spacer";
import Main from "./layout/Main/Main";
import styles from "./app.module.scss";
import Services from "./layout/Services/Services";
// import Calculator from "./layout/Calculator/Calculator";

// import React from "react";
// import Fullpage, { FullPageSections, FullpageSection } from "react-fullpage";

// const sections = [
//     {
//         backgroundColor: "#f0f0f0",
//         content: "Section 1",
//         /* Добавьте ваш контент для первой секции */
//     },
//     {
//         backgroundColor: "#d0d0d0",
//         content: "Section 2",
//         /* Добавьте ваш контент для второй секции */
//     },
//     {
//         backgroundColor: "#d0d0d0",
//         content: "Section 3",
//         /* Добавьте ваш контент для второй секции */
//     },
// ];

function App() {
    return (
        // <div>
        //     <Fullpage>
        //         <FullPageSections>
        //             {sections.map((section, index) => (
        //                 <FullpageSection
        //                     key={index}
        //                     color={section.backgroundColor}
        //                 >
        //                     {section.content}
        //                 </FullpageSection>
        //             ))}
        //         </FullPageSections>
        //     </Fullpage>
        // </div>
        <div className={styles.wrapper}>
            <Spacer size={114} />
            <Main />
            <Spacer size={114} />
            <Services />
            <Spacer size={114} />
            {/* <Calculator /> */}
        </div>
    );
}

export default App;
