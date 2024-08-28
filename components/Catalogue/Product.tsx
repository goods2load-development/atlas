import { IProduct } from "./MOCK";
import LeafIcon from "@/assets/Product/LeafIcon";
import SelectionPopup from "./SelectionPopup";
import { GoogleRating } from "./GoogleRating";
import SaveIcon from "@/assets/save.svg";
import SaveIconFilled from "@/assets/save-filled.svg";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { googleRatingMocks } from "./MOCK";
import { useUserStore } from "@/lib/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import InfoImg from "@/assets/info.svg";
import defaultCompanyLogo from "@/assets/defaultCompanyLogo.svg";

interface Props extends IProduct {
  deliveryBy: string;
  currency: any;
  index: number; // index for mocks data (GoogleReview)
}

function Icon(type: string) {
  switch (type) {
    case "plane":
      return "/productplane.svg";

    case "ferry":
      return "/productferry.svg";

    default:
      return "/producttruck.svg";
  }
}

export default function Product(props: Props) {
  const { toast } = useToast();
  const { user, getUser, onSaveUserPartner }: any = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user?.id) getUser();
  }, [user?.id]);

  const onSavePartner = () => {
    if (!user?.id) {
      router.push("/sign-in");
    } else {
      onSaveUserPartner(props.company.name)
        .then((data: any) => {
          toast({
            title: "Partner saved",
            variant: "default",
            className: "bg-green-500 text-white",
          });
        })
        .catch((error: any) => {
          toast({
            title: error.message,
            variant: "default",
            className: "bg-red-500 text-white",
          });
        });
    }
  };

  const isAlreadySavedPartner = (
    userSavedPartners: any = null,
    partnerName: string
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
      <div className="md:flex justify-between md:border-b">
        <div className="flex border-b-[1px] md:border-b-[0px]">
          <div className="w-1/2 md:w-[184px] p-[24px] border-r-[1px]">
            <div className="text-[24px]/[28px] font-light [&>i]:font-normal]">
              Estimated <i>transit</i>
            </div>
            <div className="flex items-center gap-2 text-[16px]/[26px] text-primaryOrange">
              <span>From</span>
              <span>{props.estimatedTransit}</span>
              <span>{props.estimatedTransit === 1 ? " day" : " days"}</span>
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger className="cursor-pointer">
                    <Image
                      className="cursor-pointer"
                      src={InfoImg}
                      width={18}
                      height={18}
                      alt="info"
                    />
                  </TooltipTrigger>

                  <TooltipContent
                    side="top"
                    className="text-[12px]/[17px] font-normal bg-primaryOrange text-white rounded-sm p-2 overflow-visible relative max-w-[250px] border-transparent"
                  >
                    Travel time may vary depending on the regulations of the
                    states traversed; it is advisable to consult with the
                    logistics company for an accurate estimate
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div
            key={user?.id}
            className="w-1/2 flex flex-col justify-start p-6 item-center text-center text-[20px]/[22px] font-medium flex-1 lg:ml-8"
          >
            <div className="flex justify-center items-center gap-3">
              <span>{props.company.name}</span>
              {!isAlreadySavedPartner(
                user?.savedPartners,
                props.company.name
              ) ? (
                <button onClick={onSavePartner}>
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
        </div>
        <div className="flex border-b-[1px] md:border-b-[0px] flex-1">
          <div className="w-1/2 flex flex-col items-center p-[24px]">
            <div className="text-[20px]/[22px] font-medium flex gap-2 items-center">
              <img src={Icon(props.deliveryBy)} />
              Withdraw
            </div>
            <div className="text-[12px]/[18px]">
              <div className="text-[14px]/[21px] mt-2">{props.delivery}</div>
              <div className="text-[12px]/[18px] opacity-50 mt-1">
                Estimated date
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-center p-[24px]">
            <div className="text-[20px]/[22px] font-medium flex gap-2 items-center">
              <img src={Icon(props.deliveryBy)} />
              Delivery
            </div>
            <div className="text-[12px]/[18px]">
              <div className="text-[14px]/[21px] mt-2">{props.delivery}</div>
              <div className="text-[12px]/[18px] opacity-50 mt-1">
                Estimated date
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[200px] min-w-[200px] min-h-[104px] text-center flex flex-col justify-center md:border-l-[1px] md:border-b-[0px]">
          <div className="text-[24px]/[28px] font-light [&>span]:font-normal [&>span]:italic">
            Order <span>cost</span>
          </div>

          <div className="flex items-center gap-3 mx-auto">
            <div className="text-[20px]/[22px] font-medium cursor-pointer inline-block">
              From <span>{props.currency.symbol}</span>
              <span>
                {Math.round(parseInt(props.orderCost) * props.currency.rate)}
              </span>
            </div>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    className="cursor-pointer"
                    src={InfoImg}
                    width={18}
                    height={18}
                    alt="info"
                  />
                </TooltipTrigger>

                <TooltipContent
                  side="top"
                  className="text-[12px]/[17px] font-normal bg-primaryOrange text-white rounded-sm p-2 overflow-visible relative max-w-[250px] border-transparent"
                >
                  This indicated price is only an estimate and may vary
                  depending on the availability of the requested cargo. Please
                  consult with the selected logistic partner to obtain a final
                  free quote.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <div className="md:flex justify-between">
        <div className="py-[8px] md:py-0 border-t md:border-none md:pl-6 items-center justify-center md:justify-start flex sm:flex-row flex-col gap-2">
          {googleRatingMocks[props.index] && (
            <GoogleRating data={googleRatingMocks[props.index]} />
          )}
          {props.CO2EmissionControlled && (
            <div className="rounded-[5px] px-2 text-[15px]/[22.5px] bg-[#E6F4EB] text-[#004E00] w-fit flex">
              <LeafIcon />
              CO2 Emission controlled
            </div>
          )}
        </div>
        <SelectionPopup
          orderId={props.orderId}
          company={props.company.name}
          withdraw={props.withdraw}
          delivery={props.delivery}
          portArrival={props.portArrival}
          portDeparture={props.portDeparture}
          price={props.price}
          placementOfGoods={props.placementOfGoods}
        />
      </div>
    </div>
  );
}
