import TopBar from "./TopBar";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="w-full shadow-sm sticky top-0 z-50 ">
      <TopBar />
      <Navbar />
    </header>
  );
}
