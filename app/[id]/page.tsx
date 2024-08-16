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
  useState(() => {
    fetch(`${pathname}.json`)
      .then((response) => response.json())
      .then((data) => setData(data));
  });

  // TODO add redirect to 404
  if (!data) return null;
  return (
    <SEOPagesTemplate
      imgSrc={data.imgSrc}
      imgSrcMobile={data.imgSrcMobile}
      title={data.title}
    >
      {data.content.map((item: any) => {
        switch (item.type) {
          case "quote":
            return <Quote>{item.text}</Quote>;
          case "subTitle":
            return <SubTitle colored={item.colored}>{item.text}</SubTitle>;
          case "markedList":
            return <MarkedList items={item.text} />;
          case "image":
            return (
              <>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="hidden md:block"
                />
                <img
                  src={item.srcMobile}
                  alt={item.alt}
                  className="md:hidden block mx-auto"
                />
              </>
            );
          case "orderedList":
            return <OrderedList items={item.text} />;
          default:
            return (
              <p
                dangerouslySetInnerHTML={{ __html: item.text }}
                className="[&>a]:text-orangePrimary"
              />
            );
        }
      })}
    </SEOPagesTemplate>
  );
}
