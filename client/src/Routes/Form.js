import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    NumberInput,
    NumberInputField,
    Button,
    Select,
    Tooltip,
    Icon,
    Text,
} from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { Helmet } from "react-helmet";

const Form = () => {
    const [recData, SetRecData] = useState("");
    const [choice, setChoice] = useState("");
    const [num, setNum] = useState(1000);
    const [listings, setListings] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    // const apiUrl =
    //     "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    const corsUrl =
        "https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    const flaskUrl = "http://127.0.0.1:5000/api/v1";

    useEffect(() => {
        getListings();
    }, []);

    useEffect(() => {
        if (choice !== "") {
            setIsDisabled(false);
        }
    }, [choice]);

    const getListings = () => {
        const getListings = async () => {
            try {
                const headers = {
                    accept: "application/json",
                    "Content-Type": "application/json",
                    "X-CMC_PRO_API_KEY": process.env.REACT_APP_API_KEY,
                };
                const response = await axios.get(corsUrl, {
                    headers: headers,
                });
                if (response) {
                    console.log(response.data);
                    setListings(response.data);
                }
                // else {
                //     setListings()
                // }
            } catch (err) {
                console.log(err);
            }
        };
        getListings();
    };

    const getAnalysis = () => {
        const getAnalysis = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    flaskUrl + "?choice=" + choice + "&num=" + num
                );
                if (response) {
                    setIsLoading(false);
                    console.log(response.data);
                    let res = response.data;
                    SetRecData(res);
                }
            } catch (err) {
                SetRecData("Error");
                console.log(err);
            }
        };
        getAnalysis();
    };

    return (
        <Box style={{ marginTop: "30px" }} minW="35%">
            {recData === "" ? (
                <>
                    <Box
                        className="wrapper"
                        ml="auto"
                        mr="auto"
                        // direction="column"
                        // justify="center"
                        align="center"
                    >
                        <Heading
                            fontWeight="extrabold"
                            size="2xl"
                            bgGradient="linear(to-r, cyan.600, cyan.300, blue.500)"
                            bgClip="text"
                            mr="auto"
                            ml="auto"
                        >
                            Enter Data
                        </Heading>
                    </Box>
                    <Box
                        minW="75%"
                        ml="auto"
                        mr="auto"
                        mt={50}
                        // direction="column"
                        // justify="center"
                        align="center"
                    >
                        <FormControl id="input">
                            <FormLabel>Amount</FormLabel>
                            <NumberInput max={2000} min={100} value={num}>
                                <NumberInputField
                                    onChange={(e) => {
                                        setNum(e.target.value);
                                    }}
                                />
                            </NumberInput>

                            <FormLabel mt={8}>
                                Choose Crypto
                                <Tooltip
                                    hasArrow
                                    label="Top listed cryptos based on data from CoinMarketCap API"
                                    bg="gray.300"
                                    color="black"
                                >
                                    <span
                                        style={{
                                            marginLeft: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Icon as={AiOutlineInfoCircle} />
                                    </span>
                                </Tooltip>
                            </FormLabel>

                            {listings.data && (
                                <Select
                                    placeholder="eg. Bitcoin"
                                    value={choice}
                                    onChange={(e) => {
                                        setChoice(e.target.value);
                                        console.log(choice);
                                    }}
                                    required
                                >
                                    {listings.data &&
                                        listings.data.map((item) => {
                                            return (
                                                <option
                                                    value={item.name}
                                                    key={item.symbol}
                                                >
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                </Select>
                            )}
                            <Button
                                mt={12}
                                colorScheme="teal"
                                type="submit"
                                onClick={() => {
                                    getAnalysis();
                                }}
                                rightIcon={<ArrowRightIcon />}
                                isLoading={isLoading}
                                isDisabled={isDisabled}
                            >
                                Get Analysis
                            </Button>
                            {/* <Input
                        placeholder="eg. Bitcoin"
                        isRequired
                        onChange={(e) => {
                            setChoice(e.target.value);
                        }}
                        value={choice}
                    /> */}
                        </FormControl>
                    </Box>
                </>
            ) : (
                <Box
                    minW="75%"
                    ml="auto"
                    mr="auto"
                    // direction="column"
                    // justify="center"
                    align="center"
                >
                    <Heading
                        mb={30}
                        fontWeight="extrabold"
                        size="2xl"
                        bgGradient="linear(to-r, cyan.600, cyan.300, blue.500)"
                        bgClip="text"
                        mr="auto"
                        ml="auto"
                    >
                        Results from Analysis
                    </Heading>
                    <Helmet>
                        <title>Crypto Sentiments</title>
                        <meta name="description" content=""></meta>
                        <meta
                            name="keywords"
                            content="Ethereum, Bitcoin, Cryptocurrency"
                        ></meta>
                    </Helmet>
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <Text fontSize="4xl">
                            Checked at: {recData.checkedAt.slice(0, 19)}
                        </Text>
                        <Text fontSize="4xl">Choice: {recData.name}</Text>
                        <Text fontSize="4xl">
                            Positive tweet: {recData.postp}
                            {" %"}
                        </Text>
                        <Text fontSize="4xl">
                            Negative tweet: {recData.negtp}
                            {" %"}
                        </Text>
                        <Text fontSize="4xl">
                            Neutral tweet: {recData.neutp}
                            {" %"}
                        </Text>
                    </Box>
                    <Button
                        mt={8}
                        colorScheme="teal"
                        onClick={() => {
                            SetRecData("");
                        }}
                        leftIcon={<ArrowLeftIcon />}
                    >
                        Back
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Form;
