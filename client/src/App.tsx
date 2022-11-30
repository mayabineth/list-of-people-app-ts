import axios from "axios";
import Navbar from "./components/Navbar";
import List from "./components/List";
import Loading from "./components/Loading";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPersons, setLoading, calculateAmount } from "./features/cartSlice";
axios.defaults.baseURL = "http://localhost:5000";
interface ListItem {
  _id: string;
  name: string;
  gender?: string;
  genderProbability?: string;
  nationality?: string;
  nationalityProbability?: string;
}
function App() {
  const [name, setName] = useState("");
  const { persons, loading } = useSelector((store: any) => store.cart);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      await axios.post("/persons", {
        name,
      });
    } catch (error: any) {
      if (error.response.status === 401) return;
    }
  };

  const getPersons = async () => {
    dispatch(setLoading(true));
    try {
      const {
        data: { allPersons },
      } = await axios.get("/persons");
      dispatch(setPersons(allPersons));
      dispatch(calculateAmount());
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  };
  const searchPerson = (e: any) => {
    e.preventDefault();
    const nameExist = persons.filter((item: ListItem) =>
      item.name.includes(name)
    );
    if (nameExist) dispatch(setPersons(nameExist));
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      getPersons();
    }, 1100);
    return () => clearTimeout(timeout);
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Navbar />
      <section className="section-center">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              className="person"
              placeholder="enter name ..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
            <button type="submit" className="submit-btn">
              submit
            </button>
            <button className="submit-btn" onClick={searchPerson}>
              search
            </button>
          </div>
        </form>
        <List />
      </section>
    </>
  );
}

export default App;
