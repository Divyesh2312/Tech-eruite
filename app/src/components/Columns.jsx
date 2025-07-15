import React from "react";
import { Button, Stack, Tooltip } from "@mui/material";
import { MdVisibility, MdEdit, MdDelete } from "react-icons/md";

export const productColumns = (onView, onEdit, onDelete) => [
  {
    name: "Product Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row) => row.description,
    sortable: true,
  },
  {
    name: "Price",
    selector: (row) => row.price,
    sortable: true,
  },
  {
    name: "Quantity",
    selector: (row) => row.quantity,
    sortable: true,
  },
  {
    name: "Categories",
    selector: (row) =>
      row.categories?.map((c) => c.name).join(", ") || "N/A",
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row) => (
      <Stack direction="row" spacing={0.25}>
        <Tooltip title="View">
          <Button
            size="small"
            color="primary"
            onClick={() => onView(row._id)}
          >
            <MdVisibility />
          </Button>
        </Tooltip>

        <Tooltip title="Edit">
          <Button
            size="small"
            color="warning"
            onClick={() => onEdit(row._id)}
          >
            <MdEdit />
          </Button>
        </Tooltip>

        <Tooltip title="Delete">
          <Button
            size="small"
            color="error"
            onClick={() => onDelete(row._id)}
          >
            <MdDelete />
          </Button>
        </Tooltip>
      </Stack>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
