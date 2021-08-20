import React from "react";
import { useColorMode, IconButton } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggler() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <IconButton
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            variant="ghost"
            isRound="true"
            size="lg"
        />
    );
}
