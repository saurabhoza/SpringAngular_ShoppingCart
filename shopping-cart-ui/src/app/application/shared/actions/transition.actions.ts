import { ReferenceData } from "../models/reference-data";
import { Action } from "@ngrx/store";

export const TRANSITION_STARTED = '[Transition] Started';
export const TRANSITION_COMPLETED = '[Transition] Completed';

export class TransitionStartedAction implements Action {
    readonly type = TRANSITION_STARTED;
    constructor() { }
}

export class TransitionCompletedAction implements Action {
    readonly type = TRANSITION_COMPLETED;
    constructor() { }
}

export type Actions
  = TransitionStartedAction
  | TransitionCompletedAction;