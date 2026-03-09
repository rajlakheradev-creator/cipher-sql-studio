import { error } from "node:console";
import pool from "../db/postgre.js";
export async function executeQuery(req,res){
    try{
  const {query}=req.body;
  const result = await pool.query(query);
  res.json(result.rows);
    }
    catch(err){
  res.status(500).json({error:error.message});
    }
}
