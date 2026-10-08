export let defaultScriptStats = {eps: 1, wait: 1000};

export function price(state) {
    return Math.round(10 * (1.15 ** state.scripts));
}