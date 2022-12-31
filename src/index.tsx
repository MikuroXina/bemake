import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { invoke } from "@tauri-apps/api";
import styles from "./index.module.css";

export const index = () => {
    const onGreet = async () => {
        const response = await invoke("greet", { name: "World" });
        console.log(response);
    };

    return (
        <StrictMode>
            <ChakraProvider>
                <div className={styles.container}>
                    <h1>Hello, World!</h1>
                    <button onClick={onGreet}>Greet</button>
                </div>
            </ChakraProvider>
        </StrictMode>
    );
};
