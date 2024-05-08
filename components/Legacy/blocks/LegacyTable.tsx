import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { ILegacyDataBlockBody } from "../types";

export default function LegacyTable({ tableContent }: ILegacyDataBlockBody) {
  return tableContent ? (
    <Table className="[&_a]:break-all">
      <TableHeader>
        <TableRow>
          {tableContent.columns.map((column) => {
            const columnWidth = `w-1/${tableContent.columns.length}`;
            return (
              <TableHead className={`${columnWidth}`} key={column}>
                {column}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableContent.rows.map((row, index) => (
          <TableRow key={index}>
            {row.map((__html) => (
              <TableCell key={__html} dangerouslySetInnerHTML={{ __html }} />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <></>
  );
}
