import pool from "../db/postgre.js";
export async function assignments(req,res){
    try{
    const result= await pool.query("SELECT * FROM assignments");//
    res.json(result.rows)// it is used to get rows
    }
    catch(err){

    }
}
