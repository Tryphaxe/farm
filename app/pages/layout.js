import Header from "./header";

export default function AppLayout({ children }) {
  return (
    <div>
      <div className="">
        <Header />
      </div>
      <div className="py-5 px-16 bg-gray-50 h-full">
        {children}
      </div>
    </div>
  )
}