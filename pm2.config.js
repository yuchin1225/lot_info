module.exports = {
    apps: [
        {
            name: "lotInfo",
            script: "node_modules/next/dist/bin/next",
            args: "start",
            env: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production"
            },
            out_file: `./logs/out.log`,     // 初始 log file（PM2-logrotate 會切割它）
            error_file: `./logs/error.log`,
            log_date_format: "YYYY-MM-DD HH:mm:ss"
        }
    ]
}