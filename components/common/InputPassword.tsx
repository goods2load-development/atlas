'use client';

import Show from '@/assets/icons/showpassword.svg';

import React, { useState } from 'react';

import Image from 'next/image';

import { Input } from '@/components/ui/input';

export default function InputPassword(props: any) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span className="flex">
      <Input {...props} type={isVisible ? 'text' : 'password'} />
      <Image
        src={Show}
        width={16}
        height={16}
        alt="show password"
        className="ml-[-30px] cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      />
    </span>
  );
}
