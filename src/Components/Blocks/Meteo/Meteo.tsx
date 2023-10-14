import Block, { BlockType } from "@src/Components/UI/Containers/Block";
import React from "react";
import useMeteo from "./useMeteo";

import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';
import NorthIcon from '@mui/icons-material/North';
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import InvertColorsIcon from "@mui/icons-material/InvertColors";

import { Grid, Typography } from "@mui/material";
import Time from "@src/Utils/Time";
import { format } from "date-fns";
import { DomainTuple, VictoryAxis, VictoryChart, VictoryGroup, VictoryLabel, VictoryLegend, VictoryLine } from "victory";
import SingleValue from "./displays/SingleValue";
import theme from "./theme";
import useMeteoCurrent from "./useMeteoCurrent";

type MeteoProps = BlockType & {
    refreshFrequency: number
}

const Meteo: React.FC<MeteoProps> = ( props ) => {


    const current = useMeteoCurrent();

    const meteo = useMeteo();

    const label: string = current.data.success
      ? `Počasí v ${ Time.formatTime( new Date( current.data.payload.time ) ) }`
      : "Počasí";

    return <Block
        label={label}
        loading={meteo.isFetching}
        xs={12}
        md={3}
    >

        { current.data.success && <Grid container spacing={1}>
                    <SingleValue 
                        label="Teplota"
                        value={current.data.payload.temperature.toFixed(2)}
                        unit="°C"
                        icon={<DeviceThermostatIcon fontSize="large" />}
                    />
                    <SingleValue 
                        label="Rychlost větru"
                        value={current.data.payload.wind.speed.toFixed(2)}
                        unit="km/h"
                        icon={<AirIcon fontSize="large" />}
                    />
                    <SingleValue 
                        label="Směr větru"
                        value={current.data.payload.wind.dir}
                        unit=""
                        icon={<NorthIcon fontSize="large" />}
                    />
                    <SingleValue 
                        label="Déšť"
                        value={current.data.payload.rain.toString()}
                        unit=""
                        icon={<WaterDropIcon fontSize="large" />}
                    />
                    <SingleValue 
                        label="Vlhkost"
                        value={current.data.payload.humidity.toFixed(2)}
                        unit="%"
                        icon={<InvertColorsIcon fontSize="large" />}
                    />
                    <SingleValue 
                        label="UV"
                        value={current.data.payload.uv.toString()}
                        unit=""
                        icon={<Typography fontSize="1.75rem">UV</Typography>}
                    />
        </Grid>}


      <div style={{height: "250px"}}>


        <VictoryChart
            height={200}
            width={400}
            theme={theme}
            style={{
                parent: {
                    padding: 0,
                    top: "-30px"
                },
            }}
        >
            <VictoryLabel
                x={225}
                y={25}
                textAnchor="middle"
                text="Teplota"
                
            />

            <VictoryAxis 
                dependentAxis
                // label="Teplota"
                animate
                fixLabelOverlap
                tickFormat={( value: number ) => `${value} °C`}
                tickCount={10}
                domain={{y:[0, 35]}}
                y0={-10}
            />

            <VictoryAxis 
                tickCount={8}
                standalone
                tickFormat={( value: number ) => format(new Date(value), "HH:MM") }
                domain={{x:Object.values( meteo.tick ) as DomainTuple}}
                fixLabelOverlap={true}
            />

<VictoryLegend x={125} y={30}
    centerTitle
    orientation="horizontal"
    gutter={20}
    style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
    data={
        meteo.victory.map( serie => ({
            fill: serie.color,
            name: serie.name
        }) )
    }
  />

            {meteo.victory.map( serie => <VictoryGroup
                key={serie.color}
                color={serie.color}
                data={serie.data}
                y0={() => 10}
            >
                <VictoryLine/>
            </VictoryGroup> )}
        </VictoryChart>

        </div>

    </Block>

}

export default Meteo;