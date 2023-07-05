const { spawn } = require('child_process');
class spawnPool {
    constructor(limit){
        this.runningTasks = 0;
        this.taskQueue = [];
        this.MAX_CONCURRENT_TASKS = limit || 3;
    }
    #runTask(command, args) {
        return new Promise((resolve, reject)=>{
            const task = spawn(command, args);
            task.on('close', (code) => {
                if (code === 0){
                    resolve();
                }else{
                    reject(new Error(`Task failed with exit code ${code}`));
                }
                this.runningTasks--;
                if (this.taskQueue.length > 0) {
                    const nextTask = this.taskQueue.shift();
                    this.#runTask(nextTask.command, nextTask.args);
                }
            });
            // task.stdout.on('data', function (data) {
            //     console.log(data.toString())
            // })
            task.on('error', (err) => {
                reject(err);
            });
        });
    }
    addTask(command, args) {
        if (this.runningTasks >= this.MAX_CONCURRENT_TASKS) {
            this.taskQueue.push({ command, args });
        } else {
            this.runningTasks++;
            this.#runTask(command, args);
        }
    }
}
module.exports = spawnPool 
