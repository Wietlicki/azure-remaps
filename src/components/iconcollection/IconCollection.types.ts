export type IconCollectionProps = {
    icons: {id: string, href: string}[],
    children: React.ReactNode
}
export type IconCollectionState = {
    iconLoadStates: {[id: string]: string}
}