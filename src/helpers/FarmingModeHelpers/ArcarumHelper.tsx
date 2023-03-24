import CustomSwitch from "../../components/CustomSwitch"
import { useContext } from "react"
import { BotStateContext } from "../../context/BotStateContext"

const ArcarumHelper = () => {
    const bsc = useContext(BotStateContext)

    if (bsc.settings.game.farmingMode === "Arcarum") {
        return (
            <CustomSwitch
                label="Enable Stop on Arcarum Boss"
                description="Enable this option to have the bot stop upon encountering a Arcarum Boss (3-3, 6-3, 9-9)."
                checked={bsc.settings.arcarum.enableStopOnArcarumBoss}
                onChange={(checked) => bsc.setSettings({ ...bsc.settings, arcarum: { ...bsc.settings.arcarum, enableStopOnArcarumBoss: checked } })}
            />
        )
    } else {
        return null
    }
}

export default ArcarumHelper
