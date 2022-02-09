import Swap from "../swap/swap";

function WebflowContainer(react) {
    


    return (
        <>
            <div className="hero-swap-page">
                <div dataCollapse="medium" dataAnimation="over-right" dataDuration="400" role="banner" className="navbar w-nav">
                    <div className="nav-container">
                        <a href="index.html" className="brand w-nav-brand"><img src="images/Teneo_Logo_red.svg" loading="lazy" alt="" className="teneo-logo" /></a>
                        <nav role="navigation" className="nav-menu w-nav-menu">
                            <a href="token-sale.html" className="nav-link w-nav-link">Token Sale</a>
                            <a href="#" className="nav-link w-nav-link">Technology</a>
                            <a href="#" className="nav-link w-nav-link">Team</a>
                            <a href="#" className="nav-link w-nav-link">Roadmap</a>
                            <a href="#" className="nav-link w-nav-link">Swap</a>
                            <a href="#" className="nav-link w-nav-link">Whitepaper</a>
                            <a href="#" className="button-outline tablet-and-below w-button">Connect Wallet</a>
                        </nav>
                        <a href="#" className="button-outline dektop-and-above w-button">Connect Wallet</a>
                        <div className="menu-button w-nav-button">
                            <div className="icon w-icon-nav-menu"></div>
                        </div>
                    </div>
                    <div className="container w-container"></div>
                </div>
                <Swap />
            </div>
            <footer className="footer">
                <div dataCollapse="none" dataAnimation="default" dataDuration="400" role="banner" className="navbar-footer w-nav">
                    <div className="nav-container-footer">
                        <a href="index.html" className="brand-footer w-nav-brand"><img src="images/Teneo_Logo_red.svg" loading="lazy" alt="" className="teneo-logo-footer" /></a>
                        <nav role="navigation" className="nav-menu-footer w-nav-menu">
                            <a href="token-sale.html" className="nav-link-footer w-nav-link">Token Sale</a>
                            <a href="#" className="nav-link-footer w-nav-link">Teneo explained</a>
                            <a href="#" className="nav-link-footer w-nav-link">Team</a>
                            <a href="#" className="nav-link-footer w-nav-link">Roadmap</a>
                            <a href="#" className="nav-link-footer w-nav-link">Swap</a>
                            <a href="#" className="nav-link-footer w-nav-link">Dashboard</a>
                        </nav>
                        <a href="#" className="button-blue w-button">Download Whitepaper</a>
                        <div className="w-nav-button">
                            <div className="icon w-icon-nav-menu"></div>
                        </div>
                    </div>
                </div>
                <div className="separator"></div>
                <div className="footer-copyright-and-social-wrapper">
                    <div className="footer-text">© 2021 Developed by App Innovators.</div>
                    <div className="social-links-wrapper">
                        <a href="#" className="social-links w-inline-block"><img src="images/Icon-awesome-twitter.svg" loading="lazy" alt="" /></a>
                        <a href="#" className="social-links w-inline-block"><img src="images/Icon-awesome-telegram-plane.svg" loading="lazy" alt="" /></a>
                        <a href="#" className="social-links w-inline-block"><img src="images/Icon-awesome-discord.svg" loading="lazy" alt="" /></a>
                    </div>
                </div>
            </footer>
            <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=60473019017e7439d312ac2c" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossOrigin="anonymous"></script>
            <script src="%PUBLIC_URL%/js/webflow.js" type="text/javascript"></script>
            <div dangerouslySetInnerHTML={{ __html: '<!-- [if lte IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/placeholders/3.0.2/placeholders.min.js"></script><![endif] -->' }}></div>
        </>
    )
}

export default WebflowContainer;