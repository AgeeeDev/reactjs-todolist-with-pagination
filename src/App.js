import "./App.css";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { CheckCircle, Edit, Delete } from "@mui/icons-material";
import ReactPaginate from "react-paginate";

function App() {
  const dummyData = [
    {
      id: 1,
      task: "Task 1",
      status: true,
    },
    {
      id: 2,
      task: "Task 2",
      status: true,
    },
    {
      id: 3,
      task: "Task 3",
      status: false,
    },
    {
      id: 4,
      task: "Task 4",
      status: true,
    },
    {
      id: 5,
      task: "Task 5",
      status: true,
    },
    {
      id: 6,
      task: "Task 6",
      status: false,
    },
    {
      id: 7,
      task: "Task 7",
      status: true,
    },
    {
      id: 8,
      task: "Task 8",
      status: true,
    },
    {
      id: 9,
      task: "Task 9",
      status: false,
    },
    {
      id: 10,
      task: "Task 10",
      status: true,
    },
    {
      id: 11,
      task: "Task 11",
      status: true,
    },
    {
      id: 12,
      task: "Task 12",
      status: false,
    },
    {
      id: 13,
      task: "Task 13",
      status: false,
    },
    {
      id: 14,
      task: "Task 14",
      status: true,
    },
    {
      id: 15,
      task: "Task 15",
      status: true,
    },
    {
      id: 16,
      task: "Task 16",
      status: false,
    },
    {
      id: 17,
      task: "Task 17",
      status: true,
    },
    {
      id: 18,
      task: "Task 18",
      status: true,
    },
    {
      id: 19,
      task: "Task 19",
      status: false,
    },
    {
      id: 20,
      task: "Task 20",
      status: true,
    },
    {
      id: 21,
      task: "Task 21",
      status: true,
    },
    {
      id: 22,
      task: "Task 22",
      status: false,
    },
  ];
  const [tasks, setTasks] = useState(dummyData);
  const [addInput, setAddInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editId, setEditId] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  //Pagination
  const itemsPerPage = 10;
  const pagesVisited = pageNumber * itemsPerPage;

  const pageCount = Math.ceil(tasks.length / itemsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //Add Task
  const addTask = () => {
    if (!addInput) return window.alert("Field is required");

    let id = Date.now();
    let newObj = {
      id: id,
      task: addInput,
      status: false,
    };

    setTasks((prev) => [...prev, newObj]);

    setAddInput("");
  };

  //Handle Edit Field
  const editField = (id, value) => {
    setEditId(id);
    setEditInput(value);
  };

  //Edit Task
  const editTask = (id) => {
    if (!editTask) return window.alert("Field is required");

    let newObj = {
      id: id,
      task: editInput,
      status: false,
    };

    let filteredTask = tasks.filter((item) => item.id !== id);

    let newTasks = [...filteredTask, newObj];

    setTasks(newTasks);
    setEditInput("");
  };

  //Delete Task
  const deleteTask = (id) => {
    let newTasks = tasks.filter((item) => item.id !== id);

    setTasks(newTasks);
  };

  //Completed Task
  const completedTask = (id) => {
    let newTasks = tasks.map((item) => {
      if (item.id === id) {
        return { ...item, status: !item.status };
      }

      return item;
    });

    setTasks(newTasks);
  };

  return (
    <div className='App'>
      <div className='projectName'>AGEEE DEV'S TODO LIST</div>

      <div className='inputWrapper'>
        <div className='inputContainer'>
          <input
            onChange={(e) => setAddInput(e.target.value)}
            type='text'
            placeholder='Add Task'
            value={addInput}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <div className='inputContainer'>
          <input
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            type='text'
            placeholder='Edit Task'
          />
          <button onClick={() => editTask(editId)}>Edit</button>
          <button onClick={() => setEditInput("")} className='cancel'>
            Cancel
          </button>
        </div>
      </div>

      <div className='content'>
        {!tasks.length && <div className='noTask'>No Task Available</div>}
        {tasks
          .sort((a, b) => (a.id < b.id ? 1 : -1))
          .slice(pagesVisited, pagesVisited + itemsPerPage)
          .map((item) => {
            return (
              <div key={item.id} className='listItem'>
                <p>{item.task}</p>

                <div className='actionBtns'>
                  <IconButton
                    onClick={() => completedTask(item.id)}
                    color={item.status ? "success" : "null"}
                  >
                    <CheckCircle />
                  </IconButton>
                  <IconButton
                    color='primary'
                    onClick={() => editField(item.id, item.task)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton color='error' onClick={() => deleteTask(item.id)}>
                    <Delete />
                  </IconButton>
                </div>
              </div>
            );
          })}
      </div>

      {tasks.length > itemsPerPage + 1 && (
        <div className='pagination'>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationContainer"}
            previousLinkClassName={"prevBtn"}
            nextLinkClassName={"nextBtn"}
            activeClassName={"activePagination"}
          />
        </div>
      )}
    </div>
  );
}

export default App;
