export default function Button({ children, ...props }) {
  return (
    <button
      className="px-5 py-2 text-xs md:text-sm rounded bg-orange-500 text-black hover:bg-orange-600 transition-all duration-200 font-mono font-semibold"
      {...props}
    >
      {children}
    </button>
  );
}
