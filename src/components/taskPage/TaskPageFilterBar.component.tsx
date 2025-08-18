"use client";
import {
  Box,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { SortDir, SortKey } from "@/types/filter";
import SortDropdown from "./SortDropdown.component";
import FilterDropdownTrigger from "./FilterDropdownTrigger.component";

interface Props {
  feature: string;
  labels?: {
    labelId: string;
    labelName: string;
  }[];
  sortKey: SortKey;
  sortDir: SortDir;
  activeLabelsIds: string[];
}

export default function TaskFilterBar({ feature, labels, sortKey, sortDir, activeLabelsIds }: Props) {
  const router = useRouter();
  const search = useSearchParams();

  function updateQuery(updates: Record<string, string | null>) {
    const params = new URLSearchParams(search.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (!v) params.delete(k);
      else params.set(k, v);
    });
    router.push("?" + params.toString());
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      p={2}
      sx={{ borderBottom: "1px solid #ddd" }}
    >
      <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
        {feature.charAt(0).toUpperCase() + feature.slice(1)}
      </Typography>

      <Box display={"flex"} gap={2}>
        
        <FilterDropdownTrigger
          labels={labels}
          selectedLabels={activeLabelsIds}
          onChange={(newSelected) =>
            updateQuery({
              labels: newSelected.length > 0 ? newSelected.join(",") : null,
            })
          }
        />

        <SortDropdown 
          dir={sortDir} 
          sort={sortKey} 
          onChange={updateQuery}
        />

      </Box>
    </Box>
  );
}
