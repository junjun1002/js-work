export default function Button({ children, ...props }) {
  return (
    <button className="btn" type="button" {...props}>
      {children}
    </button>
  );
}
