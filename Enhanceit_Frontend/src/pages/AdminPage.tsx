import {
    AutoFixHighOutlined,
    PeopleOutlineOutlined,
    PhotoOutlined,
    SvgIconComponent,
} from "@mui/icons-material";
import { Grid2, Stack, SvgIcon, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/config/axiosConfig";
import Loading from "../components/common/Loading";
import NotFoundPage from "./NotFoundPage";

type Stats = {
    users: number;
    photos: number;
    tools: number;
};

const AdminPage = () => {
    const {
        data: stats,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["stats"],
        queryFn: async (): Promise<Stats> => {
            const response = await axiosInstance.get("/stats");
            return response.data;
        },
    });

    if (isLoading) return <Loading />;
    if (isError) return <NotFoundPage />;

    return (
        <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 6, sm: 12, md: 6, lg: 4 }}>
                <AdminStatBox
                    icon={PeopleOutlineOutlined}
                    total={stats?.users}
                />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 12, md: 6, lg: 4 }}>
                <AdminStatBox icon={PhotoOutlined} total={stats?.photos} />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 12, md: 6, lg: 4 }}>
                <AdminStatBox icon={AutoFixHighOutlined} total={stats?.tools} />
            </Grid2>
        </Grid2>
    );
};

function AdminStatBox({
    icon,
    total,
}: {
    icon: SvgIconComponent;
    total: number | undefined;
}) {
    return (
        <Stack
            spacing={2}
            sx={{ bgcolor: "#fff", borderRadius: "12px", boxShadow: 3, p: 5 }}
        >
            <SvgIcon component={icon} sx={{ fontSize: 50 }} />
            <Typography variant="h4">{total}</Typography>
        </Stack>
    );
}

export default AdminPage;
