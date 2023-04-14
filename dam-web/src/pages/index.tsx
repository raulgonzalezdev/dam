import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { BiLock, BiUser } from "react-icons/bi";
import {
  InputIconControl,
  InputPasswordControl,
  SubmitButton,
} from "../components/form";
import { SeoLayout } from "../page-components";
import { login } from "../services/authService";
import { User } from "../shared/models/user";
import { loginValidation } from "../shared/validations/loginValidation";
import { useAuthStore } from "../stores/useAuthStore";

const initialValues: Pick<User, "username" | "password"> = {
  username: "",
  password: "",
};

export default function LoginPage() {
  const setAuth = useAuthStore(({ setAuth }) => setAuth);

  const onSubmit = async (values: Pick<User, "username" | "password">) => {
    const data = await login(values);
    setAuth(data);
  };

  return (
    <SeoLayout title="Login">
      <Flex h="100vh" align="center" justify="center">
        <VStack w="full" maxW="417px" align="center" spacing={8}>
          <Image
            src="/images/logo.png"
            style={{ objectFit: "fill" }}
            width={200}
            height={70}
            alt="DAM"
            priority
          />
          <VStack w="full" spacing={8} p={8} bg="white" borderRadius={10}>
            <VStack w="full" spacing={2}>
              <Heading as="h3" size="md" fontWeight="medium" py={0}>
                Bem vindo
              </Heading>
              <Text>Insira seus dados de acesso</Text>
            </VStack>
            <Formik
              initialValues={initialValues}
              validationSchema={loginValidation}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={onSubmit}
            >
              {() => (
                <VStack as={Form} w="full" spacing={3}>
                  <InputIconControl
                    name="username"
                    icon={BiUser}
                    inputProps={{
                      placeholder: "Digite seu usuário",
                    }}
                    errorMessageProps={{ fontSize: "sm" }}
                  />
                  <InputPasswordControl
                    name="password"
                    icon={BiLock}
                    inputProps={{
                      placeholder: "Digite sua senha",
                    }}
                    errorMessageProps={{ fontSize: "sm" }}
                  />
                  <SubmitButton
                    colorScheme="blue"
                    type="submit"
                    w="full"
                    fontSize="sm"
                  >
                    Entrar
                  </SubmitButton>
                </VStack>
              )}
            </Formik>
          </VStack>
          <Text>
            Esqueceu sua senha?{" "}
            <Link href="/reset-password" passHref>
              <Button variant="link" fontSize="sm" fontWeight="medium">
                Recuperar a senha
              </Button>
            </Link>
          </Text>
        </VStack>
      </Flex>
    </SeoLayout>
  );
}
