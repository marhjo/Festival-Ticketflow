import { Card, Toggle } from "../../base";
import { createSignal } from "solid-js";

export const ConfirmAge = ({ setDisabled }) => {
  const [age, setAge] = createSignal(false);

  setDisabled(true);

  return (
    <Card class="items-center gap-2">
      <p class="text-lg font-medium">Confirm Age</p>

      <p>
        You must be 18 years or older to attend this event. Please confirm you
        are of age.
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
