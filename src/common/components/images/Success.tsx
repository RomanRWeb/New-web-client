import Image from "next/image";
import SuccessSvg from "../../../../public/images/success.svg";

interface SuccessProps {
  size?: number;
}

export const Success = ({ size = 100 }: SuccessProps) => {
  return (
    <div>
      <Image
        loading={"lazy"}
        src={SuccessSvg}
        alt="success"
        rel="preload"
        width={size}
      />
    </div>
  );
};
