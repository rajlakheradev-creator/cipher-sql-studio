import pool from "../db/postgre.js";
export async function assignments(req,res){
    try{
    const result= await pool.query("SELECT * FROM assignments");
    res.json(result.rows)// it is used to get rows
    }
    catch(err){
       console.error("Internal error in Db",err);
    }
}

export async function assignments2(req,res) {
      const { id } = req.params;
    try{
    const result1= await pool.query("SELECT * FROM assignments WHERE Id=$1",id);
    res.json(result1.rows)// it is used to get rows
    }
    catch(err){
       console.error("Internal error in Db",err);
    }
}

export async function assignmentsPost(req,res) {
    try{

    }
    catch(err){

    }
}

export async function assignmentsUpdate(req,res){
    try{

    }
    catch(err){
        
    }
}