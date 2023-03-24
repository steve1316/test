import { ActionIcon, Tooltip, useMantineColorScheme } from "@mantine/core"
import { Icon } from "@iconify/react"

const LightDarkButton = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const dark = colorScheme === "dark"

    return (
        <Tooltip label="Toggle color scheme" color="blue" position="right" withArrow>
            <ActionIcon variant="outline" color={dark ? "yellow" : "blue"} onClick={() => toggleColorScheme()} title="Toggle color scheme">
                {dark ? <Icon icon="material-symbols:light-mode-outline" style={{ width: 18, height: 18 }} /> : <Icon icon="material-symbols:dark-mode-outline" style={{ width: 18, height: 18 }} />}
            </ActionIcon>
        </Tooltip>
    )
}

export default LightDarkButton
