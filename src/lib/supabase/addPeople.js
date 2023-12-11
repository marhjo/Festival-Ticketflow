import { supabase } from ".";

export const addPeople = async (people) =>
  await supabase.from("FooFestInfo").insert(people, {
    returning: "minimal",
  });
