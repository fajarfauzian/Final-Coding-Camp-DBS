
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main className="flex-1 pt-16 pl-16 md:pl-64 min-h-screen">
        <div className="container py-6 px-4 md:px-6 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
