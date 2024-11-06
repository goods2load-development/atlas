import SendDataToPartnerDialog from '../PartnersDataPage/SendDataToPartnerDialog';
import { GoogleRating } from './GoogleRating';
import { IProduct } from './MOCK';
import SelectionPopup from './SelectionPopup';
import LeafIcon from '@/assets/Product/LeafIcon';
import defaultCompanyLogo from '@/assets/defaultCompanyLogo.svg';
import recognationIcon from '@/assets/industryRecognations.svg';
import InfoImg from '@/assets/info.svg';
import SaveIconFilled from '@/assets/save-filled.svg';
import SaveIcon from '@/assets/save.svg';
import { useAnalyticsStore } from '@/lib/analyticsStore';
import { useUserStore } from '@/lib/store';

import { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  ToolTipComponent,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

interface Props extends IProduct {
  deliveryBy: string;
  currency: any;
  index: number;
}

function Icon(type: string) {
  switch (type) {
    case 'plane':
      return '/productplane.svg';

    case 'ferry':
      return '/productferry.svg';

    default:
      return '/producttruck.svg';
  }
}

export default function Product(props: Props) {
  const { toast } = useToast();
  const { user, getUser, onSaveUserPartner }: any = useUserStore();
  const router = useRouter();
  const { postInteractionWithPartner } = useAnalyticsStore();

  useEffect(() => {
    if (!user?.id) getUser();
  }, [user?.id]);

  const onSavePartner = () => {
    if (!user?.id) {
      router.push('/sign-in');
    } else {
      onSaveUserPartner(props.company.name)
        .then((data: any) => {
          toast({
            title: 'Partner saved',
            variant: 'default',
            className: 'bg-green-500 text-white',
          });
        })
        .catch((error: any) => {
          toast({
            title: error.message,
            variant: 'default',
            className: 'bg-red-500 text-white',
          });
        });
    }
  };

  const isAlreadySavedPartner = (
    userSavedPartners: any = null,
    partnerName: string,
  ) => {
    if (!userSavedPartners) {
      return false;
    }
    return userSavedPartners.some((item: any) => {
      return item.name === partnerName;
    });
  };

  return (
    <div className="border-[1px] rounded-2xl overflow-hidden">
      <div className="md:flex justify-start md:border-b">
        <div className="py-[37px] pl-[58px] pr-[35px] border-r">
          <div className="flex items-center gap-3">
            <div>{props.company.name}</div>
            {!isAlreadySavedPartner(user?.savedPartners, props.company.name) ? (
              <button
                className="hover:opacity-60 transition-opacity"
                onClick={onSavePartner}
              >
                <Image width={18} height={18} src={SaveIcon} alt="save" />
              </button>
            ) : (
              <div>
                <Image
                  width={18}
                  height={18}
                  src={SaveIconFilled}
                  alt="save filled"
                />
              </div>
            )}
          </div>

          <Image
            width={33}
            height={36}
            src={defaultCompanyLogo}
            alt="default company logo"
            className="mx-auto mt-3"
          />
        </div>
        {props.partnerInfo?.services
          ?.sort((a, b) => a.label.localeCompare(b.label))
          .map(({ label, items }: any) => {
            return (
              <div key={label} className="border-r">
                <div className="text-[15px]/[22.5px] font-semibold bg-[#FFEDE4] text-primaryOrange py-[5px] px-4 whitespace-nowrap min-w-[200px]">
                  {label}
                </div>

                <div className="mt-4 px-[17.5px]">
                  {items.slice(0, 3).map((item: string) => {
                    return (
                      <ToolTipComponent
                        className="block"
                        key={item}
                        text={item}
                      >
                        <div className="text-center text-[14px]/[21px] pl-2 pr-1 border border-[#FF672080] rounded-[5px] text-primaryOrange w-max mb-2 max-w-[146px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {item}
                        </div>
                      </ToolTipComponent>
                    );
                  })}
                </div>
              </div>
            );
          })}
        <div className="flex items-center justify-center flex-1">
          <SendDataToPartnerDialog
            trigger={
              <button
                onClick={() =>
                  postInteractionWithPartner(props.partnerInfo.partnerId)
                }
                disabled={false}
                type="button"
                className=" bg-primaryOrange
           text-white text-[16px]/[24px] font-semibold py-3 px-4 rounded-[16px]
            cursor-pointer hover:opacity-75 transition-opacity"
              >
                Get a free quotation
              </button>
            }
          />
        </div>
      </div>
      <div className="md:flex justify-between py-2">
        <div className="py-[8px] md:py-0 border-t md:border-none md:pl-6 items-center justify-center md:justify-start flex sm:flex-row flex-col gap-2">
          {!!props.partnerInfo?.rating && (
            <GoogleRating
              rating={props.partnerInfo?.rating}
              totalReviews={props.partnerInfo?.totalReviews || 0}
              placementId={props.partnerInfo?.placementId}
            />
          )}

          {props.CO2EmissionControlled && (
            <div className="rounded-[5px] px-2 text-[15px]/[22.5px] bg-[#E6F4EB] text-[#004E00] w-fit flex">
              <LeafIcon />
              Carbon Offset
            </div>
          )}
          {props.partnerInfo?.awards && (
            <div className="rounded-[5px] px-2 text-[15px]/[22.5px] bg-[#E3F5F8] text-[#417FAE] w-fit flex">
              <Image
                width={21}
                height={21}
                src={recognationIcon}
                alt="Recognations"
              />
              <Link
                className="underline underline-offset-1 hover:no-underline"
                href={`/partner/${props.partnerInfo?.partnerId}#awards`}
              >
                Industry Recognition
              </Link>
            </div>
          )}
        </div>
        {/* <SelectionPopup
          orderId={props.orderId}
          company={props.company.name}
          withdraw={props.withdraw}
          delivery={props.delivery}
          portArrival={props.portArrival}
          portDeparture={props.portDeparture}
          price={props.price}
          placementOfGoods={props.placementOfGoods}
        /> */}
      </div>
    </div>
  );
}
