interface PropTypes {
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  label: string;
  required?: boolean;
  minLength?: number;
  readOnly?: boolean;
  disabled?: boolean;
  confirmationPassword?: string;
}

const InputUI = (props: PropTypes) => {
  const {
    value,
    type = "text",
    label = "",
    placeholder,
    onChange,
    required,
    minLength,
    readOnly = false,
    disabled = false,
    confirmationPassword = "",
  } = props;

  if (type === "password" && confirmationPassword) {
    if (value !== confirmationPassword) {
      return (
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            {label}
          </label>
          <input
            type={type}
            value={value}
            {...(required ? { required: true } : {})}
            {...(minLength ? { minLength } : {})}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            readOnly={readOnly}
            className={`w-full p-3 border rounded-xl outline-none focus:ring-2 transition-all ${
              value != "" && value !== confirmationPassword
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:ring-blue-500"
            } text-black`}
          />
          {value != "" && value !== confirmationPassword && (
            <p className="text-red-500 text-xs mt-1 animate-pulse">
              * Password tidak cocok
            </p>
          )}
        </div>
      );
    }
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        {...(required ? { required: true } : {})}
        {...(minLength ? { minLength } : {})}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={readOnly}
        className="w-full p-3 text-slate-900 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
      />
    </div>
  );
};

export default InputUI;
