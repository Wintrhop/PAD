import {
    TextInput,
    Button,
    Group,
    Box,
    PasswordInput,
  } from "@mantine/core";
  import { useForm } from "@mantine/form";
  import axios from "axios"

const FormLogIn = ({setOpenedLog, setOpenedPop, setExpired}) => {
    const passwordRegex = new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      );
      const form = useForm({
        initialValues: {
          email: "",
          password: "",
        },
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email Invalido"),
          password:(value)=>(passwordRegex.test(value)? null : "Ingrese una contraseña"),
        },
      });
      const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password}=form.values
        if (name === '' && email === '') {
          alert('Por favor llene el formulario antes de continuar');
        } else {
          try {
            const user = {
              email,
              password,
            };
            const { data } = await axios.post(
              'https://property-advice.herokuapp.com/auth/local/logIn',
              user,
            );
    
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('role', data.data.role);
            localStorage.setItem('name', data.data.name)
            localStorage.setItem('email', data.data.email);
            localStorage.setItem('profileImg',data.data.profileImg);
            setExpired(false);
            setOpenedLog(false);
            setOpenedPop(false);
          } catch (err) {
            err.response.status === 400
              ? alert('Usuario o Contraseña errada.')
              : alert('Ups! ocurrió algo en el LogIn');
              console.log(err.toJSON());
          }
        }
      };
    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={handleSubmit}>
          
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
  
          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />

  
          <Group position="right" mt="md">
            <Button type="submit">Iniciar Sesión</Button>
          </Group>
        </form>
      </Box>
  )
}

export default FormLogIn