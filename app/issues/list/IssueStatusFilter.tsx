"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const IssueStatusFilter = () => {
  const router = useRouter();
  const statuses: { label: string; value?: Status }[] = [
    { label: "All" },
    {
      label: "Open",
      value: "OPEN",
    },
    {
      label: "In Progress",
      value: "IN_PROGRESS",
    },
    {
      label: "Closed",
      value: "CLOSED",
    },
  ];
  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status !== "ALL" ? `?status=${status}` : "";
        router.push(`/issues/list${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {statuses?.map((status) => (
            <Select.Item key={status.label} value={status.value || "ALL"}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
