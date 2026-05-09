import Link from "next/link";

interface LinkUIProps {
  href: string;
  children: React.ReactNode;
}
const LinkUI = (props: LinkUIProps) => {
  const { href, children } = props;
  return (
    <Link
      href={href}
      className="text-blue-600 font-bold hover:underline underline-offset-4"
    >
      {children}
    </Link>
  );
};

export default LinkUI;
