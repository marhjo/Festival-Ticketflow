import { supabase } from ".";

// Eksporterer en asynkron funktion til at tilføje personer til databasen.
export const addPeople = async (people) =>
  await supabase.from("FooFestInfo").insert(people, {
    returning: "minimal",
  });
