import { ColorScheme, ColorSchemeProvider, MantineProvider, Paper } from "@mantine/core"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import { useState, useEffect } from "react"
import CustomAppShell from "./components/CustomAppShell"
import { BotStateProvider } from "./context/BotStateContext"
import { MessageLogProvider } from "./context/MessageLogContext"
import * as app from "@tauri-apps/api/app"
import { emit, listen } from "@tauri-apps/api/event"

const App = () => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: "mantine-color-scheme",
        defaultValue: "light",
        getInitialValueInEffect: true,
    })

    const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

    useHotkeys([["mod+J", () => toggleColorScheme()]])

    const [updateAvailable, setUpdateAvailable] = useState(false)
    const [updateMessage, setUpdateMessage] = useState("Update available")
    const [isOpen, setIsOpen] = useState(true)

    // Check if update is available.
    useEffect(() => {
        emit("tauri://update")
            .then((data) => {
                console.log("Update emit: ", data)
            })
            .catch((err) => {
                console.error("Update emit error: ", err)
            })
            .finally(() => {
                console.log("finally done")
            })

        console.log("Checking version")

        listen("tauri://update-available", (res) => {
            console.log("New version: ", res)
            setUpdateAvailable(true)
            // getVersion(res.payload.version)
        })
            .then((data) => {
                console.log("Listening: ", data)
            })
            .catch((err) => {
                console.error("Update available error: ", err)
            })
            .finally(() => {
                console.log("Update available finally done")
            })
    }, [])

    // Grab the program version.
    const getVersion = async (newVersion: string) => {
        await app
            .getVersion()
            .then((version) => {
                setUpdateMessage(`Update available: v${version} -> v${newVersion}`)
            })
            .catch(() => {
                setUpdateMessage("Update available")
            })
    }

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                <BotStateProvider>
                    <MessageLogProvider>
                        <Paper>
                            <CustomAppShell />
                        </Paper>
                    </MessageLogProvider>
                </BotStateProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}

export default App
