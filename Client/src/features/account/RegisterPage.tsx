import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
    Fade,
} from "@mui/material";
import { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { useNavigate } from "react-router";
import requests from "../../api/requests";
import { toast } from "react-toastify";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        defaultValues: {
            username: "",
            name: "",
            email: "",
            password: "",
        },
        mode: "onTouched",
    });

    async function submitForm(data: FieldValues) {
        requests.Account.register(data)
            .then(() => {
                toast.success("Kayıt başarılı!");
                navigate("/login");
            })
            .catch((result) => {
                const { data: errors } = result;

                errors.forEach((error: any) => {
                    if (error.code == "DuplicateUserName") {
                        setError("username", { message: error.description });
                    } else if (error.code == "DuplicateEmail") {
                        setError("email", { message: error.description });
                    }
                });
            });
    }

    return (
        <Container maxWidth="xs" sx={{ mb: 4 }}>
            <Fade in timeout={700}>
                <Paper
                    sx={{
                        mt: 10,
                        p: 5,
                        borderRadius: 4,
                        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
                        background:
                            "linear-gradient(180deg, #fff 75%, #e3f2fd 100%)",
                    }}
                    elevation={0}
                >
                    <Avatar
                        sx={{
                            mx: "auto",
                            bgcolor: "primary.main",
                            width: 64,
                            height: 64,
                            mb: 2,
                            boxShadow: 3,
                        }}
                    >
                        <LockOutlined sx={{ fontSize: 36 }} />
                    </Avatar>
                    <Typography
                        component="h1"
                        variant="h4"
                        align="center"
                        fontWeight={700}
                        color="primary.main"
                        letterSpacing={1}
                        mb={2}
                    >
                        Register
                    </Typography>
                    <Typography
                        variant="body2"
                        align="center"
                        color="text.secondary"
                        mb={3}
                    >
                        Hesabınız yok mu? Hızlıca kayıt olun ve alışverişe
                        başlayın!
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(submitForm)}
                        noValidate
                        sx={{ mt: 2 }}
                    >
                        <TextField
                            {...register("username", {
                                required: "Kullanıcı adı gereklidir",
                            })}
                            label="Kullanıcı Adı"
                            fullWidth
                            size="medium"
                            sx={{ mb: 2 }}
                            autoFocus
                            error={!!errors.username}
                            helperText={errors.username?.message}
                        />
                        <TextField
                            {...register("name", {
                                required: "Ad Soyad gereklidir",
                            })}
                            label="Ad Soyad"
                            fullWidth
                            size="medium"
                            sx={{ mb: 2 }}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            {...register("email", {
                                required: "E-posta gereklidir",
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "Geçerli bir e-posta adresi girin",
                                },
                            })}
                            label="E-posta"
                            fullWidth
                            size="medium"
                            sx={{ mb: 2 }}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            {...register("password", {
                                required: "Şifre gereklidir",
                                minLength: {
                                    value: 6,
                                    message: "Şifre en az 6 karakter olmalıdır",
                                },
                            })}
                            label="Şifre"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            size="medium"
                            sx={{ mb: 2 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="şifreyi göster"
                                            onClick={() =>
                                                setShowPassword((show) => !show)
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid}
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                mt: 1,
                                borderRadius: 2,
                                fontWeight: 600,
                                letterSpacing: 1,
                                py: 1.5,
                                background:
                                    "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)",
                                boxShadow:
                                    "0 4px 20px 0 rgba(33, 150, 243, 0.10)",
                                transition: "transform 0.2s",
                                "&:hover": {
                                    background:
                                        "linear-gradient(90deg, #1565c0 60%, #1976d2 100%)",
                                    transform: "scale(1.03)",
                                },
                            }}
                        >
                            Register
                        </Button>
                    </Box>
                </Paper>
            </Fade>
        </Container>
    );
}
