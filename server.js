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

//使用bodyParser 來對 req做事情
server.use(jsonServer.bodyParser)
 
//新增 access control
server.use((req, res, next) => {
    if (isAuthorized(req)) { // add your authorization logic here
      if(req.method === "POST"){
        console.log('in post listener')
        console.log(req.body)
        //修改req資料
        req.body.createdAt = Date.now()
        next() // continue to JSON Server router
      }
      else{
        next() // continue to JSON Server router
      }
    } else {
      res.status(401).jsonp({
        //自製return msg
        error: "error message here"
      })
    }
   })

   // In this example, returned resources will be wrapped in a body property
router.render = (req, res) => {
  if(req.method === "POST"){
  res.jsonp({
    success : true,
    message : "User created successfully",
    body: req.body,
    crateAt: Date.now()
  })
}
}


server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})

var isAuthorized=(req)=>{
    var header = req.get('custom-header');
    return (header)? (header=='1234') :false;
}