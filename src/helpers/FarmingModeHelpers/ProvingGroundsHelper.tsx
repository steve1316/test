import { Container } from "@mantine/core"
import CustomSwitch from "../../components/CustomSwitch"
import CustomNumberInput from "../../components/CustomNumberInput"
import { useContext } from "react"
import { BotStateContext } from "../../context/BotStateContext"

const ProvingGroundsHelper = () => {
    const bsc = useContext(BotStateContext)

    if (bsc.settings.game.farmingMode === "Proving Grounds") {
        return (
            <Container>
                <CustomSwitch
                    label="Enable if Proving Grounds is in different position"
                    description="Enable this to properly select Proving Grounds if it is not positioned first on the list of events in the Home Menu."
                    checked={bsc.settings.provingGrounds.enableNewPosition}
                    onChange={(checked) => bsc.setSettings({ ...bsc.settings, provingGrounds: { ...bsc.settings.provingGrounds, enableNewPosition: checked } })}
                />

                {bsc.settings.provingGrounds.enableNewPosition ? (
                    <CustomNumberInput
                        label="New Position"
                        value={bsc.settings.provingGrounds.newPosition}
                        onChange={(value) => bsc.setSettings({ ...bsc.settings, provingGrounds: { ...bsc.settings.provingGrounds, newPosition: value } })}
                        min={0}
                        max={5}
                        description="Default is the first position or the value of 0"
                    />
                ) : null}
            </Container>
        )
    } else {
        return null
    }
}

export default ProvingGroundsHelper
