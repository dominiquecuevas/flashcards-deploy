import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session } = useSession();

  const handleClickLogout = () => {
    if ( confirm('Are you sure you want to log out?') ) {
      signOut({ callbackUrl: '/'})
    }
  }

  const left = (
    <div className="left">
      <Link legacyBehavior href="/">
        <a data-active={isActive('/')}>
          Home
        </a>
      </Link>
      <Link legacyBehavior href="/categories">
        <a data-active={isActive('/categories')}>
          Categories
        </a>
      </Link>
    </div>
  );

  let right = null;

  if (!session) {
    right = (
      <div className="right">
        <Link legacyBehavior href="/api/auth/signin">
          <a>Log in</a>
        </Link>
      </div>
    );
  } else {
    right = (
      <div className="right">
        {session?.user?.image && (
          <Image 
            src={session.user?.image || ''} 
            alt="avatar" 
            width={48} 
            height={48} 
            style={{height: '1.5rem', width: '1.5rem', borderRadius: '1rem'}}
          />
        )}
        <input type="submit" value="Log out" onClick={handleClickLogout}/>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
    </nav>
  );
};

export default Header;