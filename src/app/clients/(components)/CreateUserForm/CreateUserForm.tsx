"use client";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants/formSchema";

import { InputMask } from "@react-input/mask";

import { postCreateUser } from "@/utils/api/requests/post";
import {
  Button,
  Card,
  Form,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Separator,
  RadioGroup,
  RadioGroupItem,
  Label,
} from "@/components/ui";
import { useRouter } from "next/navigation";
import { parse } from "date-fns";

export const CreateUserForm = () => {
  const router = useRouter();
  const userForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      BirthDate: "",
      Name: "",
      passport: "",
      Password: "",
      Login: "",
      Patronymic: "",
      PhoneNumber: "",
      Snils: "",
      Surname: "",
      UserType: "User",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const body = {
      ...values,
      Address: "кукушкина",
      BirthDate: parse(
        values.BirthDate,
        "dd.MM.yyyy",
        new Date(),
      ).toISOString(),
      PassportNumber: values.passport.split(" ")[1],
      PassportSeries: values.passport.split(" ")[0],
      Patronymic: values.Patronymic,
      PhoneNumber: values.PhoneNumber,
      UserType: values.UserType,
    } satisfies CreateUserDto;
    try {
      await postCreateUser(body);
      userForm.reset();
    } catch (e) {
      alert("Что-то пошло не так");
    }

    router.refresh();
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Создание нового клиента</CardTitle>
        <CardDescription>
          Введите данные пользователя, чтобы создать новую учетную запись.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...userForm}>
          <form
            onSubmit={userForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-medium mb-4">Личная информация</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={userForm.control}
                  name="Surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Фамилия</FormLabel>
                      <FormControl>
                        <Input placeholder="Смирнов" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={userForm.control}
                  name="Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Имя</FormLabel>
                      <FormControl>
                        <Input placeholder="Иван" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={userForm.control}
                  name="Patronymic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Отчество</FormLabel>
                      <FormControl>
                        <Input placeholder="Петрович" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={userForm.control}
                  name="BirthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Дата рождения</FormLabel>
                      <FormControl>
                        <InputMask
                          component={Input}
                          mask="__.__.____"
                          showMask
                          replacement={{ _: /\d/ }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">
                Контактная информация
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={userForm.control}
                  name="PhoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Номер телефона</FormLabel>
                      <FormControl>
                        <InputMask
                          component={Input}
                          mask="+7-(___)-___-__-__"
                          showMask
                          replacement={{ _: /\d/ }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">
                Информация о документах
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={userForm.control}
                  name="Snils"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>СНИЛС</FormLabel>
                      <FormControl>
                        <InputMask
                          component={Input}
                          mask="___-___-___ __"
                          showMask
                          replacement={{ _: /\d/ }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={userForm.control}
                  name="passport"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Паспорт</FormLabel>
                      <FormControl>
                        <InputMask
                          component={Input}
                          mask="____ ______"
                          showMask
                          replacement={{ _: /\d/ }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">
                Авторизационные данные
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={userForm.control}
                  name="Login"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Логин</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={userForm.control}
                  name="Password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Пароль</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="********"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Controller
                control={userForm.control}
                name="UserType"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex mt-3"
                  >
                    <div className="flex gap-2 items-center">
                      <RadioGroupItem id="User" value="User" />
                      <Label htmlFor="User">Клиент</Label>
                    </div>
                    <div className="flex gap-2 items-center">
                      <RadioGroupItem id="Worker" value="Worker" />
                      <Label htmlFor="Worker">Работник</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => userForm.reset()}
              >
                Сбросить
              </Button>
              <Button type="submit" className="">
                {userForm.formState.isSubmitting ? "Создание..." : "Создать"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
