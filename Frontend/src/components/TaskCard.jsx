import { FaEdit, FaTrash, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../api/axios";

function TaskCard({ task, fetchTasks, setEditTask }) {
  // Delete Task
  const deleteTask = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/tasks/${task._id}`);

      toast.success("Task deleted successfully");

      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to delete task"
      );
    }
  };

  // Mark Task as Completed
  const markCompleted = async () => {
    try {
      await api.patch(`/tasks/${task._id}/status`, {
        status: "Completed",
      });

      toast.success("Task marked as completed");

      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to update task"
      );
    }
  };

  // Badge Color
  const getPriorityClass = () => {
    switch (task.priority) {
      case "High":
        return "bg-danger";
      case "Medium":
        return "bg-warning text-dark";
      case "Low":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  // Status Badge
  const getStatusClass = () => {
    switch (task.status) {
      case "Completed":
        return "bg-success";
      case "In Progress":
        return "bg-info";
      case "Pending":
        return "bg-secondary";
      default:
        return "bg-dark";
    }
  };

  return (
    <div className="card shadow-sm mb-4 border-0 rounded-4">

      <div className="card-body">

        {/* Title */}
        <div className="d-flex justify-content-between align-items-start">

          <h5 className="fw-bold">
            {task.title}
          </h5>

          <span className={`badge ${getPriorityClass()}`}>
            {task.priority}
          </span>

        </div>

        {/* Description */}
        <p className="text-muted mt-3">
          {task.description || "No description provided."}
        </p>

        {/* Due Date */}
        <div className="mb-3">

          <small className="text-secondary">
            <FaCalendarAlt className="me-2" />

            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No Due Date"}
          </small>

        </div>

        {/* Status */}
        <span className={`badge ${getStatusClass()} mb-3`}>
          {task.status}
        </span>

        {/* Buttons */}
        <div className="d-flex gap-2 mt-3 flex-wrap">

          <button
            className="btn btn-warning btn-sm"
            onClick={() => setEditTask(task)}
          >
            <FaEdit className="me-1" />
            Edit
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={deleteTask}
          >
            <FaTrash className="me-1" />
            Delete
          </button>

          {task.status !== "Completed" && (
            <button
              className="btn btn-success btn-sm"
              onClick={markCompleted}
            >
              <FaCheckCircle className="me-1" />
              Complete
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

export default TaskCard;