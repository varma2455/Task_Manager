import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editTask, setEditTask] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await api.get("/tasks");

      setTasks(response.data.tasks || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to load tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Statistics
  const statistics = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter(
        (task) => task.status === "Pending"
      ).length,

      progress: tasks.filter(
        (task) => task.status === "In Progress"
      ).length,

      completed: tasks.filter(
        (task) => task.status === "Completed"
      ).length,
    };
  }, [tasks]);

  // Filter + Search
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {

      const searchMatch =
        task.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        task.description
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All"
          ? true
          : task.status === statusFilter;

      const priorityMatch =
        priorityFilter === "All"
          ? true
          : task.priority === priorityFilter;

      return (
        searchMatch &&
        statusMatch &&
        priorityMatch
      );

    });
  }, [tasks, search, statusFilter, priorityFilter]);

  return (
    <>
      <Navbar />

      <div className="container py-4">

        {/* Heading */}

        <div className="dashboard-header">

          <div>
            <h2 className="fw-bold">
              Task Dashboard
            </h2>

            <p className="text-muted">
              Manage all your daily tasks.
            </p>
          </div>

        </div>

        {/* Statistics */}

        <div className="row mb-4">

          <div className="col-md-3 mb-3">
            <div className="card text-center shadow border-0">
              <div className="card-body">
                <h6>Total Tasks</h6>
                <h2>{statistics.total}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card text-center shadow border-0">
              <div className="card-body">
                <h6>Pending</h6>
                <h2>{statistics.pending}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card text-center shadow border-0">
              <div className="card-body">
                <h6>In Progress</h6>
                <h2>{statistics.progress}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card text-center shadow border-0">
              <div className="card-body">
                <h6>Completed</h6>
                <h2>{statistics.completed}</h2>
              </div>
            </div>
          </div>

        </div>

        {/* Task Form */}

        <TaskForm
          fetchTasks={fetchTasks}
          editTask={editTask}
          setEditTask={setEditTask}
        />

        {/* Search & Filters */}

        <div className="row mt-4 mb-4">

          <div className="col-md-4 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search task..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
            >
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

        </div>

                {/* Task List */}

                {loading ? (

<div className="text-center mt-5">
  <div
    className="spinner-border text-primary"
    role="status"
  >
    <span className="visually-hidden">
      Loading...
    </span>
  </div>

  <p className="mt-3">
    Loading tasks...
  </p>
</div>

) : filteredTasks.length === 0 ? (

<div className="card shadow-sm border-0">

  <div className="card-body text-center py-5">

    <h4>No Tasks Found</h4>

    <p className="text-muted">
      Create your first task or change the
      search/filter options.
    </p>

  </div>

</div>

) : (

<div className="row">

  {filteredTasks.map((task) => (

    <div
      className="col-lg-6 col-xl-4"
      key={task._id}
    >
      <TaskCard
        task={task}
        fetchTasks={fetchTasks}
        setEditTask={setEditTask}
      />
    </div>

  ))}

</div>

)}

</div>
</>
);
}

export default Dashboard;