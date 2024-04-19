import React, { FC, useState } from 'react';
import { ILeader } from '@/app/_components/Company/CompanyLeadership/CompanyLeadership';
import Image from 'next/image';
import arrow from '@/assets/arrow.svg';
import { createPortal } from 'react-dom';
import linkedin from '@/assets/linkedin.svg'
import close from '@/assets/close.svg'

type TItem = {
  item: ILeader
}

const CompanyLeader: FC<TItem> = ({ item }) => {

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className='w-full'>
      <div className='w-full relative w-fit h-fit mb-[18px]'>
        <Image src={item.img} alt={item.name} className='rounded-full' />
        <div
          className='bg-primaryOrange w-[64px] h-[64px] flex justify-center items-center rounded-full absolute bottom-0 right-[15%] hover:cursor-pointer'
        onClick={()=>{setShowModal(true)}}
        >
          <Image src={arrow} alt={'arrow'} /></div>
      </div>
      <div className='flex flex-col items-center gap-[8px]'>
        <h3 className='w-fit text-black text-[25px]/[22px] font-medium'>{item.name}</h3>
        <p className='max-w-[220px] text-center text-black text-[18px]/[23.4px] font-normal'>{item.position}</p>
      </div>
      {showModal && createPortal(
        <Popup onClose={() => setShowModal(false)} leader={{ ...item }}/>,
        document.body,
      )}
    </div>
  );
};

export default CompanyLeader;

type IPopup = {
  onClose: () => void;
  leader: ILeader;
}

const Popup: FC<IPopup> = ({ onClose, leader }) => {
  console.log(leader);
  return (
    <div className='w-full h-full fixed inset-0 bg-[rgba(0,0,0,0.2)] flex flex-col justify-center items-center'>
      <div className='max-w-[800px] w-fit p-10 flex flex-col rounded-[32px] bg-white relative'>
        <h1 className='text-black font-light text-[48px]/[57.6px] flex flex-row items-center gap-[8px]'> <Image src={linkedin} alt={"linkedin"}/>{leader.name.split(' ')[0]}  {' '} <span className='font-normal text-[48px]/[57.6px] italic'>{leader.name.split(' ')[1]}</span> </h1>
        <p className='text-primaryOrange text-[18px]/[23.4px] font-normal pb-6'>{leader.position}</p>
        <pre className='text-black font-poppins text-[18px]/[24px] font-normal'>{leader.info}</pre>
        <Image className='absolute top-10 right-10 hover:cursor-pointer' src={close} alt={"close"} onClick={onClose}/>
      </div>
    </div>
  );
};
