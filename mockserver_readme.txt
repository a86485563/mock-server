why json-server ?
專注於前端的開發，根本不需要安裝java之類的 即可 有rest api 可以使用。
json-server 是 base on express (request 、 router 等等 之類的 function 是一樣的)

step 1. 建立 假資料庫。=> 資料庫模組化。

step 2. 替換掉預設的path。

step 3. 建立app。=> import 資料庫。

step 4. header 檢查。


export

隨著系統的開發，程式越來越大，希望將功能、資料分成一塊塊的，固有了模組的概念(module)。
當你寫好了一個程式，module要決定將什麼給外部人使用(可能是function、資料等等)，需要export


ref: 
json-server :  https://github.com/typicode/json-server#add-custom-routes
資料模組化 :https://billyyyyy3320.com/zh/2019/07/21/create-json-server-with-multiple-files/#db-js-%E8%87%AA%E5%8B%95%E5%BC%95%E5%85%A5%E6%AA%94%E6%A1%88

getting start :

1.npm install -g json-server
2.create db.json
3.Module app!

修改path

// Add this before server.use(router)
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id'
}))
 
//用'/api/posts/' 取代 /posts/$1 
// *萬用字 $數字

