import pool from './DatabaseConnection';
class HandleServerRequest{
    HandleServerRequest(){
        this.flag = false;
        this.response = {};
        this.call = false;
    }
    callServer(sql, params,cb){
        let response = {};let flag = false;
        if(typeof sql !== undefined && sql !== ''){
            pool.connect((err,client,done)=>{
                if(err){

                    response.message = "error connecting to database";
                    response.status = 500;
                    response.err = err.message; 
                    if( typeof cb !== undefined){
                        cb(response);
                    }
                }else{
                    if(typeof params !== undefined && params.length > 0 ){

                        client.query(sql,params, (err, result)=>{
                            if(err){
                                response.message = "error executing query";
                                response.status = 500;
                                response.err = err;
                                if( typeof cb !== undefined){
                                    cb(response);
                                }
                            }else{
                                response.message = "Operation Successfull";
                                response.status = 200;
                                response.data = result;
                                if( typeof cb !== undefined){
                                    cb(response);
                                }
                            }
                        })
                    }else{
                        client.query(sql,(err,result) =>{
                            if(err){
                                response.message = "error executing query";
                                response.status = 500;
                                response.err = err;
                                if( typeof cb !== undefined){
                                    cb(response);
                                }
                            }else{
                                response.message = "Operation Successfull";
                                response.status = 200;
                                response.data = result;
                                if( typeof cb !== undefined){
                                    cb(response);
                                }
                            }
                        })
                    }
                }
            });
        }else{
            response.err = "invalid request";
            response.status = 400;
            if( typeof cb !== undefined){
                cb(response);
            }
        }
    }
}
export default new HandleServerRequest();