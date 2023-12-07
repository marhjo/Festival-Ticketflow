import { createEffect, createMemo, createSignal } from "solid-js";
import { Button, Card, Input, Toggle } from "./base";
import { validateEmail } from "@/lib/validate";

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
  const [disabled, setDisabled] = createSignal(false);
  const [page, setPage] = createSignal(2);

  const [people, setPeople] = createSignal({
    regular: 1,
    vip: 1,
  });

  const [shareEmail, setShareEmail] = createSignal(false);
  const [sharedEmail, setSharedEmail] = createSignal("");

  const [infos, setInfos] = createSignal({
    regular: {},
    vip: {},
  });

  const [emails, setEmails] = createSignal({
    regular: {},
    vip: {},
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
      tentPrice[tent.type] * tent.count +
      99
    );
  });

  const emailsValid = createMemo(() => {
    const isShared = shareEmail();
    const shared = sharedEmail();
    const e = emails();
    const p = people();

    if (isShared) return validateEmail(shared);

    return Object.keys(e).every((key) =>
      new Array(p[key])
        .fill(null)
        .every((_, index) => validateEmail(e[key][index])),
    );
  });

  const infosValid = createMemo(() => {
    const i = infos();
    const p = people();

    return Object.keys(i).every((key) =>
      new Array(p[key])
        .fill(null)
        .every(
          (_, index) => i[key][index]?.firstName && i[key][index]?.lastName,
        ),
    );
  });

  const isDisabled = createMemo(() => {
    return disabled() || (page() == 2 && (!emailsValid() || !infosValid()));
  });

  return (
    <div class="w-[600px]">
      <div class="flex items-center justify-between">
        <h2 class="mb-2 text-2xl font-semibold">Place</h2>
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

            {page() >= 2 && (
              <>
                <p class="w-full text-left text-lg font-medium">Breakdown</p>

                <div class="flex w-full flex-col items-center justify-between gap-1">
                  {[
                    {
                      name: "Regular",
                      count: people().regular,
                      price: price.regular,
                    },
                    { name: "VIP", count: people().vip, price: price.vip },
                    {
                      name: "Tent",
                      count: tents().count,
                      price: tentPrice[tents().type],
                    },
                    null,
                    { name: "Booking Fee", count: 1, price: 99 },
                  ].map((value) => {
                    if (value === null) {
                      return (
                        <div class="my-1 w-full px-1">
                          <div class="h-[1px] w-full bg-peach" />
                        </div>
                      );
                    }

                    const { name, count, price } = value;

                    if (count === 0) return null;

                    const x = count > 1 ? " x " + count : "";

                    return (
                      <div class="flex w-full items-center justify-between">
                        <div>
                          {name}
                          {x}
                        </div>

                        <div>
                          {price * count} <span class="text-subtext0">DKK</span>
                        </div>
                      </div>
                    );
                  })}
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

          {page() === 2 && (
            <TicketInfos
              people={people}
              infos={[infos, setInfos]}
              shareEmail={[shareEmail, setShareEmail]}
              sharedEmail={[sharedEmail, setSharedEmail]}
              emails={[emails, setEmails]}
            />
          )}

          {page() === 3 && <ConfirmAge setDisabled={setDisabled} />}

          <p class="text-right text-lg font-medium">
            Total: {realPrice()} <span class="text-subtext0">DKK</span>
          </p>

          <div class="flex items-center justify-between gap-3">
            <div />

            <div class="flex items-center justify-end gap-3">
              {page() > 0 && (
                <Button
                  type="button"
                  color="error"
                  onClick={() => {
                    const currentPage = page();

                    if (currentPage === 1) setTents({ type: 0, count: 0 });

                    setDisabled(false);
                    setPage(currentPage - 1);
                  }}
                >
                  Back
                </Button>
              )}

              <Button
                type="button"
                reactive={{
                  color: () => (isDisabled() ? "disabled" : "primary"),
                }}
                onClick={() => {
                  if (isDisabled()) return;

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
                {page() === 2 && "Next"}
                {page() === 3 && "Checkout"}
                {page() === 4 && "Confirm"}
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

const TicketInfos = ({
  people,
  infos,
  shareEmail: [shareEmail, setShareEmail],
  sharedEmail: [sharedEmail, setSharedEmail],
  emails,
}) => {
  const validEmail = () => sharedEmail() === "" || validateEmail(sharedEmail());

  return (
    <>
      <div>
        <div class="flex items-center gap-2">
          <p>Shared Email</p>

          <Toggle state={[shareEmail, setShareEmail]} />
        </div>

        {shareEmail() && (
          <div class="mt-1 w-full">
            <Input
              value={sharedEmail()}
              onInput={(e) => setSharedEmail(e.target.value)}
              placeholder="john.doe@gmail.com"
              type="email"
              reactive={{
                class: () =>
                  "w-full border border-transparent" +
                  (validEmail() ? "" : " border-red"),
              }}
            />
          </div>
        )}
      </div>

      <div class="flex max-h-[400px] flex-col gap-2 overflow-y-auto rounded-md">
        {Object.keys(people()).map((type) =>
          new Array(people()[type])
            .fill(null)
            .map((_, index) => (
              <TicketInfo {...{ type, index, infos, emails, shareEmail }} />
            )),
        )}
      </div>
    </>
  );
};

const TicketInfo = ({
  type,
  index,
  infos: [infos, setInfos],
  emails: [emails, setEmails],
  shareEmail,
}) => {
  const info = () => infos()[type][index] || { firstName: "", lastName: "" };

  const email = () => emails()[type][index] ?? "";

  const validEmail = () => email() === "" || validateEmail(email());

  return (
    <Card class="gap-2">
      <div class="flex items-center justify-between gap-3">
        <p class={"text-lg font-medium"}>
          #{index + 1} {name[type]}
        </p>
      </div>

      <div className="flex gap-2">
        <div class="w-full">
          <p class="mb-1 text-sm font-medium">First Name</p>

          <Input
            value={info().firstName}
            onInput={(e) =>
              setInfos((infos) => ({
                ...infos,
                [type]: {
                  ...infos[type],
                  [index]: {
                    ...info(),
                    firstName: e.target.value,
                  },
                },
              }))
            }
            placeholder="John"
            type="text"
            class="w-full"
          />
        </div>

        <div class="w-full">
          <p class="mb-1 text-sm font-medium">Last Name</p>

          <Input
            value={info().lastName}
            onInput={(e) =>
              setInfos((infos) => ({
                ...infos,
                [type]: {
                  ...infos[type],
                  [index]: {
                    ...info(),
                    lastName: e.target.value,
                  },
                },
              }))
            }
            placeholder="Doe"
            type="text"
            class="w-full"
          />
        </div>
      </div>

      {!shareEmail() && (
        <div class="w-full">
          <p class="mb-1 text-sm font-medium">Email</p>

          <Input
            placeholder="john.doe@gmail.com"
            value={email()}
            onInput={(e) =>
              setEmails((emails) => ({
                ...emails,
                [type]: {
                  ...emails[type],
                  [index]: e.target.value,
                },
              }))
            }
            type="email"
            reactive={{
              class: () =>
                "w-full border border-transparent" +
                (validEmail() ? "" : " border-red"),
            }}
          />
        </div>
      )}
    </Card>
  );
};

const ConfirmAge = ({ setDisabled }) => {
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
