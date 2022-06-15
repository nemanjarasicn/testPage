
import  {Login}    from   './Pages/login'
import  {Report}    from   './Pages/report'
import { Route, Routes, component ,  BrowserRouter as Router} from "react-router-dom";

function App() {
  const styles = {
    contentDiv: {
      display: "flex",
    },
    contentMargin: {
      marginLeft: "10px",
      width: "100%",
    },
  };
  return (
    <>
    <Router>
        <Routes >
          <Route exact path='/' element={<Login/>} />
          <Route exact path='/report' element={<Report/>} />
        </Routes>
    </Router>
    </>
  );
}

export default App;