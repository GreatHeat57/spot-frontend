import React from 'react'
import Container from "components/Container";
import Header from "components/header";

const DefaultLayout = (props: { children: React.ReactChild }) => 
{
    return (
        <Container className="">
            <Header />
            {props.children}
        </Container>
    );
};

export default DefaultLayout