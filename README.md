# spawnPool
## usage :
```
const spawnPool = require('./index.js');
let sleep = (ms) => new Promise((r) => setTimeout(() => r(), ms));
var pool=new spawnPool(8);
;(async ()=>{
    pool.addTask('node', ['fivesecs.js'])
    await sleep(1000)
    pool.addTask('node', ['fivesecs.js'])
    await sleep(1000)
    pool.addTask('node', ['fivesecs.js'])
    await sleep(1000)
})();
```
