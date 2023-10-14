import React, { useMemo } from "react"
import Providers from "./Providers";
import { InstanceFactory } from "./InstanceFactory";
import Page from "./UI/Containers/Page";
import PageRow from "./UI/Containers/PageRow";

const App: React.FC = () => {

    const factory = useMemo( () => {
        return new InstanceFactory()
    }, [] );

    const items = factory.createInstance();

    return <Providers>
        <Page>
            { items.map( ( row, index ) => <PageRow key={`row_${index}`}>{row}</PageRow> ) }
        </Page>
    </Providers>;
}

export default App;