import React from "react";
import {
    Heading,
    HStack,
    Flex,
    Spacer,
    Box,
    Icon,
    IconButton,
} from "@chakra-ui/react";
import ThemeToggler from "./ThemeToggler";
import { Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";

const Header = () => {
    return (
        <Flex width="full" mb={20}>
            <Box>
                <Link to="/">
                    <Heading
                        fontWeight="extrabold"
                        size="2xl"
                        bgGradient="linear(to-r, cyan.600, cyan.300, blue.500)"
                        bgClip="text"
                    >
                        Crypto Sentiments
                    </Heading>
                </Link>
            </Box>
            <Spacer />
            <HStack spacing="24px">
                <Box>
                    <Link to="/about">
                        <Heading
                            fontWeight="extrabold"
                            size="2xl"
                            bgGradient="linear(to-r, cyan.600, cyan.300, blue.500)"
                            bgClip="text"
                        >
                            About
                        </Heading>
                    </Link>
                </Box>
                <Box>
                    <IconButton
                        onClick={() => {
                            window.open(
                                "https://github.com/ywalia01/crypto-sentiments",
                                "_blank"
                            );
                        }}
                        variant="ghost"
                        isRound="true"
                        size="lg"
                    >
                        <Icon as={AiFillGithub} w={6} h={6}></Icon>
                    </IconButton>
                </Box>
                <Box>
                    <ThemeToggler />
                </Box>
            </HStack>
        </Flex>
    );
};

export default Header;
