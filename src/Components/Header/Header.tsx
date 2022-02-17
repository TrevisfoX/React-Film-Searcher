import { FC } from "react";
import styles from "./Header.module.scss";
import { Navbar, Container, Nav, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMoviesSearch } from "../../app/reducers/movies.reducer";
import logoHeader from "../../Assets/image/logoHeader.png";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const dispatch = useDispatch();
  const search = (event: any) => {
    const query = event.target.value;
    dispatch(fetchMoviesSearch({ query, page: 1 }));
  };

  return (
    <Navbar
      className={styles.Header}
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      fixed="top"
    >
      <Container className={styles.containerHeader}>
        <Link to={"/"} className={styles.link}>
          <Navbar.Brand className={styles.imgBrand}>
              <img src={logoHeader} alt="Logo-brand" width={'50px'}/>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/"} className={styles.link}>
              Home
            </Link>
            <Link to={"favorites"} className={styles.link}>
              Favorites
            </Link>
          </Nav>
          <Nav>
            <Form className="d-flex">
              <FormControl
                className={styles.inputSearch}
                onInput={search}
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
