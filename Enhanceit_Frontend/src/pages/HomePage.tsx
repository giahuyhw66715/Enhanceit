import { Container } from "@mui/material";
import HomeBanner from "../components/home/HomeBanner";
import HomeReview from "../components/home/HomeReview";
import HomeSuitableJobs from "../components/home/HomeSuitableJobs";
import HomeIntro from "../components/home/HomeIntro";
import HomeExplore from "../components/home/HomeExplore";

const HomePage = () => {
    return (
        <div>
            <Container>
                <HomeBanner />
                <HomeIntro />
                <HomeSuitableJobs />
            </Container>
            <HomeReview />
            <Container>
                <HomeExplore />
            </Container>
        </div>
    );
};

export default HomePage;
