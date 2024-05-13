import LegacyBlock from "../LegacyBlock";
import { ILegacyDataBlockBody } from "../types";

export default function Paragraph({
  content,
  additionalContent,
}: ILegacyDataBlockBody) {
  return (
    <div>
      {content?.map((__html) => (
        <p key={__html} dangerouslySetInnerHTML={{ __html }} />
      ))}
      {additionalContent && <LegacyBlock content={additionalContent} />}
    </div>
  );
}
