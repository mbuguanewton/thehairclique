export const metadata = {
  title: "Sanity Studio",
  description: "Content Management for The Hair Clique",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
