//https://www.material-tailwind.com/docs/html/input
//Copyright © 2023 Material Tailwind by Creative Tim
//under MIT License: https://www.material-tailwind.com/docs/react/license

const StyledInput = ({ placeholder, label, ...rest }) => {
  return (
    <div className="w-full">
      <div className="relative h-10 w-full min-w-[200px]">
        <input
          {...rest}
          className="text-blue-gray-700 disabled:bg-blue-gray-50 placeholder-shown:border-blue-gray-200
            placeholder-shown:border-t-blue-gray-200 border-blue-gray-200 peer h-full w-full rounded-[7px]
            border bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all
            placeholder-shown:border focus:border-2 focus:border-gray-900 focus:border-t-transparent
            focus:outline-0 disabled:border-0"
          placeholder=""
        />
        <label
          className="peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500
            before:content[' '] after:content[' '] before:border-blue-gray-200 after:border-blue-gray-200
            pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible
            truncate text-[11px] font-normal leading-tight text-gray-500 transition-all
            before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5
            before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all
            after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5
            after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all
            peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75]
            peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent
            peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900
            peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-gray-900
            peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-gray-900
            peer-disabled:text-transparent peer-disabled:before:border-transparent
            peer-disabled:after:border-transparent">
          {label}
        </label>
      </div>
    </div>
  );
};

export default StyledInput;
