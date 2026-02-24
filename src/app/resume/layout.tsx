export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#0a0a0a",
      }}
    >
      {children}
    </div>
  );
}
