"use client";

import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useFooterStore } from "@/lib/store";
import { FooterData, FooterItem } from "./types";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { closestCorners, defaultDropAnimation } from "@dnd-kit/core";
import { CirclePlus, GripVertical, Trash } from "lucide-react";
import {
  addItemToChildrenByHref,
  deleteItemByHref,
  editItemByHref,
  mapHrefs,
} from "./utils";
import LinkDialog from "./LinkDialog";
import { Button } from "@/components/ui/button";

const MenuItem = ({
  item,
  id,
  setFooterDataDynamic,
}: {
  item: FooterItem;
  id: string;
  setFooterDataDynamic: any;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id,
    transition: {
      duration: 150,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isOver ? "orange" : "transparent",
  };

  const onDeleteItem = () => {
    setFooterDataDynamic((prev: FooterData) => {
      const newItems = deleteItemByHref([...prev.json], id);

      return {
        ...prev,
        json: newItems,
      };
    });
  };

  const onAddNewItem = (data: { href: string; title: string }) => {
    setFooterDataDynamic((prev: FooterData) => {
      const newItems = addItemToChildrenByHref([...prev.json], id, data);

      return {
        ...prev,
        json: newItems,
      };
    });
  };

  const onEditItem = (data: { href: string; title: string }) => {
    setFooterDataDynamic((prev: FooterData) => {
      const newItems = editItemByHref([...prev.json], id, data);

      return {
        ...prev,
        json: newItems,
      };
    });
  };

  return (
    <li ref={setNodeRef} style={style} className="pl-4 py-2 ">
      <div className="flex items-center gap-1">
        <button {...attributes} {...listeners}>
          <GripVertical size={15} strokeWidth={2.75} />
        </button>
        <a href={item.href} className="text-blue-500 hover:text-blue-700">
          {item.title}
        </a>
        <button onClick={onDeleteItem} title="delete">
          <Trash size={15} color="orange" />
        </button>
        <LinkDialog type="create" addNewItem={onAddNewItem} />
        <LinkDialog
          type="edit"
          editItem={onEditItem}
          data={{
            title: item.title,
            href: item.href,
          }}
        />
      </div>
      {item.children && (
        <ul className="ml-4 mt-2 border-l-2 border-gray-300">
          {item.children.map((child, index) => (
            <MenuItem
              key={index}
              item={child}
              id={child.href}
              setFooterDataDynamic={setFooterDataDynamic}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const FooterMain = () => {
  const { toast } = useToast();
  const { footerData, isFooterLoading, getFooterData } = useFooterStore();
  const [footerDataDynamic, setFooterDataDynamic] = useState<FooterData | null>(
    footerData
  );

  const hasAnyChanges = useMemo(() => {
    if (!footerData) return false;

    return JSON.stringify(footerData) !== JSON.stringify(footerDataDynamic);
  }, [footerData, footerDataDynamic]);

  const items = useMemo(() => {
    if (!footerDataDynamic) return [];

    return mapHrefs(footerDataDynamic.json);
  }, [footerDataDynamic]);

  useEffect(() => {
    getFooterData();
  }, []);

  useEffect(() => {
    if (footerData) {
      setFooterDataDynamic(footerData);
    }
  }, [footerData]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    console.log({ event });
    const { active, over } = event;
    if (!over || active.id === over.id) return;
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-8 gap-2">
        <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px] text-center md:text-left">
          Footer
        </h1>
        {isFooterLoading && <Spinner />}
        <Button disabled={isFooterLoading || !hasAnyChanges} className="ml-auto">Update</Button>
      </div>

      <div
        className={clsx("flex flex-col gap-4", {
          "pointer-events-none": isFooterLoading,
        })}
      >
        {footerDataDynamic?.json?.length && (
          <ul className="bg-white shadow-lg rounded-lg p-4 space-y-2">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
              >
                {footerDataDynamic.json.map((item, index) => (
                  <MenuItem
                    key={index}
                    item={item}
                    id={item.href}
                    setFooterDataDynamic={setFooterDataDynamic}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </ul>
        )}
      </div>
    </div>
  );
};

export default FooterMain;
