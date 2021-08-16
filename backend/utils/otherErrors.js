exports.uncaught=()=>{
    process.on('uncaughtException',err=>{
        console.log(`ERRO: ${err.stack}`)
        console.log('Shutting down server due to uncaught exception')
        process.exit(1);
    })
}

exports.unhandled=(server)=>{
    process.on('unhandledRejection',err => {
        console.log(`ERRO: ${err.message}`)
        console.log('Shutting down server due to Unhandled Promise rejection')
        server.close(()=>{
            process.exit(1);
        })
    })
}