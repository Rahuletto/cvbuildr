import { FC } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface FormButtonProps {
  size: number;
  remove: () => void;
  add: () => void;
}

const FormButton: FC<FormButtonProps> = ({ size, remove, add }) => {

    return (
      <div className="flex flex-row absolute -bottom-8 right-6">
        <button type="button" onClick={add}
          aria-label="Add"
          className="p-2 bg-white text-black h-[50px] w-[50px] border-2 border-black flex items-center justify-center transition-all duration-200 hover:shadow-hover active:shadow-active">
          <FaPlus />
        </button>
        {
          size > 0 &&
          <button type="button" onClick={remove}
            aria-label="Remove"
            className="p-2 bg-black text-white h-[50px] w-[50px] border-2 border-black flex items-center justify-center transition-all duration-200 hover:shadow-hover active:shadow-active">
            <FaMinus />
          </button>
        }
      </div>
    )
  }

export default FormButton;