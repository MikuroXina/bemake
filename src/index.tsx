import { ChakraProvider } from "@chakra-ui/react";
import { Editor } from "./editor.jsx";
import { StrictMode } from "react";
import { extendTheme } from "@chakra-ui/react";
import styles from "./index.module.css";

const theme = extendTheme({
    colors: {
        brand: {
            100: "#e6ade6",
            900: "#191d19",
        },
    },
    styles: {
        global: {
            body: {
                bg: "gray.700",
                color: "#d0c9d0",
            },
        },
    },
});

export const index = () => {
    return (
        <StrictMode>
            <ChakraProvider theme={theme}>
                <div className={styles.container}>
                    <Editor />
                </div>
            </ChakraProvider>
        </StrictMode>
    );
};
