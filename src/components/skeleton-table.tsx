/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type FC } from "react";
import { Skeleton } from "~/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/ui/table";

type Props = {
  tableHeader?: React.ReactNode;
  columnCount?: number;
};

export const SkeletonTable: FC<Props> = ({
  tableHeader,
  columnCount,
}: Props) => {
  return (
    <Table className="mb-4 table-auto rounded-md">
      {tableHeader ? (
        tableHeader
      ) : (
        <TableHeader>
          <TableRow>
            {[...Array(columnCount)].map((_, i) => (
              <TableHead
                key={`skeleton-table-head-${i}`}
                className="text-center"
              >
                <Skeleton className="h-4 w-full md:h-6" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {[...Array(10)].map((_, i) => (
          <TableRow key={`skeleton-table-row-${i}`}>
            {[...Array(columnCount)].map((_, i) => (
              <TableCell
                key={`skeleton-table-cell-${i}`}
                className="text-center"
              >
                <Skeleton className="h-4 w-full md:h-6" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
