import express from 'express'
import {v4 as uuid} from 'uuid'

const Tasks = []
const app = express()
app.use(express.json())

app.get("/task", async(req, res)=>{
    return res.json(Tasks)
})

app.post("/task", async (req, res) => {
    const { title } = req.body;
    const Task = {
      id: uuid(),
      title,
      done: false,
    };
    Tasks.push(Task);
    return res.json(Task);
});
   
app.put("/task/:id", async(req, res)=>{
    const {id} = req.params
    const findTask = Tasks.find((task)=>task.id===id)
    const index = Tasks.indexOf(findTask)
    Tasks[index].done = !Tasks[index].done
    return res.json(Tasks[index])
})

app.delete("/task/:id", async(req, res)=>{
    const {id} = req.params
    const findTask = Tasks.find((task)=>task.id===id)
    const index = Tasks.indexOf(findTask)
    Tasks.splice(index, 1)
    return res.send("Task deleted")
})


app.listen(3333, ()=>console.log("Server running... 🚀"))