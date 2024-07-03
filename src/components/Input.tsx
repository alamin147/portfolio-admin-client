import { useForm } from "react-hook-form";

const Input = ({
  label,
  reg,
  type,
}: {
  label: string;
  reg: string;
  type: string;
}) => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        {...register(`${reg}`, { required: true })}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="namecompany"
      />
      {errors.reg && <p className="text-red-500">{reg} is required.</p>}
    </div>
  );
};
export default Input;
