import Navbar from "@/components/layout/NavBar";

export default function AuthLayout({ children }) {
    return (
        <>
            <main>
                {children}
            </main>
        </>
    );
}