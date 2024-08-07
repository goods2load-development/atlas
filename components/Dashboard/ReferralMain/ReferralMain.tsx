"use client";

import { useEffect, useState } from "react";
import AddNewReferralDialog from "./AddNewReferralDialog";
import ReferralItem from "./ReferralItem";
import { ReferralItemType } from "./types";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useReferralsStore } from "@/lib/store";
import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";

const ReferralMain = () => {
  const { getAllReferrals, isReferralsLoading, referrals } = useReferralsStore(
    (state: any) => state
  );
  const [referralsItems, setReferralsItems] = useState<ReferralItemType[]>([]);

  const isAnyChanges =
    JSON.stringify(referrals) !== JSON.stringify(referralsItems);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    getAllReferrals();
  }, []);

  useEffect(() => {
    if (!referrals.length) return;

    setReferralsItems(referrals);
  }, [referrals]);

  const addNewReferral = (data: ReferralItemType) => {
    setReferralsItems((prev) => [...prev, data]);
  };

  const handleDragEnd = ({ active, over }: any) => {
    if (over && active.id !== over?.id) {
      const activeIndex = referralsItems.findIndex(
        ({ id }) => id === active.id
      );
      const overIndex = referralsItems.findIndex(({ id }) => id === over.id);

      setReferralsItems(arrayMove(referralsItems, activeIndex, overIndex));
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px] text-center md:text-left">
          Referrals
        </h1>
        <div className="flex gap-2">
          <AddNewReferralDialog addNewReferral={addNewReferral} />
          <Button
            disabled={!isAnyChanges}
            type="submit"
            className="bg-orangePrimary border-2 border-orangePrimary rounded-[8px] font-medium text-[16px]/[22px] w-full"
          >
            Update
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {isReferralsLoading ? (
          <Loader />
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={referralsItems.map((item) => item.id)}
              strategy={rectSortingStrategy}
            >
              {referralsItems.map((item) => (
                <ReferralItem key={item.id} referralItem={item} />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};

export default ReferralMain;
