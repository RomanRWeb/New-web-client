import Image from "next/image";
import ErrorSvg from '../../../public/images/error.svg'

interface ErrorProps {
    size?: number;
}

export const Error = ({size = 100}: ErrorProps) => {
    return (
        <div>
            <Image
                loading={"lazy"}
                src={ErrorSvg}
                alt="error"
                rel="preload"
                width={size}
            />
        </div>
    )
}
