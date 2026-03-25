export const metadata = {
  title: 'Gyanix - AI Chat',
  description: 'Your Indian AI Companion',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-white antialiased h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}