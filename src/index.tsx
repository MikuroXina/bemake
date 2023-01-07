import { StrictMode, useEffect } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { Editor } from "./editor.jsx";
import { extendTheme } from "@chakra-ui/react";
import { initialState } from "./editor/notes-context.js";
import { listen } from "@tauri-apps/api/event";
import styles from "./index.module.css";
import { useState } from "react";

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

export const Index = () => {
    const [state] = useState(initialState);

    useEffect(() => {
        const openBMSHandler = (bms: unknown) => {
            console.log(bms);
        };
        const unsubscribe = listen("openBMS", openBMSHandler);
        return () => {
            unsubscribe.then((fn) => fn());
        };
    }, []);

    return (
        <StrictMode>
            <ChakraProvider theme={theme}>
                <div className={styles.container}>
                    <Editor defaultState={state} />
                </div>
            </ChakraProvider>
        </StrictMode>
    );
};
