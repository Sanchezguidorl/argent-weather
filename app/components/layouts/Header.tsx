import Image from "next/image";
import Icon from "/public/argIcon.png";

function Header() {
  return (
    <header className="text-center py-6">
      <h1 className=" text-3xl font-bold w-full flex flex-col items-center">
        <Image src={Icon} alt="" priority/>
        Argent weather</h1>
    </header>
  );
}

export default Header;
