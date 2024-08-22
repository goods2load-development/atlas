import { cn, postRequest } from "@/lib/utils";
import { IProduct } from "./MOCK";
import { Button } from "../ui/button";
import { ShipIcon } from "lucide-react";
import LeafIcon from "@/assets/Product/LeafIcon";
import SelectionPopup from "./SelectionPopup";
import { GoogleRating } from "./GoogleRating";
import SaveIcon from "@/assets/save.svg";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { googleRatingMocks } from "./MOCK";
import { useUserStore } from "@/lib/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
  const { user, getUser }: any = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user?.id) getUser();
  }, [user?.id]);

  const onSavePartner = () => {
    if (!user?.id) {
      router.push("/sign-in");
    } else {
      toast({
        title: "Partner saved",
        variant: "default",
        className: "bg-green-500 text-white",
      });
    }
  };

  return (
    <div className="border-[1px] rounded-2xl overflow-hidden">
      <div className="md:flex justify-between md:border-b">
        <div className="flex border-b-[1px] md:border-b-[0px]">
          <div className="w-1/2 md:w-[184px] p-[24px] border-r-[1px]">
            <div className="text-[24px]/[28px] font-light [&>i]:font-normal">
              Estimated <i>transit</i>
            </div>
            <div className="text-[16px]/[24px] text-primary">
              {props.estimatedTransit}
              {props.estimatedTransit === 1 ? " day" : " days"}
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center text-center text-[20px]/[22px] font-medium">
            Company
            {props.company.logo ? (
              <img
                alt={props.company.name}
                src={props.company.logo.src}
                className="max-w-[104px] block"
              />
            ) : (
              <div>{props.company.name}</div>
            )}
          </div>
        </div>
        <div className="flex border-b-[1px] md:border-b-[0px]">
          <div className="w-1/2 flex flex-col items-center p-[24px]">
            <div className="text-[20px]/[22px] font-medium flex gap-2 items-center">
              <img src={Icon(props.deliveryBy)} />
              Withdraw
            </div>
            <div className="text-[12px]/[18px]">
              <div className="text-[14px]/[21px]">{props.withdraw}</div>
              Estimated date
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-center p-[24px]">
            <div className="text-[20px]/[22px] font-medium flex gap-2 items-center">
              <img src={Icon(props.deliveryBy)} />
              Delivery
            </div>
            <div className="text-[12px]/[18px]">
              <div className="text-[14px]/[21px]">{props.delivery}</div>
              Estimated date
            </div>
          </div>
        </div>
        <div className="md:w-[200px] min-w-[200px] min-h-[104px] text-center flex flex-col justify-center md:border-l-[1px] md:border-b-[0px]">
          <div className="text-[24px]/[28px] font-light [&>span]:font-normal [&>span]:italic">
            Order <span>cost</span>
          </div>
          <div className="text-[20px]/[22px] font-medium">
            From {props.currency.symbol}
            {Math.round(parseInt(props.orderCost) * props.currency.rate)}
          </div>
        </div>
      </div>
      <div className="md:flex justify-between">
        <div className="py-[8px] md:py-0 border-t md:border-none md:pl-6 items-center justify-center md:justify-start flex gap-2">
          {props.CO2EmissionControlled && (
            <div className="rounded-[5px] px-2 text-[15px]/[22.5px] bg-[#E6F4EB] text-[#004E00] w-fit flex">
              <LeafIcon />
              CO2 Emission controlled
            </div>
          )}
          {googleRatingMocks[props.index] && (
            <GoogleRating data={googleRatingMocks[props.index]} />
          )}
          <button
            className="flex gap-1 items-center p-2 border border-gray-300 rounded-full hover:border-transparent transition-all cursor-pointer"
            onClick={onSavePartner}
          >
            <Image width={14} height={14} src={SaveIcon} alt="Save icon" />
            <span className="text-[10px]/[14px] font-medium">Save</span>
          </button>
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
