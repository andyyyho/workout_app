export const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) return undefined

        return JSON.parse(serializedState)
    } catch (e) {
        console.warn(e)
        return undefined
    }
} 

export const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch (e) {
        console.warn(e)
    }
}