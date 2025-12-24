import winston from "winston";

const log  = winston.createLogger({
    level:process.env.NODE_ENV === "Production" ? "info" :"debug",
    format:winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: { service: "Todo-Backend" },
    transports:[
        new winston.transports.Console({
            format:winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),   
            )
        }),
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" })
    ]
})

export default log;