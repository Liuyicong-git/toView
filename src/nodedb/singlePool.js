

class SinglePool {
    static add(name,obj){
        this.mapper.set(name ,obj)
    }
    static get(name){
        return SinglePool.mapper.get(name);
    }
}
SinglePool.mapper = new Map();
module.exports = SinglePool;