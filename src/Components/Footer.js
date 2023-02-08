import React from "react";

const Footer = (props) => {
    // const today = new Date() ;
    const { length } = props;

    return (
        <footer>
            {/* <p>Copyright &copy; {today.getFullYear()}</p> */}
            <p>
                {length} List {length === 0 ? "item" : "items"}
            </p>
        </footer>
    );
};

export default Footer;
