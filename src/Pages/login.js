import * as React from 'react';
import Container from '@mui/material/Container'; 
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material'
import Person from "@mui/icons-material/Person";
import Lock from "@mui/icons-material/Lock";
import { useNavigate, useParams } from 'react-router-dom';


export const Login = () => {
  
  
  const navigate  = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('username'),
      password: data.get('password'),
    });

    
      fetch("https://dentaldriversteam.herokuapp.com/api/auth/login",{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        username: data.get('username'),
        password: data.get('password')
    })})
      .then((res) => res.json())
      .then((data) => {if(data.username) { 
        navigate({
          pathname: '/report',
          state: {
            data: data.username,
          },
        })
      } else {
        alert('Pogresan korisniik');
      }
  });
    
  };

  return (
    <Container component="main" maxWidth="xs" style={{marginTop: 140}} >
        <CssBaseline />
        <Box  sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }} ><h1>Login</h1></Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: 'solid 1px',
            borderRadius: '5px',
            padding: '15px',
            
          }}
        >
          <Box component="form" noValidate  onSubmit={handleSubmit} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="username"
                  placeholder='Username...'
                  autoComplete="username"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  placeholder='Password...'
                  autoComplete="new-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
            <Box style={{paddingTop: '15px'}}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{backgroundColor:'black'}}
              >
                LOGIN
              </Button>
            </Box>
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
        </Box>
        <Box style = {{border: 'solid 1px', borderRadius: '5px', marginTop: '15px',  height: '30px'}}>
    
        </Box>
      </Container>
  );
}