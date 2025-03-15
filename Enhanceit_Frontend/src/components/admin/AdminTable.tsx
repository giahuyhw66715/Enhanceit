import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Stack,
} from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const paginationModel = { page: 0, pageSize: 5 };

export default function AdminTable<T>({
    rows = [],
    columns,
    editTag,
    onDelete = () => {},
    isDeleting = false,
}: {
    rows: T[] | undefined;
    columns: GridColDef[];
    editTag?: string;
    onDelete?: (id: string) => void;
    isDeleting?: boolean;
}) {
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [id, setId] = useState<string>("");

    const tableColumns = [
        ...columns,
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,

            renderCell: (params: GridCellParams) => {
                return (
                    <Stack
                        direction="row"
                        sx={{ alignItems: "center", height: "100%" }}
                    >
                        <IconButton
                            color="success"
                            size="small"
                            onClick={() =>
                                navigate(
                                    `/management/${editTag}/edit/${
                                        params.row.slug || params.row.id
                                    }`
                                )
                            }
                        >
                            <EditOutlined />
                        </IconButton>
                        <IconButton
                            color="error"
                            size="small"
                            onClick={() => {
                                setOpen(true);
                                setId(params.row.slug || params.row.id);
                            }}
                        >
                            <DeleteOutlined />
                        </IconButton>
                    </Stack>
                );
            },
        },
    ];

    return (
        <Paper sx={{ width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={tableColumns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                onCellClick={(_, event) => event.stopPropagation()}
                sx={{ border: 0 }}
            />
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-title-dialog"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-paper": {
                        p: 1,
                        borderRadius: "12px",
                    },
                }}
            >
                <DialogTitle id="alert-title-dialog">
                    Are you sure you want to delete?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action cannot be undone!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="inherit" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        loading={isDeleting}
                        variant="contained"
                        color="error"
                        onClick={() => {
                            onDelete?.(id);
                            setOpen(false);
                        }}
                        autoFocus
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
