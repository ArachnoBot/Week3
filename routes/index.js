const express = require('express');
const router = express.Router();

data = []

router.get('/', function(req, res, next) {
  res.render('index')
})

router.post('/todo', function(req, res, next) {
  reqName = req.body.name
  reqTask = req.body.task

  for (let item of data) {
    if (item.name == reqName) {
      item.tasks.push(reqTask)
      res.send({ msg: "Todo added" });
      return
    }
  }

  data.push({
    name: req.body.name,
    tasks: [req.body.task],
  })

  res.send({ msg: "User added" });
});

router.get('/user/:id', function(req, res, next) {
  const id = req.params.id

  for (let item of data) {
    if (item.name == id) {
      itemCopy = item
      res.send(item)
      return
    }
  }

  res.send({ msg: "User not found" });
})

router.delete('/user/:id', function(req, res, next) {
  const id = req.params.id
  for (let item of data) {
    console.log(item.name, id)
    if (item.name == id) {
      data.pop(data.indexOf(item))
      res.send({ msg: "User deleted" })
      return
    }
  }

  res.send({ msg: "User not found" });
})


module.exports = router;
