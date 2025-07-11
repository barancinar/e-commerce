import { createBrowserRouter, Navigate } from "react-router";
import App from "../components/App";
import AboutPage from "../features/AboutPage";
import ContactPage from "../features/ContactPage";
import HomePage from "../features/HomePage";
import CatalogPage from "../features/catalog/CatalogPage";
import ProductDetailsPage from "../features/catalog/ProductDetails";
import ErrorPage from "../features/ErrorPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import ShoppingCartPage from "../features/cart/ShoppingCartPage";
import LoginPage from "../features/account/LoginPage";
import RegisterPage from "../features/account/RegisterPage";
import CheckoutPage from "../features/checkout/CheckoutPage";
import AuthGuard from "./AuthGuard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                element: <AuthGuard />,
                children: [{ path: "checkout", element: <CheckoutPage /> }],
            },
            { path: "", element: <HomePage /> },
            { path: "about", element: <AboutPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "catalog", element: <CatalogPage /> },
            { path: "cart", element: <ShoppingCartPage /> },
            { path: "catalog/:id", element: <ProductDetailsPage /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },

            { path: "error", element: <ErrorPage /> },
            { path: "server-error", element: <ServerError /> },
            { path: "not-found", element: <NotFound /> },
            { path: "*", element: <Navigate to="/not-found" /> },
        ],
    },
]);
