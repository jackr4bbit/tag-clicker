export function price(state) {
    return Math.round(10 * (1.15 ** state.scripts));
}