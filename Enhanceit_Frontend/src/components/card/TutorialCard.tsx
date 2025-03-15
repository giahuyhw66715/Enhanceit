import { Card, CardContent, Chip, Typography, useTheme } from "@mui/material";

type TutorialCardProps = {
    step: number;
    title: string;
    description: string;
};

const TutorialCard = ({ step, title, description }: TutorialCardProps) => {
    const theme = useTheme();
    return (
        <Card
            sx={{
                borderRadius: "12px",
                backgroundColor: theme.palette.gray.light,
                p: 2,
                height: "100%",
            }}
        >
            <CardContent>
                <Chip
                    label={`Step ${step}`}
                    color="primary"
                    sx={{
                        mb: 2,
                        borderRadius: "6px",
                    }}
                />
                <Typography gutterBottom variant="h6" sx={{ fontWeight: 600 }}>
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", lineHeight: 1.5, mt: 1 }}
                >
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TutorialCard;
