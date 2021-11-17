import Link from 'next/link';

export default function Navblock({isMobile}) {
    let navStyle = isMobile ? 'flex f-column' : 'flex';
    return (
       <ul className={navStyle}>
           <li>
               <Link href="/">
                   <a>Home Page</a>
               </Link>
           </li>
           <li>
               <Link href="/data">
                    <a>Data Page</a>
               </Link>
           </li>
           <li>
               <Link href="/contacts">
                   <a>Contact Page</a>
               </Link>
           </li>
       </ul>
    )
}