import { ArrowDropDownCircleOutlined } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Stack,
    Typography,
} from "@mui/material";
import { FAQs } from "../../lib/types";
import { v4 } from "uuid";

const FAQAccordion = ({ faqs }: { faqs: FAQs[] }) => {
    return (
        <Stack spacing={2} sx={{ mt: 5 }}>
            {faqs.map((faq) => (
                <Accordion
                    key={v4()}
                    square
                    sx={{
                        borderRadius: "12px",
                        p: 1,
                        "&:before": { height: "0px" },
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ArrowDropDownCircleOutlined />}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {faq.question}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color="textSecondary">
                            {faq.answer}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Stack>
    );
};

export default FAQAccordion;
