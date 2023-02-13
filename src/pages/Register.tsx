import {
   Flex,
   Box,
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   HStack,
   InputRightElement,
   Stack,
   Button,
   Heading,
   Text,
   FormErrorMessage,
   useColorModeValue,
   Link,
   useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { RegisterFormInput } from "../app-types/register-form-input.type";
import { useAppDispatch } from "../redux-toolkit/hooks";
import { registerThunk } from "../redux-toolkit/auth/auth-slice";
import { ErrorRegisterResponse } from "../app-types/register.type";
import { LoginFormInput } from "../app-types/login-form-input.type";
import { useNavigate } from "react-router-dom";
export default function Register() {
   const navigate = useNavigate();
   const toast = useToast();
   const [showPassword, setShowPassword] = useState(false);
   const dispatch = useAppDispatch();

   // schema validation
   const schema = yup.object().shape({
      email: yup
         .string()
         .required("กรุณากรอก Email")
         .email("รูปแบบ Email ไม่ถูกต้อง"),
      password: yup
         .string()
         .required("กรุณากรอกรหัสผ่าน")
         .min(4, "รหัสต้องไม่ต่ำกว่า 4 ตัวอักษร"),
   });

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<RegisterFormInput>({
      resolver: yupResolver(schema),
      mode: "all",
   });

   const onSubmit = async (data: RegisterFormInput) => {
      try {
         const result = await dispatch(registerThunk(data)).unwrap();
         if (result.data) {
            navigate("/login");
         }
         // alert
         toast({
            title: "ผลการทำงาน",
            description: "สมัครสมาชิกเรียบร้อย",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top-right",
         });
      } catch (error: any) {
         let err: ErrorRegisterResponse = error;
         toast({
            title: "ผลการทำงาน",
            description: err.errors.email,
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top-right",
         });
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
         >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
               <Stack align={"center"}>
                  <Heading fontSize={"4xl"} textAlign={"center"}>
                     Sign up
                  </Heading>
                  {/* <Text fontSize={"lg"} color={"gray.600"}>
                     to enjoy all of our cool features ✌️
                  </Text> */}
               </Stack>
               <Box
                  rounded={"lg"}
                  bg={useColorModeValue("white", "gray.700")}
                  boxShadow={"lg"}
                  p={10}
               >
                  <Stack spacing={4}>
                     <FormControl id="email" isRequired>
                        <FormLabel>Your Name</FormLabel>
                        <Input {...register("name")} />
                     </FormControl>
                     <FormControl
                        id="email"
                        isRequired
                        isInvalid={errors.email ? true : false}
                     >
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" {...register("email")} />
                        <FormErrorMessage>
                           {errors.email && errors.email?.message}
                        </FormErrorMessage>
                     </FormControl>
                     <FormControl
                        id="password"
                        isRequired
                        isInvalid={errors.password ? true : false}
                     >
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                           <Input
                              type={showPassword ? "text" : "password"}
                              {...register("password")}
                           />

                           <InputRightElement h={"full"}>
                              <Button
                                 variant={"ghost"}
                                 onClick={() =>
                                    setShowPassword(
                                       (showPassword) => !showPassword
                                    )
                                 }
                              >
                                 {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                              </Button>
                           </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                           {errors.password && errors.password?.message}
                        </FormErrorMessage>
                     </FormControl>
                     <Stack spacing={10} pt={2}>
                        <Button
                           isLoading={isSubmitting}
                           loadingText="กำลังสมัครสมาชิก"
                           type="submit"
                           size="lg"
                           bg={"blue.400"}
                           color={"white"}
                           _hover={{
                              bg: "blue.500",
                           }}
                        >
                           Sign up
                        </Button>
                     </Stack>
                     <Stack pt={6}>
                        <Text align={"center"}>
                           Already a user?{" "}
                           <Link
                              color={"blue.400"}
                              onClick={() => {
                                 navigate("/login");
                              }}
                           >
                              Login
                           </Link>
                        </Text>
                     </Stack>
                  </Stack>
               </Box>
            </Stack>
         </Flex>
      </form>
   );
}
