import React from "react";
import { Stack, Flex, Text, Heading } from "@chakra-ui/react";

const About = () => {
    return (
        <Flex maxW="50%" ml="auto" mr="auto" mb={20}>
            <Stack spacing={3}>
                <Heading
                    mb={3}
                    fontWeight="extrabold"
                    size="xl"
                    bgGradient="linear(to-r, cyan.600, cyan.300, blue.500)"
                    bgClip="text"
                >
                    Theory
                </Heading>
                <Text fontSize="xl">
                    Sentiment Analysis is an application of Machine Learning
                    where a piece of text is analyzed using a computer model to
                    determine the ‘sentiment’ behind the tweet, such as Positive
                    or Negative about a particular topic.
                </Text>
                <Text fontSize="xl">
                    Python is a great language to perform this type of analysis
                    given any source of writing due to the Natural Language
                    Processing abilities and libraries and packages developed
                    specifically for Sentiment Analysis.
                </Text>
                <Text fontSize="xl">
                    Due to the immense amount of social media available, there
                    is a tremendous opportunity to be able to understand
                    sentiment about a given topic in real time.
                </Text>
                <Text fontSize="xl">
                    The capabilities of sentiment analysis will be used to
                    create buy and sell signals for a crypto trading bot, which
                    will anticipate price movement by current sentiment of top
                    ‘influencer’ twitter traders, compared with historic
                    averages.
                </Text>
                <Text fontSize="xl">
                    Twitter posts will be used as the source of content upon
                    which sentimental analysis will be performed, with historic
                    values tracked and compared to inform trading strategy.
                </Text>
                <Heading
                    mt={5}
                    mb={3}
                    fontWeight="extrabold"
                    size="xl"
                    bgGradient="linear(to-r, cyan.600, cyan.300, blue.500)"
                    bgClip="text"
                >
                    Working of the application
                </Heading>
            </Stack>
        </Flex>
    );
};

export default About;
