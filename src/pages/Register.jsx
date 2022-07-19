import styled from "styled-components";
import { mobile } from "../responsive";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../pages/form.css"
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://hablemosdemodaya.com/wp-content/uploads/2018/07/assorted-blurred-background-boutique-994523-e1531783191138.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form_ = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {

const dispatch = useDispatch();
const registero = useSelector((state) => state.user.register);

const initialValues = {
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
};

  const validationSchema = Yup.object({
    name: Yup.string().required("Es necesario llenar este campo"),
    lastName: Yup.string().required("Es necesario llenar este campo"),
    username: Yup.string().required("Es necesario llenar este campo"),
    email: Yup.string().required("Es necesario llenar este campo"),
    password: Yup.string().required("Es necesario llenar este campo"),
    confirmPassword: Yup.string().required("Es necesario llenar este campo"),
    
  });

    const  onSubmit = (values, { resetForm }) => {
      register(dispatch, values)
      resetForm()

    };
    const onClick = () => {
      if (registero === "error") {
        swal({
          title: "Hubo un error",
          text: "Por favor intente nuevamente",
        });
      } else if (registero === "Usuario creado") {
        swal({
          title: "Se registro correctamente",
          text: "disfrute del servicio",
        }).then(() => {
          window.location = "https://deploy-front-ecomerce.vercel.app/";
        });
      }
    };
    onClick();

  
  return (
    <Container>
       <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form className="form">
          <div>
              <Field
                  className="input"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="name"
                  />
                  <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="name"
                  />
          </div>      
          <div>
              <Field
                  className="input"
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="last name"
                  />
                  <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="lastName"
                  />
          </div>  
          <div>
              <Field
                  className="input"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="username"
                  />
                  <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="username"
                  />
          </div> 
          <div>
              <Field
                  className="input"
                  id="email"
                  name="email"
                  type="text"
                  placeholder="email"
                  />
                  <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="email"
                  />
          </div>
          <div>
              <Field
                  className="input"
                  id="password"
                  name="password"
                  type="text"
                  placeholder="password"
                  />
                  <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="password"
                  />
          </div>
          <div>
              <Field
                  className="input"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="text"
                  placeholder="confirm Password"
                  />
                  <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="confirmPassword"
                  />
          </div>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onSubmit={onSubmit}>CREATE</Button>
        </Form> 
      </Wrapper>
      </Formik>
    </Container>
  );
};

export default Register;
