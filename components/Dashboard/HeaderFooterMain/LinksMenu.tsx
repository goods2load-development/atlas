"use client";

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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { closestCorners } from "@dnd-kit/core";
import { GripVertical, Trash } from "lucide-react";
import {
  addItemToChildrenByTitle,
  deleteItemByTitle,
  editItemByTitle,
  replaceChildrenByTitle,
} from "./utils";
import LinkDialog from "./LinkDialog";

const LinksMenu = ({
  data,
  setData,
}: {
  data: HeaderFooterData;
  setData: React.Dispatch<React.SetStateAction<HeaderFooterData | null>>;
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onAddNewItem = (data: { href: string; title: string }, id: string) => {
    setData((prev: HeaderFooterData | null) => {
      const newItems = addItemToChildrenByTitle(
        [...(prev as HeaderFooterData).json],
        id,
        data
      );

      return {
        ...prev,
        json: newItems,
      } as HeaderFooterData;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over?.id) {
      const activeIndex = data.json.findIndex(
        ({ title }) => title === active.id
      );
      const overIndex = data.json.findIndex(({ title }) => title === over.id);

      setData({
        ...data,
        json: arrayMove(data.json, activeIndex, overIndex),
      });
    }
  };

  return (
    <ul className="bg-white shadow-lg rounded-lg p-4 space-y-2">
      <LinkDialog type="create" addNewItem={(data) => onAddNewItem(data, "")} />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={data.json.map((item) => item.title)}
          strategy={verticalListSortingStrategy}
        >
          {data.json.map((item, index) => (
            <MenuItem
              key={index}
              item={item}
              id={item.title}
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
  setHeaderDataDynamic: React.Dispatch<
    React.SetStateAction<HeaderFooterData | null>
  >;
  onAddNewItem: (newItem: { href: string; title: string }, id: string) => void;
}) => {
  const items = item?.children?.map((item) => item.title) || [];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
    setHeaderDataDynamic((prev: HeaderFooterData | null) => {
      const newItems = deleteItemByTitle(
        [...(prev as HeaderFooterData).json],
        id
      );

      return {
        ...prev,
        json: newItems,
      } as HeaderFooterData;
    });
  };

  const onEditItem = (data: { href: string; title: string }) => {
    setHeaderDataDynamic((prev: HeaderFooterData | null) => {
      const newItems = editItemByTitle(
        [...(prev as HeaderFooterData).json],
        id,
        data
      );

      return {
        ...prev,
        json: newItems,
      } as HeaderFooterData;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (!item.children?.length) return;

    const { active, over } = event;

    if (over && active.id !== over?.id) {
      const activeIndex = item.children.findIndex(
        ({ title }) => title === active.id
      );
      const overIndex = item.children.findIndex(
        ({ title }) => title === over.id
      );

      const result = arrayMove(item.children, activeIndex, overIndex);

      setHeaderDataDynamic((prev: HeaderFooterData | null) => {
        const newItems = replaceChildrenByTitle(
          [...(prev as HeaderFooterData).json],
          result[0].title,
          result
        );

        return {
          ...prev,
          json: newItems,
        } as HeaderFooterData;
      });
    }
  };

  return (
    <li ref={setNodeRef} style={style} className="pl-4 py-2">
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items as string[]}
          strategy={verticalListSortingStrategy}
        >
          {item.children && (
            <ul className="ml-4 mt-2 border-l-2 border-gray-300">
              {item.children.map((child, index) => (
                <MenuItem
                  key={index}
                  item={child}
                  id={child.title}
                  setHeaderDataDynamic={setHeaderDataDynamic}
                  onAddNewItem={onAddNewItem}
                />
              ))}
            </ul>
          )}
        </SortableContext>
      </DndContext>
    </li>
  );
};

export default LinksMenu;
