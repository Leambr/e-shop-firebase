import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { addRole } from '../../services/rolesService';
import { useAuthContext } from '../../context/AuthContext';

export default function SignUp(props: any) {
    const navigate = useNavigate();
    const { CreateUser } = useAuthContext();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [verifyPassword, setVerifyPassword] = useState<string>();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password === verifyPassword && email && password) {
            const createUser = await CreateUser(email, password);
            if (createUser.user) {
                await addRole(props.role, createUser.user.uid);
                navigate('/sign-in');
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {props.role} Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Verify Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={(e) => {
                                    setVerifyPassword(e.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => handleSubmit}
                    >
                        Sign Up
                    </Button>

                    <Grid container>
                        <Grid item>
                            <Link component={RouterLink} to={`/sign-in`} variant="body2">
                                {'Already have an account? Sign in'}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
