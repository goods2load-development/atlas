import { FooterItem } from '../Dashboard/HeaderFooterMain/types';

import { useState } from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

const NavLinkMobile = ({ item }: { item: FooterItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between mb-3"
      >
        <Link className="text-[15px]" href={item.href}>
          {item.title}
        </Link>
        {!!item.children?.length && (
          <Image
            className={clsx({
              'rotate-45': isOpen,
            })}
            width={13}
            height={13}
            src="/plus.svg"
            alt="expand"
          />
        )}
      </div>
      {!!item.children?.length && isOpen && (
        <div className="pl-4">
          {item.children.map((child) => (
            <NavLinkMobile item={child} key={child.title} />
          ))}
        </div>
      )}
    </>
  );
};

export default NavLinkMobile;
