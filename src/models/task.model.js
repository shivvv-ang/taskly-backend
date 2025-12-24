    import { Schema, model } from "mongoose";

    const taskSchema = new Schema(
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
                index: true, 
            },
            title: {
                type: String,
                required: true,
                trim: true,
                maxlength: 150,
            },
            description: {
                type: String,
                trim: true,
                maxlength: 1000,
            },
            status: {
                type: String,
                enum: ["PENDING", "DONE"],
                default: "PENDING",
            },
        },
        { timestamps: true }
    );

    const Task = model("Task", taskSchema);

    export default Task;
