import { ActionType } from "../enums/action-type.enum";

export interface ActionItem {
    type: ActionType;
    items: string[];
}