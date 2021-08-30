
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import {useRouter} from 'next/router'

export default function Navbar({textvalue, link}) {
  const { user, error, isLoading } = useUser();

    // make sure we wait for everything to load
    if (isLoading) return <div>Loading...</div>;

    // if theres an error, show that
    if (error) return <div>{error.message}</div>;

    const router = useRouter();

  return (
      <nav className='bg-white w-screen rounded-lg h-20 mt-5 p-2' >
          <div className='flex flex-row' >
            <img className='w-16 rounded-full' src={user.picture} ></img>
            <h1 className='mt-5 ml-5 mr-60' >{user.name}</h1>
            <div className='flex text-black font-bold' >
                <h1 onClick={() => router.push(`${link}`)} className='mt-5 ml-5 mr-20 cursor-pointer hover:border-b-2 border-black'  >{textvalue}</h1>
                <h1 onClick={() => router.push('/')}  className='mt-5 ml-5 mr-20 cursor-pointer hover:border-b-2 border-black' >Home Screen</h1>
                <h1 onClick={() => router.push('whyus')}  className='mt-5 ml-5 cursor-pointer hover:border-b-2 border-black mr-80' >Why Us</h1>
            </div>
            <a className='rounded-full border-2  ml-5 border-[#E51A4C] hover:bg-[#E51A4C] hover:text-white text-[#E51A4C] cursor-pointer w-30 p-5 ' href="/api/auth/logout">Logout</a>
          </div>
      </nav>
  );
}