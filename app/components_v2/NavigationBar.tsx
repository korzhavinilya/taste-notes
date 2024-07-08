'use client';

import MobileMenuDialog from '@/components_v2/MobileMenuDialog';
import Link from 'next/link';
import React, { useState } from 'react';
import { MdOutlineSettings } from 'react-icons/md';

export default function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center text-2xl">
      <Link href="#" className="font-semibold">
        tastenotes.
      </Link>

      <button onClick={() => setMobileMenuOpen((open) => !open)}>
        <MdOutlineSettings />
      </button>

      <MobileMenuDialog
        open={mobileMenuOpen}
        handleClose={() => setMobileMenuOpen(false)}
      />
    </nav>
  );
}
