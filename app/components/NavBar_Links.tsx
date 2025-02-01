"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkProps = {
    navigationLink: string;
    title: string;
};

const NavBarLink = ({ navigationLink, title }: LinkProps) => {
    const pathname = usePathname(); // Replaces useRouter() in App Router
    const isActive = pathname === navigationLink;

    return (
        <div>
            <Link
                href={navigationLink}
                className={`px-4 capitalize font-bold rounded ${isActive ? 'text-blue-500 font-bold' : 'text-gray-700'}`}
            >
                {title}
            </Link>
        </div>
    );
};

export default NavBarLink;
