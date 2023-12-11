import { Card, Toggle, Input } from "../../base";
import { name } from "../info";
import { validateEmail } from "@/lib/validate";

export const TicketInfos = ({
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

      <div class="flex gap-2">
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
