
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div >
      <div className="h-[100vh] flex items-center">
         {children}</div>
    </div>
  );
}
