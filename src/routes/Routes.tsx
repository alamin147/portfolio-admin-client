import { createBrowserRouter } from "react-router-dom";
import Login from "../actions/login/login";
import App from "../App";
import CreateProject from "../actions/project/CreateProject";
import DeleteProject from "../actions/project/DeleteProject";
import PrivateRoute from "./PrivateRoute";
import CreateBlog from "../actions/blog/CreateBlog";
import DeleteBlog from "../actions/blog/DeleteBlog";
import CreateSkill from "../actions/skill/CreateSkill";
import DeleteSkill from "../actions/skill/DeleteSkill";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/home/create-project",
        element: (
          <PrivateRoute>
            <CreateProject />
          </PrivateRoute>
        ),
      },
      {
        path: "/home/delete-project",
        element: (
          <PrivateRoute>
            <DeleteProject />
          </PrivateRoute>
        ),
      },
      {
        path: "/home/create-blog",
        element: (
          <PrivateRoute>
            <CreateBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "/home/delete-blog",
        element: (
          <PrivateRoute>
            <DeleteBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "/home/create-skill",
        element: (
          <PrivateRoute>
            <CreateSkill />
          </PrivateRoute>
        ),
      },
      {
        path: "/home/delete-skill",
        element: (
          <PrivateRoute>
            <DeleteSkill />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
