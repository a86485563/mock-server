const jsonServer = require('json-server');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

//修改path
server.use(jsonServer.rewriter({
    '/api/posts/*': '/posts/$1',
  }))
  
  //用'/api/posts/' 取代 /posts/$1 
  // *萬用字 $數字

//新增 access control
server.use((req, res, next) => {
    if (isAuthorized(req)) { // add your authorization logic here
      next() // continue to JSON Server router
    } else {
      res.sendStatus(401)
    }
   })

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})

var isAuthorized=(req)=>{
    var header = req.get('custom-header');
    if(header){
        return (header=='1234')
    }
    return false
}