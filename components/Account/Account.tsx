'use client';

import EditIcon from '@/assets/icons/edit.svg';
import LogoutIcon from '@/assets/icons/logout.svg';
import SettingsIcon from '@/assets/icons/settings.svg';
import UserIcon from '@/assets/icons/user.svg';
import { useUserStore } from '@/lib/store';

import React, { useState } from 'react';

import { TrendingUp } from 'lucide-react';
import { Bookmark } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import AddressForm from '@/components/AddressForm';
import DeleteAccount from '@/components/DeleteAccount';
import PersonalInformationForm from '@/components/PersonalInformationForm';
import RegionalSettingsForm from '@/components/RegionalSettingsForm';
import SolutionFinder from '@/components/SolutionFinder';
import UploadCompanyLogo from '@/components/UploadCompanyLogo';
import UIButton from '@/components/common/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function RenderUserData({ data }: any) {
  return (
    <>
      {data.map((item: any, index: number) => (
        <div key={index} className="mb-5">
          <p className="font-normal text-[16px]/[24px] text-[#A8A8A8]">
            {item.title}
          </p>
          {item.value}
        </div>
      ))}
    </>
  );
}

export default function Account() {
  const { user, logoutUser, onDeleteSavedPartner } = useUserStore(
    (state: any) => state,
  );
  const [edit, setEdit] = useState<
    'info' | 'address' | 'regional' | 'partners' | null
  >(null);

  const onDeletePartner = (id: string) => {
    onDeleteSavedPartner(id);
  };

  const onLogout = async () => {
    logoutUser().then(() => {
      signOut({ callbackUrl: '/' });
    });
  };

  const info = [
    {
      title: '',
      value: `User ${user?.id}`,
    },
    {
      title: 'Email address',
      value: user?.email,
    },
    {
      title: 'Phone',
      value: user?.phoneNumber,
    },
  ];
  const address = [
    {
      title: 'Country',
      value: user?.country,
    },
    {
      title: 'City',
      value: user?.city,
    },
    {
      title: 'Company name',
      value: user?.companyName,
    },
    {
      title: 'Postal / ZIP Code',
      value: user?.postalCode,
    },
    {
      title: 'Street Address / Number',
      value: user?.address,
    },
  ];
  const region = [
    {
      title: 'Language',
      value: user?.language,
    },
    {
      title: 'Currency',
      value: user?.currency,
    },
    {
      title: 'Country / Region',
      value: user?.country,
    },
  ];
  return (
    <>
      <main className="flex min-h-screen flex-col py-5 sm:py-16 justify-between colored-main px-[16px] max-w-[1328px] mx-auto">
        <div className="md:flex justify-between mb-10 items-center">
          <i className="flex text-[28px]/[40px] sm:text-[48px]/[52px]">
            <Image
              width={40}
              height={40}
              src={UserIcon}
              alt="user"
              className="mr-3"
            />
            Account
          </i>
          <div className="mt-5 md:mt-0 gap-4 flex items-center flex-wrap md:flex-nowrap">
            {user?.role === 'admin' && (
              <Link
                href={`${user?.role === 'admin' ? '/dashboard/referral' : '/dashboard/performance'}`}
              >
                <UIButton secondary className="w-full sm:w-[224px]">
                  <TrendingUp className="w-4 h-4 mr-[6px]" />
                  Dashboard
                </UIButton>
              </Link>
            )}
            {user?.role === 'editor' && (
              <Link href={'/dashboard/template'}>
                <UIButton secondary className="w-full sm:w-[224px]">
                  <TrendingUp className="w-4 h-4 mr-[6px]" />
                  Editor
                </UIButton>
              </Link>
            )}
            {user?.role === 'provider' && (
              <Link
                href={`${user?.role === 'admin' ? '/dashboard/referral' : '/dashboard/performance'}`}
              >
                <UIButton secondary className="w-full sm:w-[224px]">
                  <TrendingUp className="mr-[6px] w-4 h-4" />
                  Show analytics
                </UIButton>
              </Link>
            )}
            {user?.role === 'user' && (
              <div className="w-full sm:w-[224px]">
                <SolutionFinder />
              </div>
            )}

            <button
              onClick={onLogout}
              className="flex items-center gap-3 text-[14px]/[17px] font-medium cursor-pointer hover:opacity-50 transition-all mx-auto"
            >
              <Image
                width={13}
                height={16}
                src={LogoutIcon}
                alt="logout icon"
              />
              Logout
            </button>
          </div>
        </div>
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="font-medium text-[18px]/[22px]">
              User {user?.id}
            </CardTitle>
            <CardDescription>{user?.companyName}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{user?.country}</p>
          </CardContent>
        </Card>
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="font-medium text-[18px]/[22px] flex justify-between">
              <span>Business information</span>
              <UIButton
                onClick={() => setEdit('info')}
                secondary
                className={`${edit === 'info' && 'hidden'} rounded-full`}
              >
                Edit
                <Image src={EditIcon} width={16} height={16} alt="edit" />
              </UIButton>
            </CardTitle>
          </CardHeader>
          <CardContent className="sm:flex justify-between">
            {edit === 'info' ? (
              <PersonalInformationForm
                {...user}
                onCancel={() => setEdit(null)}
              />
            ) : (
              <RenderUserData data={info} />
            )}
          </CardContent>
        </Card>
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="font-medium text-[18px]/[22px] flex justify-between">
              <span>Business Address</span>
              <UIButton
                onClick={() => setEdit('address')}
                secondary
                className={`${edit === 'address' && 'hidden'} rounded-full`}
              >
                Edit
                <Image src={EditIcon} width={16} height={16} alt="edit" />
              </UIButton>
            </CardTitle>
          </CardHeader>
          <CardContent className="sm:flex justify-between">
            {edit === 'address' ? (
              <AddressForm {...user} onCancel={() => setEdit(null)} />
            ) : (
              <RenderUserData data={address} />
            )}
          </CardContent>
        </Card>
        <div className="flex justify-between mb-10">
          <span className="flex text-[28px]/[40px] sm:text-[48px]/[52px]">
            <Image width={40} height={40} src={SettingsIcon} alt="settings" />
            Regional settings
          </span>
        </div>
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <div className="flex justify-center content-center">
                <UploadCompanyLogo />
                <span className="pl-5 text-[26px]/[68px] font-normal">
                  {user?.companyName}
                </span>
              </div>
              <UIButton
                onClick={() => setEdit('regional')}
                secondary
                className={`${edit === 'regional' && 'hidden'} rounded-full`}
              >
                Edit
                <Image src={EditIcon} width={16} height={16} alt="edit" />
              </UIButton>
            </CardTitle>
          </CardHeader>
          <CardContent className="sm:flex justify-between">
            {edit === 'regional' ? (
              <RegionalSettingsForm {...user} onCancel={() => setEdit(null)} />
            ) : (
              <RenderUserData data={region} />
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between mb-10">
          <span className="flex items-center text-[28px]/[40px] sm:text-[48px]/[52px]">
            <Bookmark className="w-10 h-10 text-primaryOrange mr-2" />
            <span className="font-medium">Logistics&nbsp;</span>partners saved
          </span>
        </div>
        <Card className="mb-10">
          <CardContent className="sm:flex justify-between">
            <div className="flex gap-1">
              {user?.savedPartners?.map(({ id, photo }: any) => {
                return (
                  <Link
                    key={id}
                    href={`/partner/${id}`}
                    className="block w-[140px] h-12 bg-gray-200 p-2 hover:bg-slate-300 transition-all cursor-pointer relative"
                  >
                    <div
                      className="h-full"
                      style={{
                        backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}${photo})`,

                        backgroundSize: 'contain',
                        backgroundPositionX: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                    {edit === 'partners' && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          onDeletePartner(id);
                        }}
                        className="absolute -right-2 -top-2 z-10"
                      >
                        <CircleX className="text-red-600" />
                      </button>
                    )}
                  </Link>
                );
              })}
            </div>
            {edit !== 'partners' ? (
              <UIButton
                onClick={() => setEdit('partners')}
                secondary
                className={`rounded-full`}
              >
                Edit
                <Image src={EditIcon} width={16} height={16} alt="edit" />
              </UIButton>
            ) : (
              <UIButton
                onClick={() => setEdit(null)}
                secondary
                className={`rounded-full bg-primaryOrange text-white`}
              >
                Save
              </UIButton>
            )}
          </CardContent>
        </Card>
        <div className="flex items-end">
          {user?.role !== 'editor' && <DeleteAccount />}
        </div>
      </main>
    </>
  );
}
