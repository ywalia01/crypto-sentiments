import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import StonksImg from "../assets/img/stonks.jpg";

function Home() {
    return (
        <Box style={{ marginTop: "0px" }}>
            <img
                alt="stonks"
                src={StonksImg}
                style={{ width: "750px", borderRadius: "25px" }}
            ></img>
            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Link to="/form">
                    <Button colorScheme="teal">Go to Form</Button>
                </Link>
            </div>
        </Box>
    );
}

export default Home;
