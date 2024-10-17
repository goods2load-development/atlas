'use client';

import DynamicMenu from './DynamicMenu';
import HeaderClient from './HeaderClient';

import React, { PropsWithChildren, useEffect, useState } from 'react';

export type HeaderVariant = 'primary' | 'secondary';

interface HeaderProps extends PropsWithChildren {
  variant?: HeaderVariant;
}

export default function Header({ variant = 'primary' }: HeaderProps) {
  return (
    <HeaderClient variant={variant}>
      <DynamicMenu />
    </HeaderClient>
  );
}
