import { IconType } from "react-icons/lib";

type TTransCard = {
  label: string;
  figure: string | number;
  Icon: IconType;
};

const TransactionCard = ({ label, figure, Icon }: TTransCard) => {
  return (
    <div className="sm:p-4 sm:shadow-md sm:bg-[#F2F2F2] sm:rounded-3xl justify-between flex sm:justify-start items-center gap-2 md:gap-4 font-faGrotesk w-full">
      <div className="flex justify-start items-center gap-1">
        <div className="sm:p-4 p-1 text-white bg-black rounded-md sm:rounded-2xl">
          <Icon className="text-[13px] lg:text-[20px] xl:text-[26px]" />
        </div>
        <p className="text-gray-500 text-xs sm:text-sm md:text-base block sm:hidden">
          {label}:
        </p>
      </div>
      <div>
        <p className="text-gray-500 text-sm md:text-base sm:block hidden">
          {label}:
        </p>
        <p className="font-medium text-black text-xs sm:text-base lg:text-xl xl:text-3xl 2xl:text-[32px]">
          {figure}
        </p>
      </div>
    </div>
  );
};

export default TransactionCard;
