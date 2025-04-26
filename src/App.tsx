import { useState } from "react";
import {
  Header,
  Input,
  Slider,
  SubmitButton,
  DateTimePicker,
} from "./components";
import { FileInput } from "./components/FileInput";
import { useNationalHolidays } from "./hooks/use-national-holidays";
import { createFormData } from "./helpers";
import { ToastContainer } from "react-toastify";
import { usePost } from "./hooks/use-post";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(8);
  const [photo, setPhoto] = useState<File | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const { submitData } = usePost({
    url: "http://letsworkout.pl/submit",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = createFormData({
      firstName,
      lastName,
      email,
      age,
      photo,
      date,
      time,
    });
    submitData(formData);
  };

  const { nationalHolidays, isLoading, isDateHoliday } = useNationalHolidays();

  return (
    <main className="px-[23px] py-[96px] md:px-[747px] md:py-[120px] max-w-[100vw]">
      <Header title="Personal info" />
      <form onSubmit={handleSubmit}>
        <Input
          label="First Name"
          id="first-name"
          name="first-name"
          value={firstName}
          onChange={setFirstName}
        />
        <Input
          label="Last Name"
          id="last-name"
          name="last-name"
          value={lastName}
          onChange={setLastName}
        />
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={setEmail}
        />
        <Slider
          label="Age"
          id="Age"
          min={8}
          max={100}
          name="age"
          value={age}
          setValue={setAge}
        />
        <FileInput
          label="Photo"
          id="profile-picture"
          name="profile-picture"
          file={photo}
          setFile={setPhoto}
        />
        <Header title="Your workout" />
        <DateTimePicker
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          isLoading={isLoading}
          nationalHolidays={nationalHolidays}
          isDateHoliday={isDateHoliday(date)}
        />
        <SubmitButton
          disabled={
            !firstName ||
            !lastName ||
            !email ||
            !age ||
            !photo ||
            !date ||
            (isDateHoliday(date) ? false : !time)
          }
        />
      </form>
      <ToastContainer aria-label="Toast container" />
    </main>
  );
}
