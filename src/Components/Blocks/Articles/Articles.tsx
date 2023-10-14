import React from "react"
import Block, { BlockType } from "../../UI/Containers/Block"
import Article from "../../UI/Content/Article"
import { ArticleSuspense } from "../../UI/Content/ArticleSuspense"
import useArticles from "./useArticles"

type ArticlesProps = BlockType & {
    apiRoute: string,
    refreshFrequency: number,
    rotateFrequency: number
}

const Articles: React.FC<ArticlesProps> = ( {
    apiRoute,
    refreshFrequency,
    rotateFrequency,
    label,
    description,
    ...props
} ) => {

    const articles = useArticles( apiRoute, refreshFrequency, rotateFrequency );

    return <Block
        label={[ label, articles.description ].join( " " )}
        {...props}
        loading={ articles.isFetching }
    >
        { articles.current && <Article {...articles.current } key={articles.current.id}/> }
        { articles.current === null && <ArticleSuspense /> }
    </Block>

}

export default Articles;