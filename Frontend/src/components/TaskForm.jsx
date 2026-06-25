import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

function TaskForm({ fetchTasks, editTask, setEditTask }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  });

  // Load task data when editing
  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title || "",
        description: editTask.description || "",
        priority: editTask.priority || "Medium",
        status: editTask.status || "Pending",
        dueDate: editTask.dueDate
          ? editTask.dueDate.substring(0, 10)
          : "",
      });
    }
  }, [editTask]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
      dueDate: "",
    });

    if (setEditTask) {
      setEditTask(null);
    }
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    try {
      if (editTask) {
        await api.put(`/tasks/${editTask._id}`, formData);

        toast.success("Task updated successfully");
      } else {
        await api.post("/tasks", formData);

        toast.success("Task created successfully");
      }

      resetForm();

      if (fetchTasks) {
        fetchTasks();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="task-form">

      <h4 className="mb-4">
        {editTask ? "Edit Task" : "Create New Task"}
      </h4>

      <form onSubmit={handleSubmit}>

        {/* Title */}
        <div className="mb-3">
          <label className="form-label">
            Task Title
          </label>

          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Enter task title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">
            Description
          </label>

          <textarea
            className="form-control"
            rows="4"
            name="description"
            placeholder="Task description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Priority */}
        <div className="mb-3">
          <label className="form-label">
            Priority
          </label>

          <select
            className="form-select"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-3">
          <label className="form-label">
            Status
          </label>

          <select
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Due Date */}
        <div className="mb-3">
          <label className="form-label">
            Due Date
          </label>

          <input
            type="date"
            className="form-control"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>

        {/* Buttons */}
        <div className="d-flex gap-2">

          <button
            type="submit"
            className="btn btn-primary"
          >
            {editTask ? "Update Task" : "Create Task"}
          </button>

          {editTask && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}

        </div>

      </form>

    </div>
  );
}

export default TaskForm;