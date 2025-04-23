import { Toaster } from "react-hot-toast";
import Header from "./header";

export default function AppLayout({ children }) {
  return (
    <div className="w-full max-h-screen overflow-hidden overflow-y-scroll">
      <Header />
      <div className="py-5 px-16 bg-white">
        {children}
      </div>
      <Toaster
        position="bottom-right"
      />
    </div>
  )
}