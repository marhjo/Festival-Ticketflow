import { createEffect, createMemo, createSignal } from "solid-js";
import { Button, Card } from "./base";

const price = {
  regular: 799,
  vip: 1299,
};

const tentPrice = {
  0: 0,
  2: 499,
  3: 699,
};

const name = {
  regular: "Regular",
  vip: "VIP",
};

export const Sale = () => {
  const [page, setPage] = createSignal(0);

  const [people, setPeople] = createSignal({
    regular: 0,
    vip: 0,
  });

  const [tents, setTents] = createSignal({
    type: 0,
    count: 0,
  });

  const totalPeople = createMemo(() =>
    Object.values(people()).reduce((acc, val) => acc + val, 0),
  );

  const realPrice = createMemo(() => {
    const values = people();
    const tent = tents();

    return (
      Object.keys(values).reduce(
        (acc, key) => acc + values[key] * price[key],
        0,
      ) +
      tentPrice[tent.type] * tent.count
    );
  });

  return (
    <div class="w-[600px]">
      <div class="flex items-center justify-between">
        <h2 class="mb-2 text-2xl font-semibold">Place</h2>

        <p class="text-lg font-medium">
          Total: {realPrice} <span class="text-subtext0">DKK</span>
        </p>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="flex flex-col gap-2">
          <Card class="min-h-[130px] items-center justify-center">
            {page() === 0 && "Image here."}

            {page() === 1 && (
              <>
                <p class="mb-4 w-full text-left text-lg font-medium">Tents</p>

                <div class="px-8">
                  <img alt="" src="/svgs/tent.svg" />
                </div>
              </>
            )}
          </Card>

          <div class="px-2 text-lg">
            <p>Address</p>
            <p>50 slots</p>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          {page() === 0 && (
            <>
              <Ticket
                type="regular"
                people={[people, setPeople]}
                color="text-blue"
              >
                Lorem ipsum dolor sit amet con sectetur adipisicing elit. Quisqu
                am, volup tatibus.
              </Ticket>

              <Ticket
                type="vip"
                people={[people, setPeople]}
                color="text-peach"
              >
                Lorem ipsum dolor sit amet con sectetur adipisicing elit. Quisqu
                am, volup tatibus.
              </Ticket>
            </>
          )}

          {page() === 1 && (
            <Tents count={totalPeople} tents={[tents, setTents]} />
          )}

          <div class="flex items-center justify-between gap-3">
            {page() === 0 && <div />}

            {page() > 0 && (
              <Button
                type="button"
                color="error"
                square
                onClick={() => {
                  setPage(0);
                  setTents({ type: 0, count: 0 });
                }}
              >
                <IcBaselineDelete />
              </Button>
            )}

            <div class="flex items-center justify-end gap-3">
              <Button
                type="button"
                onClick={() => {
                  let nextPage = page() + 1;
                  const peeps = totalPeople();

                  if (
                    nextPage === 1 &&
                    (peeps < 2 || (peeps % 2 !== 0 && peeps % 3 !== 0))
                  ) {
                    nextPage++;
                  }

                  setPage(nextPage);
                }}
              >
                {page() === 0 && "Next"}
                {page() === 1 && (tents() === 0 ? "Skip" : "Next")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

const Tents = ({ count, tents }) => (
  <>
    {count() % 2 === 0 && <Tent count={2} tents={tents} many={count() / 2} />}
    {count() % 3 === 0 && <Tent count={3} tents={tents} many={count() / 3} />}
  </>
);

const Tent = ({ count, tents: [tents, setTents], many }) => {
  const classes = () => {
    let base = "cursor-pointer border-2 transition-[border]";

    if (tents().type === count) {
      base += " border-blue";
    } else {
      base += " border-transparent";
    }

    return base;
  };

  return (
    <Card
      reactive={{
        class: classes,
      }}
      on:click={() =>
        setTents((tent) =>
          count === tent.type
            ? {
                type: 0,
                count: 0,
              }
            : {
                type: count,
                count: many,
              },
        )
      }
    >
      <div class="flex items-center justify-between gap-3">
        <p class="text-lg font-medium">{count}-Person Tent</p>
        <p class="text-lg font-medium">
          {tentPrice[count] * many} <span class="text-subtext0">DKK</span>
        </p>
      </div>

      <p class="mt-[-8px]">
        Have our crew set up {many} x {count}-person tent for you.
      </p>
    </Card>
  );
};

export function IcBaselineDelete(props, key) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.25em"
      height="1.25em"
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path
        fill="currentColor"
        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
      ></path>
    </svg>
  );
}
