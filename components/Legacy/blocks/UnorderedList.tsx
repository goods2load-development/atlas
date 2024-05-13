import LegacyBlock from "../LegacyBlock";
import { ILegacyDataBlockBody } from "../types";

export default function UnorderedList({
  content,
  additionalContent,
}: ILegacyDataBlockBody) {
  return (
    <ul className="list-disc list-outside">
      {content?.map((__html) => (
        <li
          key={__html}
          className="ml-6"
          dangerouslySetInnerHTML={{ __html }}
        />
      ))}
      {additionalContent && <LegacyBlock content={additionalContent} />}
    </ul>
  );
}
