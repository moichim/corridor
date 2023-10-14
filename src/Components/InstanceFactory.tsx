import Time from "@src/Utils/Time";
import React from "react";
import Meteo from "./Blocks/Meteo/Meteo";
import Articles from "./Blocks/Articles/Articles";
import Clock from "./Blocks/Clock";
import Calendar from "./Blocks/Calendar/Calendar";
import Mensa from "./Blocks/Mensa/Mensa";
import ExternalFrame from "./Blocks/Iframe";

/** 
 * Creates a randomised set of blocks 
 */
export class InstanceFactory {

    createInstance() {

        return [
            [[ 
                this.meteo, this.mensa, this.calendar, this.clock 
            ],[ 
                this.traffic, this.irt, this.projects 
            ]],
            [[ 
                this.traffic, this.projects, this.irt 
            ],[ 
                this.clock, this.calendar, this.mensa, this.meteo 
            ]],
            [[
                this.clock, this.calendar, this.mensa, this.meteo 
            ],[ 
                this.traffic, this.projects, this.irt 
            ]],
            [[ 
                this.clock, this.calendar, this.traffic 
            ],[ 
                this.mensa, this.meteo, this.projects, this.irt 
            ]],
            [[ 
                this.clock, this.calendar, this.meteo, this.irt 
            ],[ 
                this.mensa, this.traffic, this.projects 
            ]],
            [[ 
                this.mensa, this.traffic, this.projects 
            ],[ 
                this.clock, this.calendar, this.meteo, this.irt 
            ]],
        ].sort((a, b) => 0.5 - Math.random())
        .shift()!
        .map( row => row.map( constructor => constructor() ) );

    }

    protected meteo(): React.JSX.Element {
        return <Meteo
            key="meteo"
            refreshFrequency={Time.minutes(1)}
        />
    }

    protected irt(): React.JSX.Element {
        return <Articles
            key="irt"
            xs={12}
            md={3}
            refreshFrequency={Time.minutes(10)}
            rotateFrequency={Time.seconds(30)}
            apiRoute="/article/irt"
            label="Novinky z IRT"
        />
    }

    protected projects(): React.JSX.Element {
        return <Articles
            key="projects"
            xs={12}
            md={3}
            refreshFrequency={Time.minutes(11)}
            rotateFrequency={Time.seconds(31)}
            apiRoute="/article/cordis"
            label="Evropské projekty"
        />
    }

    protected traffic(): React.JSX.Element {
        return <ExternalFrame
            key="traffic"
            label="Dopravní situace"
            src="https://frame.mapy.cz/s/larorukeco"
            xs={12}
            md={6}
        />
    }

    protected clock(): React.JSX.Element {
        return <Clock
            key="clock"
            xs={12}
            md={3}
        />
    }

    protected calendar(): React.JSX.Element {
        return <Calendar
            key="calendar"
            label="Kalendář"
            xs={12}
            md={3}
            refetchInterval={Time.minutes(5)}
        />
    }

    protected mensa(): React.JSX.Element {
        return <Mensa
            key="mensa"
            label="Mensa"
            xs={12}
            md={3}
            refreshFrequency={Time.minutes(15)}
        />
    }


}