"use client";
import { usePathname } from "next/navigation";
import SEOPagesTemplate, {
  MarkedList,
  OrderedList,
  Quote,
  SubTitle,
} from "@/components/common/SEOpagesTemplate";
import { useState } from "react";

export default function Page() {
  const pathname = usePathname();
  const [data, setData] = useState<any>(undefined);
  // TODO add proper path for JSON files
  fetch(`${pathname}.json`)
    .then((response) => response.json())
    .then((data) => setData(data));
  // TODO add redirect to 404
  if (!data) return null;
  return (
    <SEOPagesTemplate imgSrc={data.imgSrc} title={data.title}>
      {data.content.map((item: any) => {
        switch (item.type) {
          case "quote":
            return <Quote>{item.text}</Quote>;
          case "subTitle":
            return <SubTitle>{item.text}</SubTitle>;
          case "markedList":
            return <MarkedList items={item.text} />;
          case "image":
            return <img src={item.text} />;
          case "orderedList":
            return <OrderedList items={item.text} />;
          default:
            return <p>{item.text}</p>;
        }
      })}
    </SEOPagesTemplate>
  );
}
