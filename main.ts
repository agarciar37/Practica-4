// @deno-types="npm:@types/express@4"
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { getBusinesses } from "./resolvers/getBusinesses.ts";
import { getWorkers } from "./resolvers/getWorkers.ts";
import { getTasks } from "./resolvers/getTasks.ts";
import { getBusiness } from "./resolvers/getBusiness.ts";
import { getWorker } from "./resolvers/getWorker.ts";
import { getTask } from "./resolvers/getTask.ts";
import { deleteBusiness } from "./resolvers/deleteBusiness.ts";
import { deleteWorker } from "./resolvers/deleteWorker.ts";
import { deleteTask } from "./resolvers/deleteTask.ts";
import { createWorker } from "./resolvers/createWorker.ts";
import { createBusiness } from "./resolvers/createBusiness.ts";
import { createTask } from "./resolvers/createTask.ts";
import { updateTaskStatus } from "./resolvers/changeTaskStatus.ts";
import { hireWorker } from "./resolvers/hireWorker.ts";
import { fireWorker } from "./resolvers/fireWorker.ts";

const MONGO_URL = Deno.env.get("MONGO_URL")

if (!MONGO_URL){
  console.log("No mongo URL found")
  Deno.exit(1)
}

await mongoose.connect(MONGO_URL)
const app = express()
app.use(express.json())
  .get("/businesses", getBusinesses)
  .get("/workers", getWorkers)
  .get("/tasks", getTasks)
  .get("/business/:id", getBusiness)
  .get("/worker/:id", getWorker)
  .get("/task/:id", getTask)
  .delete("/business/:id", deleteBusiness)
  .delete("/worker/:id", deleteWorker)
  .delete("/task/:id", deleteTask)
  .post("/business", createBusiness)
  .post("/worker", createWorker)
  .post("/task", createTask)
  .put("/worker/:id/hire", hireWorker)
  .put("/worker/:id/fire", fireWorker)
  .put("/task/:id/status", updateTaskStatus)

app.listen(3000, () => {
  console.log("Server listening on port 3000")
})