"use client";

import { useEffect, useState } from "react";
import AddNewReferralDialog from "./AddNewReferralDialog";
import ReferralItem from "./ReferralItem";
import { ReferralItemType } from "./types";
import * as Slider from "@radix-ui/react-slider";
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
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { removeEqualFields } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const ReferralMain = () => {
  const {
    getAllReferrals,
    postNewReferral,
    updateAllReferrals,
    deleteReferral,
    updateReferral: editReferralById,
    updateReferralsViewCount,
    isReferralsLoading,
    referrals: referralsData,
  } = useReferralsStore((state: any) => state);
  const { referals: referrals = [], slicePerReferals = null } = referralsData;
  const { toast } = useToast();

  const [referralsItems, setReferralsItems] = useState<ReferralItemType[]>([]);
  const [localSlicePerReferals, setLocalSlicePerReferals] = useState<
    null | number[]
  >(null);

  const isReferralsChanged =
    JSON.stringify(referrals) !== JSON.stringify(referralsItems);
  const isSlicePerReferralsChanged =
    localSlicePerReferals?.[0] !== slicePerReferals;
  const isAnyChanges = isReferralsChanged || isSlicePerReferralsChanged;

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
    setLocalSlicePerReferals([slicePerReferals]);
  }, [referrals, slicePerReferals]);

  const addNewReferral = async (data: ReferralItemType) => {
    postNewReferral({
      ...data,
      picture: data.picture[0],
    })
      .then(getAllReferrals)
      .then(
        toast({
          title: "New referral added.",
          variant: "default",
          className: "bg-green-500",
        })
      );
  };

  const updateReferrals = () => {
    if (!isAnyChanges) return;

    const listOfUpdates = [
      ...(isSlicePerReferralsChanged
        ? [
            updateReferralsViewCount({
              value: localSlicePerReferals?.[0].toString(),
            }),
          ]
        : []),
      ...(isReferralsChanged
        ? [updateAllReferrals({ referals: referralsItems })]
        : []),
    ];

    Promise.all(listOfUpdates)
      .then(getAllReferrals)
      .then(() =>
        toast({
          title: "Referrals list updated.",
          variant: "default",
          className: "bg-green-500",
        })
      );
  };

  const deleteReferralById = (id: string) => {
    deleteReferral(id)
      .then(getAllReferrals)
      .then(
        toast({
          title: "Referral deleted.",
          variant: "default",
          className: "bg-green-500",
        })
      );
  };

  const editReferral = (
    oldData: ReferralItemType,
    data: ReferralItemType,
    id: string
  ) => {
    const dataClone = { ...data };
    delete (dataClone as any)["picture"];

    const newRef = {
      ...removeEqualFields(oldData, dataClone),
      ...((data.picture as unknown as FileList)?.[0]?.name && {
        file: data.picture[0],
      }),
    };

    editReferralById(newRef, id).then(getAllReferrals).then(
      toast({
        title: `Referral "${data.title}" edited.`,
        variant: "default",
        className: "bg-green-500",
      })
    );;
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
        <div
          className={clsx("flex items-center gap-2", {
            "pointer-events-none": isReferralsLoading,
          })}
        >
          {localSlicePerReferals && localSlicePerReferals}
          <Slider.Root
            className="relative flex items-center select-none touch-none w-[200px] h-5"
            value={localSlicePerReferals || [1]}
            onValueChange={(val) => setLocalSlicePerReferals(val)}
            min={1}
            max={3}
            step={1}
          >
            <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
              <Slider.Range className="absolute bg-orangePrimary rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-3 h-3 bg-white shadow-[0_2px_4px] shadow-blackA4 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_3px] focus:shadow-blackA5"
              aria-label="Slides"
            />
          </Slider.Root>
          <AddNewReferralDialog addNewReferral={addNewReferral} />
          <Button
            onClick={updateReferrals}
            disabled={!isAnyChanges}
            type="submit"
            className="bg-orangePrimary border-2 border-orangePrimary rounded-[8px] font-medium text-[16px]/[22px] w-full"
          >
            Update
          </Button>
        </div>
      </div>
      <div
        className={clsx("flex flex-col gap-4", {
          "pointer-events-none": isReferralsLoading,
        })}
      >
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
              <ReferralItem
                key={item.id}
                referralItem={item}
                deleteReferralById={deleteReferralById}
                editReferral={editReferral}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default ReferralMain;
