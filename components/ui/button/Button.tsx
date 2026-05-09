interface ButtonUIProps {
  loading: boolean;
  type: "button" | "submit" | "reset";
  children?: React.ReactNode;
  onClick?: () => void;
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
}

const ButtonUI = (props: ButtonUIProps) => {
  const {
    loading,
    type,
    children,
    onClick,
    bgColor = "bg-blue-600",
    textColor = "text-white",
    hoverTextColor = "text-white",
    hoverBgColor = "bg-blue-700",
  } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`w-full  flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg ${textColor} transition-all shadow-md shadow-blue-200 ${
        loading
          ? "bg-slate-300 cursor-not-allowed"
          : `${bgColor} cursor-pointer  active:scale-[0.98] hover:${hoverBgColor} ${hoverTextColor}`
      }`}
    >
      {children}
    </button>
  );
};

export default ButtonUI;
