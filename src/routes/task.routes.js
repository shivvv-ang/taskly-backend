import {Router} from "express"
import { authenticate } from "../middlewares/middlewares.js";
import { createTask, getUserTasks, updateTaskById, deleteTaskById } from "../controllers/controllers.js";

const taskRouter = Router();

taskRouter.post("/", authenticate, createTask);
taskRouter.get("/", authenticate,getUserTasks);
taskRouter.put("/:id", authenticate, updateTaskById);
taskRouter.delete("/:id", authenticate, deleteTaskById)

export default taskRouter;