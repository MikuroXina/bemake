import { ChakraProvider } from "@chakra-ui/react";
import { Editor } from "./editor.jsx";
import { StrictMode } from "react";
import styles from "./index.module.css";

export const index = () => {
    return (
        <StrictMode>
            <ChakraProvider>
                <div className={styles.container}>
                    <Editor />
                </div>
            </ChakraProvider>
        </StrictMode>
    );
};
