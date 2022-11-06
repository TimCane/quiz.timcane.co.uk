import { BackgroundOption } from "../interfaces/background-option"

export const DARK_BACKGROUND: BackgroundOption = {
    colour: "#040d19",
    label: "Dark",
    value: "dark"
}

export const LIGHT_BACKGROUND: BackgroundOption = {
    colour: "#eff3f8",
    label: "Light",
    value: "light"
}

export const BACKGROUNDS = [LIGHT_BACKGROUND, DARK_BACKGROUND]