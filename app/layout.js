import "@/styles/globals.css";
import ClientLayout from "./ClientLayout";
import {Afacad} from "next/font/google"

export const metadata = {
  title: "Ferme Admin",
  description: "Farm management",
};

const afacad = Afacad({ subsets: ['latin'] });
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={afacad.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}