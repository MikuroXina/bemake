import { StrictMode, useEffect } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { Editor } from "./editor.jsx";
import { extendTheme } from "@chakra-ui/react";
import { listen } from "@tauri-apps/api/event";
import { open } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";
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
    useEffect(() => {
        const openBMSHandler = async () => {
            const selected = await open({
                filters: [
                    {
                        name: "BMS file",
                        extensions: ["bms", "bml", "bme", "pms"],
                    },
                ],
            });
            if (!selected || Array.isArray(selected)) {
                return;
            }
            const bmsText = await readTextFile(selected);
            console.log("opened BMS file at:", selected);
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
                    <Editor />
                </div>
            </ChakraProvider>
        </StrictMode>
    );
};
