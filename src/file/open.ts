import { Dispatch, useEffect } from "react";

import type { Action } from "../editor/notes-context.js";
import type { Chart } from "../chart.js";
import { listen } from "@tauri-apps/api/event";

export const useOpenFile = (dispatch: Dispatch<Action>) => {
    useEffect(() => {
        const openBMSHandler = (bmsUnsafe: unknown) => {
            const { payload: chart } = bmsUnsafe as { payload: Chart };
            dispatch(["OPEN_FILE", { chart }]);
        };
        const unsubscribe = listen("openBMS", openBMSHandler);
        return () => {
            unsubscribe.then((fn) => fn());
        };
    }, []);
};
