import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { StoreProvider } from "../hooks/useGlobalReducer";

export const Layout = () => {
    return (
        <StoreProvider>
            <ScrollToTop>
                <Navbar />
                <Outlet />
                <Footer />
            </ScrollToTop>
        </StoreProvider>
    );
};