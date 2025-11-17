export default function Button({ children, ...props }) {
  return (
    <button
      className="px-5 py-2 text-xs md:text-base rounded-lg bg-primary-600 text-background-50 hover:bg-primary-700 hover:shadow-lg transition-all duration-200 font-medium"
      {...props}
    >
      {children}
    </button>
  );
}
