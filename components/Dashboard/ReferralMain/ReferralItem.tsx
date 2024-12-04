import BannerPreview from './BannerPreview';
import EditReferralDialog from './EditReferralDialog';
import type { ReferralItemType } from './types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { ArrowUpRight, GripVertical, TrashIcon } from 'lucide-react';
import Link from 'next/link';

import ConfirmDialog from '@/components/ui/confirm-dialog';
import ListItem from '@/components/ui/list-item';

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
    id: string,
  ) => void;
}) => {
  const { title, url, id, bigBanner, smallBanner } = referralItem;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      transition: {
        duration: 150,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
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
      <ListItem>
        <h2 className="max-w-[300px] text-lg md:text-2xl font-semibold text-orange-700">
          {title}
        </h2>
        <div className="flex gap-2 ml-auto">
          <BannerPreview bigBanner={bigBanner} smallBanner={smallBanner} />
          <EditReferralDialog
            editReferral={editReferral}
            referralItem={referralItem}
          />
          <ConfirmDialog
            trigger={
              <button title="Delete">
                <TrashIcon />
              </button>
            }
            title="Confirm Deletion"
            description="Are you sure you want to delete this referral? This action cannot be undone."
            confirmLabel="Yes, delete"
            cancelLabel="No, cancel"
            onConfirm={() => deleteReferralById(id)}
          />
          <Link title="Check url" href={url} target="_blank">
            <ArrowUpRight size={30} />
          </Link>
        </div>
      </ListItem>
    </div>
  );
};

export default ReferralItem;
