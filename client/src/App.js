import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./comps/Header";
import Home from "./Routes/Home";
import Footer from "./comps/Footer";
import About from "./Routes/About";
import Form from "./Routes/Form";
import { Flex, Spacer } from "@chakra-ui/react";

function App() {
    return (
        <Router>
            <Flex
                p={4}
                minH="100vh"
                direction="column"
                justify="center"
                align="center"
            >
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/form">
                        <Form />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                </Switch>
                <Spacer />
                <Footer />
            </Flex>
        </Router>
    );
}

export default App;
