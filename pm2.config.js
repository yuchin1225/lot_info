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
            }
        }
    ]
}