import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

function Header() {

    const { theme } = useContext(ThemeContext);
    return (
        <div className="padT4 padB4">
            <div className="container mobile-container">
                <div className="d-flex justify-content-between">
                    <div>
                        <img
                            alt="SVCC Home PAge"
                            src="/images/SVCCLogo.png"
                        ></img>
                    </div>
                    <div className="light">
                        <h4 className="header-title">
                            Silicon Valley Code Camp
                        </h4>
                    </div>
                    <div className={theme === "light" ? "" : "text-info"}>
                        Hello kneelace &nbsp;&nbsp;
                        <span>
                            <a href="#">Sign Out</a>
                        </span>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;