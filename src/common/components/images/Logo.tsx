import Image from "next/image";
import LogoSvg from "../../../../public/images/logo.svg";

interface LogoProps {
  size?: number;
}

export const Logo = ({ size = 60 }: LogoProps) => {
  return (
    <div>
      <Image
        loading={"lazy"}
        src={LogoSvg}
        alt="logo"
        rel="preload"
        width={size}
      />
    </div>
  );
};
