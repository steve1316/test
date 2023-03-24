import { useState, useEffect } from "react"
import { AppShell, Code, createStyles, Group, Navbar, ScrollArea, useMantineTheme } from "@mantine/core"
import { getStylesRef, rem } from "@mantine/styles"
import { Icon } from "@iconify/react"
import LinksGroup from "../LinksGroup"
import LightDarkButton from "../LightDarkButton"
import Home from "../../pages/Home"
import NotFound from "../../pages/NotFound"
import ExtraSettings from "../../pages/ExtraSettings"
import Adjustments from "../../pages/Adjustments"
import Settings from "../../pages/Settings"

const CustomAppShell = () => {
    const theme = useMantineTheme()
    const [active, setActive] = useState("Home")
    const [expanded, setExpanded] = useState("")

    useEffect(() => {
        if (active !== expanded) {
            setExpanded("")
        }
    }, [active])

    const useStyles = createStyles((theme) => ({
        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: `calc(${theme.spacing.md} * 1.5)`,
            borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            fontSize: theme.fontSizes.sm,
            color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7],
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            "&:hover": {
                backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === "dark" ? theme.white : theme.black,

                [`& .${getStylesRef("icon")}`]: {
                    color: theme.colorScheme === "dark" ? theme.white : theme.black,
                },
            },
        },

        linkIcon: {
            ref: getStylesRef("icon"),
            color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            "&, &:hover": {
                backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
                color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
                [`& .${getStylesRef("icon")}`]: {
                    color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
                },
            },
        },
    }))

    const { classes } = useStyles()

    const pages = [
        { label: "Home", value: "Home", link: "/home", icon: "ic:outline-home" },
        { label: "Settings", value: "Settings", link: "/settings", icon: "ic:outline-settings" },
        {
            label: "Extra Settings",
            value: "Extra Settings",
            link: "/extrasettings",
            links: [
                { label: "Twitter", value: "Extra Settings", link: "/extrasettings#twitter" },
                { label: "Discord", value: "Extra Settings", link: "/extrasettings#discord" },
                { label: "Configuration", value: "Extra Settings", link: "/extrasettings#configuration" },
                { label: "Nightmare", value: "Extra Settings", link: "/extrasettings#nightmare" },
                { label: "Misc", value: "Extra Settings", link: "/extrasettings#misc" },
                { label: "Defender", value: "Extra Settings", link: "/extrasettings#defender" },
                { label: "API Integration", value: "Extra Settings", link: "/extrasettings#api-integration" },
                { label: "Device", value: "Extra Settings", link: "/extrasettings#device" },
            ],
            icon: "ic:baseline-settings-suggest",
        },
        { label: "Adjustments", value: "Adjustments", link: "/adjustments", icon: "ic:outline-display-settings" },
    ]

    const renderPage = (value: string) => {
        if (value === "Home") {
            return <Home />
        } else if (value === "Settings") {
            return <Settings />
        } else if (value === "Extra Settings") {
            return <ExtraSettings />
        } else if (value === "Adjustments") {
            return <Adjustments />
        } else {
            return <NotFound />
        }
    }

    const links = pages.map((page) => <LinksGroup {...page} key={page.label} active={active} setActive={setActive} />)

    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar width={{ sm: 300 }} p="md">
                    <Navbar.Section>
                        <Group className={classes.header} position="apart">
                            <Icon icon="logos:mantine-icon" width={25} height={25} />
                            <span>Granblue Automation</span>
                            <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
                        </Group>
                    </Navbar.Section>

                    <Navbar.Section grow component={ScrollArea}>
                        {links}
                    </Navbar.Section>

                    <Navbar.Section className={classes.footer}>
                        <Group position="apart" spacing={0}>
                            <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                                <Icon icon="material-symbols:error-outline" className={classes.linkIcon} width={30} height={30} color="red" />
                                <span style={{ color: "orange" }}>Not Ready</span>
                            </a>
                            <LightDarkButton />
                        </Group>
                    </Navbar.Section>
                </Navbar>
            }
        >
            {renderPage(active)}
        </AppShell>
    )
}

export default CustomAppShell
