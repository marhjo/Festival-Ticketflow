import { Card, Toggle } from "../../base";
import { createSignal } from "solid-js";

export const ConfirmAge = ({ setDisabled }) => {
  const [age, setAge] = createSignal(false);

  // Sets page as disabled by default, will be overridden if age is confirmed
  setDisabled(true);

  return (
    <Card class="items-center gap-4">
      <p class="text-lg font-medium">Confirm Age</p>

      <p>
        Please confirm that all ticket purchasers are 18 or older, as this is a
        requirement to attend the festival.
      </p>

      <div className="flex items-center gap-1">
        <p>Everyone is of age</p>

        <Toggle
          state={[
            age,
            (state) => {
              setDisabled(!state);
              setAge(state);
            },
          ]}
        />
      </div>
    </Card>
  );
};
