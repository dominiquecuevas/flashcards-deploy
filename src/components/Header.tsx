import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();
  let left = (
    <div className="left">
      <Link legacyBehavior href="/">
        <a className="bold" data-active={isActive('/')}>
          Home
        </a>
      </Link>
      <Link legacyBehavior href="/categories">
        <a className="bold" data-active={isActive('/categories')}>
          Categories
        </a>
      </Link>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div className="left">
        <Link legacyBehavior href="/">
          <a className="bold" data-active={isActive('/')}>
            Home
          </a>
        </Link>
        <Link legacyBehavior href="/categories">
          <a className="bold" data-active={isActive('/categories')}>
            Categories
          </a>
        </Link>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link legacyBehavior href="/api/auth/signin">
          <a data-active={isActive('/signup')}>Log in</a>
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link legacyBehavior href="/">
          <a className="bold" data-active={isActive('/')}>
            Home
          </a>
        </Link>
        <Link legacyBehavior href="/categories">
          <a className="bold" data-active={isActive('/categories')}>
            Categories
          </a>
        </Link>
      </div>
    );
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
        <input type="submit" value="Log out" onClick={() => signOut({ callbackUrl: '/'})}/>
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