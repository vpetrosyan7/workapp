import axios from 'axios';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import './App.css';

function App() {
  //const navigate = useNavigate();

  const addUser = (user) => {
    axios.post('https://localhost:7296/account/register', {
    //axios.post('http://192.168.100.23:2020/account/register', {
        FirstName: user.firstName,
        LastName: user.lastName,
        Email: user.email,
        Password: user.password,
        LoginProvider: user.provider
      })
      .then(function (response) {
        console.log(response);

        //navigate("/");

        // var accessToken = response.data.access_token;

        // axios.get("https://localhost:7296/test/get", {
        // //axios.post("http://192.168.100.23:2020/test/get", {
        //     headers: {
        //         "Authorization": `Bearer ${accessToken}`
        //     }
        // })
        // .then(function (response) {
        //     console.log(response);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login addUser={addUser} />
    },
    {
      path: "/register",
      element: <Register addUser={addUser} />
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
