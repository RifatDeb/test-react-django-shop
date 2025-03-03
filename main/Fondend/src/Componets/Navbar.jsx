import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import { Link } from 'react-router-dom';
import { useGlobalState } from '../State/provider';


function Navber() {
  const [{ profile,cartuncomplite }, dispatch] = useGlobalState()
  // console.log(profile, "$$$  Gloval state");
  let cart_product_length = 0
  if(cart_product_length !==null){
    cart_product_length=cartuncomplite?.cartproduct?.length

  }else{
    cart_product_length=0
  }

  const logOut =()=> {
    window.localStorage.clear()
    dispatch({
      type:"ADD_PROFILE",
      profile:null

    })
    window.location.href='/'
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand >React-Sope</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/">Home </Nav.Link>
            {
              profile !== null ?
                (
                  <>
                    <Nav.Link href="/profilePage">Profile</Nav.Link>
                    <Nav.Link  onClick={logOut}>LogOut</Nav.Link>
                    <Nav.Link href="/cart">cart ({cart_product_length})</Nav.Link>

                  </>
                ) :
                <>
                  <Nav.Link href="/RegistarPage">registar</Nav.Link>
                  <Nav.Link href="/loginPage">Login</Nav.Link>

                </>
            }
            

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navber;