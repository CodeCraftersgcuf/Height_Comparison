"use client"

import Link from "next/link";

const Footer = () => {
    const FooterLinks = [
        {
            'link':'about',
            'text':'About Us',
        },
        {
            'link':'contact',
            'text':'contact',
        },
        {
            'link':'faqs',
            'text':'FAQ',
        },
        {
            'link':'terms',
            'text':'terms',
        },
    ]
    console.log(FooterLinks);
    return (
        <div className="bg-[#444444] text-white">
            <div className="md:w-[80%] mx-auto flex justify-center items-center gap-8">
                <div className="flex items-center gap-4 py-4">
                    {FooterLinks.map((navigation,index)=>(
                        <Link
                        key={index}
                        href={navigation.link}
                        className="capitalize tracking-wider font-bold"
                        >
                            {navigation.text}
                        </Link>
                    ))}
                </div>
                <h1 className="font-bold">© 2025  HeightComparison.com  | All rights reserved</h1>
            </div>
        </div>
    )
}

export default Footer
