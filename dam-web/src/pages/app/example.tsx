import {
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { InputControl, SubmitButton } from "../../components/form";
import { AppLayout, SeoLayout } from "../../page-components";
import { findMany } from "../../services/baseModelService";
import { User } from "../../shared/models/user";
import { exampleValidation } from "../../shared/validations/examplesValidation";

const ExamplePage = () => {
  const [user, setUser] = useState(new User());
  const [users, setUsers] = useState<User[]>([]);

  const onRemove = async (user: User) => {
    await user.destroy();
    fetch();
  };

  const fetch = () => {
    findMany<User>(User, null, { role: "ENG" }).then(({results, meta}) =>
      setUsers(results)
    );
  };

  const onSubmit = async (values: User) => {
    await values.save();
    setUser(new User());
    fetch();
  };

  const onEdit = (user: User) => {
    setUser(user);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <SeoLayout title="Examples">
      <AppLayout>
        <Heading mb={4} fontSize="lg" fontWeight="medium">
          Add user
        </Heading>
        <Formik
          initialValues={user}
          enableReinitialize
          onSubmit={onSubmit}
          validationSchema={exampleValidation}
        >
          {() => (
            <VStack as={Form} w="250px" align="flex-end" spacing={3}>
              <InputControl
                labelProps={{ fontSize: "sm" }}
                inputProps={{ size: "sm" }}
                label="Nome"
                name="first_name"
              />
              <InputControl
                labelProps={{ fontSize: "sm" }}
                inputProps={{ size: "sm" }}
                label="Sobrenome"
                name="last_name"
              />
              <InputControl
                labelProps={{ fontSize: "sm" }}
                inputProps={{ size: "sm" }}
                label="Usuário"
                name="username"
              />
              <InputControl
                labelProps={{ fontSize: "sm" }}
                inputProps={{ size: "sm" }}
                label="E-mail"
                name="email"
              />
              <InputControl
                labelProps={{ fontSize: "sm" }}
                inputProps={{ size: "sm", type: "password" }}
                label="Senha"
                name="password"
              />
              <SubmitButton colorScheme="blue" size="sm">
                Salvar
              </SubmitButton>
            </VStack>
          )}
        </Formik>
        <Heading mb={4} fontSize="lg" fontWeight="medium">
          Listagem de user
        </Heading>
        {users.map((user) => (
          <HStack key={user.id} mb={2}>
            <Text>{user.email}</Text>
            <IconButton
              size="sm"
              icon={<Icon as={FiEdit} boxSize={4} />}
              aria-label="Remover"
              onClick={() => onEdit(user)}
            />
            <IconButton
              size="sm"
              colorScheme="red"
              icon={<Icon as={FiTrash} boxSize={4} />}
              aria-label="Remover"
              onClick={() => onRemove(user)}
            />
          </HStack>
        ))}
      </AppLayout>
    </SeoLayout>
  );
};

export default ExamplePage;
