import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

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
        <p>
          {session?.user?.name}
        </p>
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