import Image from "next/image";
import Icon from "/public/argIcon.png";

function Header() {
  return (
    <header className="text-center py-6">
      <h1 className="text-3xl font-bold w-full flex flex-col items-center">
        <div className="sunIconContainer">
        <Image src={Icon} alt="" priority/>
        </div>
        Argent weather</h1>
    </header>
  );
}

export default Header;
