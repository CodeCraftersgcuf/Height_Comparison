"use client"
import Image from 'next/image'
import logoIcon from '../../public/images/logo.svg'
import NavBarLink from './NavBar_Links'
import Link from 'next/link'
const TopBar = () => {
  const NavbarLinks = [
    {
      "link": '/',
      "title": 'Home'
    },
    {
      "link": '/calculator',
      "title": 'height calculator'
    },
    {
      "link": '/about',
      "title": 'about'
    },
    {
      "link": '/contact',
      "title": 'contact'
    },
  ]
  console.log(NavbarLinks);
  return (
    <div className="flex items-center justify-between gap-8 2xl:container mx-auto p-4 shadow">
      <div className="flex items-center gap-8">
        <Image
          src={logoIcon}
          alt='logo'
          width={250}
        />
        <div className='flex items-center gap-4'>
          {NavbarLinks.map((item, index) => (
            <NavBarLink
              key={index}
              navigationLink={item.link}
              title={item.title}
            />
          ))}
        </div>
      </div>
      <div className='flex items-center gap-8'>
        <Link
          href={'/login'}
        >
          Login
        </Link>
        <Link
          href={'/signup'}
          className='bg-red-500 text-white py-2 px-4 rounded-lg'
        >
          Sign Up ------ its Free
        </Link>
      </div>
    </div>
  )
}

export default TopBar
