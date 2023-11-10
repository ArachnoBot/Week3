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

router.get('/user/:id', (req, res) => {
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

router.delete('/user/:id', (req, res) => {
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

router.put("/user", (req, res) => {
  const reqUser = req.body.user
  const reqTask = req.body.task

  let userElem = data.find(element => element.name == reqUser)
  if (userElem) {
    taskElem = userElem.tasks.find(element => element == reqTask)
    if (taskElem) {
      console.log("found")
      userElem.tasks.pop(userElem.tasks.indexOf(taskElem))
      res.send({ msg: "Todo deleted" })
      return
    }
  }

  res.send({ msg: "User not found" })
  return

  for (let item of data) {
    console.log(item.name, reqUser)
    if (item.name == reqUser) {
      const found = item.tasks.find(element => element == reqTask)
      if (found) {
        console.log("found")
        item.tasks.pop(item.tasks.indexOf(task))
        res.send({ msg: "Todo deleted" })
        return
      }
    }
  }
  res.send({ msg: "User not found" });
})


module.exports = router;
