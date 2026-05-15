import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

export default function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}