import { Task } from "../models/models.js";
import { log, ApiError } from "../utils/utils.js";
import { validateCreateTask, validateUpdateTask } from "../validators/validators.js";


export const createTask = async (req, res, next) => {

    log.info("Create Task End Point Hit");

    try {

        const { error } = validateCreateTask(req.body);

        if (error) {
            return next(
                new ApiError(
                    400,
                    "Validation failed",
                    error.details.map(err => err.message)
                )
            );
        }

        const { title, description } = req.body;

        const task = await Task.create({
            user: req.user.id,
            title,
            description,
        });

        log.info("Task created successfully", { user: req.user.id, taskId: task._id });

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task,
        });
    } catch (err) {
        log.error("Error in createTask", err);
        next(err);
    }
}

export const getUserTasks = async (req, res, next) => {

    log.info("Get User Tasks End Point Hit");

    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });

        log.info("User tasks fetched", { user: req.user.id, count: tasks.length });

        return res.status(200).json({
            success: true,
            data: tasks,
        });
    } catch (err) {
        log.error("Error in getUserTasks", err);
        next(err);
    }
}

export const updateTaskById = async (req, res, next) => {

    log.info("Update Task End Point Hit");

    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return next(new ApiError(404, "Task not found"));
        }

        const { error } = validateUpdateTask(req.body);

        if (error) {
            return next(
                new ApiError(
                    400,
                    "Validation failed",
                    error.details.map(err => err.message)
                )
            );
        }

        const { title, description, status } = req.body;

        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (status !== undefined) task.status = status; 

        await task.save();

        log.info("Task updated successfully", { user: req.user.id, taskId: task._id });

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task,
        });
    } catch (err) {
        log.error("Error in updateTaskById", err);
        next(err);
    }
}

export const deleteTaskById = async (req, res, next) => {

    log.info("Delete Task End Point Hit");

    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return next(new ApiError(404, "Task not found"));
        }

        if (task.user.toString() !== req.user.id) {
            return next(new ApiError(403, "You are not authorized to delete this task"));
        }

        await task.deleteOne();

        log.info("Task deleted successfully", { user: req.user.id, taskId: task._id });

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (err) {
        log.error("Error in deleteTaskById", err);
        next(err);
    }
}
