import { supabase } from ".";

// Exports an async function that adds people to the database.
export const addPeople = async (people) =>
  await supabase.from("FooFestInfo").insert(people, {
    returning: "minimal",
  });
