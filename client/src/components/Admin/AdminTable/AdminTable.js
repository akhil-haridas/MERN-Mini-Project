import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import { AdminAPI } from "../../../Apl";
import { useNavigate } from "react-router-dom";
import "./AdminTable.css";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { AdminActions } from "../../../store/AdminAthu";

function AdminTable() {
  const [userData, setUserData] = useState([]);
  const [SearchInput, setSearchInput] = useState("");
  const [deleteuser, setdeleteuser] = useState(0);
  const [isActive, setIsActive] = useState("");
  const [ActiveUserId, setActiveUserId] = useState("");
  const [Errmessage, setErrmessage] = useState("");
  const EditeName = useRef();
  const EditeEmail = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies(["jwt"]);
  const UserLogout = () => {
    removeCookie("jwt");
    dispatch(AdminActions.AdminLogout());
    navigate("/admin/login");
  };
  useEffect(() => {
    Axios.get(`${AdminAPI}getUserDetails`, { withCredentials: true })
      .then((response) => {
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteuser === 1]);

  const DeleteUser = (id) => {
    Axios.get(`${AdminAPI}DeleteUser/${id}`, { withCredentials: true })
      .then((response) => {
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setdeleteuser(1);
  };
  const EditeUser = (userId, username, email) => {
    console.log(userId);
    navigate("/admin/edituser", {
      state: { _id: userId, name: username, email: email },
    });
  };

  const handleChange = (event) => {
    setSearchInput(event.target.value);
    setdeleteuser(0);
    if (event.target.value) {
      let updateUse = userData.filter(
        (item) =>
          item.Name.toLowerCase().indexOf(SearchInput.toLowerCase()) !== -1
      );
      setUserData(updateUse);
    } else {
      setdeleteuser(1);
      setUserData(userData);
    }
  };
  const submitHandle = () => {
    const userID = ActiveUserId


    const UserEditeEmail = EditeEmail.current.value;
    const UserEditeName = EditeName.current.value;
   
    if (
      UserEditeName !== "" &&
      UserEditeEmail !== "" &&
      UserEditeEmail.includes("@")
    ) {
      Axios
        .post(
          `${AdminAPI}EditeUser`,
          { UserEditeEmail, UserEditeName, userID },
          { withCredentials: true }
        )
        .then((response) => {
          setIsActive(false);
          const result = response.data;
          if (result.EditeUser) {
          Axios.get(`${AdminAPI}getUserDetails`, {
            withCredentials: true,
          }).then((response) => {
            setUserData(response.data.data);
          });
          } else {
            setErrmessage(result.message);
          }
        });
    } else {
      setErrmessage("Email or UserName wrong");
    }
  };
  const handleCreate = () => {
    navigate("/admin/createuser");
  };
  return (
    <div>
      <div
        className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary"
        style={{ marginTop: "71px" }}
      >
        <nav
          className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg"
          id="navbarVertical"
        >
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="sidebarCollapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link">
                    <i className="bi bi-house" /> Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" style={{ color: "#5c60f5" }}>
                    <i className="bi bi-people" /> Users
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <i className="bi bi-chat" /> Messages
                    <span className="badge bg-soft-primary text-primary rounded-pill d-inline-flex align-items-center ms-auto">
                      6
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <i className="bi bi-bookmarks" /> Collections
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <i className="bi bi-bar-chart" /> Analitycs
                  </a>
                </li>
              </ul>
              {/* Divider */}
              <hr className="navbar-divider my-5 opacity-20" />
              <div className="mt-auto" />
              {/* User (md) */}
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    style={{ color: "red" }}
                    onClick={UserLogout}
                  >
                    <i
                      className="bi bi-box-arrow-left"
                      style={{ color: "red" }}
                    />{" "}
                    Logout
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <i className="bi bi-box-arrow" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Main content */}
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
          {/* Header */}
          <header
            className="bg-surface-primary border-bottom pt-6"
            style={{ marginTop: "-44px", height: "116px" }}
          >
            <div className="container-fluid">
              <div className="mb-npx" style={{ height: "72px" }}>
                <div
                  className="row align-items-center"
                  style={{ marginTop: "24px", height: "2px" }}
                >
                  <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                    {/* Title */}
                    <h1 className="h2 mb-0 ls-tight">Welcome, A D M I N</h1>
                  </div>
                  {/* Actions */}
                  <div className="col-sm-6 col-12 text-sm-end">
                    <div className="mx-n1">
                      <a
                        onClick={handleCreate}
                        className="btn d-inline-flex btn-sm btn-primary mx-1"
                      >
                        <span className=" pe-2">
                          <i className="bi bi-plus" />
                        </span>
                        <span>Create</span>
                      </a>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main */}
          <div className="py-6 bg-surface-secondary">
            <div className="container-fluid">
              <div className="card shadow border-0 mb-7">
                <div className="card-header">
                  <h5 className="mb-0">User Management</h5>
                  <input
                    style={{ width: "450px" }}
                    className="mt-5"
                    type="text"
                    placeholder="Search here"
                    onChange={handleChange}
                    value={SearchInput}
                  />
                </div>
                <div className="table-responsive">
                  <table className="table table-hover table-nowrap">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Email</th>
                        <th />
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.map((obj, index) => {
                        return (
                          <tr>
                            <td>
                              {userData && obj.image ? (
                                <img
                                  alt="..."
                                  src={`http://localhost:3001/${obj.image.replace(
                                    "\\",
                                    "/"
                                  )}`}
                                  className="avatar avatar-sm rounded-circle me-2"
                                />
                              ) : (
                                <img
                                  alt="..."
                                  src="https://images.unsplash.com/photo-1608976328267-e673d3ec06ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                                  className="avatar avatar-sm rounded-circle me-2"
                                />
                              )}
                              <a className="text-heading font-semibold">
                                {obj.Name}
                              </a>
                            </td>
                            <td>
                              <td>{obj.createdAt.substring(0, 10)}</td>
                            </td>

                            <td>
                              <span className="badge badge-lg badge-dot">
                                <i className="bg-success" />
                                {obj.email}
                              </span>
                            </td>
                            <td>
                              <a
                                className="btn btn-sm btn-neutral"
                                onClick={() => {
                                  if (isActive && ActiveUserId === obj._id) {
                                    setIsActive(false);
                                  } else {
                                    setIsActive(true);
                                    setActiveUserId(obj._id);
                                  }
                                }}
                              >
                                {isActive && ActiveUserId === obj._id
                                  ? "Close"
                                  : "View"}
                              </a>
                              {isActive && ActiveUserId === obj._id && (
                                <div
                                  className="js-profile-card active"
                                  style={{ marginTop: "-105px" }}
                                >
                                  <form
                                    className="profile-card-form"
                                    style={{
                                      height: "350px",
                                      boxShadow:
                                        "0 4px 30px rgb(15 22 56 / 0%)",
                                    }}
                                  >
                                    <div className="layout">
                                      <div className="profile">
                                        <div className="profile__picture">
                                          {userData && obj.image ? (
                                            <img
                                              alt="..."
                                              src={`http://localhost:3001/${obj.image.replace(
                                                "\\",
                                                "/"
                                              )}`}
                                            />
                                          ) : (
                                            <img
                                              alt="..."
                                              src="https://images.unsplash.com/photo-1608976328267-e673d3ec06ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                                            />
                                          )}
                                        </div>
                                        <div className="profile__header">
                                          <div className="profile__account">
                                            <h4 className="profile__username">
                                              {obj.Name}
                                            </h4>
                                          </div>
                                          <div className="profile__edit">
                                            <a
                                              className="profile__button"
                                              onClick={submitHandle}
                                            >
                                              Update
                                            </a>
                                          </div>
                                        </div>
                                        {Errmessage.length > 0 && (
                                          <a style={{ color: "red" }}>
                                            {Errmessage}
                                          </a>
                                        )}
                                        <div className="profile__stats">
                                          <div className="profile__stat">
                                            <div className="profile__icon profile__icon--gold">
                                              <i className="fas fa-wallet" />
                                            </div>
                                            <div className="profile__value">
                                              <input
                                                type="text"
                                                ref={EditeName}
                                                placeholder={obj.Name}
                                                className="modalInput"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="profile__stats">
                                          <div className="profile__stat">
                                            <div className="profile__icon profile__icon--gold">
                                              <i className="fas fa-wallet" />
                                            </div>
                                            <div className="profile__value">
                                              <input
                                                type="text"
                                                ref={EditeEmail}
                                                placeholder={obj.email}
                                                className="modalInput"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                  <div className="profile-card__overlay js-message-close" />
                                </div>
                              )}
                            </td>
                            <td className="text-end">
                              <button
                                type="button"
                                onClick={() => DeleteUser(obj._id)}
                                className="btn btn-sm btn-square btn-neutral text-danger-hover"
                              >
                                <i className="bi bi-trash" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <Container>
    //     <input
    //       className="mt-5"
    //       type="text"
    //       placeholder="Search here"
    //       onChange={handleChange}
    //       value={SearchInput}
    //     />
    //     <button onClick={handleCreate}>
    //       createUser
    //     </button>
    //     <Table className="mt-3" striped bordered hover>
    //       <thead>
    //         <tr>
    //           <th>number</th>
    //           <th>First Name</th>
    //           <th>Email</th>
    //           <th>Edit</th>
    //           <th>Delete </th>
    //         </tr>
    //       </thead>
    //       <tbody>
    // {userData.map((obj, index) => {
    //   return (
    //             <tr>
    //               <td>{index + 1}</td>
    //               <td>{obj.Name}</td>
    //               <td>{obj.email}</td>
    //               <td>
    //                 <Button
    //                   onClick={() => EditeUser(obj._id, obj.Name, obj.email)}
    //                   variant="primary"
    //                 >
    //                   Edit
    //                 </Button>
    //               </td>
    //               <td>
    //                 <Button
    //                   onClick={() => DeleteUser(obj._id)}
    //                   variant="danger"
    //                 >
    //                   Delete
    //                 </Button>
    //               </td>
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </Table>
    //   </Container>
    // </div>
  );
}

export default AdminTable;
