import pkg from 'pg';
import { pool, Pool } from "pg";

const pool=new Pool({

    user:"postgres",
    host:"localhost",
    database:"CipherSqlStudio",
    password:"Raj123098",
    port:5432,

});
//   
(async ()=>{
    try{
   const res= await pool.query("SELECT NOW()");
   console.log("db connected",res.rows[0]);
    }
    catch(err){
        console.error("database connection failed",err);
    }
})();
export default pool;