import Link from 'next/link';

export default function Navblock({isMobile}) {
    let navStyle = isMobile ? 'flex f-column' : 'flex';
    return (
       <ul className={navStyle}>
           <li>
               <Link href={ '/' }>
                   Home Page
               </Link>
           </li>
           <li>
               <Link href={ '/data' }>
                    Data Page
               </Link>
           </li>
           <li>
               <Link href={ '/contacts' }>
                   Contact Page
               </Link>
           </li>
       </ul>
    )
}