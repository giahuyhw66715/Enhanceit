import { Chip, Container, Stack, TextField } from "@mui/material";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAllPhotos } from "../lib/actions/photos";
import Loading from "../components/common/Loading";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router-dom";
import CustomImageList from "../components/common/CustomImageList";
import Heading from "../components/common/Heading";
import { getAllTags } from "../lib/actions/tags";
import NotFoundPage from "./NotFoundPage";

const PhotoPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tags = searchParams.getAll("tags");
    const limit = parseInt(searchParams.get("limit") || "10");
    const title = searchParams.get("title") || "";

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        if (e.key === "Backspace") {
            console.log(value);
            setSearchParams({});
        }
        if (e.key === "Enter") {
            setSearchParams({
                title: value,
            });
        }
    };

    const handleSelectTag = (tag: string) => {
        if (tags.includes(tag)) {
            setSearchParams({ tags: tags.filter((t) => t !== tag) });
        } else {
            setSearchParams({ tags: [...tags, tag] });
        }
    };

    const { data: allTags, isLoading } = useQuery({
        queryKey: ["tags"],
        queryFn: () => getAllTags(),
        retry: false,
    });

    // Fetch images
    const { data, status, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ["photos", { limit, tags, title }],
            queryFn: ({ pageParam }) =>
                getAllPhotos({ page: pageParam, limit, tags, title }),
            initialPageParam: 1,
            getNextPageParam: (lastPage) => lastPage.page + 1,
        });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    const images = data?.pages.flatMap((page) => page.data);

    if (status === "pending") return <Loading />;
    if (status === "error") return <NotFoundPage />;

    return (
        <Container maxWidth="xl">
            <Stack
                spacing={4}
                sx={{ mb: 10 }}
                alignItems="center"
                justifyContent="center"
            >
                <Heading title="Discover HD Wallpapers" />
                <TextField
                    label="Search"
                    sx={{ width: "100%", maxWidth: 800 }}
                    onKeyDown={handleSearch}
                />
                {isLoading && <Loading />}
                {allTags && (
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            maxWidth: "100%",
                            overflowX: "scroll",
                            scrollbarWidth: "none", // Ẩn scrollbar trên Firefox
                            "&::-webkit-scrollbar": {
                                display: "none", // Ẩn scrollbar trên Chrome, Safari
                            },
                        }}
                    >
                        {allTags?.map((tag) => (
                            <Chip
                                key={tag.slug}
                                label={tag.name}
                                color={
                                    tags.includes(tag.slug)
                                        ? "secondary"
                                        : "default"
                                }
                                onClick={() => handleSelectTag(tag.slug)}
                            />
                        ))}
                    </Stack>
                )}
            </Stack>
            <CustomImageList
                photos={images || []}
                imageListProps={{
                    variant: "masonry",
                }}
            />
            <div ref={ref}>{inView && isFetchingNextPage && <Loading />}</div>
        </Container>
    );
};

export default PhotoPage;
