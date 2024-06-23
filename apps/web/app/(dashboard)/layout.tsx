import NavBar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className={` `}>
        <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full">
          <NavBar />
        </div>
        <div className="hidden md:flex flex-col h-full w-56 fixed inset-y-0 z-50">
          <Sidebar />
        </div>
        <div className="md:pl-56 pt-[80px] h-full">{children}</div>
      </div>
    </div>
  );
}
