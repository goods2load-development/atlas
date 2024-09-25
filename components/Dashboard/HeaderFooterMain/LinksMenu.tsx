"use client";

import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useFooterHeaderStore } from "@/lib/store";
import { HeaderFooterData, FooterItem } from "./types";
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

const LinksMenu = ({
  data,
  setData,
}: {
  data: HeaderFooterData;
  setData: any;
}) => {
  const items = useMemo(() => {
    if (!data) return [];

    return mapHrefs(data.json);
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onAddNewItem = (data: { href: string; title: string }, id: string) => {
    setData((prev: HeaderFooterData) => {
      const newItems = addItemToChildrenByHref([...prev.json], id, data);

      return {
        ...prev,
        json: newItems,
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    console.log({ event });
    const { active, over } = event;
    if (!over || active.id === over.id) return;
  };

  return (
    <ul className="bg-white shadow-lg rounded-lg p-4 space-y-2">
      <LinkDialog type="create" addNewItem={(data) => onAddNewItem(data, "")} />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {data.json.map((item, index) => (
            <MenuItem
              key={index}
              item={item}
              id={item.href}
              setHeaderDataDynamic={setData}
              onAddNewItem={onAddNewItem}
            />
          ))}
        </SortableContext>
      </DndContext>
    </ul>
  );
};

const MenuItem = ({
  item,
  id,
  setHeaderDataDynamic,
  onAddNewItem,
}: {
  item: FooterItem;
  id: string;
  setHeaderDataDynamic: any;
  onAddNewItem: any;
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
    setHeaderDataDynamic((prev: HeaderFooterData) => {
      const newItems = deleteItemByHref([...prev.json], id);

      return {
        ...prev,
        json: newItems,
      };
    });
  };

  const onEditItem = (data: { href: string; title: string }) => {
    setHeaderDataDynamic((prev: HeaderFooterData) => {
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
        <LinkDialog
          type="create"
          addNewItem={(data) => onAddNewItem(data, id)}
        />
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
              setHeaderDataDynamic={setHeaderDataDynamic}
              onAddNewItem={onAddNewItem}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default LinksMenu;
