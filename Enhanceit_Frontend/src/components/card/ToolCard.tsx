import { Card, CardContent, CardMedia, Link, Typography } from "@mui/material";
import { Tool } from "../../lib/types";

const ToolCard = ({ tool }: { tool: Tool }) => {
    return (
        <Card sx={{ height: "100%" }}>
            <Link href={`/tools/${tool.slug}`}>
                <CardMedia sx={{ height: 200 }} image={tool.image} />
            </Link>
            <CardContent>
                <Link
                    href={`/tools/${tool.slug}`}
                    variant="h6"
                    sx={{ fontWeight: 600 }}
                >
                    {tool.title}
                </Link>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                        mt: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "3",
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {tool.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ToolCard;
