"use client";
import Image from "next/image";

interface ButtonWithIconProps {
  link: string;
  buttonText: string;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  link,
  buttonText,
}) => {
  return (
    <a
      href={link}
      className="flex items-center gap-2   text-primary  rounded-lg text-[14px] uppercase">
      <span>{buttonText}</span>
      <Image
        src="/assets/img/news/arrow-orange.svg"
        alt="arrow"
        width={11.47}
        height={11.47}
        className=""
      />
    </a>
  );
};

export default ButtonWithIcon;
