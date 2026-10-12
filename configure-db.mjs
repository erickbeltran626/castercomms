import {readFileSync,writeFileSync} from 'node:fs';
const id=process.argv[2];
if(!id||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(id))throw Error('Run: node configure-db.mjs YOUR_DATABASE_ID (the UUID from create-db)');
const path=new URL('./wrangler.json',import.meta.url),config=JSON.parse(readFileSync(path,'utf8'));
config.d1_databases[0].database_id=id;
writeFileSync(path,JSON.stringify(config,null,2)+'\n');
console.log('Database connected in wrangler.json. Next: npm run setup-db');
