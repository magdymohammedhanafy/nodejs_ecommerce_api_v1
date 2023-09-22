class ApiErorr extends Error
{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
        this.status=`${statusCode}`.startsWith(4)? 'fail':'erorr';
        this.operational=true;
    }

}

module.exports=ApiErorr;