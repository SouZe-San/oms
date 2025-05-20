import Link from "next/link";

interface HomeButtonProps {
  href: string;
  title: string;
  extraClass?: string;
}

const HomeButton = ({ href, title, extraClass }: HomeButtonProps) => {
  return (
    <button className={`homeBtn ${extraClass}`}>
      <Link href={href}>
        {" "}
        {title}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m18 8l4 4m0 0l-4 4m4-4H2"
          />
        </svg>
      </Link>
    </button>
  );
};

export default HomeButton;
