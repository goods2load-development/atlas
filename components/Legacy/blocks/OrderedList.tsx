import LegacyBlock from "../LegacyBlock";
import { ILegacyDataBlockBody } from "../types";

export default function OrderedList({
  content,
  additionalContent,
}: ILegacyDataBlockBody) {
  return (
    <ol className="list-outside list-decimal ml-6">
      {content?.map((__html) => (
        <li key={__html} dangerouslySetInnerHTML={{ __html }} />
      ))}
      {additionalContent && <LegacyBlock content={additionalContent} />}
    </ol>
  );
}
