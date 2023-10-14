export interface ArticleItemType {
    title: string,
    description?: string,
    date: number,
    link?: string,
    image?: string,
    [index:string]: any,
    source: ArticleSourceDefinition,
    id: string
}

export enum ArticleSourceType {
    rss = 1
}

export type ArticleSourceDefinition = {
    domain: string,
    icon?: string,
    type: string,
    color?: string
}

export type RotatingHookParameters = {
    requestFrequency?: number,
    rotateFrequency?: number
}