import "./globals.css";

export const metadata = {
  title: "G.R.O.W. Quiz",
  description: "How well do you know G.R.O.W.? A quick 10-question quiz.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
