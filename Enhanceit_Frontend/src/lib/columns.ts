import { GridColDef } from "@mui/x-data-grid";
import { Tag } from "./types";
import formatBytes from "../utils/formatBytes";

export const tagColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 230 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "slug", headerName: "Slug", width: 100 },
];

export const toolColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "slug", headerName: "Slug", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "image", headerName: "Image", width: 130 },
    { field: "input", headerName: "Demo Input", width: 130 },
    { field: "output", headerName: "Demo Output", width: 130 },
];

export const photoColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "url", headerName: "URL", width: 150, sortable: false },
    {
        field: "file_size",
        headerName: "File Size",
        width: 100,
        sortable: false,
        valueGetter: (value: number) => formatBytes(value),
    },
    {
        field: "resolution",
        headerName: "Resolution",
        width: 100,
        sortable: false,
    },
    { field: "author", headerName: "Author", width: 130 },
    {
        field: "tags",
        headerName: "Tags",
        width: 200,
        sortable: false,
        valueGetter: (value: Tag[]) => value.map((tag) => tag.name).join(", "),
    },
];

export const userColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "fullname", headerName: "Full name", width: 130 },
    { field: "subscription_plan", headerName: "Plan", width: 70 },
    { field: "subscription_expires", headerName: "Expires", width: 100 },
    { field: "credits", headerName: "Credits", width: 70 },
    { field: "role", headerName: "Role", width: 100 },
];

export const faqsColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "toolName", headerName: "Tool Name", width: 150 },
    { field: "toolSlug", headerName: "Tool Slug", width: 150 },
    { field: "question", headerName: "Question", width: 250 },
    { field: "answer", headerName: "Answer", width: 250 },
];
