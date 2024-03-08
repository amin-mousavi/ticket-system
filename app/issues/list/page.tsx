import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueTable, { IssueQuery, columnsName } from "./IssueTable";
import IssuesAction from "./IssuesAction";
import { Box, Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnsName.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: { status },
  });

  return (
    <Flex direction="column" gap="3">
      <IssuesAction />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Box className="self-center">
        <Pagination
          itemCount={issueCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </Box>
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Issue List",
  description: "View all project issues",
};

export default IssuesPage;
