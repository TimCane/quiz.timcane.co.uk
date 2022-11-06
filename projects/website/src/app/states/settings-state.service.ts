import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { BACKGROUNDS, DARK_BACKGROUND } from "../constants/background.constants";
import { BLUE_THEME, TEAL_THEME, THEMES } from "../constants/themes.constants";
import { QuizModeEnum } from "../enums/quiz-mode-enum";
import { BackgroundOption } from "../interfaces/background-option";
import { ThemeOption } from "../interfaces/theme-option";
import { SessionStorageService } from "../services/storage/session-storage.service";
import { StyleManagerService } from "../services/style-manager.service";
import { StateService } from "./state-service";

const SESSION_KEY = "SETTINGS";

export interface SettingsState {
    selectedTheme: ThemeOption,
    selectedBackground: BackgroundOption,
    quizMode: QuizModeEnum,
    enduranceLives: number,
    timedSeconds: number;
}

const initialState: SettingsState = {
    selectedTheme: BLUE_THEME,
    selectedBackground: DARK_BACKGROUND,
    quizMode: QuizModeEnum.Casual,
    enduranceLives: 2,
    timedSeconds: 60
}

@Injectable({
    providedIn: 'root'
})
export class SettingsStateService extends StateService<SettingsState> {
    selectedTheme: Observable<ThemeOption> = this.select(state => state.selectedTheme);
    selectedBackground: Observable<BackgroundOption> = this.select(state => state.selectedBackground);

    quizMode: Observable<QuizModeEnum> = this.select(state => state.quizMode);
    enduranceLives: Observable<number> = this.select(state => state.enduranceLives);
    timedSeconds: Observable<number> = this.select(state => state.timedSeconds);

    themes: Observable<ThemeOption[]> = of(THEMES);
    backgrounds: Observable<ThemeOption[]> = of(BACKGROUNDS);

    constructor(private sessionStorage: SessionStorageService, private styleManager: StyleManagerService) {
        super({ ...initialState, ...stateFromSession(sessionStorage) });
        this.setTheme();
    }

    updateSession() {
        stateToSession(this.sessionStorage, this.state);
    }

    setSelectedBackground(selectedBackground: BackgroundOption) {
        this.setState({ selectedBackground });
        this.updateSession();
        this.setTheme();
    }
    setSelectedTheme(selectedTheme: ThemeOption) {
        this.setState({ selectedTheme });
        this.updateSession();
        this.setTheme();
    }

    setQuizMode(quizMode: QuizModeEnum) {
        this.setState({ quizMode });
        this.updateSession();
    }

    setTimedSeconds(timedSeconds: number) {
        this.setState({ timedSeconds });
        this.updateSession();
    }
    setEnduranceLives(enduranceLives: number) {
        this.setState({ enduranceLives });
        this.updateSession();
    }

    private setTheme() {
        this.styleManager.setStyle(
            "theme",
            `theme-${this.state.selectedBackground.value}-${this.state.selectedTheme.value}.css`
        );
    }
}

function stateFromSession(sessionStorage: SessionStorageService): SettingsState | null {
    return sessionStorage.getItem(SESSION_KEY) as SettingsState;
}

function stateToSession(sessionStorage: SessionStorageService, state: SettingsState) {
    sessionStorage.setItem(SESSION_KEY, state);
}
