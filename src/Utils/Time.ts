import { format } from "date-fns";

class Time {

    static months: string[] = [
        "ledna",
        "února",
        "března",
        "dubna",
        "května",
        "června",
        "července",
        "srpna",
        "září",
        "října",
        "listopadu",
        "prosince"
    ];

    public static seconds = ( seconds: number ) => seconds * 1000;
    public static minutes = ( minutes: number ) => minutes * Time.seconds( 60 );
    public static hours = ( hours: number ) => hours * Time.minutes( 60 );

    public static formatDate = ( date: Date ) => {
        return [
            date.getUTCDate(),
            date.getUTCMonth()
        ].join( ". " ) + "."
    }

    public static formatTime = ( date: Date ) => {
        return date.toTimeString().split( " " )[0].replace(/(:00)(?!.*:00)/, "");
    }

    public static formatDateFull = ( date: Date ) => {
        return [
            date.getUTCDate(),
            Time.months[ date.getUTCMonth() ]
        ]
            // .map(i => i + ".")
            .join( ". " );
    }

    public static formatDateComplete = ( date: Date ) => {
        return [
            date.getUTCDate(),
            date.getUTCMonth(),
            date.getUTCFullYear()
        ]
            // .map(i => i + ".")
            .join( ". " );
    }

    public static getNowTime(): string
    {
        return format( new Date(), "HH:mm:ss" );
    }

}

export default Time;