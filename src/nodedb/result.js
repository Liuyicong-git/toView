class Result {
    constructor(data , code = 200 ,  mes = 'success' ){
        this.data = data;
        this.code = code ;
        this.message = mes;
    }
}

module.exports = Result;