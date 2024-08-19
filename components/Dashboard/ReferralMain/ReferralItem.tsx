import { TrashIcon, ArrowUpRight, GripVertical } from "lucide-react";
import type { ReferralItemType } from "./types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import EditReferralDialog from "./EditReferralDialog";
import BannerPreview from "./BannerPreview";

const ReferralItem = ({
  referralItem,
  deleteReferralById,
  editReferral,
}: {
  referralItem: ReferralItemType;
  deleteReferralById: (id: string) => void;
  editReferral: (
    oldData: ReferralItemType,
    data: ReferralItemType,
    id: string
  ) => void;
}) => {
  const { title, url, id, picture } = referralItem;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      transition: {
        duration: 150,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex gap-2">
      <button {...attributes} {...listeners}>
        <GripVertical size={40} strokeWidth={2.75} />
      </button>
      <div
        className="flex items-center border border-orange-500 p-4 w-full
    rounded-lg shadow-lg bg-white hover:bg-orange-100 transition duration-300 ease-in-out"
      >
        <h2 className="max-w-[300px] text-lg md:text-2xl font-semibold text-orange-700">
          {title}
        </h2>
        <div className="flex gap-2 ml-auto">
          <BannerPreview image={picture} />
          <EditReferralDialog
            editReferral={editReferral}
            referralItem={referralItem}
          />
          <button onClick={() => deleteReferralById(id)} title="Delete">
            <TrashIcon />
          </button>
          <Link title="Check url" href={url} target="_blank">
            <ArrowUpRight size={30} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReferralItem;
