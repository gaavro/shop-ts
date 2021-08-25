import { TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../Providers/Auth";
import { Container } from "./styles";

interface IUser {
  email: string;
  password: string;
}

function Login() {
  const { signIn } = useAuth();

  const schema = yup.object().shape({
    email: yup.string().required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo de 6 dígitos")
      .required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IUser) => {
    signIn(data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            margin="normal"
            variant="outlined"
            label="Nome de usuário"
            type="email"
            size="small"
            color="primary"
            inputProps={register("email")}
            helperText={errors?.email?.message}
          ></TextField>
        </div>
        <div>
          <TextField
            margin="normal"
            variant="outlined"
            label="Nome de usuário"
            type="password"
            size="small"
            color="primary"
            inputProps={register("password")}
            helperText={errors?.password?.message}
          ></TextField>
        </div>
        <Button type="submit" variant="contained" color="primary" size="large">
          Enviar
        </Button>
      </form>
      {errors && <span> Usuário ou senha incorretas! </span>}
    </Container>
  );
}

export default Login;
