// /* eslint-disable react/prop-types */
// import React, { useState, useEffect } from "react";
// import {
//     Link,
//     Element,
//     Events,
//     animateScroll as scroll,
//     scrollSpy,
// } from "react-scroll";
// import { useSpring, animated } from "react-spring";

// const Section = ({ name, children }) => {
//     return (
//         <Element name={name} className="section">
//             {children}
//         </Element>
//     );
// };

// const FullPageScroll = ({ children }) => {
//     const sections = React.Children.map(children, (child) => {
//         if (child.type === Section) {
//             return child.props.name;
//         }
//         return null;
//     }).filter(Boolean);

//     const [currentSection, setCurrentSection] = useState(0);

//     const handleSetActive = (to) => {
//         setCurrentSection(to);
//     };

//     const handleScroll = (deltaY) => {
//         const newSection = currentSection - deltaY;

//         if (newSection >= 0 && newSection < sections.length) {
//             setCurrentSection(newSection);
//             scroll.scrollTo(newSection);
//         }
//     };

//     useEffect(() => {
//         Events.scrollEvent.register("begin", handleSetActive);
//         scrollSpy.update();
//         window.addEventListener("wheel", (e) => handleScroll(e.deltaY));

//         return () => {
//             Events.scrollEvent.remove("begin");
//             window.removeEventListener("wheel", (e) => handleScroll(e.deltaY));
//         };
//     }, [currentSection]);

//     const springProps = useSpring({
//         transform: `translate3d(0, -${currentSection * 100}%, 0)`,
//     });

//     return (
//         <div className="full-page-scroll">
//             <ul className="navigation">
//                 {sections.map((section, index) => (
//                     <li key={index}>
//                         <Link
//                             activeClass="active"
//                             to={section}
//                             spy={true}
//                             smooth={true}
//                             duration={500}
//                         >
//                             {section}
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//             <animated.div className="scroll-content" style={springProps}>
//                 {children}
//             </animated.div>
//         </div>
//     );
// };

// export { FullPageScroll, Section };
