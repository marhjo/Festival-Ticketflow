import { Card, Button } from "../../base";
import { price, name } from "../info";

export const Tickets = ({ people }) => (
  <>
    <Ticket type="regular" people={people} color="text-blue">
      Lorem ipsum dolor sit amet con sectetur adipisicing elit. Quisqu am, volup
      tatibus.
    </Ticket>

    <Ticket type="vip" people={people} color="text-peach">
      Lorem ipsum dolor sit amet con sectetur adipisicing elit. Quisqu am, volup
      tatibus.
    </Ticket>
  </>
);

const Ticket = ({ type, people: [people, setPeople], children, color }) => (
  <Card>
    <div class="flex items-center justify-between gap-3">
      <p class={`text-lg font-medium ${color}`}>{name[type]}</p>
      <p class="text-lg font-medium">
        {price[type]} <span class="text-subtext0">DKK</span>
      </p>
    </div>

    <p class="mt-[-8px]">{children}</p>

    <div class="flex items-center justify-end gap-2">
      <Button
        type="button"
        size="sm"
        square
        reactive={{
          color: () => (people()[type] < 1 ? "disabled" : "primary"),
        }}
        on:click={() =>
          setPeople((people) => ({
            ...people,
            [type]: Math.max(people[type] - 1, 0),
          }))
        }
      >
        -
      </Button>

      <p class="px-[2px] text-lg font-medium">{people()[type]}</p>

      <Button
        type="button"
        size="sm"
        square
        on:click={() =>
          setPeople((people) => ({ ...people, [type]: people[type] + 1 }))
        }
      >
        +
      </Button>
    </div>
  </Card>
);
