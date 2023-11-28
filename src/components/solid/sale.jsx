import { createEffect, createMemo, createSignal } from "solid-js";

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

  const [tents, setTents] = createSignal(0);

  const totalPeople = createMemo(() =>
    Object.values(people()).reduce((acc, val) => acc + val, 0),
  );

  const realPrice = createMemo(() => {
    const values = people();

    return (
      Object.keys(values).reduce(
        (acc, key) => acc + values[key] * price[key],
        0,
      ) + tentPrice[tents()]
    );
  });

  return (
    <div class="w-[600px]">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-semibold mb-2">Place</h2>

        <p class="text-lg font-medium">
          Total: {realPrice} <span class="text-subtext0">DKK</span>
        </p>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="flex flex-col gap-2">
          <div class="flex flex-col justify-center items-center p-4 w-full min-h-[130px] bg-base rounded-lg">
            {page() === 0 && "Image here."}

            {page() === 1 && (
              <>
                <p class="text-left w-full font-medium text-lg mb-4">Tents</p>

                <div class="px-8">
                  <img alt="" src="/svgs/tent.svg" />
                </div>
              </>
            )}
          </div>

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

          <div class="flex justify-between gap-3 items-center">
            {page() === 0 && <div />}

            {page() > 0 && (
              <button
                type="button"
                class="flex justify-center items-center w-10 h-10 rounded-md bg-red-400 text-white font-medium"
                on:click={() => {
                  setPage(0);
                  setTents(0);
                }}
              >
                <IcBaselineDelete />
              </button>
            )}

            <div class="flex justify-end gap-3 items-center">
              <button
                type="button"
                class="px-3 py-2 rounded-md bg-blue-500 text-white font-medium"
                on:click={() => {
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Ticket = ({ type, people: [people, setPeople], children, color }) => (
  <div class="flex flex-col gap-3 bg-base p-4 rounded-lg">
    <div class="flex justify-between gap-3 items-center">
      <p class={`text-lg font-medium ${color}`}>{name[type]}</p>
      <p class="text-lg font-medium">
        {price[type]} <span class="text-subtext0">DKK</span>
      </p>
    </div>

    <p class="mt-[-8px]">{children}</p>

    <div class="flex gap-2 items-center justify-end">
      <button
        type="button"
        class="w-7 h-7 rounded-md bg-blue-500 text-white font-medium"
        on:click={() =>
          setPeople((people) => ({
            ...people,
            [type]: Math.max(people[type] - 1, 0),
          }))
        }
      >
        -
      </button>

      <p class="text-lg font-medium px-[2px]">{people()[type]}</p>

      <button
        type="button"
        class="w-7 h-7 rounded-md bg-blue-500 text-white font-medium"
        on:click={() =>
          setPeople((people) => ({ ...people, [type]: people[type] + 1 }))
        }
      >
        +
      </button>
    </div>
  </div>
);

const Tents = ({ count, tents }) => (
  <>
    {count() % 2 === 0 && <Tent count={2} tents={tents} many={count() / 2} />}
    {count() % 3 === 0 && <Tent count={3} tents={tents} many={count() / 3} />}
  </>
);

const Tent = ({ count, tents: [tents, setTents], many }) => {
  const classes = () => {
    let base =
      "flex flex-col gap-3 bg-base p-4 rounded-lg cursor-pointer border-2 transition-[border]";

    if (tents() === count) {
      base += " border-blue";
    } else {
      base += " border-transparent";
    }

    return base;
  };

  return (
    <div
      class={classes()}
      on:click={() => setTents((tents) => (count === tents ? 0 : count))}
    >
      <div class="flex justify-between gap-3 items-center">
        <p class="text-lg font-medium">{count}-Person Tent</p>
        <p class="text-lg font-medium">
          {tentPrice[count]} <span class="text-subtext0">DKK</span>
        </p>
      </div>

      <p class="mt-[-8px]">
        Have our crew set up {many} x {count}-person tent for you.
      </p>
    </div>
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
