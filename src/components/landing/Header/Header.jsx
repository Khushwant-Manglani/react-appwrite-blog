import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Logo } from "../../index";
import authService from "../../../appwrite/authService";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => dispatch(logout()))
      .catch((err) => console.log(err));
  };

  return (
    <header className="border py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="my-auto">
            <Link to="/">
              <Logo width="100px" />
            </Link>
          </div>

          <ul className="flex ml-auto">
            {navItems.map((item) => {
              return (
                item.active && (
                  <li key={item.name}>
                    <Button
                      onClick={() => navigate(item.slug)}
                      textColor="text-black"
                      bgColor=""
                      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </Button>
                  </li>
                )
              );
            })}

            {authStatus && (
              <li>
                <Button
                  onClick={logoutHandler}
                  textColor="text-black"
                  bgColor=""
                  className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                >
                  Logout
                </Button>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
